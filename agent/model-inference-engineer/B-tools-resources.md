# 附录 B：工具与资源链接

本附录汇总了端侧大模型推理相关的官方文档、开源项目、学习资源和社区论坛，帮助读者快速找到所需的工具和资料。

---

## B.1 官方文档

### B.1.1 iOS 平台

**Apple CoreML**
- 官方文档：https://developer.apple.com/documentation/coreml
- 模型格式：https://developer.apple.com/documentation/coreml/core_ml_model
- 模型工具：https://developer.apple.com/documentation/coremltools
- 性能优化：https://developer.apple.com/documentation/coreml/performance

**Apple Metal**
- 官方文档：https://developer.apple.com/documentation/metal
- Performance Shaders：https://developer.apple.com/documentation/metalperformanceshaders
- Metal 指南：https://developer.apple.com/metal/Metal-Shading-Language-Specification.pdf

**Swift / Objective-C**
- Swift 文档：https://docs.swift.org/swift-book/
- Objective-C 文档：https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/

### B.1.2 Android 平台

**Android NNAPI**
- 官方文档：https://developer.android.com/ndk/guides/neural-networks
- API 参考：https://developer.android.com/reference/android/neuralnetworks/package-summary

**TensorFlow Lite**
- 官方文档：https://www.tensorflow.org/lite
- 指南：https://www.tensorflow.org/lite/guide
- API 参考：https://www.tensorflow.org/lite/api_docs
- 性能优化：https://www.tensorflow.org/lite/performance

**PyTorch Mobile**
- 官方文档：https://pytorch.org/mobile/home/
- 指南：https://pytorch.org/mobile/quickstart/
- API 参考：https://pytorch.org/mobile/android/

### B.1.3 跨平台框架

**ONNX Runtime**
- 官方文档：https://onnxruntime.ai/docs/
- 性能优化：https://onnxruntime.ai/docs/performance/
- API 参考：https://onnxruntime.ai/docs/api/
- Execution Providers：https://onnxruntime.ai/docs/execution-providers/

**OpenVINO**
- 官方文档：https://docs.openvino.ai/
- 指南：https://docs.openvino.ai/latest/index.html
- API 参考：https://docs.openvino.ai/latest/api/index.html

**TensorRT**
- 官方文档：https://docs.nvidia.com/deeplearning/tensorrt/
- 指南：https://docs.nvidia.com/deeplearning/tensorrt/developer-guide/
- API 参考：https://docs.nvidia.com/deeplearning/tensorrt/api/c_api/

### B.1.4 量化与压缩

**TensorFlow Model Optimization Toolkit**
- 官方文档：https://www.tensorflow.org/model_optimization
- 量化指南：https://www.tensorflow.org/model_optimization/guide/quantization
- 剪枝指南：https://www.tensorflow.org/model_optimization/guide/pruning
- 蒸馏指南：https://www.tensorflow.org/model_optimization/guide/knowledge_distillation

**PyTorch Quantization**
- 官方文档：https://pytorch.org/docs/stable/quantization.html
- 动态量化：https://pytorch.org/docs/stable/quantization.html#dynamic-quantization
- 静态量化：https://pytorch.org/docs/stable/quantization.html#static-quantization
- QAT：https://pytorch.org/docs/stable/quantization.html#quantization-aware-training

---

## B.2 开源项目

### B.2.1 推理框架

**TensorFlow Lite**
- GitHub：https://github.com/tensorflow/tflite-micro
- Demo：https://www.tensorflow.org/lite/examples

**ONNX Runtime**
- GitHub：https://github.com/microsoft/onnxruntime
- Examples：https://github.com/microsoft/onnxruntime-inference-examples

**MNN**
- GitHub：https://github.com/alibaba/MNN
- 文档：https://mnn.readthedocs.io/

**NCNN**
- GitHub：https://github.com/Tencent/ncnn
- 文档：https://github.com/Tencent/ncnn/wiki

**Paddle Lite**
- GitHub：https://github.com/PaddlePaddle/Paddle-Lite
- 文档：https://paddle-lite.readthedocs.io/

### B.2.2 模型优化

**LLM.int8()**
- GitHub：https://github.com/TimDettmers/bitsandbytes
- 论文：https://arxiv.org/abs/2208.07339

**GPTQ**
- GitHub：https://github.com/IST-DASLab/gptq
- 论文：https://arxiv.org/abs/2210.17323

**AWQ (Activation-aware Weight Quantization)**
- GitHub：https://github.com/mit-han-lab/llm-awq
- 论文：https://arxiv.org/abs/2306.00978

**LoRA**
- GitHub：https://github.com/microsoft/LoRA
- 论文：https://arxiv.org/abs/2106.09685

**QLoRA**
- GitHub：https://github.com/artidoro/qlora
- 论文：https://arxiv.org/abs/2305.14314

### B.2.3 端侧 LLM

**llama.cpp**
- GitHub：https://github.com/ggerganov/llama.cpp
- 文档：https://llama-cpp-python.readthedocs.io/

**MLC LLM**
- GitHub：https://github.com/mlc-ai/mlc-llm
- 文档：https://mlc.ai/mlc-llm/

**Whisper.cpp**
- GitHub：https://github.com/ggerganov/whisper.cpp
- 文档：https://github.com/ggerganov/whisper.cpp

---

## B.3 学习资源

### B.3.1 博客与技术文章

**Google AI Blog**
- 链接：https://ai.googleblog.com/
- 内容：Google AI 最新研究成果和技术文章

**PyTorch Blog**
- 链接：https://pytorch.org/blog/
- 内容：PyTorch 最新动态和教程

**TensorFlow Blog**
- 链接：https://blog.tensorflow.org/
- 内容：TensorFlow 最新动态和教程

**ONNX Blog**
- 链接：https://onnx.ai/blog/
- 内容：ONNX 生态最新动态

**DeepMind Blog**
- 链接：https://deepmind.com/blog
- 内容：DeepMind 最新研究成果

**FAIR Research Blog**
- 链接：https://ai.meta.com/blog/
- 内容：Meta AI 最新研究成果

### B.3.2 论文

**ArXiv**
- 链接：https://arxiv.org/
- 关键词：edge inference, model quantization, knowledge distillation, neural network pruning

**Papers with Code**
- 链接：https://paperswithcode.com/
- 功能：论文与代码一一对应，便于实践

**Google Scholar**
- 链接：https://scholar.google.com/
- 功能：学术文献搜索

**Semantic Scholar**
- 链接：https://www.semanticscholar.org/
- 功能：学术文献搜索和推荐

### B.3.3 课程与教程

**Deep Learning Specialization (Coursera)**
- 链接：https://www.coursera.org/specializations/deep-learning
- 内容：深度学习基础课程

**Fast.ai**
- 链接：https://www.fast.ai/
- 内容：深度学习实战课程

**Stanford CS224n**
- 链接：http://web.stanford.edu/class/cs224n/
- 内容：自然语言处理课程

**Stanford CS231n**
- 链接：http://cs231n.stanford.edu/
- 内容：计算机视觉课程

**MIT 6.S191**
- 链接：https://introtodeeplearning.com/
- 内容：深度学习入门课程

### B.3.4 书籍

**《Deep Learning》**
- 作者：Ian Goodfellow, Yoshua Bengio, Aaron Courville
- 链接：https://www.deeplearningbook.org/

**《Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow》**
- 作者：Aurélien Géron
- 链接：https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/

**《Designing Machine Learning Systems》**
- 作者：Chip Huyen
- 链接：https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/

---

## B.4 社区论坛

### B.4.1 问答社区

**Stack Overflow**
- 链接：https://stackoverflow.com/
- 标签：android, ios, tensorflow, pytorch, onnx, coreml

**GitHub Discussions**
- 链接：https://github.com/
- 功能：开源项目讨论和问答

**Reddit**
- 链接：https://www.reddit.com/
- 子版块：r/MachineLearning, r/AndroidDev, r/iOSProgramming

**Quora**
- 链接：https://www.quora.com/
- 功能：问答社区

### B.4.2 开发者社区

**Android Developers**
- 链接：https://developer.android.com/
- 内容：Android 官方文档和社区

**Apple Developer Forums**
- 链接：https://developer.apple.com/forums/
- 内容：Apple 官方开发者论坛

**TensorFlow Community**
- 链接：https://www.tensorflow.org/community
- 内容：TensorFlow 社区资源

**PyTorch Community**
- 链接：https://pytorch.org/community
- 内容：PyTorch 社区资源

**ONNX Community**
- 链接：https://onnx.ai/community
- 内容：ONNX 社区资源

### B.4.3 即时通讯

**Discord**
- PyTorch Discord：https://pytorch.org/discord
- TensorFlow Discord：https://discord.gg/tensorflow
- ONNX Runtime Discord：https://discord.gg/onnxruntime

**Slack**
- TensorFlow Slack：https://join.slack.com/t/tensorflow/shared_invite/
- PyTorch Slack：https://join.slack.com/t/pytorch/shared_invite/

---

## B.5 工具与实用脚本

### B.5.1 模型转换

**ONNX Export**
- 文档：https://pytorch.org/docs/stable/onnx.html
- 功能：将 PyTorch 模型导出为 ONNX 格式

**TFLite Converter**
- 文档：https://www.tensorflow.org/lite/models/convert
- 功能：将 TensorFlow 模型转换为 TFLite 格式

**CoreML Tools**
- 文档：https://coremltools.readme.io/
- 功能：将 ONNX、TFLite、PyTorch 模型转换为 CoreML 格式

**ONNXML Tools**
- GitHub：https://github.com/onnx/onnxmltools
- 功能：将 scikit-learn、XGBoost、LightGBM 模型转换为 ONNX 格式

### B.5.2 性能分析

**Android Profiler**
- 文档：https://developer.android.com/studio/profile/android-profiler
- 功能：Android 应用性能分析

**Xcode Instruments**
- 文档：https://help.apple.com/instruments/
- 功能：iOS 应用性能分析

**ONNX Runtime Profiler**
- 文档：https://onnxruntime.ai/docs/performance/tune-and-optimize/model-profiler.html
- 功能：ONNX Runtime 模型性能分析

**TFLite Profiler**
- 文档：https://www.tensorflow.org/lite/performance/measurement
- 功能：TFLite 模型性能分析

**TensorBoard**
- 文档：https://www.tensorflow.org/tensorboard
- 功能：TensorFlow 模型可视化与分析

### B.5.3 数据处理

**Pandas**
- 文档：https://pandas.pydata.org/
- 功能：数据处理和分析

**NumPy**
- 文档：https://numpy.org/doc/
- 功能：数值计算

**Scikit-learn**
- 文档：https://scikit-learn.org/
- 功能：机器学习工具包

**OpenCV**
- 文档：https://docs.opencv.org/
- 功能：计算机视觉

---

## B.6 资源索引

| 资源类型 | 资源名称 | 链接 |
|---------|---------|------|
| 官方文档 | Apple CoreML | https://developer.apple.com/documentation/coreml |
| 官方文档 | Android NNAPI | https://developer.android.com/ndk/guides/neural-networks |
| 官方文档 | TensorFlow Lite | https://www.tensorflow.org/lite |
| 官方文档 | ONNX Runtime | https://onnxruntime.ai/docs/ |
| 开源项目 | MNN | https://github.com/alibaba/MNN |
| 开源项目 | NCNN | https://github.com/Tencent/ncnn |
| 开源项目 | llama.cpp | https://github.com/ggerganov/llama.cpp |
| 学习资源 | ArXiv | https://arxiv.org/ |
| 学习资源 | Papers with Code | https://paperswithcode.com/ |
| 社区论坛 | Stack Overflow | https://stackoverflow.com/ |
| 社区论坛 | GitHub Discussions | https://github.com/ |
| 工具 | ONNX Export | https://pytorch.org/docs/stable/onnx.html |
| 工具 | TFLite Converter | https://www.tensorflow.org/lite/models/convert |
| 工具 | CoreML Tools | https://coremltools.readme.io/ |

---

_附录版本：v1.0_
_最后更新：2026-03-13_
