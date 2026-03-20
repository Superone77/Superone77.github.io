# 第三章：DDPM 和 DDIM（DDPM and DDIM）

> 从理论到实践，掌握扩散模型的核心算法：DDPM 和 DDIM

---

## 3.1 DDPM 概述

### 3.1.1 DDPM 的核心思想

**DDPM（Denoising Diffusion Probabilistic Models）**是一种基于扩散过程的生成模型，由 Ho et al. 于 2020 年提出。

**核心思想**：
1. **正向扩散过程**：逐步向数据添加高斯噪声，直到数据变成纯噪声
2. **反向扩散过程**：逐步从噪声中去除噪声，重建原始数据
3. **训练目标**：学习反向扩散过程的条件概率分布

**数学表达**：
- **正向扩散过程**：\( q(\mathbf{x}_t \mid \mathbf{x}_{t-1}) = \mathcal{N}(\mathbf{x}_t; \sqrt{1 - \beta_t} \mathbf{x}_{t-1}, \beta_t \mathbf{I}) \)
- **反向扩散过程**：\( p_\theta(\mathbf{x}_{t-1} \mid \mathbf{x}_t) = \mathcal{N}(\mathbf{x}_{t-1}; \boldsymbol{\mu}_\theta(\mathbf{x}_t, t), \boldsymbol{\Sigma}_\theta(\mathbf{x}_t, t)) \)

**来源**：Ho et al., 2020

> "We present high quality image synthesis results using diffusion probabilistic models, a class of latent variable models inspired by considerations from nonequilibrium thermodynamics."

### 3.1.2 DDPM 的架构

**核心组件**：

1. **UNet**：骨干网络，用于预测噪声
   - 输入：加噪后的图像 \( \mathbf{x}_t \) 和时间步 \( t \)
   - 输出：预测的噪声 \( \epsilon_\theta(\mathbf{x}_t, t) \)

2. **时间嵌入（Time Embedding）**：编码时间步 \( t \) 的信息
   - 使用正弦位置编码（Sinusoidal Positional Encoding）
   - 或者使用可学习的嵌入

3. **噪声调度（Noise Schedule）**：控制噪声的强度
   - 线性调度：\( \beta_t \) 从 \( \beta_1 = 10^{-4} \) 线性增加到 \( \beta_T = 0.02 \)
   - 余弦调度：\( \bar{\alpha}_t = \frac{f(t)}{f(0)} \)，其中 \( f(t) = \cos\left(\frac{t}{T + s} \cdot \frac{\pi}{2}\right)^2 \)

4. **损失函数**：简化变分界（Simplified Variational Lower Bound）
   - \( L_{\text{simple}} = \mathbb{E}_{\mathbf{x}_0, \epsilon \sim \mathcal{N}(0, \mathbf{I}), t \sim \mathcal{U}[1, T]} \left\| \epsilon - \epsilon_\theta(\mathbf{x}_t, t) \right\|^2 \)

**来源**：LearnOpenCV - DDPM Implementation (2024)

> "In practice, authors of DDPMs use a linear variance scheduler and define β in range [0.0001, 0.02] and set total timesteps T = 1000."

### 3.1.3 DDPM 的优势

**优势**：
1. **生成质量高**：在图像生成任务中取得了 SOTA 结果
2. **训练稳定**：不会出现模式崩溃（Mode Collapse）
3. **采样多样性高**：能够生成多样化的样本
4. **数学基础坚实**：基于严格的数学理论

**局限**：
1. **采样速度慢**：需要 1000 步采样，推理速度慢
2. **计算成本高**：训练成本高，尤其是大模型
3. **内存占用高**：需要存储大量的中间结果

---

## 3.2 DDPM 的实现

### 3.2.1 噪声调度（Noise Schedule）

**线性调度（Linear Schedule）**：
```python
import torch
import torch.nn as nn

def get_linear_schedule(num_timesteps: int, beta_start: float = 1e-4, beta_end: float = 0.02):
    """
    线性噪声调度
    """
    betas = torch.linspace(beta_start, beta_end, num_timesteps)
    alphas = 1.0 - betas
    alphas_cumprod = torch.cumprod(alphas, dim=0)
    return betas, alphas, alphas_cumprod
```

**余弦调度（Cosine Schedule）**：
```python
def get_cosine_schedule(num_timesteps: int, s: float = 0.008):
    """
    余弦噪声调度
    """
    t = torch.arange(num_timesteps + 1, dtype=torch.float64)
    f = torch.cos(((t / num_timesteps) + s) / (1 + s) * torch.pi / 2) ** 2
    alphas_cumprod = f / f[0]
    betas = 1 - (alphas_cumprod[1:] / alphas_cumprod[:-1])
    alphas = 1 - betas
    return betas, alphas, alphas_cumprod
```

**来源**：Ho et al., 2020; Nicholls & Tatsis, 2020

### 3.2.2 UNet 模型

**UNet 架构**：
```python
import torch
import torch.nn as nn
import torch.nn.functional as F

class UNet(nn.Module):
    def __init__(self, in_channels: int = 3, out_channels: int = 3, hidden_dim: int = 128):
        super().__init__()
        self.time_emb_dim = hidden_dim

        # 时间嵌入
        self.time_mlp = nn.Sequential(
            SinusoidalPosEmb(hidden_dim),
            nn.Linear(hidden_dim, hidden_dim * 4),
            nn.Mish(),
            nn.Linear(hidden_dim * 4, hidden_dim)
        )

        # 编码器
        self.encoder = nn.ModuleList([
            self._make_block(in_channels, hidden_dim),
            self._make_block(hidden_dim, hidden_dim * 2),
            self._make_block(hidden_dim * 2, hidden_dim * 4),
            self._make_block(hidden_dim * 4, hidden_dim * 8)
        ])

        # 中间层
        self.middle_block = self._make_block(hidden_dim * 8, hidden_dim * 8)

        # 解码器
        self.decoder = nn.ModuleList([
            self._make_block(hidden_dim * 8 * 2, hidden_dim * 8),
            self._make_block(hidden_dim * 8 * 2, hidden_dim * 4),
            self._make_block(hidden_dim * 4 * 2, hidden_dim * 2),
            self._make_block(hidden_dim * 2 * 2, hidden_dim)
        ])

        # 输出层
        self.output = nn.Conv2d(hidden_dim, out_channels, kernel_size=1)

    def _make_block(self, in_channels: int, out_channels: int):
        return nn.ModuleList([
            nn.Sequential(
                nn.Conv2d(in_channels, out_channels, kernel_size=3, padding=1),
                nn.GroupNorm(8, out_channels),
                nn.Mish()
            ),
            nn.Sequential(
                nn.Conv2d(out_channels, out_channels, kernel_size=3, padding=1),
                nn.GroupNorm(8, out_channels),
                nn.Mish()
            )
        ])

    def forward(self, x: torch.Tensor, t: torch.Tensor) -> torch.Tensor:
        # 时间嵌入
        time_emb = self.time_mlp(t)
        time_emb = time_emb.unsqueeze(-1).unsqueeze(-1)

        # 编码器
        skips = []
        for blocks in self.encoder:
            for block in blocks:
                x = block(x) + time_emb
            skips.append(x)
            x = F.max_pool2d(x, 2)

        # 中间层
        x = self.middle_block[0](x) + time_emb
        x = self.middle_block[1](x) + time_emb

        # 解码器
        for blocks in self.decoder:
            x = F.interpolate(x, scale_factor=2, mode='bilinear', align_corners=False)
            skip = skips.pop()
            x = torch.cat([x, skip], dim=1)
            for block in blocks:
                x = block(x) + time_emb

        # 输出
        return self.output(x)


class SinusoidalPosEmb(nn.Module):
    def __init__(self, dim: int):
        super().__init__()
        self.dim = dim

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        device = x.device
        half_dim = self.dim // 2
        emb = torch.log(torch.tensor(10000, device=device)) / (half_dim - 1)
        emb = torch.exp(torch.arange(half_dim, device=device) * -emb)
        emb = x[:, None] * emb[None, :]
        emb = torch.cat((emb.sin(), emb.cos()), dim=-1)
        return emb
```

**来源**：nn.labml.ai - DDPM Implementation (2024)

### 3.2.3 训练过程

**训练循环**：
```python
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader

class DDPMTrainer:
    def __init__(self, model: nn.Module, num_timesteps: int = 1000, beta_start: float = 1e-4, beta_end: float = 0.02):
        self.model = model
        self.num_timesteps = num_timesteps
        self.betas, self.alphas, self.alphas_cumprod = get_linear_schedule(num_timesteps, beta_start, beta_end)
        self.optimizer = optim.Adam(self.model.parameters(), lr=1e-4)

    def q_sample(self, x_start: torch.Tensor, t: torch.Tensor, noise: torch.Tensor = None) -> torch.Tensor:
        """
        正向扩散过程：向数据添加噪声
        """
        if noise is None:
            noise = torch.randn_like(x_start)

        sqrt_alphas_cumprod_t = self.alphas_cumprod[t].sqrt()
        sqrt_one_minus_alphas_cumprod_t = (1 - self.alphas_cumprod[t]).sqrt()

        return sqrt_alphas_cumprod_t * x_start + sqrt_one_minus_alphas_cumprod_t * noise

    def p_losses(self, x_start: torch.Tensor, t: torch.Tensor, noise: torch.Tensor = None) -> torch.Tensor:
        """
        计算损失函数
        """
        if noise is None:
            noise = torch.randn_like(x_start)

        # 前向扩散
        x_noisy = self.q_sample(x_start, t, noise)

        # 预测噪声
        predicted_noise = self.model(x_noisy, t)

        # 计算 MSE 损失
        loss = F.mse_loss(predicted_noise, noise)
        return loss

    def train_epoch(self, dataloader: DataLoader, device: torch.device):
        """
        训练一个 epoch
        """
        self.model.train()
        total_loss = 0

        for batch_idx, (x_start, _) in enumerate(dataloader):
            x_start = x_start.to(device)
            batch_size = x_start.shape[0]

            # 随机采样时间步
            t = torch.randint(0, self.num_timesteps, (batch_size,), device=device).long()

            # 计算损失
            loss = self.p_losses(x_start, t)

            # 反向传播
            self.optimizer.zero_grad()
            loss.backward()
            self.optimizer.step()

            total_loss += loss.item()

        return total_loss / len(dataloader)
```

**来源**：Medium - Diffusion Model from Scratch (2024)

### 3.2.4 采样过程

**采样循环**：
```python
import torch
import torch.nn.functional as F

class DDPM Sampler:
    def __init__(self, model: nn.Module, num_timesteps: int = 1000, beta_start: float = 1e-4, beta_end: float = 0.02):
        self.model = model
        self.model.eval()
        self.num_timesteps = num_timesteps
        self.betas, self.alphas, self.alphas_cumprod = get_linear_schedule(num_timesteps, beta_start, beta_end)

    def p_sample(self, x: torch.Tensor, t: torch.Tensor) -> torch.Tensor:
        """
        单步采样
        """
        # 预测噪声
        predicted_noise = self.model(x, t)

        # 计算均值
        alpha_t = self.alphas[t]
        alpha_t_cumprod = self.alphas_cumprod[t]
        beta_t = self.betas[t]

        sqrt_one_minus_alpha_t_cumprod = (1 - alpha_t_cumprod).sqrt()
        sqrt_recip_alpha_t = (1 / alpha_t).sqrt()

        mean = sqrt_recip_alpha_t * (x - beta_t / sqrt_one_minus_alpha_t_cumprod * predicted_noise)

        # 计算方差
        posterior_variance_t = beta_t * (1 - self.alphas_cumprod[t - 1]) / (1 - self.alphas_cumprod[t])
        std = posterior_variance_t.sqrt()

        # 添加噪声
        if t[0] > 0:
            noise = torch.randn_like(x)
            return mean + std * noise
        else:
            return mean

    def sample(self, shape: tuple, device: torch.device) -> torch.Tensor:
        """
        完整采样过程
        """
        # 初始化噪声
        img = torch.randn(shape, device=device)

        # 从 T 到 1 逐步去噪
        for i in reversed(range(self.num_timesteps)):
            t = torch.full((shape[0],), i, device=device).long()
            img = self.p_sample(img, t)

        return img
```

**来源**：nn.labml.ai - DDPM Implementation (2024)

---

## 3.3 DDIM 概述

### 3.3.1 DDPM 的采样速度问题

**DDPM 的局限**：
- DDPM 需要执行 1000 步采样才能获得高质量图像
- 采样速度慢，不适合实时应用

**原因**：
- DDPM 的反向扩散过程是马尔可夫的
- 每一步都必须从 \( \mathbf{x}_t \) 采样 \( \mathbf{x}_{t-1} \)
- 无法跳过中间步骤

**来源**：Song et al., 2021

> "DDPM requires a large number of function evaluations (e.g., 1000) to produce a sample, which is computationally expensive."

### 3.3.2 DDIM 的核心思想

**DDIM（Denoising Diffusion Implicit Models）**是 DDPM 的改进版本，由 Song et al. 于 2021 年提出。

**核心思想**：
1. **非马尔可夫采样**：跳过中间步骤，实现更快的采样
2. **确定性采样**：可以生成确定性的样本（同一噪声生成相同的图像）
3. **保持训练过程不变**：使用与 DDPM 相同的训练过程

**数学表达**：
- **非马尔可夫采样**：\( p_{\theta}^{DDIM}(\mathbf{x}_{t-\tau} \mid \mathbf{x}_t) = \mathcal{N}(\mathbf{x}_{t-\tau}; \sqrt{\alpha_{t-\tau}} \boldsymbol{\sigma}_t, (1 - \bar{\alpha}_{t-\tau}) \mathbf{I}) \)
- **确定性更新**：\( \mathbf{x}_{t-\tau} = \sqrt{\alpha_{t-\tau}} \left(\frac{\mathbf{x}_t - \sqrt{1 - \bar{\alpha}_t} \boldsymbol{\epsilon}_\theta(\mathbf{x}_t, t)}{\sqrt{\bar{\alpha}_t}}\right) + \sqrt{1 - \bar{\alpha}_{t-\tau}} \boldsymbol{\epsilon}_\theta(\mathbf{x}_t, t) \)

**来源**：Song et al., 2021

> "We propose a class of non-Markovian diffusion processes that lead to the same marginal distributions, allowing for faster sampling."

### 3.3.3 DDIM 的优势

**优势**：
1. **采样速度快**：将采样步数从 1000 步减少到 100 步甚至更少
2. **确定性采样**：可以生成确定性的样本
3. **保持训练过程不变**：使用与 DDPM 相同的训练过程

**局限**：
1. **采样质量可能下降**：步数太少时，采样质量可能下降
2. **需要调节超参数**：需要调节步数、噪声参数等超参数

---

## 3.4 DDIM 的实现

### 3.4.1 DDIM 采样过程

**DDIM 采样器**：
```python
import torch
import torch.nn as nn
import torch.nn.functional as F

class DDIM Sampler:
    def __init__(self, model: nn.Module, num_timesteps: int = 1000, sampling_timesteps: int = 100,
                 beta_start: float = 1e-4, beta_end: float = 0.02, eta: float = 0.0):
        self.model = model
        self.model.eval()
        self.num_timesteps = num_timesteps
        self.sampling_timesteps = sampling_timesteps
        self.eta = eta
        self.betas, self.alphas, self.alphas_cumprod = get_linear_schedule(num_timesteps, beta_start, beta_end)

        # 计算采样时间步
        self.timesteps = torch.linspace(num_timesteps - 1, 0, sampling_timesteps).long()

    def ddim_step(self, x: torch.Tensor, t: torch.Tensor, t_prev: torch.Tensor) -> torch.Tensor:
        """
        DDIM 单步采样
        """
        # 预测噪声
        predicted_noise = self.model(x, t)

        # 计算预测的 x_0
        alpha_t = self.alphas[t]
        alpha_t_cumprod = self.alphas_cumprod[t]
        alpha_t_prev_cumprod = self.alphas_cumprod[t_prev] if t_prev[0] >= 0 else torch.tensor(1.0, device=x.device)

        sqrt_alpha_t_cumprod = alpha_t_cumprod.sqrt()
        sqrt_one_minus_alpha_t_cumprod = (1 - alpha_t_cumprod).sqrt()

        x_0 = (x - sqrt_one_minus_alpha_t_cumprod * predicted_noise) / sqrt_alpha_t_cumprod
        x_0 = x_0.clamp(-1, 1)

        # 计算方向指向 x_t
        sqrt_alpha_t_prev_cumprod = alpha_t_prev_cumprod.sqrt()
        sqrt_one_minus_alpha_t_prev_cumprod = (1 - alpha_t_prev_cumprod).sqrt()

        direction = sqrt_one_minus_alpha_t_prev_cumprod * predicted_noise

        # 计算 x_{t-1}
        x_prev = sqrt_alpha_t_prev_cumprod * x_0 + direction

        # 如果 eta > 0，添加随机噪声
        if self.eta > 0:
            sigma = self.eta * ((1 - alpha_t_prev_cumprod) / (1 - alpha_t_cumprod)).sqrt()
            noise = torch.randn_like(x)
            x_prev = x_prev + sigma * noise

        return x_prev

    def sample(self, shape: tuple, device: torch.device) -> torch.Tensor:
        """
        DDIM 完整采样过程
        """
        # 初始化噪声
        img = torch.randn(shape, device=device)

        # 按照非均匀时间步采样
        for i, (t, t_prev) in enumerate(zip(self.timesteps, self.timesteps[1:])):
            t = t.unsqueeze(0).repeat(shape[0]).to(device)
            t_prev = t_prev.unsqueeze(0).repeat(shape[0]).to(device)
            img = self.ddim_step(img, t, t_prev)

        return img
```

**来源**：Song et al., 2021; GitHub - ermongroup/ddim

> "Implements sampling from an implicit model that is trained with the same procedure as Denoising Diffusion Probabilistic Model, but costs much less time and compute if you want to sample from it."

### 3.4.2 DDIM 参数调节

**重要参数**：

1. **sampling_timesteps**：采样步数
   - 默认：100 步
   - 可以从 10 步到 1000 步调节

2. **eta**：随机噪声系数
   - \( \eta = 0 \)：确定性采样（DDIM）
   - \( \eta = 1 \)：随机采样（DDPM）
   - \( 0 < \eta < 1 \)：混合采样

**示例**：
```python
# 确定性采样（最快）
sampler = DDIM Sampler(model, sampling_timesteps=100, eta=0.0)

# 随机采样（与 DDPM 相同）
sampler = DDIM Sampler(model, sampling_timesteps=100, eta=1.0)

# 混合采样（平衡速度和质量）
sampler = DDIM Sampler(model, sampling_timesteps=100, eta=0.5)
```

**来源**：Song et al., 2021

---

## 3.5 DDPM 和 DDIM 的代码示例

### 3.5.1 完整的训练和采样示例

**训练和采样**：
```python
import torch
import torch.nn as nn
from torch.utils.data import DataLoader
from torchvision import datasets, transforms

# 超参数
BATCH_SIZE = 32
NUM_TIMESTEPS = 1000
EPOCHS = 50
LEARNING_RATE = 1e-4

# 加载数据
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.5,), (0.5,))
])
dataset = datasets.CIFAR10(root='./data', train=True, download=True, transform=transform)
dataloader = DataLoader(dataset, batch_size=BATCH_SIZE, shuffle=True)

# 创建模型
model = UNet(in_channels=3, out_channels=3, hidden_dim=128)
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model.to(device)

# 创建训练器
trainer = DDPMTrainer(model, num_timesteps=NUM_TIMESTEPS)

# 训练
for epoch in range(EPOCHS):
    loss = trainer.train_epoch(dataloader, device)
    print(f'Epoch {epoch + 1}, Loss: {loss:.4f}')

    # 保存模型
    if (epoch + 1) % 10 == 0:
        torch.save(model.state_dict(), f'ddpm_model_epoch_{epoch + 1}.pt')

# 创建采样器
ddim_sampler = DDIM Sampler(model, num_timesteps=NUM_TIMESTEPS, sampling_timesteps=100, eta=0.0)

# 采样
samples = ddim_sampler.sample(shape=(16, 3, 32, 32), device=device)

# 保存图像
from torchvision.utils import save_image
save_image(samples * 0.5 + 0.5, 'ddim_samples.png', nrow=4)
```

**来源**：Medium - Diffusion Model from Scratch (2024); nn.labml.ai - DDPM Implementation (2024)

### 3.5.2 预训练模型的使用

**使用预训练模型**：
```python
import torch
from torchvision.utils import save_image

# 加载预训练模型
model = UNet(in_channels=3, out_channels=3, hidden_dim=128)
model.load_state_dict(torch.load('ddpm_model_epoch_50.pt'))
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model.to(device)

# 创建采样器
ddim_sampler = DDIM Sampler(model, num_timesteps=NUM_TIMESTEPS, sampling_timesteps=50, eta=0.0)

# 采样
samples = ddim_sampler.sample(shape=(64, 3, 32, 32), device=device)

# 保存图像
save_image(samples * 0.5 + 0.5, 'ddim_samples_50_steps.png', nrow=8)
```

---

## 3.6 DDPM 和 DDIM 的对比

### 3.6.1 性能对比

**对比表**：

| 特征 | DDPM | DDIM |
|------|------|------|
| 采样步数 | 1000 步 | 100 步（可调节） |
| 采样速度 | 慢 | 快（10x 加速） |
| 采样质量 | 高 | 高（步数足够时） |
| 确定性 | 否 | 是（\( \eta = 0 \)） |
| 训练过程 | 标准 | 标准（与 DDPM 相同） |
| 实现复杂度 | 中等 | 中等 |

**来源**：Song et al., 2021; LearnOpenCV - DDPM Implementation (2024)

### 3.6.2 应用场景对比

**DDPM 适用场景**：
- 需要最高质量的生成结果
- 不介意采样速度慢
- 研究和学术应用

**DDIM 适用场景**：
- 需要快速采样（实时应用）
- 需要确定性采样（可复现性）
- 产品化应用

---

## 结语

本章介绍了 DDPM 和 DDIM 两种扩散模型的核心算法。DDPM 是扩散模型的基础框架，通过逐步添加和去除噪声实现数据生成。DDIM 是 DDPM 的改进版本，通过非马尔可夫采样实现了更快的采样速度。

我们详细介绍了 DDPM 和 DDIM 的核心思想、架构、实现和代码示例，并对它们的性能和应用场景进行了对比。读者可以基于这些代码示例实现自己的扩散模型。

---

**参考文献**：

1. Ho et al. - Denoising Diffusion Probabilistic Models (2020)
   - 论文链接：https://arxiv.org/abs/2006.11239
   - 重要性：DDPM 的开山之作，定义了扩散模型的基础框架

2. Song et al. - Denoising Diffusion Implicit Models (2021)
   - 论文链接：https://arxiv.org/abs/2010.02502
   - 重要性：DDIM，提供了更快的采样方法

3. LearnOpenCV - An In-Depth Guide to DDPM (2024)
   - 链接：https://learnopencv.com/denoising-diffusion-probabilistic-models/
   - 重要性：DDPM 的详细教程和实现

4. Medium - Diffusion Model from Scratch in PyTorch (2024)
   - 链接：https://medium.com/data-science/diffusion-model-from-scratch-in-pytorch-ddpm-9d9760528946
   - 重要性：从零开始的 DDPM 实现

5. nn.labml.ai - DDPM Implementation (2024)
   - 链接：https://nn.labml.ai/diffusion/ddpm/index.html
   - 重要性：DDPM 的 PyTorch 实现

6. GitHub - ermongroup/ddim (2024)
   - 链接：https://github.com/ermongroup/ddim
   - 重要性：DDIM 的官方实现

---

**章节版本**：v1.0
**最后更新**：2026-03-19
