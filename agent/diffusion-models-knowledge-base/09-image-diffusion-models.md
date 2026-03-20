# 第九章：图像扩散模型（Image Diffusion Models）

> 深入了解主流图像扩散模型：DALL-E、Imagen、FLUX 等

---

## 9.1 图像扩散模型概述

### 9.1.1 图像扩散模型的定义

**图像扩散模型**是一类用于图像生成的扩散模型，通过逐步去噪从随机噪声中生成高质量图像。

**核心思想**：
1. **前向扩散**：逐步给图像添加高斯噪声，直到变成纯噪声
2. **反向去噪**：训练神经网络逐步去噪，恢复原始图像
3. **文本条件**：使用文本作为条件，实现文本到图像生成
4. **高质量生成**：生成高分辨率、高质量的图像

**来源**：Ho et al., 2020 - DDPM; Rombach et al., 2021 - LDM

### 9.1.2 图像扩散模型的应用

**图像扩散模型的应用场景**：
- **文本到图像生成**：从文本描述生成图像
- **图像编辑**：编辑现有图像（Inpainting、Outpainting）
- **图像修复**：修复损坏的图像
- **风格迁移**：将图像从一种风格转换为另一种风格
- **超分辨率**：提升图像分辨率
- **创意设计**：辅助设计师进行创意设计

**来源**：Stability AI (2022-2024); OpenAI (2022-2024)

### 9.1.3 图像扩散模型的类型

**主流图像扩散模型**：
| 模型 | 公司/组织 | 发布时间 | 特点 |
|------|---------|----------|------|
| **DALL-E 2** | OpenAI | 2022-04 | CLIP 文本编码 + 扩散模型 |
| **DALL-E 3** | OpenAI | 2023-10 | 更好的文本对齐 |
| **Imagen** | Google | 2022-05 | 级联扩散模型 + T5 文本编码器 |
| **Parti** | Google | 2022-06 | 自回归文本到图像模型 |
| **Stable Diffusion** | Stability AI | 2022-08 | 开源、可商用 |
| **FLUX** | Black Forest Labs | 2024-08 | 快速采样、高质量 |

**来源**：OpenAI (2022-2024); Google Research (2022); Black Forest Labs (2024)

### 9.1.4 图像扩散模型的发展

**发展历程**：
1. **2020 年**：DDPM 提出扩散模型
2. **2021 年**：LDM 提出潜空间扩散模型
3. **2022 年**：DALL-E 2、Imagen、Stable Diffusion 发布
4. **2023 年**：DALL-E 3、Stable Diffusion XL 发布
5. **2024 年**：FLUX、Stable Diffusion 3.0 发布
6. **2025 年**：更高效、更高质量的模型

**来源**：Ho et al. (2020); Rombach et al. (2021); OpenAI (2022-2024); Google Research (2022-2024); Stability AI (2022-2024); Black Forest Labs (2024)

---

## 9.2 DALL-E

### 9.2.1 DALL-E 1

**DALL-E 1** 是 OpenAI 于 2021 年 1 月发布的文本到图像生成模型，基于 VQGAN + Transformer 架构。

**核心思想**：
1. **VQGAN 编码器**：将图像编码为离散 Token
2. **Transformer**：使用 Transformer 生成 Token 序列
3. **文本条件**：使用 GPT-3 文本编码器编码文本
4. **VQGAN 解码器**：将 Token 序列解码为图像

**架构**：
\[ \text{Text} \xrightarrow{\text{GPT-3}} \text{Text Emb} \]
\[ \text{Text Emb} + \text{Tokens} \xrightarrow{\text{Transformer}} \text{Generated Tokens} \]
\[ \text{Generated Tokens} \xrightarrow{\text{VQGAN Decoder}} \text{Image} \]

**来源**：Ramesh et al., 2021 - Zero-Shot Text-to-Image Generation

### 9.2.2 DALL-E 2

**DALL-E 2** 是 OpenAI 于 2022 年 4 月发布的文本到图像生成模型，基于 CLIP + 扩散模型架构。

**核心思想**：
1. **CLIP 编码器**：编码文本和图像到潜空间
2. **前向扩散**：逐步添加高斯噪声
3. **反向去噪**：训练神经网络逐步去噪
4. **CLIP 文本编码**：使用 CLIP 文本编码器作为条件

**架构**：
\[ \text{Text} \xrightarrow{\text{CLIP Text Encoder}} \text{Text Emb} \]
\[ \text{Random Noise} \xrightarrow{\text{Diffusion Model} + \text{Text Emb}} \text{Denoised Image} \]

**特点**：
- **高分辨率**：支持 1024×1024 分辨率
- **高质量**：生成高质量的图像
- **文本对齐**：文本与图像对齐良好
- **多样性**：生成多样化的图像

**来源**：Ramesh et al., 2022 - Hierarchical Text-Conditional Image Generation with CLIP Latents

### 9.2.3 DALL-E 3

**DALL-E 3** 是 OpenAI 于 2023 年 10 月发布的文本到图像生成模型，基于改进的 CLIP + 扩散模型架构。

**改进点**：
1. **更好的文本对齐**：文本与图像对齐更好
2. **更高的质量**：图像质量更高
3. **更多细节**：图像细节更丰富
4. **水印**：添加 C2PA 水印

**特点**：
- **更精准的文本理解**：更好地理解复杂的文本描述
- **更丰富的细节**：图像细节更丰富
- **更高的质量**：图像质量更高
- **水印支持**：支持 C2PA 水印

**来源**：DALL-E 3 System Card (2023); OpenAI (2024)

### 9.2.4 DALL-E 的代码示例

**使用 Hugging Face Diffusers 调用 DALL-E 2/3**：
```python
from diffusers import DDPMPipeline, DDPMScheduler
import torch

# 加载 DALL-E 2 模型（使用 Hugging Face 兼容版本）
model_id = "runwayml/stable-diffusion-v1-5"  # 使用 Stable Diffusion 作为示例

# 创建管道
pipe = DDPMPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
pipe = pipe.to("cuda")

# 设置文本提示
prompt = "A photo of a cat sitting on a windowsill"

# 生成图像
images = pipe(prompt, num_inference_steps=50, guidance_scale=7.5).images

# 保存图像
images[0].save("dalle2_cat.png")
```

**来源**：Hugging Face Diffusers (2024); OpenAI API (2024)

---

## 9.3 Imagen

### 9.3.1 Imagen 概述

**Imagen** 是 Google 于 2022 年 5 月发布的文本到图像生成模型，基于级联扩散模型架构。

**核心思想**：
1. **级联扩散模型**：使用多个扩散模型逐步提升分辨率
2. **T5 文本编码器**：使用 T5 文本编码器编码文本
3. **动态分辨率**：支持多种分辨率
4. **高质量生成**：生成高质量图像

**架构**：
\[ \text{Text} \xrightarrow{\text{T5 Encoder}} \text{Text Emb} \]
\[ \text{Base Diffusion Model} \xrightarrow{\text{Text Emb}} \text{Low-Res Image} \]
\[ \text{Upsampler 1} \xrightarrow{\text{Low-Res Image} + \text{Text Emb}} \text{Mid-Res Image} \]
\[ \text{Upsampler 2} \xrightarrow{\text{Mid-Res Image} + \text{Text Emb}} \text{High-Res Image} \]

**来源**：Saharia et al., 2022 - Photorealistic Text-to-Image Diffusion Models with Deep Language Understanding

### 9.3.2 Imagen 的架构

**级联扩散模型**：
- **Base Diffusion Model**：生成 64×64 基础图像
- **Upsampler 1**：将 64×64 提升到 256×256
- **Upsampler 2**：将 256×256 提升到 1024×1024

**文本编码器**：
- **T5-XXL**：大型 T5 模型，编码文本为嵌入向量
- **文本嵌入**：768 维文本嵌入向量

**采样方法**：
- **DDPM**：基础扩散模型使用 DDPM 采样
- **DDIM**：Upsampler 使用 DDIM 采样
- **Classifier-Free Guidance**：使用 CFG 提高文本对齐

**来源**：Saharia et al., 2022 - Imagen

### 9.3.3 Imagen 的特点

**优点**：
- **高分辨率**：支持 1024×1024 分辨率
- **高质量**：生成高质量图像
- **文本对齐**：文本与图像对齐良好
- **多样性**：生成多样化图像

**缺点**：
- **模型规模大**：模型规模大，需要大量计算资源
- **推理速度慢**：推理速度较慢
- **不开源**：模型不开源，无法商用

**来源**：Google Research (2022)

---

## 9.4 Parti

### 9.4.1 Parti 概述

**Parti**（Pathways Autoregressive Text-to-Image）是 Google 于 2022 年 6 月发布的自回归文本到图像生成模型。

**核心思想**：
1. **自回归生成**：使用 Transformer 自回归生成 Token 序列
2. **VQGAN**：使用 VQGAN 将图像编码为 Token 序列
3. **路径扩展**：使用 Google 的 Pathways 架构
4. **高质量生成**：生成高质量、多样化的图像

**架构**：
\[ \text{Text} \xrightarrow{\text{T5 Encoder}} \text{Text Emb} \]
\[ \text{Text Emb} \xrightarrow{\text{Transformer}} \text{Generated Tokens} \]
\[ \text{Generated Tokens} \xrightarrow{\text{VQGAN Decoder}} \text{Image} \]

**来源**：Yu et al., 2022 - Scaling Autoregressive Models for Content-Rich Text-to-Image Generation

### 9.4.2 Parti 的架构

**自回归 Transformer**：
- **编码器**：编码文本为嵌入向量
- **解码器**：自回归生成 Token 序列
- **注意力机制**：使用多头注意力机制

**VQGAN**：
- **编码器**：将图像编码为 Token 序列
- **代码本**：离散 Token 空间
- **解码器**：将 Token 序列解码为图像

**路径扩展**：
- **分布式训练**：使用 Google 的 Pathways 架构
- **模型扩展**：支持大规模模型训练

**来源**：Yu et al., 2022 - Parti

### 9.4.3 Parti 的特点

**优点**：
- **高分辨率**：支持高分辨率图像
- **高质量**：生成高质量图像
- **文本对齐**：文本与图像对齐良好
- **多样性**：生成多样化图像

**缺点**：
- **模型规模大**：模型规模大，需要大量计算资源
- **推理速度慢**：自回归生成速度慢
- **不开源**：模型不开源，无法商用

**来源**：Google Research (2022)

---

## 9.5 FLUX

### 9.5.1 FLUX 概述

**FLUX** 是 Black Forest Labs 于 2024 年 8 月发布的文本到图像生成模型，基于改进的扩散模型架构。

**核心思想**：
1. **快速采样**：支持快速采样（4-10 步）
2. **高质量生成**：生成高质量图像
3. **开源**：模型开源，可商用
4. **多版本**：支持多个版本（Schnell、Dev、Pro）

**架构**：
- **扩散模型**：基于改进的扩散模型架构
- **文本编码器**：使用 T5 文本编码器
- **快速采样**：支持快速采样（4-10 步）

**来源**：Black Forest Labs (2024); Wikipedia - Flux (text-to-image model) (2025)

### 9.5.2 FLUX 的版本

**主要版本**：
- **FLUX.1-schnell**：快速版本，支持 4 步采样
- **FLUX.1-dev**：开发版本，支持 10 步采样
- **FLUX.1-pro**：专业版本，支持 20 步采样

**特点**：
- **快速采样**：支持 4-10 步快速采样
- **高质量**：生成高质量图像
- **开源**：模型开源，可商用
- **多样化**：生成多样化图像

**来源**：Black Forest Labs (2024); Hugging Face (2024)

### 9.5.3 FLUX 的代码示例

**使用 Hugging Face Diffusers 调用 FLUX**：
```python
from diffusers import FluxPipeline
import torch

# 加载 FLUX.1-schnell 模型
model_id = "black-forest-labs/FLUX.1-schnell"

# 创建管道
pipe = FluxPipeline.from_pretrained(model_id, torch_dtype=torch.bfloat16)
pipe.enable_model_cpu_offload()  # 节省显存

# 设置文本提示
prompt = "A photo of a cat holding a sign that says hello world"

# 生成图像（快速采样）
image = pipe(
    prompt,
    guidance_scale=0.0,
    num_inference_steps=4,
    max_sequence_length=256,
    generator=torch.Generator("cpu").manual_seed(0)
).images[0]

# 保存图像
image.save("flux_cat.png")
```

**来源**：Hugging Face (2024); Black Forest Labs (2024)

---

## 9.6 Stable Diffusion 2.0/3.0/XL

### 9.6.1 Stable Diffusion 2.0

**Stable Diffusion 2.0** 是 Stability AI 于 2022 年 11 月发布的改进版本。

**改进点**：
- **更高分辨率**：从 512×512 提升到 768×768
- **更好的质量**：图像质量提升
- **更多的模型**：提供多个版本（768、512、depth）

**来源**：Stability AI (2022)

### 9.6.2 Stable Diffusion XL (SDXL)

**Stable Diffusion XL** 是 Stability AI 于 2023 年 7 月发布的大型扩散模型。

**改进点**：
- **更大的模型**：从 860M 参数提升到 6.6B 参数
- **更高分辨率**：从 768×768 提升到 1024×1024
- **Refiner**：额外的精炼模型
- **更好的质量**：图像质量大幅提升

**架构**：
- **Base Model**：6.6B 参数的基础模型
- **Refiner**：6.6B 参数的精炼模型
- **文本编码器**：OpenCLIP 和 CLIP 双文本编码器

**来源**：Stability AI (2023)

### 9.6.3 Stable Diffusion 3.0

**Stable Diffusion 3.0** 是 Stability AI 于 2024 年 4 月发布的最新版本。

**改进点**：
- **更好的质量**：图像质量大幅提升
- **更快的采样**：采样步数减少
- **更好的文本对齐**：文本与图像对齐更好
- **更多模型**：提供多个版本（8B、4B、2B）

**特点**：
- **MMDiT 架构**：使用 MMDiT（Multimodal Diffusion Transformer）
- **更好的文本对齐**：文本与图像对齐更好
- **更高的质量**：图像质量更高
- **开源**：模型开源，可商用

**来源**：Stability AI (2024)

---

## 9.7 Midjourney

### 9.7.1 Midjourney 概述

**Midjourney** 是 Midjourney 公司于 2022 年发布的商业化文本到图像生成服务。

**特点**：
- **高质量**：生成高质量图像
- **艺术风格**：支持多种艺术风格
- **快速迭代**：快速迭代版本
- **Discord 集成**：通过 Discord 使用

**架构**：
- **模型**：基于扩散模型架构
- **文本编码器**：使用 CLIP 文本编码器
- **采样方法**：使用 DDIM 采样

**来源**：Midjourney (2022-2024)

### 9.7.2 Midjourney 的特点

**优点**：
- **高质量**：生成高质量图像
- **艺术风格**：支持多种艺术风格
- **快速迭代**：快速迭代版本
- **易用性**：通过 Discord 使用，易用性好

**缺点**：
- **闭源**：模型闭源，无法商用
- **收费**：付费服务
- **限制**：有使用限制

**来源**：Midjourney (2022-2024)

---

## 9.8 图像扩散模型对比

### 9.8.1 性能对比

**对比表**：

| 模型 | 参数 | 分辨率 | 采样步数 | 开源 | 商用 | 质量 | 速度 |
|------|------|--------|----------|------|------|------|------|
| **DALL-E 2** | 未知 | 1024×1024 | 50 | 否 | 否 | 高 | 中等 |
| **DALL-E 3** | 未知 | 1024×1024 | 50 | 否 | 否 | 极高 | 中等 |
| **Imagen** | 4.6B | 1024×1024 | 100 | 否 | 否 | 极高 | 慢 |
| **Parti** | 20B | 1024×1024 | 100 | 否 | 否 | 极高 | 慢 |
| **Stable Diffusion 1.5** | 860M | 512×512 | 50 | 是 | 是 | 高 | 中等 |
| **Stable Diffusion 2.0** | 860M | 768×768 | 50 | 是 | 是 | 高 | 中等 |
| **Stable Diffusion XL** | 6.6B | 1024×1024 | 50 | 是 | 是 | 极高 | 中等 |
| **Stable Diffusion 3.0** | 8B | 1024×1024 | 50 | 是 | 是 | 极高 | 中等 |
| **FLUX.1-schnell** | 12B | 1024×1024 | 4 | 是 | 是 | 高 | 极快 |
| **FLUX.1-dev** | 12B | 1024×1024 | 10 | 是 | 是 | 极高 | 快 |
| **Midjourney** | 未知 | 1024×1024 | 50 | 否 | 否 | 极高 | 快 |

**来源**：OpenAI (2022-2024); Google Research (2022); Stability AI (2022-2024); Black Forest Labs (2024); Midjourney (2022-2024)

### 9.8.2 选型建议

**选型建议**：
- **商用**：Stable Diffusion XL/3.0、FLUX
- **研究**：Imagen、Parti
- **快速生成**：FLUX.1-schnell
- **高质量**：DALL-E 3、Imagen、Stable Diffusion XL
- **开源**：Stable Diffusion、FLUX
- **易用性**：Midjourney（通过 Discord）

**来源**：综合多个来源的选型建议

---

## 9.9 图像扩散模型的应用案例

### 9.9.1 文本到图像生成

**代码示例（Stable Diffusion）**：
```python
from diffusers import StableDiffusionPipeline
import torch

# 加载 Stable Diffusion XL 模型
model_id = "stabilityai/stable-diffusion-xl-base-1.0"

# 创建管道
pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
pipe = pipe.to("cuda")

# 设置文本提示
prompt = "A photo of a cat sitting on a windowsill"

# 生成图像
images = pipe(prompt, num_inference_steps=50, guidance_scale=7.5).images

# 保存图像
images[0].save("text_to_image_cat.png")
```

**来源**：Hugging Face Diffusers (2024)

### 9.9.2 图像到图像生成

**代码示例（Stable Diffusion）**：
```python
from diffusers import StableDiffusionImg2ImgPipeline
from PIL import Image
import torch

# 加载 Stable Diffusion 图像到图像模型
model_id = "stabilityai/stable-diffusion-xl-refiner-1.0"

# 创建管道
pipe = StableDiffusionImg2ImgPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
pipe = pipe.to("cuda")

# 加载原始图像
image = Image.open("input.png").convert("RGB")

# 设置文本提示
prompt = "A photo of a cat sitting on a windowsill"

# 生成图像
images = pipe(prompt, image=image, strength=0.75, guidance_scale=7.5).images

# 保存图像
images[0].save("img_to_img_cat.png")
```

**来源**：Hugging Face Diffusers (2024)

### 9.9.3 图像修复

**代码示例（Stable Diffusion）**：
```python
from diffusers import StableDiffusionInpaintPipeline
from PIL import Image
import torch

# 加载 Stable Diffusion 修复模型
model_id = "stabilityai/stable-diffusion-xl-base-1.0"

# 创建管道
pipe = StableDiffusionInpaintPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
pipe = pipe.to("cuda")

# 加载原始图像和遮罩
image = Image.open("input.png").convert("RGB")
mask = Image.open("mask.png").convert("RGB")

# 设置文本提示
prompt = "A photo of a cat sitting on a windowsill"

# 生成图像
images = pipe(prompt, image=image, mask_image=mask, guidance_scale=7.5).images

# 保存图像
images[0].save("inpaint_cat.png")
```

**来源**：Hugging Face Diffusers (2024)

---

## 结语

本章介绍了图像扩散模型的主流模型和应用案例，包括 DALL-E、Imagen、Parti、Stable Diffusion、FLUX、Midjourney 等。读者可以基于这些内容选择合适的模型进行图像生成、图像编辑、图像修复等应用。

我们详细介绍了每个模型的架构、特点、优点、缺点和应用场景，并提供了完整的代码示例和应用案例。读者可以基于这些内容实现自己的图像扩散模型或应用现有模型进行图像生成。

---

**参考文献**：

1. Ramesh et al. - Zero-Shot Text-to-Image Generation (2021)
   - 论文链接：https://arxiv.org/abs/2102.12092
   - 重要性：DALL-E 1 的开山之作

2. Ramesh et al. - Hierarchical Text-Conditional Image Generation with CLIP Latents (2022)
   - 论文链接：https://arxiv.org/abs/2204.06125
   - 重要性：DALL-E 2 的开山之作

3. Saharia et al. - Photorealistic Text-to-Image Diffusion Models with Deep Language Understanding (2022)
   - 论文链接：https://arxiv.org/abs/2205.11487
   - 重要性：Imagen 的开山之作

4. Yu et al. - Scaling Autoregressive Models for Content-Rich Text-to-Image Generation (2022)
   - 论文链接：https://arxiv.org/abs/2206.10789
   - 重要性：Parti 的开山之作

5. Rombach et al. - High-Resolution Image Synthesis with Latent Diffusion Models (2021)
   - 论文链接：https://arxiv.org/abs/2112.10752
   - 重要性：LDM 的开山之作，Stable Diffusion 的基础

6. Stability AI - Stable Diffusion (2022-2024)
   - 链接：https://stability.ai/
   - 重要性：Stable Diffusion 的官方文档和代码

7. Black Forest Labs - FLUX (2024)
   - 链接：https://black-forest-labs.ai/
   - 重要性：FLUX 的官方文档和代码

8. Hugging Face Diffusers (2024)
   - 链接：https://huggingface.co/docs/diffusers
   - 重要性：扩散模型的官方库

9. Wikipedia - DALL-E (2025)
   - 链接：https://en.wikipedia.org/wiki/DALL-E
   - 重要性：DALL-E 的概述和总结

10. Wikipedia - Flux (text-to-image model) (2025)
    - 链接：https://en.wikipedia.org/wiki/Flux_(text-to-image_model)
    - 重要性：FLUX 的概述和总结

---

**章节版本**：v1.0
**最后更新**：2026-03-19
