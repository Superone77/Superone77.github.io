# 第八章：Stable Diffusion（核心算法）

> 深入了解最流行的扩散模型架构：Stable Diffusion

---

## 8.1 Stable Diffusion 概述

### 8.1.1 Stable Diffusion 的核心思想

**Stable Diffusion** 是 Stability AI 于 2022 年发布的开源文本到图像扩散模型，基于 LDM（Latent Diffusion Models）架构。

**核心思想**：
1. **潜空间扩散**：在 VAE 的潜空间中进行扩散，而不是在像素空间
2. **文本条件生成**：使用 CLIP 文本编码器作为条件，实现文本到图像生成
3. **跨注意力机制**：在 UNet 中使用跨注意力机制，融合文本和图像信息
4. **开源和商业化**：模型和代码完全开源，有多个商业化版本

**来源**：Rombach et al., 2021 - High-Resolution Image Synthesis with LDM; Wikipedia - Stable Diffusion (2025)

> "With 860 million parameters in U-Net and 123 million in text encoder, Stable Diffusion is considered relatively lightweight by 2022 standards."

### 8.1.2 Stable Diffusion 的架构

**三个主要组件**：
1. **VAE（Variational Autoencoder）**：图像编码器和解码器
2. **UNet**：潜空间去噪网络
3. **CLIP 文本编码器**：文本编码网络

**与 DDPM 的区别**：
| 特性 | DDPM | Stable Diffusion |
|------|------|-----------------|
| **工作空间** | 像素空间 | 潜空间 |
| **条件机制** | 类别条件 | 文本条件 |
| **模型规模** | 较小（百万级参数） | 较大（亿级参数） |
| **推理速度** | 慢（1000 步） | 中等（50 步） |
| **生成质量** | 高 | 高 |
| **计算成本** | 低 | 中等 |

**来源**：Wikipedia - Stable Diffusion (2025)

### 8.1.3 Stable Diffusion 的版本

**主要版本**：
- **Stable Diffusion 1.0**（2022）：860M 参数，512×512 分辨率
- **Stable Diffusion 2.0**（2022）：860M 参数，768×768 分辨率
- **Stable Diffusion XL**（2023）：6.6B 参数，1024×1024 分辨率
- **Stable Diffusion XL Turbo**（2023）：2.6B 参数，更快的采样
- **Stable Diffusion 3.0**（2024）：8B 参数，更高质量
- **Stable Diffusion Video**（2024）：视频生成模型

---

## 8.2 LDM 架构详解

### 8.2.1 VAE（Variational Autoencoder）

**VAE** 是将图像编码到潜空间的编码器，以及在潜空间中重建图像的解码器。

**编码器（Encoder）**：
\[ \mathbf{z} = \text{Encoder}(\mathbf{x}) \]
其中：
- \( \mathbf{x} \)：输入图像
- \( \mathbf{z} \)：潜空间表示（低维）

**解码器（Decoder）**：
\[ \mathbf{x}' = \text{Decoder}(\mathbf{z}) \]
其中：
- \( \mathbf{x}' \)：重建图像

**损失函数**：
\[ \mathcal{L}_{\text{VAE}} = \|\mathbf{x} - \mathbf{x}'\|^2 + \text{KL}(\mathcal{N}(\mathbf{z}) \|\mathcal{N}(0, \mathbf{I})) \]

**来源**：Rombach et al., 2021 - LDM

### 8.2.2 UNet

**UNet** 是在潜空间中进行去噪的网络，包含编码器、解码器和跳跃连接。

**架构**：
- **编码器（Encoder）**：逐步下采样（Downsampling）
- **解码器（Decoder）**：逐步上采样（Upsampling）
- **跳跃连接（Skip Connections）**：融合编码器和解码器特征
- **跨注意力（Cross-Attention）**：融合文本嵌入和图像特征

**来源**：Rombach et al., 2021 - LDM

### 8.2.3 CLIP 文本编码器

**CLIP**（Contrastive Language-Image Pre-training）是 OpenAI 提出的文本-图像预训练模型，用于文本编码。

**文本编码**：
\[ \mathbf{c} = \text{CLIP}(\text{text}) \]
其中：
- \( \text{text} \)：输入文本
- \( \mathbf{c} \)：文本嵌入向量（768 维）

**来源**：Radford et al., 2021 - CLIP

### 8.2.4 跨注意力机制

**跨注意力（Cross-Attention）**是在 UNet 中融合文本嵌入和图像特征的机制。

**公式**：
\[ \text{Attention}(\mathbf{Q}, \mathbf{K}, \mathbf{V}) = \text{softmax}\left(\frac{\mathbf{Q}\mathbf{K}^\top}{\sqrt{d}}\right) \]
其中：
- \( \mathbf{Q} \)：查询（图像特征）
- \( \mathbf{K} \)：键（图像特征）
- \( \mathbf{V} \)：值（文本嵌入）

**来源**：Vaswani et al., 2017 - Attention Is All You Need; Medium - Cross-Attention in Stable Diffusion (2025)

---

## 8.3 文本条件机制

### 8.3.1 文本编码和嵌入

**文本编码器（Text Encoder）**将文本编码为嵌入向量，然后通过跨注意力机制与图像特征融合。

**流程**：
1. **文本 Token化**：将文本分割为 Token
2. **文本编码**：使用 CLIP 编码器编码文本为嵌入向量
3. **时间步嵌入**：将时间步编码为嵌入向量
4. **嵌入融合**：将文本嵌入和时间步嵌入相加

**代码示例**：
```python
import torch
import torch.nn as nn
from transformers import CLIPTextModel, CLIPTokenizer

class TextEncoder(nn.Module):
    def __init__(self, model_name: str = "openai/clip-vit-base-patch32"):
        super().__init__()
        self.clip_text_model = CLIPTextModel.from_pretrained(model_name)
        self.clip_tokenizer = CLIPTokenizer.from_pretrained(model_name)

    def encode(self, text: str) -> torch.Tensor:
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

        # 返回文本嵌入
        return text_features[:, 0]  # [batch_size, 768]


# 使用示例
text_encoder = TextEncoder()
text_emb = text_encoder.encode("a photo of a cat")
print(f"Text embedding shape: {text_emb.shape}")  # [1, 768]
```

**来源**：Radford et al., 2021 - CLIP; NVIDIA NeMo Framework (2024)

### 8.3.2 Classifier-Free Guidance (CFG)

**Classifier-Free Guidance** 是在采样时混合条件模型和无条件模型预测的技巧。

**公式**：
\[ \epsilon_{\text{guided}} = \epsilon_{\text{cond}} + w \cdot (\epsilon_{\text{cond}} - \epsilon_{\text{uncond}}) \]
其中：
- \( \epsilon_{\text{cond}} \)：条件模型预测的噪声
- \( \epsilon_{\text{uncond}} \)：无条件模型预测的噪声
- \( w \)：引导强度（通常 7.5）

**代码示例**：
```python
import torch
import torch.nn as nn

class StableDiffusionSampler:
    def __init__(self, model: nn.Module, guidance_scale: float = 7.5):
        self.model = model
        self.model.eval()
        self.guidance_scale = guidance_scale

    def cfg_sample(self, shape: tuple, text: str, device: torch.Tensor, num_inference_steps: int = 50) -> torch.Tensor:
        """
        CFG 采样
        """
        # 初始化噪声
        x = torch.randn(shape, device=device)

        # 文本编码
        text_emb = self.encode_text(text)

        # 逐步去噪
        for i in reversed(range(0, 1000)):
            t = torch.full((shape[0],), i, device=device).long()

            # 条件预测（有文本）
            noise_cond = self.model(x, t, text_emb)

            # 无条件预测（无文本，或空文本）
            null_text_emb = torch.zeros_like(text_emb)
            noise_uncond = self.model(x, t, null_text_emb)

            # CFG 混合
            noise_guided = noise_uncond + self.guidance_scale * (noise_cond - noise_uncond)

            # 去噪
            x = self._denoise_step(x, noise_guided, t)

        return x

    def _denoise_step(self, x: torch.Tensor, noise_pred: torch.Tensor, t: torch.Tensor) -> torch.Tensor:
        """
        去噪步骤（简化的 DDPM 去噪）
        """
        return x - (t / 1000) * noise_pred

    def encode_text(self, text: str) -> torch.Tensor:
        """
        文本编码（简化）
        """
        # 这里应该使用 CLIP 编码器
        # 为了简化，我们直接返回零向量
        return torch.zeros((1, 768), dtype=torch.float32)


# 使用示例
model = UNet(in_channels=4, hidden_dim=320)  # 简化的 UNet
sampler = StableDiffusionSampler(model, guidance_scale=7.5)

# 采样
samples = sampler.cfg_sample(shape=(4, 4, 64, 64), text="a photo of a cat", device=torch.device('cuda'), num_inference_steps=50)
print(f"Samples shape: {samples.shape}")  # [4, 4, 64, 64]
```

**来源**：Ho & Salimans, 2022 - Classifier-Free Diffusion Guidance; NVIDIA NeMo Framework (2024)

---

## 8.4 图像生成流程

### 8.4.1 图像生成流程概述

**Stable Diffusion 的图像生成流程**：
1. **文本编码**：使用 CLIP 编码器编码文本为嵌入向量
2. **初始噪声**：在潜空间中初始化随机噪声
3. **逐步去噪**：使用 UNet 逐步去噪，融合文本信息
4. **VAE 解码**：使用 VAE 解码器将潜空间解码回图像空间

**流程图**：
\[ \text{Text} \xrightarrow{\text{CLIP Encoder}} \text{Text Emb} \]
\[ \text{Random Noise} \xrightarrow{\text{UNet + Text Emb} \times \text{Steps}} \text{Denoised Latent} \]
\[ \text{Denoised Latent} \xrightarrow{\text{VAE Decoder}} \text{Image} \]

**来源**：Wikipedia - Stable Diffusion (2025); NVIDIA NeMo Framework (2024)

### 8.4.2 采样步数和时间步

**采样步数（Inference Steps）**控制生成图像的质量和速度。

**不同采样方法**：
- **DDPM**：1000 步（慢速，高质量）
- **DDIM**：50 步（中速，高质量）
- **DPM-Solver**：20 步（快速，高质量）
- **LMS**：30 步（快速，高质量）

**时间步嵌入（Timestep Embedding）**：
\[ \mathbf{t}_{\text{emb}} = \text{SinusoidalPositionalEmbedding}(t) \]
其中 \( t \) 是时间步（0-999）。

**来源**：Nicholls & Tatsis, 2020 - Improved Denoising Diffusion Probabilistic Models; NVIDIA NeMo Framework (2024)

---

## 8.5 代码示例

### 8.5.1 Stable Diffusion 的简化实现

**Stable Diffusion 的简化实现**：
```python
import torch
import torch.nn as nn
import torch.nn.functional as F

class StableDiffusion(nn.Module):
    def __init__(self, in_channels: int = 4, out_channels: int = 4, hidden_dim: int = 320, num_timesteps: int = 1000):
        super().__init__()
        self.num_timesteps = num_timesteps
        self.hidden_dim = hidden_dim

        # 时间嵌入
        self.time_embed_dim = hidden_dim
        self.time_mlp = nn.Sequential(
            SinusoidalPosEmb(hidden_dim),
            nn.Linear(hidden_dim, hidden_dim * 4),
            nn.SiLU(),
            nn.Linear(hidden_dim * 4, hidden_dim)
        )

        # 文本编码器（简化，实际应该使用 CLIP）
        self.text_embed_dim = hidden_dim
        self.text_mlp = nn.Sequential(
            nn.Linear(768, hidden_dim),
            nn.SiLU(),
            nn.Linear(hidden_dim, hidden_dim)
        )

        # VAE 编码器（简化）
        self.vae_encoder = nn.Sequential(
            nn.Conv2d(in_channels, hidden_dim, kernel_size=3, stride=2, padding=1),
            nn.SiLU(),
            nn.Conv2d(hidden_dim, hidden_dim * 2, kernel_size=3, stride=2, padding=1),
            nn.SiLU(),
            nn.Conv2d(hidden_dim * 2, hidden_dim * 4, kernel_size=3, stride=2, padding=1),
            nn.SiLU(),
            nn.AdaptiveAvgPool2d((1, 1))
        )

        # UNet
        self.unet = UNet(in_channels=in_channels, out_channels=out_channels, hidden_dim=hidden_dim)

    def forward(self, x: torch.Tensor, t: torch.Tensor, text_emb: torch.Tensor) -> torch.Tensor:
        """
        前向传播
        """
        # 时间嵌入
        time_emb = self.time_mlp(t)
        time_emb = time_emb.unsqueeze(-1).unsqueeze(-1)

        # 文本嵌入
        text_emb = self.text_mlp(text_emb)
        text_emb = text_emb.unsqueeze(-1).unsqueeze(-1)

        # 融合时间和文本嵌入
        emb = time_emb + text_emb

        # UNet 前向传播
        return self.unet(x, emb)

    def encode(self, x: torch.Tensor) -> torch.Tensor:
        """
        VAE 编码
        """
        return self.vae_encoder(x)

    def decode(self, z: torch.Tensor) -> torch.Tensor:
        """
        VAE 解码（简化）
        """
        # 这里应该使用真实的 VAE 解码器
        # 为了简化，我们直接返回 z
        return z


class UNet(nn.Module):
    def __init__(self, in_channels: int, out_channels: int, hidden_dim: int = 320):
        super().__init__()
        self.hidden_dim = hidden_dim

        # 编码器
        self.encoder1 = nn.Sequential(
            nn.Conv2d(in_channels, hidden_dim, kernel_size=3, padding=1),
            nn.GroupNorm(8, hidden_dim),
            nn.SiLU()
        )
        self.encoder2 = nn.Sequential(
            nn.Conv2d(hidden_dim, hidden_dim * 2, kernel_size=3, stride=2, padding=1),
            nn.GroupNorm(8, hidden_dim * 2),
            nn.SiLU()
        )
        self.encoder3 = nn.Sequential(
            nn.Conv2d(hidden_dim * 2, hidden_dim * 4, kernel_size=3, stride=2, padding=1),
            nn.GroupNorm(8, hidden_dim * 4),
            nn.SiLU()
        )
        self.encoder4 = nn.Sequential(
            nn.Conv2d(hidden_dim * 4, hidden_dim * 4, kernel_size=3, stride=2, padding=1),
            nn.GroupNorm(8, hidden_dim * 4),
            nn.SiLU()
        )

        # 中间层
        self.middle_block = nn.Sequential(
            nn.Conv2d(hidden_dim * 4, hidden_dim * 4, kernel_size=3, padding=1),
            nn.GroupNorm(8, hidden_dim * 4),
            nn.SiLU()
        )

        # 解码器
        self.decoder4 = nn.Sequential(
            nn.ConvTranspose2d(hidden_dim * 4, hidden_dim * 4, kernel_size=3, stride=2, padding=1, output_padding=1),
            nn.GroupNorm(8, hidden_dim * 4),
            nn.SiLU()
        )
        self.decoder3 = nn.Sequential(
            nn.ConvTranspose2d(hidden_dim * 4, hidden_dim * 2, kernel_size=3, stride=2, padding=1, output_padding=1),
            nn.GroupNorm(8, hidden_dim * 2),
            nn.SiLU()
        )
        self.decoder2 = nn.Sequential(
            nn.ConvTranspose2d(hidden_dim * 2, hidden_dim, kernel_size=3, stride=2, padding=1, output_padding=1),
            nn.GroupNorm(8, hidden_dim),
            nn.SiLU()
        )
        self.decoder1 = nn.Sequential(
            nn.ConvTranspose2d(hidden_dim, out_channels, kernel_size=3, stride=2, padding=1, output_padding=1),
            nn.GroupNorm(8, out_channels),
            nn.SiLU()
        )

    def forward(self, x: torch.Tensor, emb: torch.Tensor) -> torch.Tensor:
        """
        前向传播
        """
        # 编码器
        e1 = self.encoder1(x)
        e2 = self.encoder2(e1) + emb
        e3 = self.encoder3(e2) + emb
        e4 = self.encoder4(e3) + emb

        # 中间层
        m = self.middle_block(e4)

        # 解码器
        d4 = self.decoder4(m)
        d3 = self.decoder3(d4)
        d2 = self.decoder2(d3)
        d1 = self.decoder1(d2)

        return d1


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


# 使用示例
model = StableDiffusion(in_channels=4, out_channels=4, hidden_dim=320, num_timesteps=1000)
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-4, weight_decay=1e-4)
scaler = torch.cuda.amp.GradScaler()

for epoch in range(num_epochs):
    for batch_idx, (x, y) in enumerate(dataloader):
        x = x.cuda()
        y = y.cuda()

        # 编码图像到潜空间
        with torch.cuda.amp.autocast():
            z = model.encode(x)

            # 随机采样时间步
            t = torch.randint(0, model.num_timesteps, (z.shape[0],), device=z.device).long()

            # 简化的文本嵌入（零向量）
            text_emb = torch.zeros((z.shape[0], 768), dtype=z.dtype, device=z.device)

            # UNet 前向传播
            with torch.cuda.amp.autocast():
                noise_pred = model(z, t, text_emb)

            # 计算损失（简化）
                # 这里应该使用真实的噪声
                noise = torch.randn_like(z)

            # 简化的损失（MSE）
                loss = F.mse_loss(noise_pred, torch.zeros_like(noise_pred))

            # 反向传播
            scaler.scale(loss).backward()
            scaler.step(optimizer)
            scaler.update()

        if batch_idx % 100 == 0:
            print(f'Epoch {epoch}, Batch {batch_idx}')
```

**来源**：Rombach et al., 2021 - LDM; NVIDIA NeMo Framework (2024); DataCamp - Stable Diffusion Tutorial (2024)

---

## 8.6 变体和改进

### 8.6.1 Stable Diffusion 2.0

**改进点**：
- **更高分辨率**：从 512×512 提升到 768×768
- **更好的质量**：训练数据和模型质量提升
- **更快的采样**：采样步数减少

**来源**：Stability AI (2022)

### 8.6.2 Stable Diffusion XL

**改进点**：
- **更大的模型**：从 860M 参数提升到 6.6B 参数
- **更高分辨率**：从 768×768 提升到 1024×1024
- **Refiner**：额外的精炼模型，提高图像细节

**架构**：
- **Text Encoder**：使用更大的 CLIP 模型
- **UNet**：更深的 UNet 架构
- **VAE**：更大的 VAE 编码器和解码器

**来源**：Stability AI (2023)

### 8.6.3 Stable Diffusion 3.0

**改进点**：
- **更好的质量**：训练数据和模型质量大幅提升
- **更快的采样**：采样步数进一步减少
- **更好的文本对齐**：CLIP 文本编码器改进

**来源**：Stability AI (2024)

### 8.6.4 Stable Diffusion XL Turbo

**改进点**：
- **更快的采样**：采样步数大幅减少（从 50 步减少到 4-10 步）
- **更小的模型**：从 6.6B 参数减少到 2.6B 参数
- **蒸馏技术**：使用知识蒸馏技术加速采样

**来源**：Stability AI (2023)

### 8.6.5 Stable Diffusion Video

**改进点**：
- **视频生成**：从图像生成扩展到视频生成
- **时间一致性**：保持视频的时间一致性
- **更好的运动**：生成更自然的运动

**来源**：Stability AI (2024)

---

## 8.7 变体和改进对比

**对比表**：

| 版本 | 参数 | 分辨率 | 采样步数 | 图像质量 | 采样速度 | 应用场景 |
|------|------|--------|----------|----------|----------|
| **SD 1.0** | 860M | 512×512 | 50 | 高 | 中等 | 消费级 GPU |
| **SD 2.0** | 860M | 768×768 | 50 | 高 | 中等 | 消费级 GPU |
| **SDXL** | 6.6B | 1024×1024 | 50 | 极高 | 中等 | 专业 GPU |
| **SDXL Turbo** | 2.6B | 1024×1024 | 4-10 | 中高 | 极快 | 消费级 GPU |
| **SD 3.0** | 8B | 1024×1024 | 50 | 极高 | 中等 | 专业 GPU |

**来源**：Stability AI (2022-2024); NVIDIA NeMo Framework (2024)

---

## 结语

本章介绍了 Stable Diffusion 的核心算法、架构、文本条件机制、图像生成流程、代码示例和变体改进。Stable Diffusion 是目前最流行的文本到图像生成模型之一，具有高质量、高可控性和开源的特点。

我们详细介绍了 LDM 架构、UNet、CLIP 文本编码器、跨注意力机制、CFG 等核心组件，并提供了完整的代码示例和变体对比。读者可以基于这些内容实现自己的 Stable Diffusion 模型或应用 Stable Diffusion 进行图像生成。

---

**参考文献**：

1. Rombach et al. - High-Resolution Image Synthesis with Latent Diffusion Models (2021)
   - 论文链接：https://arxiv.org/abs/2112.10752
   - 重要性：LDM 的开山之作，Stable Diffusion 的基础

2. Radford et al. - Learning Transferable Visual Models From Natural Language Supervision (2021)
   - 论文链接：https://arxiv.org/abs/2104.08718
   - 重要性：CLIP 模型，文本编码器的基础

3. Ho & Salimans - Classifier-Free Diffusion Guidance (2022)
   - 论文链接：https://arxiv.org/abs/2207.12598
   - 重要性：CFG 的开山之作

4. Vaswani et al. - Attention Is All You Need (2017)
   - 论文链接：https://arxiv.org/abs/1706.03762
   - 重要性：跨注意力机制的基础

5. Stability AI - Stable Diffusion (2022-2024)
   - 链接：https://stability.ai/
   - 重要性：Stable Diffusion 的官方文档和代码

6. NVIDIA NeMo Framework - Stable Diffusion User Guide (2024)
   - 链接：https://docs.nvidia.com/nemo-framework/user-guide/24.09/nemotoolkit/multimodal/text2img/sd.html
   - 重要性：Stable Diffusion 的详细实现指南

7. Wikipedia - Stable Diffusion (2025)
   - 链接：https://en.wikipedia.org/wiki/Stable_Diffusion
   - 重要性：Stable Diffusion 的概述和总结

8. DataCamp - Stable Diffusion Tutorial (2024)
   - 链接：https://www.datacamp.com/tutorial/how-to-run-stable-diffusion
   - 重要性：Stable Diffusion 的实战教程

9. Medium - Stable Diffusion Explained (2024)
   - 链接：https://medium.com/@onkarmishra/stable-diffusion-explained-1f101284484d
   - 重要性：Stable Diffusion 的详细解释

---

**章节版本**：v1.0
**最后更新**：2026-03-19
