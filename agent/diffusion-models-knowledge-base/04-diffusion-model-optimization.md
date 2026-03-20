# 第四章：扩散模型的优化算法（Diffusion Model Optimization）

> 从 DPM-Solver 到 Consistency Models，探索扩散模型的加速和优化技术

---

## 4.1 扩散模型优化算法概述

### 4.1.1 为什么需要优化？

**扩散模型的挑战**：
1. **采样速度慢**：传统扩散模型需要 1000-8000 步采样，推理速度慢
2. **计算成本高**：训练和推理成本高，难以部署到边缘设备
3. **内存占用大**：需要存储大量中间结果，内存占用高

**优化目标**：
1. **加速采样**：减少采样步数，从 1000 步减少到 10 步甚至 1 步
2. **降低计算成本**：减少推理时的计算量，提高效率
3. **保持质量**：在加速的同时保持生成质量

**优化方向**：
- **采样算法优化**：DPM-Solver、DDIM、Consistency Models
- **模型压缩**：Progressive Distillation、Knowledge Distillation
- **架构优化**：Latent Diffusion Models、Diffusion Transformers
- **数学优化**：Rectified Flow、Flow Matching

**来源**：DPM-Solver (2022), Consistency Models (2023), Progressive Distillation (2022)

### 4.1.2 优化算法分类

**按优化目标分类**：
1. **加速采样算法**：DPM-Solver、DDIM、Consistency Models
2. **模型压缩算法**：Progressive Distillation、Knowledge Distillation
3. **架构优化算法**：Latent Diffusion Models、Diffusion Transformers
4. **数学优化算法**：Rectified Flow、Flow Matching

**按步数分类**：
1. **多步采样（10-1000 步）**：DDPM、DPM-Solver
2. **少步采样（1-10 步）**：DDIM、Consistency Models
3. **单步采样（1 步）**：Progressive Distillation、Rectified Flow

---

## 4.2 DPM-Solver

### 4.2.1 DPM-Solver 的核心思想

**DPM-Solver** 是一种基于常微分方程（ODE）的快速采样算法，由 Lu et al. 于 2022 年提出。

**核心思想**：
1. **扩散过程即 ODE**：将扩散过程看作常微分方程（ODE）的求解
2. **精确求解线性部分**：将 ODE 的线性部分精确求解，而不是用黑盒 ODE 求解器
3. **快速收敛**：在约 10 步内收敛，比 DDPM 快 100 倍

**数学表达**：
\[ d\mathbf{x} = \mathbf{f}(\mathbf{x}, t) dt \]
其中 \( \mathbf{f}(\mathbf{x}, t) \) 是 ODE 的向量场。

**来源**：Lu et al., 2022 - DPM-Solver

> "Sampling from DPMs can be viewed alternatively as solving corresponding diffusion ordinary differential equations (ODEs)."

### 4.2.2 DPM-Solver 的实现

**DPM-Solver-v2/v3**：
```python
import torch
import torch.nn as nn

class DPMSolver:
    def __init__(self, model: nn.Module, num_timesteps: int = 1000, solver_order: int = 3):
        self.model = model
        self.model.eval()
        self.num_timesteps = num_timesteps
        self.solver_order = solver_order

    def dpm_solver_step(self, x: torch.Tensor, t: torch.Tensor, t_next: torch.Tensor) -> torch.Tensor:
        """
        DPM-Solver 单步更新
        """
        # 预测噪声
        noise_pred = self.model(x, t)

        # 计算一阶导数
        d1 = self._dpm_derivative(x, t, noise_pred)

        if self.solver_order >= 2:
            # 计算二阶导数
            noise_pred_prev = self.model(x, t - (t - t_next))
            d2 = self._dpm_derivative(x, t - (t - t_next), noise_pred_prev)

            # 二阶更新
            x_next = x + (t_next - t) * (d1 + (t_next - t) / (t - (t - (t - t_next))) * (d2 - d1))
        else:
            # 一阶更新
            x_next = x + (t_next - t) * d1

        return x_next

    def _dpm_derivative(self, x: torch.Tensor, t: torch.Tensor, noise_pred: torch.Tensor) -> torch.Tensor:
        """
        计算 DPM 的导数
        """
        alpha_t = self.alphas_cumprod[t]
        sigma_t = (1 - alpha_t).sqrt()

        return (x - sigma_t * noise_pred) / alpha_t.sqrt()

    def sample(self, shape: tuple, device: torch.device, num_inference_steps: int = 10) -> torch.Tensor:
        """
        DPM-Solver 采样
        """
        # 初始化噪声
        x = torch.randn(shape, device=device)

        # 计算时间步
        timesteps = torch.linspace(self.num_timesteps - 1, 0, num_inference_steps).long()

        # 逐步求解 ODE
        for i in range(num_inference_steps):
            t = timesteps[i].unsqueeze(0).repeat(shape[0]).to(device)
            t_next = timesteps[i + 1].unsqueeze(0).repeat(shape[0]).to(device) if i < num_inference_steps - 1 else timesteps[-1].unsqueeze(0).repeat(shape[0]).to(device)
            x = self.dpm_solver_step(x, t, t_next)

        return x
```

**来源**：Lu et al., 2022 - DPM-Solver; Lu et al., 2025 - DPM-Solver++

### 4.2.3 DPM-Solver++ 的改进

**DPM-Solver++**（2025）的改进：
1. **更快收敛**：在 5-10 步内达到 SOTA 性能
2. **更好的稳定性**：数值稳定性更好，不容易发散
3. **支持引导采样**：支持分类器自由引导（Classifier-Free Guidance）

**来源**：Lu et al., 2025 - DPM-Solver++

> "We propose a fast ODE solver for diffusion models, achieving SOTA acceleration performance especially in 5 to 10 NFEs."

### 4.2.4 DPM-Solver 的应用场景

**适用场景**：
1. **高质量图像生成**：需要高质量结果的应用
2. **中等速度要求**：可以接受 10-50 步采样
3. **研究和实验**：学术研究和实验

---

## 4.3 Consistency Models

### 4.3.1 Consistency Models 的核心思想

**Consistency Models（一致性模型）**是一种新的生成模型框架，由 Song et al. 于 2023 年提出。

**核心思想**：
1. **一致性路径**：从任意时间步到其他时间步的路径
2. **单步生成**：通过训练一致性模型，实现单步生成
3. **自一致性**：从任意时间步出发，都能收敛到相同的样本

**数学表达**：
\[ f_\theta(\mathbf{x}_t, t) = \mathbf{x}_0 \]
其中 \( f_\theta \) 是一致性模型，\( \mathbf{x}_t \) 是任意时间步的样本。

**来源**：Song et al., 2023 - Consistency Models

> "Through extensive experiments, we demonstrate that they outperform existing distillation techniques for diffusion models in one- and few-step sampling."

### 4.3.2 Consistency Models 的训练

**训练目标**：
\[ \mathcal{L}_{\text{CM}} = \mathbb{E}_{t, \mathbf{x}_t} \left\| f_\theta(\mathbf{x}_t, t) - f_\theta(\mathbf{x}_{t'}, t') \right\|^2 \]

**训练过程**：
1. 从扩散模型中采样 \( (\mathbf{x}_t, \mathbf{x}_{t'}) \) 对
2. 训练一致性模型 \( f_\theta \) 使它们映射到相同的 \( \mathbf{x}_0 \)
3. 逐步减少时间步的间隔，最终实现单步生成

**来源**：Song et al., 2023 - Consistency Models

### 4.3.3 Consistency Models 的实现

**一致性模型**：
```python
import torch
import torch.nn as nn

class ConsistencyModel(nn.Module):
    def __init__(self, in_channels: int = 3, hidden_dim: int = 128):
        super().__init__()
        self.time_emb_dim = hidden_dim

        # 时间嵌入
        self.time_mlp = nn.Sequential(
            SinusoidalPosEmb(hidden_dim),
            nn.Linear(hidden_dim, hidden_dim * 4),
            nn.Mish(),
            nn.Linear(hidden_dim * 4, hidden_dim)
        )

        # UNet 风格的网络
        self.encoder = self._make_encoder(in_channels, hidden_dim)
        self.decoder = self._make_decoder(hidden_dim, in_channels)

    def _make_encoder(self, in_channels: int, hidden_dim: int):
        return nn.ModuleList([
            nn.Sequential(
                nn.Conv2d(in_channels, hidden_dim, kernel_size=3, padding=1),
                nn.GroupNorm(8, hidden_dim),
                nn.Mish()
            ),
            nn.Sequential(
                nn.Conv2d(hidden_dim, hidden_dim * 2, kernel_size=3, padding=1),
                nn.GroupNorm(8, hidden_dim * 2),
                nn.Mish()
            )
        ])

    def _make_decoder(self, hidden_dim: int, out_channels: int):
        return nn.ModuleList([
            nn.Sequential(
                nn.Conv2d(hidden_dim * 2, hidden_dim, kernel_size=3, padding=1),
                nn.GroupNorm(8, hidden_dim),
                nn.Mish()
            ),
            nn.Sequential(
                nn.Conv2d(hidden_dim, out_channels, kernel_size=3, padding=1),
                nn.Tanh()
            )
        ])

    def forward(self, x: torch.Tensor, t: torch.Tensor) -> torch.Tensor:
        # 时间嵌入
        time_emb = self.time_mlp(t)
        time_emb = time_emb.unsqueeze(-1).unsqueeze(-1)

        # 编码
        skips = []
        for block in self.encoder:
            x = block(x) + time_emb
            skips.append(x)

        # 解码
        for i, block in enumerate(self.decoder):
            if i > 0:
                x = torch.cat([x, skips[-i]], dim=1)
            x = block(x) + time_emb

        return x

    def sample(self, shape: tuple, device: torch.Tensor) -> torch.Tensor:
        """
        单步采样
        """
        # 初始化噪声
        x = torch.randn(shape, device=device)

        # 单步生成
        t = torch.zeros((shape[0],), dtype=torch.long, device=device)
        x_0 = self.forward(x, t)

        return x_0


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

**来源**：Song et al., 2023 - Consistency Models

### 4.3.4 Consistency Models 的应用场景

**适用场景**：
1. **超快速生成**：需要 1 步生成的应用
2. **实时应用**：需要实时推理的应用
3. **边缘设备部署**：计算资源有限的环境

---

## 4.4 Progressive Distillation

### 4.4.1 Progressive Distillation 的核心思想

**Progressive Distillation（渐进式蒸馏）**是一种模型压缩技术，由 Salimans et al. 于 2022 年提出。

**核心思想**：
1. **逐步蒸馏**：将多步采样模型逐步蒸馏到少步采样模型
2. **保持质量**：在减少步数的同时保持生成质量
3. **高效训练**：蒸馏过程不需要比原始训练更多的时间

**数学表达**：
\[ \mathcal{L}_{\text{distill}} = \mathbb{E}_{\mathbf{x}_0, t} \left\| \epsilon_{\theta'}(\mathbf{x}_t, t) - \epsilon_{\theta}(\mathbf{x}_{t'}, t') \right\|^2 \]
其中 \( \theta' \) 是蒸馏后的模型，\( \theta \) 是原始模型。

**来源**：Salimans et al., 2022 - Progressive Distillation

> "We start out with (near) state-of-the-art samplers taking 1024 or 8192 steps, and are able to distill down to models taking as little as 4 steps without losing much perceptual quality."

### 4.4.2 Progressive Distillation 的过程

**蒸馏过程**：
1. **第一阶段**：从 1000 步蒸馏到 500 步
2. **第二阶段**：从 500 步蒸馏到 250 步
3. **第三阶段**：从 250 步蒸馏到 125 步
4. **第四阶段**：从 125 步蒸馏到 64 步
5. **最终阶段**：从 64 步蒸馏到 4 步

**性能**：
- CIFAR-10：4 步采样，FID 3.0
- ImageNet：8 步采样，FID 10.0

**来源**：Salimans et al., 2022 - Progressive Distillation

### 4.4.3 Progressive Distillation 的应用场景

**适用场景**：
1. **快速生成**：需要快速生成的应用
2. **有限计算资源**：计算资源有限的环境
3. **商业化应用**：需要平衡速度和质量的应用

---

## 4.5 Latent Diffusion Models

### 4.5.1 LDM 的核心思想

**Latent Diffusion Models（潜扩散模型）**是在潜空间中进行扩散的模型，由 Rombach et al. 于 2021 年提出。

**核心思想**：
1. **潜空间扩散**：在 VAE 的潜空间中进行扩散，而不是在像素空间
2. **降低计算成本**：潜空间的维度比像素空间低得多
3. **保持质量**：通过 VAE 编码器和解码器保持生成质量

**架构**：
- **VAE Encoder**：将图像编码到潜空间
- **扩散模型**：在潜空间中进行扩散
- **VAE Decoder**：将潜空间解码回图像空间

**来源**：Rombach et al., 2021 - Latent Diffusion Models

> "Our latent diffusion models (LDMs) achieve a new state of art for image inpainting and highly competitive performance on various tasks."

### 4.5.2 LDM 的实现

**Latent Diffusion Models**：
```python
import torch
import torch.nn as nn

class LatentDiffusionModel(nn.Module):
    def __init__(self, in_channels: int = 4, hidden_dim: int = 320, num_timesteps: int = 1000):
        super().__init__()
        self.num_timesteps = num_timesteps

        # VAE Encoder
        self.vae_encoder = nn.Sequential(
            nn.Conv2d(3, 128, kernel_size=3, padding=1),
            nn.GroupNorm(8, 128),
            nn.Mish(),
            nn.Conv2d(128, 256, kernel_size=3, padding=1, stride=2),
            nn.GroupNorm(8, 256),
            nn.Mish(),
            nn.Conv2d(256, 512, kernel_size=3, padding=1, stride=2),
            nn.GroupNorm(8, 512),
            nn.Mish(),
            nn.Conv2d(512, 512, kernel_size=3, padding=1, stride=2),
            nn.GroupNorm(8, 512),
            nn.Mish()
        )

        # VAE Decoder
        self.vae_decoder = nn.Sequential(
            nn.ConvTranspose2d(512, 512, kernel_size=3, stride=2, padding=1, output_padding=1),
            nn.GroupNorm(8, 512),
            nn.Mish(),
            nn.ConvTranspose2d(512, 256, kernel_size=3, stride=2, padding=1, output_padding=1),
            nn.GroupNorm(8, 256),
            nn.Mish(),
            nn.ConvTranspose2d(256, 128, kernel_size=3, stride=2, padding=1, output_padding=1),
            nn.GroupNorm(8, 128),
            nn.Mish(),
            nn.Conv2d(128, 3, kernel_size=3, padding=1),
            nn.Tanh()
        )

        # 扩散模型 UNet
        self.unet = UNet(in_channels=in_channels, hidden_dim=hidden_dim)

    def encode(self, x: torch.Tensor) -> torch.Tensor:
        """
        编码到潜空间
        """
        return self.vae_encoder(x)

    def decode(self, latent: torch.Tensor) -> torch.Tensor:
        """
        从潜空间解码
        """
        return self.vae_decoder(latent)

    def forward(self, x: torch.Tensor, t: torch.Tensor) -> torch.Tensor:
        """
        前向传播
        """
        # 编码到潜空间
        latent = self.encode(x)

        # 在潜空间中进行扩散
        noise_pred = self.unet(latent, t)

        return noise_pred

    def sample(self, shape: tuple, device: torch.Tensor, num_inference_steps: int = 50) -> torch.Tensor:
        """
        LDM 采样
        """
        # 在潜空间中初始化噪声
        latent = torch.randn(shape, device=device)

        # 逐步去噪
        for i in reversed(range(self.num_timesteps)):
            t = torch.full((shape[0],), i, device=device).long()
            noise_pred = self.unet(latent, t)
            latent = self._denoise_step(latent, noise_pred, t)

        # 解码回图像空间
        image = self.decode(latent)
        return image

    def _denoise_step(self, x: torch.Tensor, noise_pred: torch.Tensor, t: torch.Tensor) -> torch.Tensor:
        """
        去噪步骤
        """
        # 这里使用简化的去噪步骤
        # 实际实现应该使用 DDPM 或 DDIM 的去噪步骤
        return x - (t / self.num_timesteps) * noise_pred
```

**来源**：Rombach et al., 2021 - Latent Diffusion Models; GitHub - CompVis/latent-diffusion

### 4.5.3 LDM 的优势

**优势**：
1. **计算效率高**：潜空间维度低，计算成本大幅降低
2. **内存占用小**：不需要存储大量像素空间的中间结果
3. **生成质量高**：通过 VAE 保持高质量
4. **易于扩展**：易于支持高分辨率图像生成

**应用场景**：
- Stable Diffusion：基于 LDM 的文本到图像生成模型
- 高分辨率图像生成：512x512、1024x1024
- 文本到图像生成：文本条件生成

**来源**：Rombach et al., 2021 - Latent Diffusion Models

---

## 4.6 Rectified Flow

### 4.6.1 Rectified Flow 的核心思想

**Rectified Flow（矫正流）**是一种基于流匹配（Flow Matching）的生成模型框架，由 Liu et al. 于 2024 年提出。

**核心思想**：
1. **线性插值**：在数据分布和噪声分布之间进行线性插值
2. **流匹配**：学习从噪声分布到数据分布的最优传输路径
3. **单步生成**：通过矫正流实现单步生成

**数学表达**：
\[ d\mathbf{z}_t = \mathbf{v}(\mathbf{z}_t, t) dt \]
其中 \( \mathbf{v}(\mathbf{z}_t, t) \) 是速度场。

**来源**：Liu et al., 2024 - Rectified Flow

> "This realization unifies rectified flows and first-order consistency models, enabling extremely fast inference—often down to one or a few steps."

### 4.6.2 Rectified Flow 的实现

**Rectified Flow 模型**：
```python
import torch
import torch.nn as nn

class RectifiedFlowModel(nn.Module):
    def __init__(self, in_channels: int = 3, hidden_dim: int = 128):
        super().__init__()
        self.time_emb_dim = hidden_dim

        # 时间嵌入
        self.time_mlp = nn.Sequential(
            SinusoidalPosEmb(hidden_dim),
            nn.Linear(hidden_dim, hidden_dim * 4),
            nn.Mish(),
            nn.Linear(hidden_dim * 4, hidden_dim)
        )

        # UNet 风格的速度场网络
        self.velocity_net = UNet(in_channels=in_channels * 2, out_channels=in_channels * 2, hidden_dim=hidden_dim)

    def forward(self, x: torch.Tensor, x0: torch.Tensor, t: torch.Tensor) -> torch.Tensor:
        """
        预测速度场
        """
        # 时间嵌入
        time_emb = self.time_mlp(t)
        time_emb = time_emb.unsqueeze(-1).unsqueeze(-1)

        # 拼接 x 和 x0
        x_concat = torch.cat([x, x0], dim=1)

        # 预测速度场
        velocity = self.velocity_net(x_concat, t)

        return velocity

    def sample(self, shape: tuple, device: torch.Tensor, num_inference_steps: int = 1) -> torch.Tensor:
        """
        Rectified Flow 采样
        """
        # 初始化噪声
        z_t = torch.randn(shape, device=device)

        # 单步生成
        if num_inference_steps == 1:
            # 从噪声分布到数据分布
            x0_pred = self.velocity_net(z_t, torch.zeros((shape[0],), dtype=torch.long, device=device))
            return x0_pred[:, :3]
        else:
            # 多步采样（用于调试）
            dt = 1.0 / num_inference_steps
            for i in range(num_inference_steps):
                t = torch.full((shape[0],), i / num_inference_steps, device=device)
                velocity = self.velocity_net(z_t, z_t, t)
                z_t = z_t + velocity * dt
            return z_t[:, :3]


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

**来源**：Liu et al., 2024 - Rectified Flow; Text-to-Image Rectified Flow (2025)

### 4.6.3 Rectified Flow 的应用场景

**适用场景**：
1. **超快速生成**：需要 1 步生成的应用
2. **实时应用**：需要实时推理的应用
3. **文本到图像生成**：支持条件生成

---

## 4.7 优化算法对比

### 4.7.1 性能对比

**对比表**：

| 算法 | 采样步数 | FID (CIFAR-10) | FID (ImageNet) | 训练成本 | 应用场景 |
|------|----------|-----------------|----------------|----------|----------|
| **DDPM** | 1000 | 3.17 | 11.2 | 高 | 研究、高质量生成 |
| **DDIM** | 100 | 4.0 | 12.5 | 中等 | 快速生成、实时应用 |
| **DPM-Solver** | 10 | 3.5 | 11.5 | 中等 | 高质量生成、中等速度 |
| **Consistency Models** | 1 | 3.55 | 6.20 | 高 | 超快速生成、实时应用 |
| **Progressive Distillation** | 4 | 3.0 | 10.0 | 中等 | 快速生成、商业化应用 |
| **LDM** | 50 | 2.5 | 5.0 | 中等 | 高分辨率生成、文本到图像 |
| **Rectified Flow** | 1 | 3.2 | 5.5 | 高 | 超快速生成、实时应用 |

**来源**：Lu et al., 2022 - DPM-Solver; Song et al., 2023 - Consistency Models; Salimans et al., 2022 - Progressive Distillation; Rombach et al., 2021 - LDM; Liu et al., 2024 - Rectified Flow

### 4.7.2 适用场景对比

**按速度需求分类**：
1. **超快速（1 步）**：Consistency Models、Rectified Flow
2. **快速（4-10 步）**：Progressive Distillation、DPM-Solver
3. **中等（50-100 步）**：DDIM、LDM
4. **慢速（1000 步）**：DDPM

**按质量需求分类**：
1. **最高质量**：LDM、DPM-Solver
2. **高质量**：DDPM、DDIM
3. **中等质量**：Progressive Distillation、Rectified Flow
4. **低质量**：Consistency Models（单步）

---

## 结语

本章介绍了扩散模型的优化算法，包括 DPM-Solver、Consistency Models、Progressive Distillation、Latent Diffusion Models 和 Rectified Flow。这些优化算法通过不同的方法（采样算法优化、模型压缩、架构优化、数学优化）实现了扩散模型的加速和优化。

读者可以根据应用场景（速度、质量、计算资源）选择合适的优化算法。例如，需要超快速生成时可以选择 Consistency Models 或 Rectified Flow，需要高质量时可以选择 DPM-Solver 或 LDM。

---

**参考文献**：

1. Lu et al. - DPM-Solver: A Fast ODE Solver for Diffusion Probabilistic Model Sampling (2022)
   - 论文链接：https://arxiv.org/abs/2206.00927
   - 重要性：DPM-Solver 的开山之作，实现了约 10 步采样

2. Lu et al. - DPM-Solver++: Fast Solver for Guided Sampling (2025)
   - 论文链接：https://arxiv.org/abs/2211.01095
   - 重要性：DPM-Solver 的改进版本，支持引导采样

3. Song et al. - Consistency Models (2023)
   - 论文链接：https://arxiv.org/abs/2303.01469
   - 重要性：一致性模型，实现单步生成

4. Salimans et al. - Progressive Distillation for Fast Sampling (2022)
   - 论文链接：https://arxiv.org/abs/2202.00512
   - 重要性：渐进式蒸馏，将模型蒸馏到 4 步

5. Rombach et al. - High-Resolution Image Synthesis with Latent Diffusion Models (2021)
   - 论文链接：https://arxiv.org/abs/2112.10752
   - 重要性：潜扩散模型，Stable Diffusion 的基础

6. Liu et al. - Rectified Flow (2024)
   - 论文链接：https://arxiv.org/abs/2209.03003
   - 重要性：矫正流，基于流匹配的单步生成

7. GitHub - CompVis/latent-diffusion (2024)
   - 链接：https://github.com/CompVis/latent-diffusion
   - 重要性：LDM 的官方实现

---

**章节版本**：v1.0
**最后更新**：2026-03-19
