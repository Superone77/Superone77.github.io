# 附录 A：术语表

本术语表涵盖端侧大模型推理、模型压缩与蒸馏、硬件加速器、安全与隐私等领域的关键术语，帮助读者快速理解和查阅。

---

## A.1 端侧推理相关术语

### A.1.1 基础概念

**端侧推理（Edge Inference）**
指在用户设备（如手机、平板、智能音箱、车载系统）上直接进行模型推理，无需将数据发送到云端服务器。端侧推理具有低延迟、隐私保护、离线可用等优势。

**云侧推理（Cloud Inference）**
指在云端服务器上进行模型推理，用户设备只负责数据采集和结果展示。云侧推理具有算力充足、模型统一管理、复杂任务支持等优势。

**端云协同推理（Edge-Cloud Collaborative Inference）**
指在端侧设备和云端服务器之间合理分配计算任务，根据任务复杂度、网络状况、隐私要求等因素动态选择推理位置。

**推理引擎（Inference Engine）**
指负责执行模型推理的软件框架或运行时，如 TensorFlow Lite、ONNX Runtime、CoreML 等。

### A.1.2 性能指标

**首字延迟（TTFT，Time To First Token）**
指从用户输入到生成第一个 token 所需的时间，是生成式 LLM 推理的关键性能指标。TTFT 通常在 10-500ms 之间。

**生成延迟（Generation Latency）**
指生成每个 token 所需的时间，影响用户感知的响应速度。生成延迟通常在 5-50ms 之间。

**端到端延迟（End-to-End Latency）**
指从用户输入到完整输出所需的时间，包括数据采集、模型推理、结果渲染等所有环节。端到端延迟通常在 50-2000ms 之间。

**吞吐量（Throughput）**
指单位时间内处理的请求数或生成的 token 数，衡量推理系统的处理能力。吞吐量通常以 tokens/秒 或 requests/秒 为单位。

**QPS（Queries Per Second）**
指每秒处理的查询数，是衡量推理系统并发能力的指标。

### A.1.3 模型相关

**模型大小（Model Size）**
指模型参数量占用的存储空间，通常以 MB 或 GB 为单位。模型大小受数据类型影响，如 FP32 占用 4 字节/参数，INT8 占用 1 字节/参数。

**模型参数量（Parameter Count）**
指模型中可学习参数的总数，通常以 B（Billion，十亿）或 M（Million，百万）为单位。例如，7B 参数的模型有 70 亿个参数。

**上下文长度（Context Length）**
指模型能处理的最大输入序列长度，通常以 tokens 为单位。常见上下文长度包括 2048、4096、8192 等。

**模型格式（Model Format）**
指模型的存储格式，如 ONNX、TFLite、CoreML、MNN、NCNN 等。不同格式适用于不同平台和硬件。

### A.1.4 部署相关

**模型打包（Model Packaging）**
指将模型文件与应用程序打包在一起，通过应用商店分发。

**动态下载（Dynamic Download）**
指应用程序在运行时从云端下载模型文件，而非随应用打包。

**热更新（Hot Update）**
指在不重新发布应用程序的情况下，通过内嵌机制更新模型文件。

**灰度发布（Canary Release）**
指将新模型先发布给部分用户（如 1%），观察效果后再逐步扩大范围。

---

## A.2 模型压缩与蒸馏术语

### A.2.1 量化

**量化（Quantization）**
指将模型参数从高精度（如 FP32、FP16）转换为低精度（如 INT8、INT4），以减少模型大小和计算量。

**权重量化（Weight Quantization）**
指只对模型权重进行量化，保持计算精度。

**激活量化（Activation Quantization）**
指对中间激活值（如卷积层输出、全连接层输出）进行量化，以减少计算量和内存带宽。

**PTQ（Post-Training Quantization）**
指在模型训练完成后进行量化，无需重新训练模型。

**QAT（Quantization-Aware Training）**
指在模型训练过程中模拟量化操作，使模型适应量化后的精度损失。

**校准（Calibration）**
指在校准数据上运行模型，计算量化参数（scale、zero_point）的过程。

**Min-Max 校准**
指使用最小值和最大值计算量化参数的校准方法，简单但易受异常值影响。

**Entropy 校准**
指使用 KL 散度最小化原则选择量化参数的校准方法，对异常值鲁棒。

**W8A8**
指权重量化为 INT8，激活量化为 INT8 的混合精度配置。

**W4A16**
指权重量化为 INT4，激活量化为 FP16 的混合精度配置。

### A.2.2 剪枝

**剪枝（Pruning）**
指删除模型中不重要的参数或层，以减少模型大小和计算量。

**结构化剪枝（Structured Pruning）**
指删除整个通道、层或张量，减少计算量，但需要硬件支持稀疏计算。

**非结构化剪枝（Unstructured Pruning）**
指删除权重中的单个元素，可以压缩模型大小，但需要特殊的稀疏存储和计算支持。

**剪枝粒度（Pruning Granularity）**
指剪枝的精细程度，通常以稀疏度（Sparsity）表示，如 50%、75%、90%。

**Magnitude-based Pruning**
指基于权重绝对值大小进行剪枝的方法，权重越小的参数越容易被剪掉。

### A.2.3 知识蒸馏

**知识蒸馏（Knowledge Distillation）**
指将教师模型（大模型）的知识迁移到学生模型（小模型），以压缩模型大小或加速推理。

**教师模型（Teacher Model）**
指用于知识蒸馏的大模型，提供高质量的模型输出。

**学生模型（Student Model）**
指通过知识蒸馏学习的小模型，参数量通常为教师模型的 1/10 到 1/100。

**软标签（Soft Labels）**
指教师模型对各类别的概率分布，包含比硬标签更丰富的信息。

**硬标签（Hard Labels）**
指训练数据的真实标签，如 0 或 1、cat 或 dog。

**Logits 蒸馏（Logits Distillation）**
指让学生模型学习教师模型的最终输出分布的蒸馏方法。

**Feature 蒸馏（Feature Distillation）**
指让学生模型学习教师模型的中间层特征的蒸馏方法。

**Prompt-based 蒸馏**
指通过构造提示词（Prompt）让教师模型生成高质量的训练数据的蒸馏方法。

**KL 散度（Kullback-Leibler Divergence）**
指衡量两个概率分布差异的指标，广泛用于知识蒸馏的损失函数。

**温度参数（Temperature Parameter）**
指控制软标签平滑度的参数，值越大，软标签越平滑。

**权重参数（Weight Parameter）**
指平衡蒸馏损失和学生损失的参数，通常用 α 表示。

### A.2.4 大模型优化

**KV Cache**
指在生成式 LLM 推理中缓存键值对，避免重复计算历史上下文，显著提升推理速度。

**KV Cache 量化**
指将 KV Cache 从 FP16/FP32 量化为 INT8/INT4，以减少内存占用。

**投机采样（Speculative Decoding）**
指用小模型预测大模型输出，加速推理的技术。

**模型分层推理（Layer-wise Inference）**
指将模型分层，分时加载和推理，减少内存占用的技术。

**LoRA（Low-Rank Adaptation）**
指低秩适应，通过在模型中添加低秩矩阵来实现高效微调的技术。

---

## A.3 硬件加速器术语

### A.3.1 硬件类型

**NPU（Neural Processing Unit）**
指神经网络处理器，专为神经网络设计的高效加速器，支持 INT8/INT4 量化，能效比远超 CPU/GPU。

**GPU（Graphics Processing Unit）**
指图形处理器，适合 FP16/FP32 计算，支持大 batch 处理，算力强大但能效比较低。

**CPU（Central Processing Unit）**
指中央处理器，灵活但能效较低，适合控制流和轻量计算。

**TPU（Tensor Processing Unit）**
指张量处理器，Google 专为深度学习设计的硬件加速器，主要用于云端推理。

**DSP（Digital Signal Processor）**
指数字信号处理器，适用于音频、语音等信号处理任务。

### A.3.2 iOS 平台

**Neural Engine**
指 Apple 芯片中的神经网络加速器，专门用于机器学习推理，支持 INT8/FP16 计算。

**Metal**
指 Apple 的图形和计算 API，可以用于 GPU 加速推理。

**CoreML**
指 Apple 的机器学习框架，支持 CPU、GPU、Neural Engine 三种计算设备，优化性能和功耗。

**统一内存架构（Unified Memory Architecture）**
指 Apple 芯片中 CPU、GPU、Neural Engine 共享同一块内存，减少数据拷贝，提升性能。

### A.3.3 Android 平台

**NNAPI（Android Neural Networks API）**
指 Android 的神经网络 API，提供硬件抽象层，支持 NPU、GPU、CPU 的统一调用。

**Vendor NPU**
指各厂商自研的 NPU，如高通 Hexagon、联发科 APU、海思昇腾等。

**TFLite（TensorFlow Lite）**
指 Google 的轻量级推理框架，支持 Android、iOS 等平台，提供 XNNPU、GPU、Delegate 等多种硬件后端。

**MNN**
指阿里巴巴开源的端侧推理框架，针对移动端优化，支持 CPU、GPU、Vulkan、Metal、OpenCL 等多种硬件后端。

**NCNN**
指腾讯开源的端侧推理框架，针对移动端优化，支持 CPU、GPU、Vulkan、Metal 等多种硬件后端。

### A.3.4 跨平台

**ONNX Runtime**
指微软开源的跨平台推理框架，支持 CPU、GPU、NPU 等多种硬件后端，提供 Execution Provider 机制。

**OpenVINO**
指 Intel 开源的跨平台推理框架，优化 Intel CPU、GPU、VPU 等硬件。

**TensorRT**
指 NVIDIA 的推理框架，优化 NVIDIA GPU，支持 FP16、INT8 量化。

---

## A.4 安全与隐私术语

### A.4.1 模型加密

**模型加密（Model Encryption）**
指使用加密算法对模型文件进行加密，防止模型被逆向和窃取。

**对称加密（Symmetric Encryption）**
指使用相同的密钥进行加密和解密的算法，如 AES、DES。

**非对称加密（Asymmetric Encryption）**
指使用公钥加密、私钥解密的算法，如 RSA、ECC。

**混合加密（Hybrid Encryption）**
指使用对称加密加密模型文件，使用非对称加密加密对称密钥，兼顾加密速度和密钥管理安全性。

**AES-256**
指使用 256 位密钥的 AES 加密算法，是目前最常用的对称加密算法之一。

**Secure Enclave**
指 Apple 设备的安全隔区，用于存储密钥和执行安全操作。

**Keychain**
指 iOS 和 macOS 的钥匙串，用于安全存储密钥和密码。

**Android Keystore**
指 Android 的密钥存储系统，用于安全存储密钥。

### A.4.2 数据隐私

**GDPR（General Data Protection Regulation）**
指欧盟的通用数据保护条例，适用于处理欧盟公民数据的所有组织。

**CCPA（California Consumer Privacy Act）**
指加州的消费者隐私法，适用于处理加州居民数据的组织。

**HIPAA（Health Insurance Portability and Accountability Act）**
指美国的健康保险便携性和责任法案，适用于医疗健康数据的保护。

**PII（Personally Identifiable Information）**
指个人身份信息，如姓名、身份证号、电话号码、邮箱地址等。

**数据最小化（Data Minimization）**
指只收集和处理必要的数据，避免过度收集用户数据。

**被遗忘权（Right to be Forgotten）**
指用户有权要求删除自己的数据。

**数据可移植权（Data Portability）**
指用户有权获取自己的数据并转移到其他服务。

**差分隐私（Differential Privacy）**
指通过在数据中添加噪声，使得无法确定单个用户的数据是否参与了训练。

### A.4.3 安全防护

**模型水印（Model Watermarking）**
指在模型中嵌入隐形标识，用于模型版权保护。

**对抗攻击（Adversarial Attack）**
指通过精心设计的输入样本欺骗模型，使模型输出错误的预测结果。

**对抗训练（Adversarial Training）**
指在训练数据中加入对抗样本，提高模型对对抗攻击的鲁棒性。

**对抗样本（Adversarial Example）**
指通过添加微小扰动而使模型错误分类的输入样本。

**代码混淆（Code Obfuscation）**
指通过修改代码结构、重命名变量、插入垃圾代码等方式，使代码难以被理解和分析。

**逆向工程（Reverse Engineering）**
指通过分析应用或模型文件，提取模型参数、算法逻辑等敏感信息的行为。

**安全审计（Security Audit）**
指定期检查应用和数据的安全性和合规性，及时发现和修复安全问题。

**渗透测试（Penetration Testing）**
指模拟攻击者的行为，测试应用的安全漏洞。

**漏洞扫描（Vulnerability Scanning）**
指使用自动化工具扫描应用中的安全漏洞。

---

## 术语索引

| 术语 | 英文 | 章节 |
|------|------|------|
| 端侧推理 | Edge Inference | A.1.1 |
| 云侧推理 | Cloud Inference | A.1.1 |
| 端云协同推理 | Edge-Cloud Collaborative Inference | A.1.1 |
| 首字延迟 | TTFT, Time To First Token | A.1.2 |
| 量化 | Quantization | A.2.1 |
| 知识蒸馏 | Knowledge Distillation | A.2.3 |
| KV Cache | KV Cache | A.2.4 |
| NPU | Neural Processing Unit | A.3.1 |
| Neural Engine | Neural Engine | A.3.2 |
| NNAPI | Android Neural Networks API | A.3.3 |
| ONNX Runtime | ONNX Runtime | A.3.4 |
| 模型加密 | Model Encryption | A.4.1 |
| GDPR | General Data Protection Regulation | A.4.2 |
| 对抗攻击 | Adversarial Attack | A.4.3 |

---

_附录版本：v1.0_
_最后更新：2026-03-13_
