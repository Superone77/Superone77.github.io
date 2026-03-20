# 附录 A：术语表（Terminology）

> AI Agent 开发相关术语的权威定义和解释

---

## A.1 Agent 相关术语

### Agent（智能体、AI Agent）

**定义**：在生成式人工智能上下文中，AI agents（也称为复合 AI 系统或代理式 AI）是一类具有自主决策能力、能够自主在复杂环境中执行任务的智能体。

**来源**：Wikipedia（2024）

**核心特征**：
- 自主决策
- 复杂环境适应
- 自主执行任务

**类型**：
- LLM agents
- 传统基于规则的 agents
- 强化学习 agents
- 多 agents 系统

---

### ReAct（推理 + 行动循环）

**定义**：一种将推理（Reasoning）和行动（Action）结合的 Agent 模式，Agent 通过"思考 → 行动 → 观察 → 思考"的循环来完成任务。

**工作流程**：
1. 推理：思考当前状态和目标
2. 行动：执行具体的工具调用或操作
3. 观察：观察行动结果
4. 循环：重复上述步骤直到完成任务

**应用**：LangChain ReAct Agent、Tool Calling Agent

---

### AutoGPT（自主 GPT）

**定义**：一个开源的自主 Agent 项目，能够自主规划任务、调用工具、生成子任务，实现长期目标。

**核心组件**：
- LLM（大语言模型）
- Memory（记忆系统）
- Tools（工具库）
- Planner（规划器）
- Executor（执行器）

**工作流程**：
Task Definition → Task Planning → Task Execution → Result Evaluation

**架构模式**：
- 单一 Agent
- 多 Agent
- Human-in-the-loop

**项目地址**：https://github.com/Significant-Gravitas/Auto-GPT

---

### BabyAGI（任务导向的自主智能体）

**定义**：一个简洁、清晰、可扩展的自主 Agent 项目，专注于任务导向的自主执行。

**核心组件**：
- Task Creation（任务创建）
- Task Prioritization（任务优先级）
- Task Execution（任务执行）
- Task Result Evaluation（任务结果评估）

**工作流程**：
Objective → Task List → Task Prioritization → Task Execution → Loop

**设计理念**：简洁、清晰、可扩展

**项目地址**：https://github.com/yoheinakajima/babyagi

---

### CrewAI（多 Agent 协作框架）

**定义**：一个用于构建多 Agent 协作系统的开源框架，支持 Agent 间的顺序协作、层次协作和并行协作。

**核心概念**：
- **Agents（智能体）**：Role 定义、Goal 设置、Backstory 设置
- **Tasks（任务）**：Task 定义、Task 描述、Tool 分配、Dependencies
- **Crews（团队）**：Agent 集合、任务集合、Process 类型
- **Tools（工具）**：工具库、工具使用、Tool 自定义
- **Processes（流程）**：Sequential Process、Hierarchical Process、自定义 Process

**流程类型**：
- Sequential Process（顺序流程）：Agent 顺序执行任务
- Hierarchical Process（层次流程）：Manager Agent 分配任务给 Worker Agent

**项目地址**：https://github.com/joaomdmoura/crewAI

---

### LangChain（LLM 应用开发框架）

**定义**：一个用于构建 LLM 应用的开源框架，提供 LLMs、Prompts、Memory、Tools、Agents、LangGraph、LangSmith 等功能。

**核心组件**：
- **LLMs**：模型选择、参数配置、流式输出
- **Prompts**：提示词模板、变量替换、Few-shot 示例
- **Memory**：短期记忆、长期记忆、向量存储
- **Tools**：工具注册、工具调用、工具装饰器
- **Output Parsers**：输出解析、结构化输出
- **Agents**：Agent 初始化、工具绑定、运行 Agent
- **LangGraph**：图构建、状态管理、检查点、工作流执行
- **LangSmith**：性能追踪、错误分析、用户行为分析

**表达式语言（LCEL）**：LangChain Expression Language，用于构建复杂的 LLM 应用

**项目地址**：https://github.com/langchain-ai/langchain

---

### LangGraph（基于图的 Agent 工作流管理）

**定义**：LangChain 的图式工作流管理工具，用于构建基于状态的复杂工作流，支持状态管理、检查点、分支、循环等。

**核心功能**：
- **图构建**：定义 Agent 工作流图
- **状态管理**：管理 Agent 的内部状态
- **检查点**：保存和恢复工作流状态
- **工作流执行**：执行复杂的工作流

**应用**：企业级 Agent 应用、复杂工作流、长期任务规划

**文档**：https://langchain-ai.github.io/langgraph/

---

### LangSmith（Agent 性能追踪和调试平台）

**定义**：LangChain 的性能追踪和调试平台，用于追踪 Agent 的执行过程、分析性能、调试错误、监控成本。

**核心功能**：
- **Tracing（追踪）**：追踪 Agent 的执行过程
- **Performance Monitoring（性能监控）**：监控 Agent 的性能指标
- **Error Analysis（错误分析）**：分析 Agent 的错误原因
- **Cost Tracking（成本追踪）**：追踪 Agent 的 API 调用成本
- **User Behavior Analysis（用户行为分析）**：分析用户使用行为

**文档**：https://docs.smith.langchain.com/

---

### LangServe（Agent 服务部署和 API 化）

**定义**：LangChain 的 Agent 服务部署工具，用于将 Agent 部署为 REST API 服务。

**核心功能**：
- **REST API 部署**：将 Agent 部署为 REST API
- **FastAPI 集成**：基于 FastAPI 构建 API 服务
- **异步支持**：支持异步调用
- **流式输出**：支持流式输出

**文档**：https://python.langchain.com/docs/langserve

---

### LCEL（LangChain 表达式语言）

**定义**：LangChain Expression Language，一种用于构建复杂 LLM 应用的表达式语言。

**特点**：
- 声明式编程
- 可组合
- 类型安全
- 易于测试

**示例**：
```python
chain = prompt | llm | parser
result = chain.invoke({"input": "Hello, world!"})
```

---

### MemGPT（记忆增强 Agent）

**定义**：一种具有分层记忆结构的 Agent，能够管理长期记忆和短期记忆，支持语义相似性检索和缓存优先机制。

**核心功能**：
- **分层记忆结构**：长期记忆、短期记忆
- **缓存优先机制**：优先从缓存中检索记忆
- **语义相似性检索**：基于语义相似性检索记忆
- **记忆管理**：自动管理和清理记忆

**应用**：长期对话 Agent、个性化 Agent

---

### VectorDB（向量数据库）

**定义**：一种用于存储和检索向量的数据库，支持向量相似性搜索，用于实现 RAG（检索增强生成）。

**核心功能**：
- **向量化**：将文本转换为向量
- **向量存储**：存储向量数据
- **向量检索**：基于相似性检索向量
- **重排序**：对检索结果进行重排序

**代表系统**：Pinecone、Weaviate、Chroma、Qdrant

---

### Graph Memory（图记忆）

**定义**：一种基于知识图谱的记忆系统，用于存储和检索结构化知识，支持图查询和推理。

**核心功能**：
- **知识图谱构建**：构建知识图谱
- **图查询**：查询知识图谱
- **图推理**：基于图进行推理
- **图嵌入**：将图嵌入到向量空间

**应用**：知识管理、关系推理

---

### RAG（检索增强生成）

**定义**：Retrieval-Augmented Generation，一种结合检索和生成的技术，通过检索外部知识来增强生成能力。

**工作流程**：
1. 检索：从外部知识库中检索相关信息
2. 生成：基于检索的信息生成答案

**优势**：
- 减少幻觉
- 提高准确性
- 支持实时信息

**应用**：问答系统、知识库问答

---

### RLHF（基于人类反馈的强化学习）

**定义**：Reinforcement Learning from Human Feedback，一种使用人类反馈来训练 LLM 的方法。

**工作流程**：
1. 收集人类反馈
2. 训练奖励模型
3. 使用强化学习优化 LLM

**应用**：对齐训练、提高 LLM 质量

---

### Constitutional AI（基于原则的 AI）

**定义**：一种基于预定义的原则来训练 LLM 的方法，使 LLM 遵循特定的道德和安全原则。

**工作流程**：
1. 定义原则（宪法）
2. 基于原则训练 LLM
3. 基于原则评估 LLM

**应用**：安全 LLM、合规 LLM

---

## A.2 架构相关术语

### Perception（感知、感知能力）

**定义**：Agent 观察环境状态的能力，包括输入接收、信息提取、上下文理解等。

**能力**：
- 输入接收：接收用户输入、环境输入
- 信息提取：从输入中提取关键信息
- 上下文理解：理解输入的上下文

**技术**：LLM、多模态处理、NLP

---

### Planning（规划、规划能力）

**定义**：Agent 制定行动计划的能力，包括目标分解、任务规划、资源分配等。

**能力**：
- 目标分解：将复杂目标分解为子目标
- 任务规划：制定任务执行顺序
- 资源分配：分配计算资源和工具资源

**技术**：CoT（思维链）、ToT（思维树）、LangGraph

---

### Action（行动、行动能力）

**定义**：Agent 执行具体操作的能力，包括工具调用、API 调用、状态更新等。

**能力**：
- 工具调用：调用外部工具
- API 调用：调用外部 API
- 状态更新：更新内部状态

**技术**：Function Calling、Tool Calling

---

### Memory（记忆、记忆能力）

**定义**：Agent 存储和检索历史信息的能力，包括短期记忆、长期记忆、向量存储等。

**类型**：
- **短期记忆**：存储当前对话和历史对话
- **长期记忆**：存储长期知识和经验
- **向量存储**：存储向量化知识

**技术**：LangChain Memory、VectorDB、Graph Memory

---

### Reflection（反思、反思能力）

**定义**：Agent 从自己的行为中学习的能力，包括任务反思、行为反思、结果反思等。

**类型**：
- **任务反思**：对已完成的任务进行反思
- **行为反思**：对行为模式进行反思
- **结果反思**：对执行结果进行反思
- **错误恢复**：从错误中恢复

**应用**：自我优化、策略调整、错误预防

---

### Reactive（反应式、反应式架构）

**定义**：一种 Agent 架构，Agent 基于当前环境状态直接做出反应，无需复杂的规划。

**特点**：
- 响应速度快
- 无复杂规划
- 基于规则

**应用**：简单任务、实时响应

---

### Deliberative（审慎式、审慎式架构）

**定义**：一种 Agent 架构，Agent 基于规划、推理做出决策，能够进行复杂的任务规划。

**特点**：
- 基于规划
- 推理能力强
- 适合复杂任务

**应用**：复杂任务、长期规划

---

### Hybrid（混合式、混合式架构）

**定义**：一种 Agent 架构，结合反应式和审慎式的优点，既有快速响应能力，又有规划能力。

**特点**：
- 响应速度快
- 有规划能力
- 灵活性强

**应用**：复杂场景、需要快速响应的任务

---

### Learning（学习型、学习型架构）

**定义**：一种 Agent 架构，Agent 能够从经验中学习，持续改进策略。

**特点**：
- 从经验中学习
- 持续改进
- 自适应

**技术**：强化学习、在线学习、元学习

**应用**：复杂环境、需要持续优化的任务

---

### Sequential（顺序、顺序流程）

**定义**：一种 Agent 工作流程，任务按顺序依次执行。

**特点**：
- 简单直观
- 易于理解
- 适合依赖关系明确的任务

**应用**：CrewAI Sequential Process

---

### Hierarchical（层次化、层次流程）

**定义**：一种 Agent 工作流程，Manager Agent 分配任务给 Worker Agent，形成层次结构。

**特点**：
- 任务分配灵活
- 适合复杂任务
- 支持多 Agent 协作

**应用**：CrewAI Hierarchical Process

---

### Concurrent（并发、并行流程）

**定义**：一种 Agent 工作流程，多个任务并行执行。

**特点**：
- 效率高
- 资源利用率高
- 适合独立任务

**应用**：并行处理、多 Agent 并行协作

---

### Handoff（交接、交接模式）

**定义**：一种 Agent 通信模式，Agent 将任务交接给另一个 Agent。

**应用**：多 Agent 协作、任务升级

---

### Orchestration（编排、编排模式）

**定义**：一种 Agent 工作流程管理方式，协调多个 Agent 和工具的执行。

**应用**：复杂工作流、多 Agent 系统

**代表系统**：Azure Agent Orchestration、Google Cloud Workflows

---

## A.3 开发相关术语

### Function Calling（函数调用）

**定义**：LLM 的一种能力，能够根据输入自动调用预定义的函数，并处理函数返回结果。

**工作流程**：
1. LLM 分析输入，确定需要调用哪个函数
2. LLM 生成函数调用参数
3. 执行函数调用
4. LLM 处理函数返回结果

**应用**：工具调用、API 调用

---

### Tool Calling（工具调用）

**定义**：Agent 调用外部工具的能力，包括 API 调用、数据库查询、文件操作等。

**工作流程**：
1. Agent 分析任务，确定需要调用哪个工具
2. Agent 生成工具调用参数
3. 执行工具调用
4. Agent 处理工具返回结果

**应用**：扩展 Agent 能力、访问外部资源

---

### Prompt Engineering（提示词工程）

**定义**：设计和优化提示词，使 LLM 生成更好的输出。

**技术**：
- Few-shot 示例
- Chain-of-Thought（CoT）
- Tree-of-Thought（ToT）
- 自我反思

---

### Fine-tuning（微调）

**定义**：在预训练模型的基础上，使用特定数据进一步训练模型，使其适应特定任务。

**类型**：
- 全量微调：微调所有参数
- 部分微调：只微调部分参数
- LoRA：Low-Rank Adaptation

**应用**：定制化 LLM、领域适配

---

### Embedding（嵌入）

**定义**：将文本、图像等数据转换为向量表示的过程。

**应用**：
- 语义搜索
- 向量存储
- RAG

---

### Vector Search（向量搜索）

**定义**：基于向量相似性搜索相似内容的技术。

**应用**：
- 语义搜索
- 推荐系统
- RAG

---

### Semantic Search（语义搜索）

**定义**：基于语义相似性搜索内容的技术，而不是基于关键词匹配。

**应用**：
- 问答系统
- 知识库搜索
- 文档检索

---

### Hallucination（幻觉）

**定义**：LLM 生成不准确或虚构信息的现象。

**原因**：
- 训练数据不足
- 推理能力有限
- 缺乏外部知识

**解决方案**：
- RAG（检索增强生成）
- 神经符号融合
- 事实核查

---

### Alignment（对齐）

**定义**：使 AI 系统的行为与人类价值观和意图一致的过程。

**方法**：
- RLHF（基于人类反馈的强化学习）
- Constitutional AI（基于原则的 AI）
- 指令微调

**应用**：安全 AI、合规 AI

---

### Safety（安全）

**定义**：保护 AI 系统免受攻击和滥用的能力。

**威胁**：
- 提示词注入
- 越狱攻击
- 数据泄露
- 恶意使用

**防护措施**：
- 输入验证
- 输出过滤
- 访问控制
- 审计日志

---

## A.4 评估相关术语

### Benchmark（基准测试）

**定义**：用于评估 Agent 性能的标准测试集。

**类型**：
- ALFWorld
- WebShop
- AgentBench
- 其他基准

**作用**：
- 性能对比
- 能力评估
- 进展追踪

---

### Tracing（追踪）

**定义**：追踪 Agent 的执行过程，记录每个步骤的输入、输出、中间状态等。

**应用**：
- 调试
- 性能分析
- 错误分析

**工具**：LangSmith、W&B

---

### Latency（延迟）

**定义**：Agent 响应用户请求所需的时间。

**指标**：
- 平均延迟
- P50、P95、P99 延迟

**优化**：
- 模型优化
- 缓存
- 并发处理

---

### Throughput（吞吐量）

**定义**：单位时间内 Agent 能够处理的请求数量。

**指标**：
- QPS（每秒查询数）
- TPM（每分钟事务数）

**优化**：
- 并发处理
- 资源扩展
- 负载均衡

---

### Accuracy（准确率）

**定义**：Agent 输出正确的比例。

**评估方法**：
- 自动评估
- 人工评估
- 用户反馈

---

### Robustness（鲁棒性）

**定义**：Agent 在面对噪声、对抗攻击、输入变化时保持性能的能力。

**测试方法**：
- 噪声注入
- 对抗攻击
- 边界测试

---

### Consistency（一致性）

**定义**：Agent 在相同输入下输出相同结果的能力。

**测试方法**：
- 重复测试
- 多版本对比

---

### Explainability（可解释性）

**定义**：Agent 的决策过程能够被人类理解和解释的能力。

**方法**：
- 决策日志
- CoT（思维链）
- 可视化

---

## A.5 部署相关术语

### Cloud-Native（云原生）

**定义**：一种应用开发和部署方法，充分利用云计算的优势。

**特点**：
- 容器化
- 微服务
- 自动扩缩容
- DevOps

**应用**：云平台部署

---

### Containerization（容器化）

**定义**：将应用及其依赖打包成容器的过程，使应用能够在任何环境中运行。

**工具**：Docker、Kubernetes

**优势**：
- 环境一致性
- 易于部署
- 资源隔离

---

### Microservices（微服务）

**定义**：一种架构风格，将应用拆分为多个小型、独立的服务。

**优势**：
- 独立部署
- 技术栈灵活
- 易于扩展

---

### Auto-scaling（自动扩缩容）

**定义**：根据负载自动扩展或收缩资源的能力。

**类型**：
- 水平扩展
- 垂直扩展

**工具**：Kubernetes HPA、AWS Auto Scaling

---

### Blue-Green Deployment（蓝绿部署）

**定义**：一种部署策略，同时运行两个相同的环境（蓝和绿），通过切换流量实现零停机部署。

**优势**：
- 零停机
- 快速回滚

---

### Canary Release（金丝雀发布）

**定义**：一种部署策略，先向小部分用户发布新版本，逐步扩大范围。

**优势**：
- 降低风险
- 逐步验证

---

### CI/CD（持续集成/持续部署）

**定义**：一种软件开发实践，自动化构建、测试和部署流程。

**工具**：GitHub Actions、GitLab CI、Jenkins

---

### Observability（可观测性）

**定义**：通过日志、指标、追踪等手段，监控和分析系统运行状态的能力。

**三大支柱**：
- **Logs（日志）**：记录系统事件
- **Metrics（指标）**：度量系统性能
- **Traces（追踪）**：追踪请求路径

**工具**：
- **Logs**：ELK Stack、Loki
- **Metrics**：Prometheus、Grafana
- **Traces**：Jaeger、OpenTelemetry

---

## A.6 其他术语

### LLM（Large Language Model）

**定义**：大语言模型，一种基于深度学习的语言模型，能够理解和生成自然语言。

**代表模型**：
- GPT-4、GPT-4 Turbo
- Claude 3、Claude 3.5
- Gemini Pro、Gemini 1.5
- Llama 3、Mistral

---

### API（Application Programming Interface）

**定义**：应用程序编程接口，用于不同软件组件之间的通信。

**类型**：
- REST API
- GraphQL
- gRPC

---

### REST API（Representational State Transfer API）

**定义**：一种基于 HTTP 的 API 风格，使用 HTTP 方法（GET、POST、PUT、DELETE）操作资源。

---

### GraphQL

**定义**：一种查询语言，用于 API，允许客户端指定需要的数据。

---

### gRPC（Google Remote Procedure Call）

**定义**：一种高性能、开源的 RPC 框架，基于 HTTP/2 和 Protocol Buffers。

---

### Docker

**定义**：一个开源的容器化平台，用于构建、部署和运行容器。

---

### Kubernetes

**定义**：一个开源的容器编排平台，用于自动化部署、扩展和管理容器化应用。

---

### NPU（Neural Processing Unit）

**定义**：一种专门为神经网络推理设计的硬件加速器。

**优势**：
- 高性能
- 低功耗
- 专用优化

---

### TPU（Tensor Processing Unit）

**定义**：Google 专门为机器学习设计的硬件加速器。

**优势**：
- 高性能
- 高带宽
- 低延迟

---

### GPU（Graphics Processing Unit）

**定义**：图形处理器， originally 用于图形渲染，现在广泛用于机器学习。

**优势**：
- 并行计算能力强
- 适合大规模矩阵运算

---

### Agentic AI（代理式 AI）

**定义**：下一代生成式人工智能，能够自主感知、推理并执行任务。

**特征**：
- 自主感知
- 自主推理
- 自主执行

**来源**：MIT Sloan（2025）

---

### Compound AI System（复合 AI 系统）

**定义**：一种结合多种 AI 技术（LLM、工具、知识库等）的复杂系统。

**应用**：Agent 系统、多模态系统

---

### Human-in-the-loop（人在环路）

**定义**：一种系统设计，人类参与系统的决策和执行过程。

**应用**：Agent 协作、监督学习

---

### Zero-shot（零样本）

**定义**：无需示例即可完成任务的 AI 系统。

**应用**：Zero-shot ReAct Agent

---

### Few-shot（少样本）

**定义**：只需要少量示例即可完成任务的 AI 系统。

**应用**：Few-shot Prompting

---

### Multi-modal（多模态）

**定义**：能够处理多种模态（文本、图像、视频、音频）的 AI 系统。

**应用**：多模态 Agent、GPT-4V、Claude 3.5

---

### End-to-end（端到端）

**定义**：从输入到输出的完整流程，无需人工干预。

**应用**：端到端 Agent、端到端测试

---

### Offline（离线）

**定义**：无需网络连接即可运行的系统。

**应用**：端侧 Agent、离线推理

---

### Online（在线）

**定义**：需要网络连接才能运行的系统。

**应用**：云 Agent、在线推理

---

### Real-time（实时）

**定义**：能够在用户请求后立即响应的系统。

**应用**：实时 Agent、实时监控

---

### Batch（批处理）

**定义**：一次性处理多个请求的系统。

**应用**：批处理 Agent、批量数据分析

---

### Streaming（流式）

**定义**：逐个输出结果的系统，无需等待全部结果生成。

**应用**：流式输出、实时聊天

---

### SOTA（State-of-the-art）

**定义**：当前最先进的技术或方法。

**应用**：SOTA 模型、SOTA 方法

---

### POC（Proof of Concept）

**定义**：概念验证，用于验证某个概念或想法的可行性。

**应用**：POC 项目、POC 测试

---

### MVP（Minimum Viable Product）

**定义**：最小可行产品，包含核心功能的产品。

**应用**：MVP 发布、MVP 测试

---

### ROI（Return on Investment）

**定义**：投资回报率，衡量投资收益的指标。

**计算**：(收益 - 成本) / 成本 × 100%

---

### KPI（Key Performance Indicator）

**定义**：关键绩效指标，用于衡量系统或项目的绩效。

**应用**：
- Agent 性能 KPI
- 用户满意度 KPI
- 业务 KPI

---

### SLA（Service Level Agreement）

**定义**：服务级别协议，定义服务提供商和客户之间的服务标准和责任。

**内容**：
- 可用性
- 性能
- 响应时间
- 故障恢复

---

### GDPR（General Data Protection Regulation）

**定义**：欧盟的数据保护法规，保护个人数据的隐私和安全。

**要求**：
- 数据保护
- 隐私保护
- 用户同意
- 数据删除权

---

### HIPAA（Health Insurance Portability and Accountability Act）

**定义**：美国的医疗数据保护法规，保护医疗信息的隐私和安全。

**要求**：
- 数据保护
- 隐私保护
- 安全措施

---

### SOC2（System and Organization Controls 2）

**定义**：美国的审计标准，评估服务提供商的安全、可用性、处理完整性、保密性和隐私。

**类型**：
- SOC2 Type I
- SOC2 Type II

---

## 结语

本术语表涵盖了 AI Agent 开发的核心术语，包括 Agent 相关、架构相关、开发相关、评估相关、部署相关等方面的术语。

**术语表版本**：v1.0  
**最后更新**：2026-03-19  
**研究基础**：基于 2024-2025 年最新技术趋势和研究
