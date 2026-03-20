# 第五章：条件扩散模型（Conditional Diffusion Models）

> 探索如何引导扩散模型生成特定条件下的样本

---

## 5.1 条件扩散模型概述

### 5.1.1 什么是条件扩散模型？

**条件扩散模型（Conditional Diffusion Models）**是一种能够根据特定条件（如类别、文本、图像等）生成样本的扩散模型。

**核心思想**：
- **条件信息**：将类别、文本、图像等条件信息融入扩散过程
- **条件生成**：生成符合给定条件的样本
- **可控生成**：通过控制条件来控制生成结果

**数学表达**：
\[ p_\theta(\mathbf{x} \mid c) \]
其中 \( c \) 是条件信息（类别、文本、图像等）。

**来源**：Dhariwal & Nichol, 2021; Ho & Salimans, 2022

> "Classifier guidance is a recently introduced method to trade off mode coverage and sample fidelity in conditional diffusion models."

### 5.1.2 条件扩散模型的类型

**按条件类型分类**：
1. **类别条件（Class-Conditioned）**：根据类别标签生成样本
2. **文本条件（Text-Conditioned）**：根据文本描述生成图像
3. **图像条件（Image-Conditioned）**：根据输入图像生成新图像（图像修复、编辑）
4. **多模态条件（Multimodal-Conditioned）**：根据多种模态的条件生成样本

**按引导方式分类**：
1. **分类器引导（Classifier Guidance）**：使用外部分类器引导生成
2. **无分类器引导（Classifier-Free Guidance, CFG）**：使用条件和无条件模型的混合引导生成

**来源**：Ho & Salimans, 2022 - Classifier-Free Diffusion Guidance

### 5.1.3 条件扩散模型的应用

**应用场景**：
- **文本到图像生成**：Stable Diffusion、DALL-E、Midjourney
- **图像到图像生成**：图像修复、图像编辑、风格迁移
- **类别条件生成**：根据类别标签生成特定类别的图像
- **多模态生成**：视频生成、音频生成、3D 生成

---

## 5.2 Classifier Guidance

### 5.2.1 Classifier Guidance 的核心思想

**Classifier Guidance（分类器引导）**是一种使用外部分类器引导扩散模型生成的方法，由 Dhariwal & Nichol 于 2021 年提出。

**核心思想**：
1. **训练分类器**：训练一个图像分类器，用于估计样本属于特定类别的概率
2. **引导采样**：在采样过程中，使用分类器的梯度引导扩散模型
3. **方向引导**：将采样过程推向目标类别的方向

**数学表达**：
\[ \nabla_{\mathbf{x}_t} \log p(\mathbf{x}_t \mid c) = \nabla_{\mathbf{x}_t} \log p(\mathbf{x}_t) + s \nabla_{\mathbf{x}_t} \log p(c \mid \mathbf{x}_t) \]
其中 \( s \) 是引导强度参数。

**来源**：Dhariwal & Nichol, 2021

> "Classifier guidance modifies the diffusion score to include the gradient of a classifier's log-probability."

### 5.2.2 Classifier Guidance 的实现

**Classifier Guidance 实现**：
```python
import torch
import torch.nn as nn

class ClassifierGuidance:
    def __init__(self, diffusion_model: nn.Module, classifier: nn.Module, guidance_scale: float = 1.0):
        self.diffusion_model = diffusion_model
        self.classifier = classifier
        self.classifier.eval()
        self.guidance_scale = guidance_scale

    def guided_sample(self, shape: tuple, class_label: int, device: torch.Tensor, num_inference_steps: int = 50) -> torch.Tensor:
        """
        分类器引导采样
        """
        # 初始化噪声
        x = torch.randn(shape, device=device)

        # 逐步去噪
        for i in reversed(range(0, 1000)):
            t = torch.full((shape[0],), i, device=device).long()

            # 扩散模型预测噪声
            noise_pred = self.diffusion_model(x, t)

            # 分类器预测类别
            class_logit = self.classifier(x)
            class_prob = torch.softmax(class_logit, dim=-1)

            # 计算分类器梯度
            target_class = torch.full((shape[0],), class_label, device=device).long()
            classifier_grad = torch.autograd.grad(
                outputs=class_prob[torch.arange(shape[0]), target_class].sum(),
                inputs=x,
                create_graph=True
            )[0]

            # 引导预测噪声
            guided_noise_pred = noise_pred - self.guidance_scale * classifier_grad

            # 去噪
            x = self._denoise_step(x, guided_noise_pred, t)

        return x

    def _denoise_step(self, x: torch.Tensor, noise_pred: torch.Tensor, t: torch.Tensor) -> torch.Tensor:
        """
        去噪步骤
        """
        # 简化的去噪步骤
        # 实际实现应该使用 DDPM 或 DDIM 的去噪步骤
        return x - (t / 1000) * noise_pred
```

**来源**：Dhariwal & Nichol, 2021

### 5.2.3 Classifier Guidance 的优缺点

**优点**：
1. **灵活性高**：可以使用任何预训练的分类器
2. **引导可控**：通过引导强度参数控制引导程度

**缺点**：
1. **需要额外训练**：需要训练分类器，增加训练成本
2. **兼容性问题**：分类器可能与扩散模型不兼容
3. **梯度不稳定**：分类器的梯度可能不稳定

---

## 5.3 Classifier-Free Guidance (CFG)

### 5.3.1 CFG 的核心思想

**Classifier-Free Guidance（无分类器引导，CFG）**是一种不需要外部分类器的引导方法，由 Ho & Salimans 于 2022 年提出。

**核心思想**：
1. **联合训练**：同时训练条件模型和无条件模型
2. **混合预测**：在采样时混合条件模型和无条件模型的预测
3. **无额外模型**：不需要额外的分类器，简化流程

**数学表达**：
\[ \epsilon_{\text{guided}} = \epsilon_{\text{cond}} + w \cdot (\epsilon_{\text{cond}} - \epsilon_{\text{uncond}}) \]
其中 \( w \) 是引导强度参数。

**来源**：Ho & Salimans, 2022 - Classifier-Free Diffusion Guidance

> "We jointly train a conditional and an unconditional diffusion model, and combine the resulting score estimates."

### 5.3.2 CFG 的实现

**CFG 实现**：
```python
import torch
import torch.nn as nn

class ClassifierFreeGuidance:
    def __init__(self, model: nn.Module, guidance_scale: float = 7.5):
        self.model = model
        self.model.eval()
        self.guidance_scale = guidance_scale

    def cfg_sample(self, shape: tuple, condition: torch.Tensor, device: torch.Tensor, num_inference_steps: int = 50) -> torch.Tensor:
        """
        无分类器引导采样
        """
        # 初始化噪声
        x = torch.randn(shape, device=device)

        # 逐步去噪
        for i in reversed(range(0, 1000)):
            t = torch.full((shape[0],), i, device=device).long()

            # 条件预测（有条件）
            noise_cond = self.model(x, t, condition)

            # 无条件预测（条件为空）
            null_condition = torch.zeros_like(condition)
            noise_uncond = self.model(x, t, null_condition)

            # CFG 混合
            noise_guided = noise_uncond + self.guidance_scale * (noise_cond - noise_uncond)

            # 去噪
            x = self._denoise_step(x, noise_guided, t)

        return x

    def _denoise_step(self, x: torch.Tensor, noise_pred: torch.Tensor, t: torch.Tensor) -> torch.Tensor:
        """
        去噪步骤
        """
        # 简化的去噪步骤
        # 实际实现应该使用 DDPM 或 DDIM 的去噪步骤
        return x - (t / 1000) * noise_pred


class ConditionalUNet(nn.Module):
    def __init__(self, in_channels: int = 4, condition_dim: int = 768, hidden_dim: int = 320):
        super().__init__()
        self.condition_dim = condition_dim

        # 时间嵌入
        self.time_emb_dim = hidden_dim
        self.time_mlp = nn.Sequential(
            SinusoidalPosEmb(hidden_dim),
            nn.Linear(hidden_dim, hidden_dim * 4),
            nn.Mish(),
            nn.Linear(hidden_dim * 4, hidden_dim)
        )

        # 条件嵌入
        self.condition_mlp = nn.Sequential(
            nn.Linear(condition_dim, hidden_dim),
            nn.Mish(),
            nn.Linear(hidden_dim, hidden_dim)
        )

        # UNet
        self.unet = UNet(in_channels=in_channels, hidden_dim=hidden_dim)

    def forward(self, x: torch.Tensor, t: torch.Tensor, condition: torch.Tensor) -> torch.Tensor:
        """
        前向传播
        """
        # 时间嵌入
        time_emb = self.time_mlp(t)
        time_emb = time_emb.unsqueeze(-1).unsqueeze(-1)

        # 条件嵌入
        cond_emb = self.condition_mlp(condition)
        cond_emb = cond_emb.unsqueeze(-1).unsqueeze(-1)

        # 融合时间嵌入和条件嵌入
        emb = time_emb + cond_emb

        # UNet 前向传播
        return self.unet(x, t, emb)


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

**来源**：Ho & Salimans, 2022 - Classifier-Free Diffusion Guidance; APE-XML - CFG Tutorial

### 5.3.3 CFG 的优缺点

**优点**：
1. **无需额外模型**：不需要训练额外的分类器
2. **实现简单**：只需修改采样循环
3. **兼容性好**：与扩散模型天然兼容

**缺点**：
1. **计算成本高**：需要前向传播两次（条件 + 无条件）
2. **内存占用大**：需要存储中间结果

**来源**：The AI Summer - CFG Overview (2024)

---

## 5.4 文本条件扩散模型

### 5.4.1 文本条件扩散模型的核心思想

**文本条件扩散模型（Text-Conditioned Diffusion Models）**是一种根据文本描述生成图像的扩散模型。

**核心思想**：
1. **文本编码**：使用文本编码器（如 CLIP）将文本编码为向量
2. **条件融合**：将文本编码向量融入扩散过程
3. **文本引导**：通过文本信息引导生成过程

**来源**：Stable Diffusion Documentation (2024); Milvus - Text-to-Image Diffusion (2024)

> "In Stable Diffusion, the text prompt is first encoded into a latent vector via a CLIP text encoder."

### 5.4.2 Stable Diffusion 的文本条件

**Stable Diffusion 的文本条件**：
```python
import torch
import torch.nn as nn
from transformers import CLIPTextModel, CLIPTokenizer

class TextConditionedDiffusion(nn.Module):
    def __init__(self, in_channels: int = 4, hidden_dim: int = 320, text_dim: int = 768):
        super().__init__()
        self.text_dim = text_dim

        # CLIP 文本编码器
        self.clip_text_model = CLIPTextModel.from_pretrained("openai/clip-vit-base-patch32")
        self.clip_tokenizer = CLIPTokenizer.from_pretrained("openai/clip-vit-base-patch32")

        # 文本嵌入投影
        self.text_mlp = nn.Sequential(
            nn.Linear(text_dim, hidden_dim),
            nn.Mish(),
            nn.Linear(hidden_dim, hidden_dim)
        )

        # 扩散模型 UNet
        self.unet = UNet(in_channels=in_channels, hidden_dim=hidden_dim)

    def encode_text(self, text: str) -> torch.Tensor:
        """
        编码文本
        """
        # Tokenize 文本
        tokens = self.clip_tokenizer(
            text,
            padding="max_length",
            truncation=True,
            max_length=77,
            return_tensors="pt"
        )

        # 编码文本
        text_features = self.clip_text_model(**tokens).last_hidden_state

        # 投影到模型维度
        text_emb = self.text_mlp(text_features)

        return text_emb

    def forward(self, x: torch.Tensor, t: torch.Tensor, text: str) -> torch.Tensor:
        """
        前向传播
        """
        # 编码文本
        text_emb = self.encode_text(text)

        # 时间嵌入
        time_emb = self.time_mlp(t)
        time_emb = time_emb.unsqueeze(-1).unsqueeze(-1)

        # 融合时间嵌入和文本嵌入
        emb = time_emb + text_emb.unsqueeze(-1).unsqueeze(-1)

        # UNet 前向传播
        return self.unet(x, t, emb)


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

**来源**：Milvus - Text-to-Image Diffusion (2024); Stable Diffusion Documentation (2024)

### 5.4.3 文本条件扩散模型的应用

**应用场景**：
- **文本到图像生成**：Stable Diffusion、DALL-E、Midjourney
- **图像编辑**：通过文本描述编辑图像
- **风格迁移**：通过文本描述指定风格

---

## 5.5 图像条件扩散模型

### 5.5.1 图像条件扩散模型的核心思想

**图像条件扩散模型（Image-Conditioned Diffusion Models）**是一种根据输入图像生成新图像的扩散模型。

**核心思想**：
1. **图像编码**：将输入图像编码为特征向量
2. **条件融合**：将图像特征融入扩散过程
3. **图像引导**：通过图像信息引导生成过程

**应用场景**：
- **图像修复（Inpainting）**：修复图像的缺失部分
- **图像编辑（Image Editing）**：编辑图像的特定区域
- **风格迁移（Style Transfer）**：将一张图像的风格应用到另一张图像

**来源**：Zhang et al., 2023 - Adding Conditional Control to Text-to-Image Diffusion Models

### 5.5.2 图像条件扩散模型的实现

**图像条件扩散模型**：
```python
import torch
import torch.nn as nn

class ImageConditionedDiffusion(nn.Module):
    def __init__(self, in_channels: int = 4, condition_channels: int = 3, hidden_dim: int = 320):
        super().__init__()
        self.condition_channels = condition_channels

        # 图像编码器
        self.image_encoder = nn.Sequential(
            nn.Conv2d(condition_channels, 64, kernel_size=4, stride=2, padding=1),
            nn.Mish(),
            nn.Conv2d(64, 128, kernel_size=4, stride=2, padding=1),
            nn.Mish(),
            nn.Conv2d(128, 256, kernel_size=4, stride=2, padding=1),
            nn.Mish(),
            nn.AdaptiveAvgPool2d((1, 1))
        )

        # 图像嵌入投影
        self.image_mlp = nn.Sequential(
            nn.Linear(256, hidden_dim),
            nn.Mish(),
            nn.Linear(hidden_dim, hidden_dim)
        )

        # 时间嵌入
        self.time_emb_dim = hidden_dim
        self.time_mlp = nn.Sequential(
            SinusoidalPosEmb(hidden_dim),
            nn.Linear(hidden_dim, hidden_dim * 4),
            nn.Mish(),
            nn.Linear(hidden_dim * 4, hidden_dim)
        )

        # UNet
        self.unet = UNet(in_channels=in_channels, hidden_dim=hidden_dim)

    def encode_image(self, image: torch.Tensor) -> torch.Tensor:
        """
        编码图像
        """
        image_features = self.image_encoder(image)
        image_emb = self.image_mlp(image_features.squeeze(-1).squeeze(-1))
        return image_emb

    def forward(self, x: torch.Tensor, t: torch.Tensor, condition_image: torch.Tensor) -> torch.Tensor:
        """
        前向传播
        """
        # 编码条件图像
        image_emb = self.encode_image(condition_image)

        # 时间嵌入
        time_emb = self.time_mlp(t)
        time_emb = time_emb.unsqueeze(-1).unsqueeze(-1)

        # 融合时间嵌入和图像嵌入
        emb = time_emb + image_emb.unsqueeze(-1).unsqueeze(-1)

        # UNet 前向传播
        return self.unet(x, t, emb)


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

**来源**：Zhang et al., 2023 - Adding Conditional Control to Text-to-Image Diffusion Models

### 5.5.3 图像条件扩散模型的应用

**应用场景**：
- **图像修复**：修复照片的缺失部分
- **图像编辑**：编辑照片的特定区域
- **图像超分辨率**：提高图像分辨率

---

## 5.6 条件扩散模型对比

### 5.6.1 性能对比

**对比表**：

| 方法 | 额外模型 | 计算成本 | 实现难度 | 引导强度可控 | 应用场景 |
|------|----------|----------|----------|------------|----------|
| **Classifier Guidance** | 需要 | 高 | 高 | 是 | 类别条件生成 |
| **Classifier-Free Guidance** | 不需要 | 中等 | 低 | 是 | 多条件生成 |
| **文本条件扩散模型** | 需要（CLIP） | 中等 | 中等 | 是 | 文本到图像生成 |
| **图像条件扩散模型** | 不需要 | 中等 | 中等 | 是 | 图像修复、编辑 |

**来源**：Ho & Salimans, 2022; The AI Summer - CFG Overview (2024)

### 5.6.2 适用场景对比

**按条件类型分类**：
1. **类别条件**：Classifier Guidance、CFG
2. **文本条件**：Stable Diffusion、DALL-E
3. **图像条件**：图像修复、图像编辑

**按应用场景分类**：
1. **文本到图像生成**：文本条件扩散模型
2. **图像到图像生成**：图像条件扩散模型
3. **类别条件生成**：Classifier Guidance、CFG

---

## 结语

本章介绍了条件扩散模型，包括 Classifier Guidance、Classifier-Free Guidance（CFG）、文本条件扩散模型和图像条件扩散模型。条件扩散模型通过融入条件信息（类别、文本、图像）实现了可控的生成。

我们详细介绍了各种条件扩散模型的核心思想、实现和应用场景，并对它们的性能和适用场景进行了对比。读者可以根据应用场景选择合适的条件扩散模型。

---

**参考文献**：

1. Ho & Salimans - Classifier-Free Diffusion Guidance (2022)
   - 论文链接：https://arxiv.org/abs/2207.12598
   - 重要性：CFG 的开山之作，实现了无需分类器的引导

2. Dhariwal & Nichol - Improved Denoising Diffusion Probabilistic Models (2021)
   - 论文链接：https://arxiv.org/abs/2102.09672
   - 重要性：Classifier Guidance 的提出

3. Zhang et al. - Adding Conditional Control to Text-to-Image Diffusion Models (2023)
   - 论文链接：https://openaccess.thecvf.com/content/ICCV2023/papers/Zhang_Adding_Conditional_Control_to_Text-to-Image_Diffusion_Models_ICCV_2023_paper.pdf
   - 重要性：图像条件扩散模型的详细实现

4. The AI Summer - Classifier-Free Guidance Overview (2024)
   - 链接：https://theaisummer.com/classifier-free-guidance/
   - 重要性：CFG 的详细教程

5. Milvus - Text-to-Image Diffusion (2024)
   - 链接：https://milvus.io/ai-quick-reference/how-do-you-condition-diffusion-models-for-texttoimage-generation
   - 重要性：文本条件扩散模型的详细解释

6. Stable Diffusion Documentation (2024)
   - 链接：https://stability.ai/docs
   - 重要性：Stable Diffusion 的官方文档

---

**章节版本**：v1.0
**最后更新**：2026-03-19
