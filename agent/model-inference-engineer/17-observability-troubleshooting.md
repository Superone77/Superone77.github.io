# 第十一章：可观测性与排障（一）

端侧大模型推理的可观测性是保障推理服务质量和快速排障的基础。与云侧推理不同，端侧推理的资源受限、网络环境复杂、设备多样性高，因此需要设计适合端侧的日志系统和性能分析工具链。本章将介绍端侧日志与调试、性能分析工具的核心实践。

---

## 11.1 端侧日志与调试

### 11.1.1 推理日志记录规范

推理日志是端侧推理系统运行状态的最直接记录。合理的日志规范能够帮助工程师快速定位问题、分析性能瓶颈、优化推理服务。

**日志级别**：
- **Debug**：详细的调试信息，如模型加载步骤、算子执行顺序
- **Info**：关键的运行状态，如推理开始、推理完成、模型切换
- **Warning**：潜在的问题，如内存预警、网络重试
- **Error**：推理失败，如模型加载失败、推理超时、OOM

**日志内容**：
- **推理元数据**：模型版本、设备型号、系统版本、推理时间戳
- **推理输入**：输入 token 数、输入大小（已脱敏）
- **推理输出**：输出 token 数、输出长度、输出大小（已脱敏）
- **性能指标**：推理耗时、TTFT（首字延迟）、Decode 阶段耗时
- **资源使用**：内存占用、CPU 占用、GPU 占用
- **错误信息**：错误类型、错误堆栈、错误上下文

**日志格式**：
- **结构化日志**：使用 JSON 或键值对格式，便于解析和分析
- **统一时间戳**：使用 UTC 时间或设备本地时间，保持一致性
- **日志关联 ID**：为每次推理生成唯一的 trace ID，便于追踪多步推理

**示例**（JSON 格式）：
```json
{
  "timestamp": "2026-03-12T09:00:00Z",
  "level": "INFO",
  "trace_id": "abc123",
  "event": "inference_complete",
  "model_version": "v1.2.3",
  "device_model": "iPhone 15 Pro",
  "os_version": "iOS 17.2",
  "input_tokens": 128,
  "output_tokens": 256,
  "total_time_ms": 1523,
  "ttft_ms": 234,
  "decode_time_ms": 1289,
  "memory_mb": 456,
  "cpu_percent": 78
}
```

### 11.1.2 性能日志采样

端侧推理的日志量可能非常大，尤其是高频推理场景（如实时语音识别）。合理的日志采样策略能够在保留关键信息的同时，降低日志存储和传输成本。

**采样策略**：
- **固定比例采样**：按固定比例记录日志（如 1%、5%、10%）
- **时间窗口采样**：在固定时间窗口内记录部分日志（如每分钟最多 10 条）
- **随机采样**：随机选择部分推理记录日志
- **条件采样**：只在特定条件下记录日志（如耗时超过阈值）

**采样维度**：
- **推理耗时**：记录耗时最慢的 5% 或超过阈值的推理
- **错误推理**：记录所有失败的推理
- **关键场景**：记录首次推理、模型切换、灰度发布等关键场景
- **设备特征**：按设备型号或系统版本分层采样

**采样率选择**：
- **高频场景**：采样率 1%-5%，如实时语音识别
- **中频场景**：采样率 5%-10%，如智能助手
- **低频场景**：采样率 10%-20%，如离线翻译
- **关键场景**：采样率 100%，如模型热更新、灰度发布

**实现示例**：
```swift
// iOS 端侧日志采样示例
func shouldLogInference() -> Bool {
    let random = Double.random(in: 0...1)
    let samplingRate = 0.05 // 5% 采样率
    return random < samplingRate
}

func logInferenceComplete(traceId: String, duration: TimeInterval) {
    guard shouldLogInference() || duration > 2000 else { return } // 耗时超过 2s 时强制记录
    // 记录日志
    logger.info("inference_complete", [
        "trace_id": traceId,
        "duration_ms": Int(duration * 1000)
    ])
}
```

### 11.1.3 错误日志分类

错误日志分类有助于快速定位问题类型，制定针对性的解决方案。端侧推理的错误类型多样，需要系统化的分类体系。

**错误类型分类**：

**1. 模型相关错误**
- **模型加载失败**：模型文件不存在、文件损坏、格式不支持
- **模型解析失败**：算子不支持、参数不匹配、版本不兼容
- **模型切换失败**：新模型下载失败、校验失败、加载失败

**2. 资源相关错误**
- **OOM（Out of Memory）**：内存不足，无法加载模型或推理
- **存储空间不足**：磁盘空间不足，无法下载模型
- **GPU/NPU 不可用**：硬件加速器被占用或不支持

**3. 推理相关错误**
- **推理超时**：推理时间超过预设阈值
- **推理中断**：推理过程中被系统中断（如应用切到后台）
- **精度异常**：输出结果异常（如 NaN、Inf）

**4. 网络相关错误**
- **下载失败**：模型下载失败、网络中断
- **校验失败**：下载的模型文件校验失败（哈希不匹配）
- **更新失败**：模型更新失败、回滚失败

**5. 兼容性错误**
- **设备不支持**：设备型号不支持当前模型
- **系统版本过低**：系统版本不满足模型运行的最低要求
- **硬件不支持**：NPU/GPU 不支持当前模型

**错误日志格式**：
```json
{
  "timestamp": "2026-03-12T09:00:00Z",
  "level": "ERROR",
  "trace_id": "abc123",
  "event": "inference_error",
  "error_type": "OOM",
  "error_message": "Failed to allocate memory for KV cache",
  "device_model": "iPhone 12",
  "os_version": "iOS 16.0",
  "model_version": "v1.2.3",
  "stack_trace": "..."
}
```

**错误处理策略**：
- **自动重试**：网络错误、临时资源不足时自动重试
- **降级策略**：推理失败时降级使用旧模型或简化模型
- **错误上报**：关键错误上报到服务端，便于全局分析
- **用户提示**：错误影响用户体验时，给出友好提示

### 11.1.4 日志隐私脱敏

端侧推理涉及用户数据，日志记录时必须进行隐私脱敏，防止敏感信息泄露。隐私保护是端侧推理的基本原则，必须严格遵守。

**需要脱敏的信息**：
- **用户输入**：推理输入的文本内容（如用户消息、语音转文字）
- **推理输出**：推理输出的文本内容（如 AI 回复）
- **用户 ID**：用户标识符、设备 ID、会话 ID
- **敏感元数据**：地理位置、联系人、短信等

**脱敏策略**：
- **完全脱敏**：不记录任何敏感信息（推荐）
- **哈希脱敏**：使用哈希值替代原始值（适合追踪）
- **掩码脱敏**：部分遮盖敏感信息（如手机号脱敏为 `138****5678`）
- **抽样脱敏**：只记录部分敏感信息（如前 10 个 token）

**实现示例**：
```swift
// iOS 端侧日志隐私脱敏示例
func sanitizeInputText(_ text: String) -> String {
    // 方式 1：完全脱敏，不记录输入内容
    // return "[REDACTED]"

    // 方式 2：哈希脱敏，使用 SHA256 哈希值
    // return text.sha256()

    // 方式 3：长度脱敏，只记录长度
    return "[\(text.count) chars]"

    // 方式 4：抽样脱敏，只记录前 10 个字符
    // return String(text.prefix(10)) + "..."
}

func logInferenceStart(traceId: String, inputText: String) {
    logger.info("inference_start", [
        "trace_id": traceId,
        "input_text": sanitizeInputText(inputText) // 脱敏后的输入
    ])
}
```

**合规要求**：
- **GDPR**：欧盟数据保护法规，要求对用户数据进行脱敏
- **CCPA**：加州消费者隐私法，要求保护用户隐私
- **国内法规**：《个人信息保护法》等国内法规要求

**最佳实践**：
- **默认脱敏**：默认对所有敏感信息进行脱敏
- **最小化收集**：只收集必要的日志信息
- **用户同意**：敏感信息收集前获取用户同意
- **加密传输**：日志传输时使用 HTTPS 加密

---

## 11.2 性能分析工具

### 11.2.1 端侧性能分析工具链

端侧推理性能分析需要多层次的工具链，从系统级到应用级，从全局监控到细粒度剖析。合理的工具链组合能够全面分析性能瓶颈。

**iOS 性能分析工具**：

**1. Xcode Instruments**
- **Time Profiler**：分析 CPU 占用，定位热点函数
- **Allocations**：分析内存分配和释放，检测内存泄漏
- **Leaks**：检测内存泄漏
- **System Trace**：分析系统调用、线程调度、I/O 操作
- **Metal System Trace**：分析 GPU 性能，渲染管线

**2. os_log**
- **系统日志**：记录系统级日志
- **性能计数器**：记录 CPU、内存、I/O 性能数据
- **日志过滤**：支持按子系统、类别过滤日志

**3. Metal Performance Shaders (MPS)**
- **GPU 性能监控**：监控 GPU 使用率、显存占用
- **Shader 性能分析**：分析 Metal Shader 的执行时间

**Android 性能分析工具**：

**1. Android Profiler**
- **CPU Profiler**：分析 CPU 占用，线程状态
- **Memory Profiler**：分析内存分配、堆转储
- **Network Profiler**：分析网络请求
- **Energy Profiler**：分析能耗

**2. Systrace**
- **系统级追踪**：记录系统调用、线程调度、中断
- **CPU 调度**：分析 CPU 核心调度、频率变化
- **GPU 调度**：分析 GPU 调度、渲染帧

**3. Perfetto**
- **新一代系统级追踪工具**：替代 Systrace，提供更强大的分析能力
- **可视化界面**：提供 Web 可视化界面，方便分析

**通用性能分析工具**：

**1. ONNX Runtime Profiler**
- **算子级性能分析**：分析每个算子的执行时间
- **内存分析**：分析模型内存占用
- **对比分析**：对比不同优化策略的性能差异

**2. TensorFlow Lite Profiler**
- **推理耗时分析**：分析推理的各个阶段耗时
- **内存分析**：分析模型内存占用
- **Delegate 性能**：分析 GPU/NPU Delegate 的性能

**3. CoreML Tools**
- **模型分析**：分析模型大小、算子类型、优化建议
- **性能预测**：预测推理性能
- **基准测试**：运行基准测试，对比性能

**工具链组合**：
- **开发阶段**：使用 Xcode Instruments / Android Profiler 进行全面分析
- **调试阶段**：使用 ONNX Runtime Profiler / TFLite Profiler 分析推理性能
- **生产阶段**：使用轻量级日志和性能计数器，降低开销

### 11.2.2 推理耗时分析

推理耗时是端侧推理最重要的性能指标。合理的耗时分析能够定位性能瓶颈，优化推理服务。

**推理耗时分解**：

**1. Prefill 阶段**
- **Tokenizer**：文本编码耗时
- **模型初始化**：加载模型、初始化推理上下文
- **KV Cache 生成**：一次性处理历史上下文，生成完整 KV Cache
- **首字延迟（TTFT）**：从开始推理到生成第一个 token 的时间

**2. Decode 阶段**
- **逐 token 生成**：每个 token 的生成时间
- **KV Cache 扩展**：每轮对话扩展 KV Cache
- **输出解码**：将 token ID 转换为文本
- **总推理时间**：Prefill + Decode 阶段的耗时

**性能指标**：
- **TTFT（Time to First Token）**：首字延迟，直接影响用户感知
- **TPS（Tokens Per Second）**：每秒生成的 token 数
- **总推理时间**：从开始推理到推理完成的总时间
- **P50/P95/P99**：耗时分布的 50/95/99 分位数

**分析工具**：
```swift
// iOS 端侧推理耗时分析示例
class InferenceProfiler {
    private var startTime: Date?
    private var prefillStartTime: Date?
    private var decodeStartTime: Date?
    private var ttft: TimeInterval?
    private var decodeTimes: [TimeInterval] = []

    func startInference() {
        startTime = Date()
        prefillStartTime = Date()
    }

    func recordTTFT() {
        if let start = prefillStartTime {
            ttft = Date().timeIntervalSince(start)
            decodeStartTime = Date()
        }
    }

    func recordDecodeToken() {
        if let start = decodeStartTime {
            let decodeTime = Date().timeIntervalSince(start)
            decodeTimes.append(decodeTime)
            decodeStartTime = Date() // 重置
        }
    }

    func stopInference() {
        guard let start = startTime else { return }
        let totalTime = Date().timeIntervalSince(start)

        let avgDecodeTime = decodeTimes.reduce(0, +) / Double(decodeTimes.count)

        logger.info("inference_performance", [
            "total_time_ms": Int(totalTime * 1000),
            "ttft_ms": Int((ttft ?? 0) * 1000),
            "avg_decode_time_ms": Int(avgDecodeTime * 1000),
            "token_count": decodeTimes.count
        ])
    }
}
```

**性能瓶颈定位**：
- **TTFT 过高**：检查模型初始化、KV Cache 生成、Tokenizer
- **Decode 过慢**：检查算子优化、硬件加速器、内存访问
- **内存占用过高**：检查模型大小、KV Cache 大小、激活内存
- **CPU/GPU 占用过高**：检查算子优化、硬件加速器利用率

### 11.2.3 内存分析工具

内存分析是端侧推理优化的关键。端侧设备内存有限，合理的内存分析能够发现内存泄漏、优化内存占用。

**内存指标**：
- **模型内存占用**：模型权重占用的内存
- **激活内存占用**：推理过程中激活占用的内存
- **KV Cache 内存占用**：多轮对话的 KV Cache 占用
- **峰值内存**：推理过程中的峰值内存
- **内存泄漏**：推理完成后未释放的内存

**iOS 内存分析工具**：

**1. Xcode Allocations**
- **实时内存监控**：实时查看内存分配和释放
- **堆转储**：生成堆转储文件，分析内存占用分布
- **内存泄漏检测**：自动检测内存泄漏
- **内存图**：可视化内存分配关系

**2. Xcode Leaks**
- **自动检测**：自动检测内存泄漏
- **泄漏报告**：生成泄漏报告，定位泄漏对象
- **回溯分析**：分析泄漏对象的创建路径

**Android 内存分析工具**：

**1. Android Profiler - Memory**
- **实时内存监控**：实时查看内存占用
- **堆转储**：生成堆转储文件，分析内存分布
- **内存分配跟踪**：跟踪内存分配
- **泄漏检测**：自动检测内存泄漏

**2. Memory Profiler**
- **详细分析**：分析对象的引用关系
- **泄漏分析**：自动检测泄漏
- **优化建议**：提供内存优化建议

**通用内存分析工具**：

**1. ONNX Runtime Profiler**
- **模型内存分析**：分析模型权重和激活的内存占用
- **KV Cache 分析**：分析 KV Cache 的内存占用
- **内存优化建议**：提供内存优化建议

**2. TensorFlow Lite Profiler**
- **内存占用分析**：分析推理过程中的内存占用
- **内存优化**：提供内存优化建议

**3. CoreML Tools**
- **模型大小分析**：分析模型大小和内存占用
- **优化建议**：提供模型优化建议

**实现示例**：
```swift
// iOS 端侧内存分析示例
class MemoryProfiler {
    func recordMemoryUsage(tag: String) {
        var info = mach_task_basic_info()
        var count = mach_msg_type_number_t(MemoryLayout<mach_task_basic_info>.size)/4

        let kerr: kern_return_t = withUnsafeMutablePointer(to: &info) {
            $0.withMemoryRebound(to: integer_t.self, capacity: 1) {
                task_info(mach_task_self_, task_flavor_t(MACH_TASK_BASIC_INFO), $0, &count)
            }
        }

        if kerr == KERN_SUCCESS {
            let usedMB = Double(info.resident_size) / 1024 / 1024
            logger.info("memory_usage", [
                "tag": tag,
                "used_mb": usedMB
            ])
        }
    }

    func checkMemoryPressure() {
        let notification = Notification.Name.NSUIApplicationDidReceiveMemoryWarning
        NotificationCenter.default.addObserver(forName: notification, object: nil, queue: nil) { _ in
            logger.warning("memory_warning", [
                "message": "Received memory warning"
            ])
            // 清理缓存、卸载不必要的模型
        }
    }
}
```

### 11.2.4 GPU/NPU 性能分析

GPU/NPU 是端侧推理的加速器，合理的性能分析能够充分利用硬件加速器，提升推理性能。

**GPU 性能指标**：
- **GPU 占用率**：GPU 的使用率
- **显存占用**：GPU 显存的使用量
- **Shader 耗时**：Metal Shader 或 CUDA Kernel 的执行时间
- **带宽利用率**：GPU 内存带宽的利用率

**NPU 性能指标**：
- **NPU 占用率**：NPU 的使用率
- **NPU 算力利用率**：NPU 算力的利用率
- **NPU 内存占用**：NPU 内存的占用

**iOS GPU 分析工具**：

**1. Xcode Metal System Trace**
- **GPU 性能监控**：监控 GPU 使用率、显存占用
- **Shader 性能**：分析 Metal Shader 的执行时间
- **渲染管线分析**：分析渲染管线的各个阶段

**2. Metal Performance Shaders**
- **性能监控**：监控 MPS 算子的性能
- **性能对比**：对比不同算子实现的性能

**Android GPU 分析工具**：

**1. GPU Debugger**
- **GPU 性能分析**：分析 GPU 性能
- **Shader 调试**：调试 GPU Shader

**2. RenderDoc**
- **帧捕获**：捕获渲染帧，分析性能
- **Shader 分析**：分析 Shader 性能

**通用 NPU 分析工具**：

**1. TensorFlow Lite - GPU Delegate**
- **GPU 性能监控**：监控 GPU Delegate 的性能
- **性能对比**：对比 CPU 和 GPU 的性能差异

**2. CoreML - Neural Engine**
- **NPU 性能监控**：监控 Neural Engine 的性能
- **性能分析**：分析 NPU 的使用情况

**实现示例**：
```swift
// iOS 端侧 GPU 性能分析示例
import Metal

class GPUProfiler {
    private let device: MTLDevice

    init() {
        self.device = MTLCreateSystemDefaultDevice()!
    }

    func recordGPUUsage() {
        // Metal 不直接提供 GPU 占用率 API
        // 可以通过 Metal Performance Shaders 的统计信息估算
        logger.info("gpu_info", [
            "device_name": device.name,
            "max_texture_size": device.maxTextureWidth
        ])
    }

    func measureShaderExecution(commandBuffer: MTLCommandBuffer, label: String) {
        commandBuffer.addCompletedHandler { buffer in
            let gpuTime = buffer.gpuEndTime - buffer.gpuStartTime
            logger.info("shader_execution", [
                "label": label,
                "gpu_time_ms": Int(gpuTime * 1000)
            ])
        }
    }
}
```

**性能优化建议**：
- **使用硬件加速器**：优先使用 GPU/NPU，而不是 CPU
- **算子融合**：融合多个算子，减少内存访问
- **批量处理**：批量处理多个输入，提高硬件利用率
- **减少数据传输**：减少 CPU 和 GPU 之间的数据传输

---

## 总结

本章介绍了端侧日志与调试、性能分析工具的核心实践。端侧推理的可观测性是保障推理服务质量和快速排障的基础，需要设计适合端侧的日志系统和性能分析工具链。

**关键要点**：
1. **日志规范**：使用结构化日志，合理设置日志级别，确保日志内容完整
2. **日志采样**：合理的日志采样策略，在保留关键信息的同时降低成本
3. **错误分类**：系统化的错误分类体系，便于快速定位问题
4. **隐私脱敏**：对所有敏感信息进行脱敏，遵守隐私法规
5. **性能分析工具**：使用多层级的工具链，全面分析性能瓶颈
6. **推理耗时分析**：分解推理耗时，定位性能瓶颈
7. **内存分析**：使用内存分析工具，发现内存泄漏、优化内存占用
8. **GPU/NPU 分析**：分析硬件加速器的性能，充分利用硬件加速

**最佳实践**：
- 使用结构化日志，便于解析和分析
- 合理设置日志采样率，平衡信息量和成本
- 对所有敏感信息进行脱敏，遵守隐私法规
- 使用多层级的性能分析工具，全面分析性能瓶颈
- 在开发阶段使用全面的分析工具，在生产阶段使用轻量级监控
- 定期进行性能分析和优化，持续提升推理性能

端侧推理的可观测性是一个持续优化的过程，需要根据产品需求和技术演进不断调整策略。通过科学的日志系统和性能分析工具链，可以确保端侧大模型推理服务的高可用性和高性能。

---

**参考来源**：
- 本章节内容基于 RESEARCH.md 中的内存分析工具（Android Profiler、Xcode Instruments、ONNX Runtime Profiler、TFLite Profiler、CoreML Tools）的结论
- 参考 iOS 和 Android 官方文档（os_log、Xcode Instruments、Android Profiler、Systrace、Perfetto）
- 参考移动端应用的日志记录和性能分析的最佳实践
- 参考 GDPR、CCPA、《个人信息保护法》等隐私法规的要求
