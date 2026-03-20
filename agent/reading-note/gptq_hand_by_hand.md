# 手把手带你写算法：GPTQ

如果了解GPTQ的朋友，可以首先问自己下面三个问题，我们接下来会用简单的代码讲解GPTQ是如何回答这三个问题的：

1. 如何计算一个量化值？
2. 如何近似一个Hessian矩阵？
3. 量化一个元素之后，如何补偿后面的元素？

* 需要配套Notebook代码，可以公众号后台发送 "**Notebook**"领取。代码分填空版本和答案版本，适合自己练习。

先从第一个问题开始：

## 怎么将一个张量量化到4bit？

GPTQ 再复杂，底层也离不开最基础的量化操作。第一步我们先实现了一个最简单的“均匀对称量化”。

思路很直接：

1. 找到当前张量的最大绝对值。
2. 计算 4-bit 可表示的整数范围。
3. 用最大值映射出缩放因子 `scale`。
4. 先除以 `scale` 变成整数空间，四舍五入，再乘回来完成反量化。

代码大致长这样：

```python
def quantize_tensor_symmetric(x: torch.Tensor, bits: int = 4):
    ori_range = x.abs().max()
    bits_range = 2 ** (bits - 1) - 1
    scale = ori_range / bits_range
    x_q = (x / scale).round()
    x_q = x_q * scale
    return x_q, scale
```

这个实现已经够用来建立第一层直觉了。它对应的是“把浮点数压缩到有限个离散格点上，然后再映射回浮点空间”。

### 为什么 `bits_range = 2 ** (bits - 1) - 1`？

以int4举例

- int4可写作 `b3 b2 b1 b0`
- 十进制值 = `-8*b3 + 4*b2 + 2*b1 + 1*b0`
- 其中最高位 `b3` 是符号位，权重是 `-8`（不是 `+8`）

---

`int4` 全部取值表：

| 二进制 | 计算 | 十进制 |
|---|---|---|
| `0000` | `-8*0 + 4*0 + 2*0 + 1*0` | `0` |
| `0001` | `-8*0 + 4*0 + 2*0 + 1*1` | `1` |
| `0010` | `-8*0 + 4*0 + 2*1 + 1*0` | `2` |
| `0011` | `-8*0 + 4*0 + 2*1 + 1*1` | `3` |
| `0100` | `-8*0 + 4*1 + 2*0 + 1*0` | `4` |
| `0101` | `-8*0 + 4*1 + 2*0 + 1*1` | `5` |
| `0110` | `-8*0 + 4*1 + 2*1 + 1*0` | `6` |
| `0111` | `-8*0 + 4*1 + 2*1 + 1*1` | `7` |
| `1000` | `-8*1 + 4*0 + 2*0 + 1*0` | `-8` |
| `1001` | `-8*1 + 4*0 + 2*0 + 1*1` | `-7` |
| `1010` | `-8*1 + 4*0 + 2*1 + 1*0` | `-6` |
| `1011` | `-8*1 + 4*0 + 2*1 + 1*1` | `-5` |
| `1100` | `-8*1 + 4*1 + 2*0 + 1*0` | `-4` |
| `1101` | `-8*1 + 4*1 + 2*0 + 1*1` | `-3` |
| `1110` | `-8*1 + 4*1 + 2*1 + 1*0` | `-2` |
| `1111` | `-8*1 + 4*1 + 2*1 + 1*1` | `-1` |

---

所以 `int4` 范围是：**`-8 ~ 7`**。  

## 第二步：GPTQ 为什么需要 Hessian？

如果只是做 RTN，也就是 round-to-nearest，会直接把整行权重 round 掉：

```python
q_w = round(w / scale) * scale
```

而GPTQ 关注“量化之后，对模型输出影响大不大”，而衡量这一敏感性的方式就是Hessian矩阵

如果从数学定义出发，Hessian 是一个标量函数对参数的二阶偏导矩阵：

```python
H[i, j] = d^2 L / (d theta_i d theta_j)
```

它描述的是输出对权重的“曲率大不大”。

- 对角项大，说明这个方向很敏感，参数稍微改一点，损失就会变很多。
- 非对角项大，说明两个方向之间耦合强，一个方向的误差会影响另一个方向。

GPTQ 并不会真的去精确计算整层权重的完整二阶导，而是用输入激活的统计量做一个近似：

```python
H ~= X^T X / N + damping * I
```

其中：

- `X` 是校准数据 `calib_x`
- `N` 是样本数
- `X^T X / N` 可以理解为输入的二阶统计量
- `damping * I` 是阻尼项，用来提升数值稳定性

它的直觉是：如果某些输入维度经常一起出现，或者某个方向对输出特别敏感，那么量化这些方向上的权重时，就应该更谨慎。

对应代码如下：

```python
def build_hessian(calib_x: torch.Tensor, damping: float = 1e-4):
    n = calib_x.shape[0]
    H = calib_x.T @ calib_x / n
    I = torch.eye(H.shape[0], device=calib_x.device, dtype=calib_x.dtype)
    H = H + damping * I
    H_inv = torch.linalg.inv(H)
    return H, H_inv
```


## 第三步：逐列更新参数

GPTQ 的核心就是，量化当前这个数之后，把误差补偿给后面的数


假设我们现在要量化线性层权重矩阵中的某一行 `w_row`。  
GPTQ 不会一次性把这一整行 round 掉，而是遍历所有列：

1. 处理第 `j` 列时。
2. 先把当前元素量化成 `q_j`。
3. 计算当前量化误差。
4. 用 Hessian 逆矩阵把这个误差传播到后续列。
5. 继续量化下一列。

这就是“逐列量化 + 误差补偿”。

更接近 GPTQ 思路的实现如下：

```python
def gptq_quantize_row(w_row: torch.Tensor, h_inv: torch.Tensor, bits: int = 4):
    w_work = w_row.clone()
    q_row = w_row.clone()

    for j in range(w_row.numel()):
        q_j, _ = quantize_tensor_symmetric(w_work[j:j + 1], bits=bits)
        q_row[j] = q_j[0]

        diag = torch.clamp(h_inv[j, j], min=1e-8)
        err = (w_work[j] - q_row[j]) / diag

        if j + 1 < w_row.numel():
            w_work[j + 1:] = w_work[j + 1:] - err * h_inv[j, j + 1:]

        w_work[j] = q_row[j]

    return q_row
```

上面第 4 步最值得单独展开。假设第 `j` 个位置量化前后分别是：

- 原值：`w_work[j]`
- 量化后：`q_row[j]`

那么当前误差是：

```python
e_j = w_work[j] - q_row[j]
```

RTN 的做法是“这个误差产生了就产生了”，直接继续量化下一个元素。  
GPTQ 的做法是：后面的元素还没有量化，我可以先轻微改一下它们，让它们替前面这个误差“分担一点”。

因此代码里会写成：

```python
diag = torch.clamp(h_inv[j, j], min=1e-8)
err = (w_work[j] - q_row[j]) / diag
w_work[j + 1:] = w_work[j + 1:] - err * h_inv[j, j + 1:]
```

可以这样理解：

- `h_inv[j, j]` 是当前这个方向自己的尺度，用来做归一化。
- `h_inv[j, j + 1:]` 描述“当前列的误差”应该如何影响未来列。
- `w_work[j + 1:]` 被提前调整过之后，后面再量化时就不是在原始权重上硬 round，而是在“已经补偿过”的权重上继续做决策。

所以 GPTQ 的关键不是“第 `j` 个数怎么 round”，而是“第 `j` 个数 round 完之后，怎么把代价重新分配给未来列”。

## 我的第一版为什么和答案不一样？

我一开始写的是下面这种思路：

```python
def gptq_quantize_row(w_row: torch.Tensor, h_inv: torch.Tensor, bits: int = 4):
    w_work = w_row.clone()
    for j in range(w_work.shape[0]):
        tmp = w_work[j]
        tmp_q, scale = quantize_tensor_symmetric(tmp, bits)
        e_j = tmp - tmp_q
        w_work[j+1:] = w_work[j+1:] - e_j * h_inv[j+1:, j]
        w_work[j] = tmp_q
    return w_work
```

它“看起来”已经很像 GPTQ 了，但严格来说和答案版还有三个关键差异。

### 1. 我没有用对角项做归一化

答案里会写：

```python
err = (w_work[j] - q_row[j]) / h_inv[j, j]
```

我一开始直接用了：

```python
e_j = tmp - tmp_q
```

少了这一步，误差传播的尺度就不对。  
这不是实现细节，而是 GPTQ 更新式本身的重要组成部分。

### 2. 我传播误差时切的是列，不是行

我写的是：

```python
h_inv[j+1:, j]
```

答案更接近：

```python
h_inv[j, j+1:]
```

两者维度虽然都能对上，但表达的更新方向不同。GPTQ 的常见推导是“当前列的误差如何影响未来列”，所以更自然的写法是沿着第 `j` 行向右传播。

### 3. 我量化的是标量，不是长度为 1 的 tensor

我最开始写的是：

```python
tmp = w_work[j]
tmp_q, scale = quantize_tensor_symmetric(tmp, bits)
```

这在很多时候能跑，但数值语义不够稳定。答案版用的是：

```python
q_j, _ = quantize_tensor_symmetric(w_work[j:j+1], bits=bits)
```

这样整个量化函数始终处理 tensor，逻辑更一致，也更不容易踩边界条件。

## 第四步：把逐行量化推广到整个线性层

当一行的 GPTQ 量化能跑通以后，整层的逻辑就很自然了：

1. 用校准数据构造 Hessian 及其逆矩阵。
2. 深拷贝原始线性层，避免直接改动原模型。
3. 逐行量化 `weight`。
4. 保留原始 `bias` 不变。

代码如下：

```python
def gptq_quantize_linear(
    linear: nn.Linear,
    calib_x: torch.Tensor,
    bits: int = 4,
    damping: float = 1e-4,
):
    _, h_inv = build_hessian(calib_x, damping=damping)
    q_layer = copy.deepcopy(linear)

    with torch.no_grad():
        q_w = []
        for r in range(linear.weight.shape[0]):
            q_r = gptq_quantize_row(linear.weight[r], h_inv=h_inv, bits=bits)
            q_w.append(q_r)
        q_layer.weight.copy_(torch.stack(q_w, dim=0))

    return q_layer
```

这里`torch.stack` 是把多个形状相同的 tensor 沿着一个新维度堆起来。

在这段代码里，`q_w` 里存的是一行一行的量化结果，每个 `q_r` 的形状都是 `[in_features]`。  
执行：

```python
torch.stack(q_w, dim=0)
```

之后，就会把这些行重新拼成一个二维权重矩阵，形状变回：

```python
[out_features, in_features]
```

这一步和 `torch.cat` 不一样。`stack` 会新增一个维度，所以非常适合“把很多行重新堆成一整个矩阵”。

注意 `Parameter` 没有 `.copy()`，要用原地赋值：

```python
q_layer.weight.copy_(...)
```

这类错误不复杂，但很适合提醒自己：PyTorch 里改参数，通常要留意是不是需要原地操作。

## 第五步：怎么验证 GPTQ 比 RTN 更合理？ （参考代码见Notebook）

做完实现之后，不能只看“代码跑了没有”，还得看量化后的输出误差。

最简单的验证方式是：

1. 构造一个随机线性层。
2. 准备一批校准输入 `calib_x`。
3. 再准备一批测试输入 `test_x`。
4. 分别比较 FP、RTN、GPTQ 三者输出之间的 MSE。

如果实现合理，GPTQ 通常应该至少不比 RTN 差，在不少设置下还会更好。

## 最后一个容易问到的问题：如果有多层 Linear，要不要跨层传播误差？

标准 GPTQ 的答案是：**不用直接跨层传播，它是逐层做的。**

也就是说：

- 在量化当前层时，只考虑当前层自己的权重和当前层输入 `X`。
- 误差补偿只发生在“当前层、当前行、未来列”内部。
- 不会在量化第 1 层时，同时去联动优化第 2 层、第 3 层的权重。

那后续层完全没考虑到前面层的误差吗？也不是。

更准确地说，后续层是**间接感受到**前面层误差的：

1. 先量化前一层。
2. 前一层量化后，输出激活会发生一点偏移。
3. 下一层看到的输入分布也就变了。
4. 下一层再基于这个输入分布去构建自己的 Hessian 近似并量化。

GPTQ 是一种很典型的 layer-wise post-training quantization 方法，主流框架均支持的很好了，本文及练习均为示意性代码，帮助读者快速理解其中的逻辑。

需要配套Notebook代码，可以公众号后台发送 "**Notebook**"领取。代码分填空版本和答案版本，适合自己练习。



