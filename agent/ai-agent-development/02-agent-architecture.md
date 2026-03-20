# 第二章：Agent 架构设计

> 理解 AI Agent 的核心组件、架构类型和通信机制

---

## 2.1 Agent 核心组件

AI Agent 由多个核心组件组成，每个组件负责特定的功能，相互协作完成 Agent 的任务。这些核心组件包括感知模块、规划模块、行动模块、记忆模块和反思模块。

### 2.1.1 感知模块（Perception）

感知模块是 Agent 与环境的接口，负责从环境中获取信息并转换为 Agent 可以理解的内部状态表示。感知模块是 Agent 的"感官"，类似于人类的视觉、听觉、触觉等感知能力。

#### 感知的定义

感知（Perception）是指 Agent 从环境中接收并解释信息的过程。感知模块负责将原始输入数据（如文本、图像、语音、传感器数据等）转换为 Agent 内部可以处理的表示形式。

**学术定义**（来源：2024-2025 年最新研究）

- **MIT Sloan（2025）**：感知是 Agentic AI 的核心能力之一，使 Agent 能够自主理解环境状态、用户输入和系统信息。
- **IBM（2024）**：感知模块使 AI Agent 能够处理多模态输入，包括文本、图像、音频和传感器数据。
- **Azure（2025）**：感知能力是 Agent 设计模式的核心组件，支持 Tool Use 和 ReAct 模式。

**工程定义**

在实际工程中，感知模块通常负责：

1. **数据采集**：从各种输入源获取原始数据
2. **数据预处理**：清洗、标准化、归一化数据
3. **特征提取**：提取关键特征和语义信息
4. **状态表示**：将特征转换为 Agent 内部状态

#### 感知类型

感知模块可以处理多种类型的输入数据，每种类型都有其特点和应用场景：

| 感知类型 | 数据示例 | 典型模型/技术 | 应用场景 |
|----------|----------|----------------|----------|
| **文本感知** | 用户消息、文档内容、源代码 | LLM（GPT-4、Claude）、BERT、NLP 模型 | 对话系统、文本分析、代码理解 |
| **多模态感知** | 图像+文本、视频、音频 | GPT-4V、Claude 3.5 Sonnet、Gemini Pro Vision | 图像理解、图表分析、多模态对话 |
| **端侧感知** | 移动端数据、IoT 传感器数据 | Llama 3-8B、Mistral 7B、端侧模型 | 移动应用、边缘计算、隐私保护 |
| **传感器感知** | 温度、湿度、GPS、加速度计 | 信号处理、机器学习、时序模型 | IoT 设备、机器人、智能家居 |

**文本感知**

文本感知是最常见的感知类型，使用大语言模型（LLM）理解用户输入和文本内容。

**多模态感知**（来源：2024-2025 年最新研究）

多模态感知是指 Agent 能够同时处理多种类型的数据（如文本、图像、视频、音频）。这是 2024-2025 年的重要趋势：

- **GPT-4V（2024）**：OpenAI 发布的视觉-语言模型，能够理解图像和文本输入。
- **Claude 3.5 Sonnet（2024）**：Anthropic 发布的多模态模型，支持图像理解。
- **Gemini Pro Vision（2024）**：Google 发布的多模态模型，支持文本、图像、视频和音频。

多模态感知的优势：
- 更自然的人机交互
- 支持复杂场景（如图表分析、视觉问答）
- 提高理解准确性

**端侧感知**（来源：2024-2025 年最新研究）

端侧感知是指在端侧设备（如手机、IoT 设备）上运行的小模型进行感知：

- **Llama 3-8B（2024）**：Meta 发布的开源小模型，可在端侧部署。
- **Mistral 7B（2023）**：Mistral AI 发布的高效小模型，性能优异。

端侧感知的优势：
- 低延迟：无需云端通信
- 隐私保护：数据不离设备
- 降低成本：减少 API 调用

#### 感知流程

感知模块的处理流程可以分为四个步骤：

```
数据采集 → 预处理 → 特征提取 → 上下文理解
```

1. **数据采集**：从各种输入源采集原始数据
   - 文本：用户输入、文件内容、API 响应
   - 图像：摄像头、截图、文件上传
   - 语音：麦克风、音频文件
   - 传感器：IoT 设备、API 数据

2. **预处理**：清洗、标准化、归一化数据
   - 文本：去除噪声、分词、标准化
   - 图像：调整大小、归一化、裁剪
   - 语音：降噪、分段、采样
   - 传感器：滤波、校准、归一化

3. **特征提取**：提取关键特征和语义信息
   - 文本：词向量、句向量、语义向量
   - 图像：CNN 特征、ViT 特征
   - 语音：MFCC、声纹特征
   - 传感器：统计特征、频域特征

4. **上下文理解**：将特征转换为 Agent 内部状态表示
   - 使用 LLM 理解语义
   - 使用向量数据库进行语义检索
   - 使用规则引擎进行结构化处理

#### 感知挑战

感知模块在实际应用中面临多种挑战：

| 挑战 | 描述 | 解决方案 |
|------|------|----------|
| **噪声处理** | 输入数据包含噪声，影响感知准确性 | 使用数据清洗和滤波技术、模型鲁棒性训练 |
| **模态融合** | 如何融合不同类型的数据（文本、图像、语音） | 使用多模态模型（如 CLIP、Flamingo）、注意力机制 |
| **实时性要求** | 感知需要实时响应，延迟要低 | 使用轻量级模型、边缘计算、模型量化 |
| **不确定性** | 环境状态不完全可知，存在不确定性 | 使用概率模型、贝叶斯推理、置信度评估 |

**噪声处理**（来源：2024-2025 年最新研究）

- **学术研究**：多 Agent 自主驾驶系统中的感知挑战（Cui et al., 2023），包括光照变化、反射表面、快速运动等噪声问题。
- **解决方案**：使用信号处理技术（滤波器、降噪算法）、模型鲁棒性训练（对抗训练、数据增强）、置信度评估（不确定性量化）。

**模态融合**（来源：2024-2025 年最新研究）

- **多模态大模型**：GPT-4V、Claude 3.5 Sonnet、Gemini Pro Vision 等模型已经能够融合多种模态。
- **融合策略**：早期融合（输入层融合）、晚期融合（输出层融合）、注意力机制（Cross-Attention）。

**实时性要求**（来源：2024-2025 年最新研究）

- **端侧感知**：使用小模型（Llama 3-8B、Mistral 7B）在端侧部署，降低延迟。
- **模型优化**：模型量化（INT8/INT4）、模型蒸馏、模型剪枝。

#### 感知最佳实践

基于 2024-2025 年的工程实践和研究成果：

1. **使用成熟的感知模型**：减少训练成本，提高稳定性
   - 文本：GPT-4、Claude 3.5 Sonnet、LLaMA
   - 多模态：GPT-4V、Claude 3.5 Sonnet、Gemini Pro Vision
   - 端侧：Llama 3-8B、Mistral 7B

2. **实现感知结果的置信度评估**：每个感知结果附带置信度评分
   - 使用 LLM 的概率输出（logits）
   - 使用不确定性量化方法（贝叶斯神经网络、蒙特卡洛 Dropouts）

3. **感知结果缓存**：避免重复计算
   - 使用 Redis 缓存感知结果
   - 使用向量化存储加速检索

4. **实现感知错误的容错机制**：
   - 重试机制：临时性错误重试
   - 降级机制：使用简化模型或规则
   - 人机协作：无法感知时请求人工介入

#### 代码示例 1：LangChain 文本感知

以下代码示例展示如何使用 LangChain 实现文本感知：

```python
from langchain_openai import ChatOpenAI
from langchain.schema import HumanMessage
from typing import Dict, Any

class LangChainPerceptionModule:
    """基于 LangChain 的文本感知模块"""

    def __init__(self, model_name: str = "gpt-4"):
        self.llm = ChatOpenAI(model=model_name, temperature=0.0)

    def perceive_text(self, text: str) -> Dict[str, Any]:
        """
        感知文本输入

        Args:
            text: 用户输入的文本

        Returns:
            感知结果，包含原始文本、理解和向量表示
        """
        # 使用 LLM 理解文本
        messages = [HumanMessage(content=text)]
        response = self.llm.invoke(messages)

        return {
            "type": "text",
            "raw": text,
            "understanding": response.content,
            "confidence": self._get_confidence(response),
            "metadata": {
                "model": self.llm.model_name,
                "tokens_used": response.response_metadata.get("token_usage", {})
            }
        }

    def perceive_with_context(self, text: str, context: str) -> Dict[str, Any]:
        """
        带上下文的文本感知

        Args:
            text: 当前输入文本
            context: 上下文信息（如历史对话、系统状态）

        Returns:
            带上下文理解的感知结果
        """
        prompt = f"""
        上下文：{context}

        当前输入：{text}

        请结合上下文理解当前输入，并提取关键信息。
        """
        messages = [HumanMessage(content=prompt)]
        response = self.llm.invoke(messages)

        return {
            "type": "text_with_context",
            "raw": text,
            "context": context,
            "understanding": response.content,
            "key_information": self._extract_key_info(response.content)
        }

    def _get_confidence(self, response) -> float:
        """
        获取感知结果的置信度

        Args:
            response: LLM 响应

        Returns:
            置信度分数（0-1）
        """
        # 简单实现：使用响应长度和 tokens 估算
        # 实际应用中可以使用更复杂的方法（如不确定性量化）
        if hasattr(response, 'response_metadata'):
            token_usage = response.response_metadata.get('token_usage', {})
            completion_tokens = token_usage.get('completion_tokens', 0)
            # 较长的响应通常表示较高的置信度
            return min(completion_tokens / 100.0, 1.0)
        return 0.8  # 默认置信度

    def _extract_key_info(self, text: str) -> Dict[str, Any]:
        """
        从文本中提取关键信息

        Args:
            text: LLM 理解结果

        Returns:
            关键信息字典
        """
        # 简化实现：使用 LLM 提取结构化信息
        prompt = f"""
        请从以下文本中提取关键信息（如实体、意图、参数等）：

        {text}

        以 JSON 格式输出。
        """
        messages = [HumanMessage(content=prompt)]
        response = self.llm.invoke(messages)

        import json
        try:
            return json.loads(response.content)
        except:
            return {"raw_text": text}

# 使用示例
if __name__ == "__main__":
    # 初始化感知模块
    perception = LangChainPerceptionModule(model_name="gpt-4")

    # 感知文本
    text_input = "北京明天天气怎么样？"
    result = perception.perceive_text(text_input)
    print("文本感知结果：")
    print(f"  原始输入：{result['raw']}")
    print(f"  理解结果：{result['understanding']}")
    print(f"  置信度：{result['confidence']:.2f}")

    # 带上下文的感知
    context = "用户计划明天去北京旅行，需要准备衣物"
    context_result = perception.perceive_with_context(text_input, context)
    print("\n带上下文的感知结果：")
    print(f"  理解结果：{context_result['understanding']}")
    print(f"  关键信息：{context_result['key_information']}")
```

#### 代码示例 2：GPT-4V 多模态感知

以下代码示例展示如何使用 GPT-4V 实现图像+文本感知：

```python
import openai
from base64 import b64encode
from typing import Dict, Any, Optional
import os

class MultimodalPerceptionModule:
    """基于 GPT-4V 的多模态感知模块"""

    def __init__(self, api_key: Optional[str] = None):
        self.client = openai.OpenAI(api_key=api_key or os.getenv("OPENAI_API_KEY"))

    def perceive_image(
        self,
        image_path: str,
        prompt: str = "请详细描述这张图片"
    ) -> Dict[str, Any]:
        """
        感知图像输入

        Args:
            image_path: 图像文件路径
            prompt: 提示词（可选）

        Returns:
            图像感知结果
        """
        # 读取并编码图像
        with open(image_path, "rb") as image_file:
            base64_image = b64encode(image_file.read()).decode('utf-8')

        # 调用 GPT-4V
        response = self.client.chat.completions.create(
            model="gpt-4o",  # 使用 GPT-4o（支持多模态）
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}"
                            }
                        }
                    ]
                }
            ],
            temperature=0.0,
            max_tokens=1000
        )

        return {
            "type": "image",
            "image_path": image_path,
            "description": response.choices[0].message.content,
            "model": "gpt-4o",
            "tokens_used": response.usage.total_tokens
        }

    def perceive_image_with_context(
        self,
        image_path: str,
        context: str,
        prompt: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        带上下文的图像感知

        Args:
            image_path: 图像文件路径
            context: 上下文信息（如用户目标、历史对话）
            prompt: 提示词（可选）

        Returns:
            带上下文理解的图像感知结果
        """
        # 读取并编码图像
        with open(image_path, "rb") as image_file:
            base64_image = b64encode(image_file.read()).decode('utf-8')

        # 构建提示词
        if prompt is None:
            prompt = f"""
            上下文：{context}

            请结合上下文分析这张图片，并提取相关信息。
            """

        # 调用 GPT-4V
        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}"
                            }
                        }
                    ]
                }
            ],
            temperature=0.0,
            max_tokens=1000
        )

        # 提取结构化信息
        structured_info = self._extract_structured_info(
            response.choices[0].message.content,
            context
        )

        return {
            "type": "image_with_context",
            "image_path": image_path,
            "context": context,
            "description": response.choices[0].message.content,
            "structured_info": structured_info,
            "model": "gpt-4o",
            "tokens_used": response.usage.total_tokens
        }

    def perceive_multimodal(
        self,
        text: str,
        image_path: Optional[str] = None,
        context: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        多模态感知（文本 + 可选图像）

        Args:
            text: 文本输入
            image_path: 图像文件路径（可选）
            context: 上下文信息（可选）

        Returns:
            多模态感知结果
        """
        content = [{"type": "text", "text": text}]

        # 如果有图像，添加图像内容
        if image_path:
            with open(image_path, "rb") as image_file:
                base64_image = b64encode(image_file.read()).decode('utf-8')
            content.append({
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/jpeg;base64,{base64_image}"
                }
            })

        # 如果有上下文，添加到文本中
        if context:
            content[0]["text"] = f"上下文：{context}\n\n{content[0]['text']}"

        # 调用 GPT-4V
        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": content}],
            temperature=0.0,
            max_tokens=1000
        )

        return {
            "type": "multimodal",
            "text": text,
            "image_path": image_path,
            "context": context,
            "understanding": response.choices[0].message.content,
            "model": "gpt-4o",
            "tokens_used": response.usage.total_tokens
        }

    def _extract_structured_info(
        self,
        description: str,
        context: str
    ) -> Dict[str, Any]:
        """
        从图像描述中提取结构化信息

        Args:
            description: 图像描述
            context: 上下文信息

        Returns:
            结构化信息字典
        """
        prompt = f"""
        上下文：{context}

        图像描述：{description}

        请从图像描述中提取结构化信息（如对象、位置、颜色、文本等）。

        以 JSON 格式输出。
        """

        response = self.client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.0,
            max_tokens=500
        )

        import json
        try:
            return json.loads(response.choices[0].message.content)
        except:
            return {"raw_description": description}

# 使用示例
if __name__ == "__main__":
    # 初始化多模态感知模块
    multimodal = MultimodalPerceptionModule()

    # 感知图像（需要提供真实的图像文件）
    # image_result = multimodal.perceive_image(
    #     image_path="screenshot.png",
    #     prompt="请分析这张截图中的 UI 界面"
    # )
    # print("图像感知结果：", image_result)

    # 多模态感知（文本 + 图像）
    # multimodal_result = multimodal.perceive_multimodal(
    #     text="这个界面如何使用？",
    #     image_path="screenshot.png",
    #     context="用户第一次使用这个应用"
    # )
    # print("多模态感知结果：", multimodal_result)

    print("多模态感知模块初始化成功。请提供图像文件进行测试。")
```

#### 感知类型对比表

| 感知类型 | 技术栈 | 优势 | 劣势 | 适用场景 |
|----------|--------|------|------|----------|
| **文本感知** | GPT-4、Claude、LLaMA | 成熟稳定、成本低、语义理解强 | 无法处理非文本数据 | 对话系统、文本分析、代码理解 |
| **多模态感知** | GPT-4V、Claude 3.5 Sonnet、Gemini Pro Vision | 支持多模态、理解准确、交互自然 | 计算成本高、延迟较高 | 图像理解、图表分析、多模态对话 |
| **端侧感知** | Llama 3-8B、Mistral 7B | 低延迟、隐私保护、降低成本 | 模型能力有限、需本地部署 | 移动应用、边缘计算、IoT 设备 |

---

### 2.1.2 规划模块（Planning）

规划模块负责制定行动计划，将 Agent 的目标分解为可执行的行动序列。规划模块是 Agent 的"大脑"，负责决策和策略制定。

#### 规划的定义

规划（Planning）是指 Agent 在给定目标下，制定如何达成目标的行动计划的过程。规划模块需要考虑当前状态、可用资源、约束条件和时间限制等因素。

**学术定义**（来源：2024-2025 年最新研究）

- **Azure（2025）**：规划是 Agentic AI 的核心设计模式之一，包括短期规划（CoT）、长期规划（LangGraph）和层次规划（HTN）。
- **Google Cloud（2025）**：规划能力是 Agent 的核心能力，支持任务分解、依赖管理和状态追踪。
- **LangChain（2025）**：LangGraph 提供了基于图的规划能力，支持复杂的状态转换和分支逻辑。

**工程定义**

在实际工程中，规划模块通常负责：

1. **任务分解**：将复杂任务分解为可执行的子任务
2. **依赖管理**：管理子任务之间的依赖关系
3. **状态管理**：跟踪当前状态和目标状态
4. **重新规划**：根据执行结果和错误进行重新规划

#### 规划类型

规划模块可以根据时间跨度和规划方法分为不同类型：

| 规划类型 | 核心问题 | 典型算法 | 应用场景 |
|----------|----------|----------|----------|
| **短期规划** | 如何分解当前任务并执行 | CoT、ReAct、ToT | 单步推理、即时决策 |
| **长期规划** |如何管理长时间跨度的任务 | LangGraph、状态机、检查点 | 复杂项目、长期目标 |
| **层次规划** | 如何分解层次化任务 | HTN、任务图、PDDL | 任务调度、项目管理 |
| **自适应规划** | 如何根据反馈动态调整规划 | RLIL、强化学习、在线规划 | 动态环境、不确定任务 |

**短期规划**（来源：2024-2025 年最新研究）

短期规划是指 Agent 在当前上下文中进行即时推理和决策，典型的规划方法包括：

- **CoT（Chain of Thought）**：思维链，通过逐步推理解决问题。
- **ReAct（Reasoning + Acting）**：推理+行动循环，交替进行推理和行动。
- **ToT（Tree of Thoughts）**：思想树，探索多个可能的推理路径。

**长期规划**（来源：2024-2025 年最新研究）

长期规划是指 Agent 管理长时间跨度的任务，典型的规划方法包括：

- **LangGraph**：基于图的 Agent 工作流管理，支持复杂的状态转换和分支逻辑。
- **状态机**：使用有限状态机管理 Agent 的状态转换。
- **检查点机制**：保存和恢复 Agent 的状态，支持长时间运行的任务。

**层次规划**（来源：2024-2025 年最新研究）

层次规划是指 Agent 使用层次化方法分解任务，典型的规划方法包括：

- **HTN（Hierarchical Task Network）**：层次化任务网络，将任务分解为子任务。
- **任务图**：使用有向无环图（DAG）表示任务之间的依赖关系。
- **PDDL（Planning Domain Definition Language）**：规划领域定义语言，用于形式化规划问题。

#### 规划算法

规划算法是规划模块的核心，不同的规划算法适用于不同的场景。以下是几种常见的规划算法：

**1. CoT（Chain of Thought）思维链**

CoT 是一种基于 LLM 的推理方法，通过让模型逐步解释其推理过程，提高复杂问题的解决能力。

**原理**：
1. 将复杂问题分解为多个子问题
2. 逐步解决每个子问题
3. 将子问题的解组合成最终答案

**优势**：
- 提高复杂问题的解决能力
- 提供可解释的推理过程
- 易于与 LLM 集成

**劣势**：
- 增加推理成本（更多的 tokens）
- 可能产生幻觉
- 不适用于所有类型的任务

**2. ReAct（Reasoning + Acting）推理+行动循环**

ReAct 是一种结合推理和行动的规划方法，通过交替进行推理和行动，逐步达成目标。

**原理**：
1. **推理**：分析当前状态和目标
2. **行动**：执行具体操作
3. **观察**：观察行动结果
4. **循环**：重复直到达到目标

**优势**：
- 兼具推理能力和行动能力
- 适用于工具调用场景
- 支持动态调整规划

**劣势**：
- 可能陷入无限循环
- 工具调用失败时难以恢复
- 需要精心设计 Prompt

**3. LangGraph 基于图的规划**

LangGraph 是 LangChain 推出的基于图的 Agent 工作流管理框架，支持复杂的状态转换和分支逻辑。

**原理**：
- **节点**：执行操作的函数
- **边**：连接节点的转换逻辑
- **状态**：节点间传递的数据
- **检查点**：保存和恢复状态

**优势**：
- 可视化工作流
- 支持复杂的状态转换
- 支持检查点恢复
- 易于调试和监控

**劣势**：
- 学习曲线较陡
- 需要定义图结构
- 状态管理复杂

#### 规划挑战

规划模块在实际应用中面临多种挑战：

| 挑战 | 描述 | 解决方案 |
|------|------|----------|
| **规划失败** | Agent 无法找到可行的规划 | 使用回溯机制、降级策略、人机协作 |
| **无限循环** | Agent 陷入循环，无法达成目标 | 设置循环次数限制、状态去重、启发式剪枝 |
| **有限上下文** | LLM 的上下文窗口有限，无法处理长期规划 | 使用记忆系统、摘要机制、分段规划 |
| **规划空间爆炸** | 搜索空间太大，计算复杂度高 | 使用启发式搜索、剪枝策略、层次规划 |

**规划失败**（来源：2024-2025 年最新研究）

- **解决方案**：实现回溯机制（Backtracking）、降级策略（Fallback Strategy）、人机协作（Human-in-the-loop）。

**无限循环**（来源：2024-2025 年最新研究）

- **解决方案**：设置循环次数限制（Max Iterations）、状态去重（State Deduplication）、启发式剪枝（Heuristic Pruning）。

**有限上下文**（来源：2024-2025 年最新研究）

- **解决方案**：使用记忆系统（Memory System）、摘要机制（Summarization）、分段规划（Segmented Planning）。

#### 规划最佳实践

基于 2024-2025 年的工程实践和研究成果：

1. **根据任务特点选择合适的规划算法**：
   - 简单任务：CoT
   - 工具调用任务：ReAct
   - 复杂任务：LangGraph

2. **实现规划的动态调整和重新规划**：
   - 监控执行状态
   - 根据错误反馈重新规划
   - 支持人机协作

3. **使用启发式信息优化规划效率**：
   - 使用启发式函数（Heuristic Function）
   - 使用剪枝策略（Pruning Strategy）
   - 使用缓存机制（Caching）

4. **建立规划追踪和监控系统**：
   - 记录规划步骤
   - 监控执行时间
   - 分析规划失败原因

#### 代码示例 1：LangGraph 规划

以下代码示例展示如何使用 LangGraph 实现工作流规划：

```python
from langchain.graph import StateGraph, END
from langchain_openai import ChatOpenAI
from typing import TypedDict, List, Optional
import operator

class AgentState(TypedDict):
    """
    Agent 状态定义

    Args:
        messages: 消息列表
        current_step: 当前步骤
        plan: 规划列表
        completed: 是否完成
    """
    messages: List[str]
    current_step: int
    plan: List[str]
    completed: bool

class LangGraphPlanner:
    """基于 LangGraph 的规划器"""

    def __init__(self, model_name: str = "gpt-4"):
        self.llm = ChatOpenAI(model=model_name, temperature=0.0)
        self.graph = self._build_graph()

    def _build_graph(self) -> StateGraph:
        """
        构建规划图

        Returns:
            StateGraph 对象
        """
        # 创建状态图
        workflow = StateGraph(AgentState)

        # 添加节点
        workflow.add_node("planner", self._planner_node)
        workflow.add_node("executor", self._executor_node)
        workflow.add_node("evaluator", self._evaluator_node)

        # 添加边
        workflow.set_entry_point("planner")
        workflow.add_edge("planner", "executor")
        workflow.add_edge("executor", "evaluator")

        # 添加条件边
        workflow.add_conditional_edges(
            "evaluator",
            self._should_continue,
            {
                "continue": "executor",
                "end": END
            }
        )

        # 编译图
        return workflow.compile()

    def _planner_node(self, state: AgentState) -> AgentState:
        """
        规划节点：生成规划

        Args:
            state: 当前状态

        Returns:
            更新后的状态
        """
        # 从消息中提取目标
        messages = state["messages"]
        objective = messages[-1] if messages else ""

        # 使用 LLM 生成规划
        prompt = f"""
        目标：{objective}

        请生成一个详细的规划，包括多个步骤。
        每个步骤应该明确、可执行。

        输出格式：
        步骤1: ...
        步骤2: ...
        步骤3: ...
        """
        response = self.llm.invoke(prompt)
        plan = self._parse_plan(response.content)

        # 更新状态
        new_state = state.copy()
        new_state["plan"] = plan
        new_state["current_step"] = 0
        new_state["messages"].append(f"规划: {plan}")

        return new_state

    def _executor_node(self, state: AgentState) -> AgentState:
        """
        执行节点：执行当前步骤

        Args:
            state: 当前状态

        Returns:
            更新后的状态
        """
        plan = state["plan"]
        current_step = state["current_step"]

        if current_step < len(plan):
            step = plan[current_step]
            # 模拟执行
            result = f"执行步骤 {current_step + 1}: {step}"

            # 更新状态
            new_state = state.copy()
            new_state["messages"].append(result)
            new_state["current_step"] = current_step + 1

            return new_state
        else:
            return state

    def _evaluator_node(self, state: AgentState) -> AgentState:
        """
        评估节点：评估是否需要继续

        Args:
            state: 当前状态

        Returns:
            更新后的状态
        """
        current_step = state["current_step"]
        plan = state["plan"]

        # 检查是否完成
        completed = current_step >= len(plan)

        # 使用 LLM 评估
        if not completed:
            messages = state["messages"]
            prompt = f"""
            当前状态：
            {messages[-1]}

            目标是否达成？
            如果达成，返回"完成"。
            如果未达成，返回"继续"。
            """
            response = self.llm.invoke(prompt)
            completed = "完成" in response.content

        # 更新状态
        new_state = state.copy()
        new_state["completed"] = completed

        return new_state

    def _should_continue(self, state: AgentState) -> str:
        """
        判断是否继续执行

        Args:
            state: 当前状态

        Returns:
            "continue" 或 "end"
        """
        return "continue" if not state["completed"] else "end"

    def _parse_plan(self, plan_text: str) -> List[str]:
        """
        解析规划文本

        Args:
            plan_text: 规划文本

        Returns:
            规划步骤列表
        """
        lines = plan_text.strip().split('\n')
        plan = []
        for line in lines:
            if ':' in line:
                step = line.split(':', 1)[1].strip()
                if step:
                    plan.append(step)
        return plan

    def run(self, objective: str, max_iterations: int = 10) -> AgentState:
        """
        运行规划

        Args:
            objective: 目标
            max_iterations: 最大迭代次数

        Returns:
            最终状态
        """
        initial_state = {
            "messages": [objective],
            "current_step": 0,
            "plan": [],
            "completed": False
        }

        # 执行图
        result = self.graph.invoke(initial_state)

        return result

# 使用示例
if __name__ == "__main__":
    # 初始化规划器
    planner = LangGraphPlanner(model_name="gpt-4")

    # 运行规划
    objective = "帮我规划一个北京到上海的 3 天旅行"
    result = planner.run(objective)

    print("规划结果：")
    for message in result["messages"]:
        print(f"  {message}")

    print(f"\n是否完成: {result['completed']}")
```

#### 代码示例 2：ReAct 规划

以下代码示例展示如何使用 LangChain 实现 ReAct 推理+行动循环：

```python
from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor, create_react_agent
from langchain.tools import Tool
from typing import List, Dict, Any

class ReActPlanner:
    """基于 ReAct 的规划器"""

    def __init__(self, model_name: str = "gpt-4"):
        self.llm = ChatOpenAI(model=model_name, temperature=0.0)
        self.tools = self._create_tools()
        self.agent = self._create_agent()

    def _create_tools(self) -> List[Tool]:
        """
        创建工具列表

        Returns:
            工具列表
        """
        def search_web(query: str) -> str:
            """搜索网络"""
            # 模拟搜索
            return f"搜索结果：关于 '{query}' 的相关信息"

        def get_weather(city: str) -> str:
            """获取天气"""
            # 模拟天气 API
            return f"{city} 的天气：晴天，温度 25°C"

        def book_hotel(city: str, days: int) -> str:
            """预订酒店"""
            # 模拟预订
            return f"已在 {city} 预订 {days} 天的酒店"

        return [
            Tool(
                name="Search",
                func=search_web,
                description="搜索网络获取信息，输入：搜索查询"
            ),
            Tool(
                name="GetWeather",
                func=get_weather,
                description="获取指定城市的天气，输入：城市名称"
            ),
            Tool(
                name="BookHotel",
                func=book_hotel,
                description="预订酒店，输入：城市名称，天数"
            )
        ]

    def _create_agent(self):
        """
        创建 ReAct Agent

        Returns:
            AgentExecutor 对象
        """
        from langchain import hub

        # 加载 ReAct Prompt
        prompt = hub.pull("hwchase17/react")

        # 创建 Agent
        agent = create_react_agent(
            llm=self.llm,
            tools=self.tools,
            prompt=prompt
        )

        # 创建 Agent Executor
        agent_executor = AgentExecutor(
            agent=agent,
            tools=self.tools,
            verbose=True,
            max_iterations=10,
            handle_parsing_errors=True
        )

        return agent_executor

    def run(self, objective: str) -> Dict[str, Any]:
        """
        运行 ReAct 循环

        Args:
            objective: 目标

        Returns:
            执行结果
        """
        result = self.agent.invoke({"input": objective})
        return result

    def run_with_history(self, objective: str, history: List[Dict[str, str]]) -> Dict[str, Any]:
        """
        带历史记录运行 ReAct 循环

        Args:
            objective: 目标
            history: 历史对话

        Returns:
            执行结果
        """
        # 构建输入
        input_text = objective
        for msg in history:
            input_text += f"\n历史: {msg}"

        result = self.agent.invoke({"input": input_text})
        return result

# 使用示例
if __name__ == "__main__":
    # 初始化 ReAct 规划器
    planner = ReActPlanner(model_name="gpt-4")

    # 运行规划
    objective = "帮我规划一个北京到上海的旅行，查询天气并预订酒店"
    result = planner.run(objective)

    print("规划结果：")
    print(result["output"])

    # 带历史记录运行
    history = [
        {"role": "user", "content": "我想去上海旅游"},
        {"role": "assistant", "content": "好的，我可以帮你规划上海旅行"}
    ]
    result_with_history = planner.run_with_history(objective, history)
    print("\n带历史记录的规划结果：")
    print(result_with_history["output"])
```

#### 规划算法对比表

| 规划算法 | 技术原理 | 适用场景 | 优势 | 劣势 |
|----------|----------|----------|------|------|
| **CoT** | 思维链，逐步推理 | 单步推理、即时决策 | 简单、易用、成本低 | 长期规划能力弱 |
| **ReAct** | 推理+行动循环 | 工具调用、动态规划 | 支持工具调用、可调整 | 可能陷入循环 |
| **LangGraph** | 基于图的规划 | 复杂任务、长期规划 | 可视化、状态管理、检查点 | 学习曲线陡 |

---

### 2.1.3 行动模块（Action）

行动模块负责执行具体操作，将 Agent 的决策转换为对环境的影响。行动模块是 Agent 的"手脚"，负责执行 Agent 的决策。

#### 行动的定义

行动（Action）是指 Agent 根据规划结果执行的具体操作，包括工具调用、消息发送、状态更新等。行动模块需要确保行动的原子性、幂等性和可观测性。

**学术定义**（来源：2024-2025 年最新研究）

- **LangChain（2025）**：行动是 Agent 的核心能力之一，通过工具调用（Tool Calling）扩展 Agent 的能力，支持同步执行和异步执行。
- **Azure（2025）**：行动执行是 Agentic AI 的关键设计模式，需要处理工具错误、网络延迟和资源竞争等问题。

**工程定义**

在实际工程中，行动模块通常负责：

1. **行动选择**：从规划模块选择要执行的行动
2. **参数设置**：根据规划结果设置行动参数
3. **执行**：执行行动（调用工具、发送消息、更新状态）
4. **结果获取**：获取行动执行结果
5. **错误处理**：处理执行失败、重试、降级

#### 行动类型

行动模块可以执行多种类型的操作：

| 行动类型 | 示例 | 技术实现 | 应用场景 |
|----------|----------|----------|----------|
| **工具调用** | 调用 API、执行函数 | HTTP、gRPC、函数调用 | 数据查询、外部服务集成 |
| **消息发送** | 发送消息给用户或其他 Agent | 消息队列、WebSocket、Email | 通知、协作、提醒 |
| **状态更新** | 更新数据库、文件系统 | SQL、NoSQL、文件操作 | 数据持久化、状态管理 |
| **流式输出** | 实时输出文本、数据 | SSE、WebSocket Stream | 实时对话、进度展示 |

**工具调用**（来源：2024-2025 年最新研究）

工具调用（Tool Calling）是 Agent 的核心能力，使 Agent 能够调用外部工具完成任务。LangChain 提供了完善的工具调用支持：

- **工具注册**：使用 `@tool` 装饰器注册自定义工具
- **工具选择**：Agent 根据任务需求智能选择工具
- **工具参数优化**：自动设置工具参数
- **工具错误处理**：处理工具调用失败、超时、限流

**异步行动**（来源：2024-2025 年最新研究）

异步行动是指 Agent 使用异步编程模型并发执行多个行动，提高执行效率：

- **Python asyncio**：使用 `async/await` 实现异步行动
- **并发执行**：同时执行多个独立的行动
- **任务队列**：使用任务队列管理异步行动

#### 行动执行流程

行动模块的执行流程可以分为五个步骤：

```
行动选择 → 参数设置 → 执行 → 结果获取 → 错误处理
```

1. **行动选择**：从规划模块选择要执行的行动
   - 根据规划结果选择行动类型
   - 确定行动的优先级和依赖关系

2. **参数设置**：根据规划结果设置行动参数
   - 验证参数的完整性和有效性
   - 设置超时和重试策略

3. **执行**：执行行动
   - 同步执行：等待行动完成
   - 异步执行：并发执行多个行动

4. **结果获取**：获取行动执行结果
   - 解析结果数据
   - 记录执行时间和资源消耗

5. **错误处理**：处理执行失败
   - 重试机制：临时性错误重试
   - 降级机制：使用备用方案
   - 人机协作：无法恢复时请求人工介入

#### 行动挑战

行动模块在实际应用中面临多种挑战：

| 挑战 | 描述 | 解决方案 |
|------|------|----------|
| **执行失败** | 行动可能因为各种原因失败 | 使用重试机制和错误处理 |
| **并发控制** | 多个行动可能并发执行 | 使用锁、信号量、消息队列 |
| **资源竞争** | 多个 Agent 可能竞争同一资源 | 使用资源锁、分布式锁 |
| **副作用** | 行动可能产生非预期的副作用 | 使用事务机制和回滚策略 |

**执行失败**（来源：2024-2025 年最新研究）

- **解决方案**：实现重试机制（Retry Mechanism）、错误分类（Error Classification）、降级策略（Fallback Strategy）。

**并发控制**（来源：2024-2025 年最新研究）

- **解决方案**：使用锁（Locks）、信号量（Semaphores）、消息队列（Message Queues）。

**资源竞争**（来源：2024-2025 年最新研究）

- **解决方案**：使用资源锁（Resource Locks）、分布式锁（Distributed Locks）、资源调度（Resource Scheduling）。

#### 行动最佳实践

基于 2024-2025 年的工程实践和研究成果：

1. **实现行动的原子性和幂等性**：
   - 原子性：行动要么全部成功，要么全部失败
   - 幂等性：多次执行相同行动的结果一致

2. **使用重试机制处理临时性错误**：
   - 指数退避（Exponential Backoff）
   - 最大重试次数限制
   - 错误分类（临时性错误 vs 永久性错误）

3. **实现行动执行的监控和日志记录**：
   - 记录行动的开始时间、结束时间
   - 记录行动的参数和结果
   - 记录错误和重试次数

4. **使用事务机制保证数据一致性**：
   - 数据库事务（Database Transactions）
   - 分布式事务（Distributed Transactions）
   - 补偿事务（Compensating Transactions）

#### 代码示例 1：LangChain 工具调用

以下代码示例展示如何使用 LangChain 实现工具调用：

```python
from langchain.tools import tool
from langchain_openai import ChatOpenAI
from langchain.agents import create_tool_calling_agent, AgentExecutor
from typing import List, Dict, Any
import requests
import json

class ToolCallingActionModule:
    """基于 LangChain 的工具调用行动模块"""

    def __init__(self, model_name: str = "gpt-4"):
        self.llm = ChatOpenAI(model=model_name, temperature=0.0)
        self.tools = self._create_tools()
        self.agent = self._create_agent()

    def _create_tools(self) -> List:
        """
        创建工具列表

        Returns:
            工具列表
        """
        @tool
        def search_web(query: str) -> str:
            """
            搜索网络获取信息

            Args:
                query: 搜索查询

            Returns:
                搜索结果
            """
            # 模拟搜索
            print(f"[工具调用] 搜索网络：{query}")
            return f"搜索结果：关于 '{query}' 的相关信息"

        @tool
        def get_weather(city: str) -> str:
            """
            获取指定城市的天气

            Args:
                city: 城市名称

            Returns:
                天气信息
            """
            # 模拟天气 API
            print(f"[工具调用] 获取天气：{city}")
            return f"{city} 的天气：晴天，温度 25°C"

        @tool
        def book_hotel(city: str, days: int) -> str:
            """
            预订酒店

            Args:
                city: 城市名称
                days: 预订天数

            Returns:
                预订结果
            """
            # 模拟预订
            print(f"[工具调用] 预订酒店：{city}, {days} 天")
            return f"已在 {city} 预订 {days} 天的酒店"

        @tool
        def call_api(url: str, method: str = "GET", data: Dict = None) -> str:
            """
            调用外部 API

            Args:
                url: API 地址
                method: HTTP 方法（GET/POST）
                data: 请求数据（POST 时使用）

            Returns:
                API 响应
            """
            print(f"[工具调用] 调用 API：{method} {url}")
            try:
                if method.upper() == "GET":
                    response = requests.get(url, timeout=10)
                else:
                    response = requests.post(url, json=data, timeout=10)

                return json.dumps({
                    "status_code": response.status_code,
                    "data": response.json() if 'application/json' in response.headers.get('content-type', '') else response.text
                })
            except requests.exceptions.Timeout:
                return json.dumps({"error": "请求超时", "retry_possible": True})
            except Exception as e:
                return json.dumps({"error": str(e), "retry_possible": False})

        return [search_web, get_weather, book_hotel, call_api]

    def _create_agent(self):
        """
        创建工具调用 Agent

        Returns:
            AgentExecutor 对象
        """
        from langchain import hub

        # 加载工具调用 Prompt
        prompt = hub.pull("hwchase17/openai-tools-agent")

        # 创建 Agent
        agent = create_tool_calling_agent(
            llm=self.llm,
            tools=self.tools,
            prompt=prompt
        )

        # 创建 Agent Executor
        agent_executor = AgentExecutor(
            agent=agent,
            tools=self.tools,
            verbose=True,
            max_iterations=10,
            handle_parsing_errors=True,
            return_intermediate_steps=True
        )

        return agent_executor

    def execute(self, objective: str) -> Dict[str, Any]:
        """
        执行行动

        Args:
            objective: 目标

        Returns:
            执行结果
        """
        result = self.agent.invoke({"input": objective})

        return {
            "output": result["output"],
            "intermediate_steps": result.get("intermediate_steps", []),
            "success": True
        }

    def execute_with_retry(self, objective: str, max_retries: int = 3) -> Dict[str, Any]:
        """
        带重试的执行

        Args:
            objective: 目标
            max_retries: 最大重试次数

        Returns:
            执行结果
        """
        for attempt in range(max_retries):
            try:
                result = self.execute(objective)
                return result
            except Exception as e:
                print(f"[重试] 第 {attempt + 1}/{max_retries} 次尝试失败：{e}")
                if attempt == max_retries - 1:
                    return {
                        "success": False,
                        "error": str(e),
                        "max_retries_reached": True
                    }
                # 等待一段时间后重试
                import time
                time.sleep(2 ** attempt)  # 指数退避

# 使用示例
if __name__ == "__main__":
    # 初始化行动模块
    action_module = ToolCallingActionModule(model_name="gpt-4")

    # 执行行动
    objective = "帮我规划一个北京到上海的旅行，查询天气并预订酒店"
    result = action_module.execute(objective)

    print("\n执行结果：")
    print(f"输出：{result['output']}")
    print(f"中间步骤：{len(result['intermediate_steps'])} 个")

    # 带重试的执行
    # result_with_retry = action_module.execute_with_retry(objective)
    # print("\n带重试的执行结果：", result_with_retry)
```

#### 代码示例 2：异步行动

以下代码示例展示如何使用 asyncio 实现异步行动：

```python
import asyncio
from typing import List, Dict, Any
import aiohttp
import time

class AsyncActionModule:
    """异步行动模块"""

    def __init__(self):
        self.action_history = []

    async def execute_action(self, action: Dict[str, Any]) -> Dict[str, Any]:
        """
        执行单个行动

        Args:
            action: 行动配置

        Returns:
            执行结果
        """
        action_type = action.get("type")

        try:
            if action_type == "api_call":
                result = await self._execute_api_call(action)
            elif action_type == "message_send":
                result = await self._execute_message_send(action)
            elif action_type == "state_update":
                result = await self._execute_state_update(action)
            else:
                result = {"success": False, "error": f"Unknown action type: {action_type}"}

            # 记录行动历史
            self.action_history.append({
                "action": action,
                "result": result,
                "timestamp": time.time()
            })

            return result

        except Exception as e:
            error_result = {
                "success": False,
                "error": str(e),
                "retry_possible": self._is_retry_possible(e)
            }
            self.action_history.append({
                "action": action,
                "result": error_result,
                "timestamp": time.time()
            })
            return error_result

    async def _execute_api_call(self, action: Dict[str, Any]) -> Dict[str, Any]:
        """
        执行 API 调用（异步）

        Args:
            action: 行动配置

        Returns:
            执行结果
        """
        url = action.get("url")
        method = action.get("method", "GET")
        headers = action.get("headers", {})
        data = action.get("data")
        timeout = action.get("timeout", 10)

        print(f"[异步行动] API 调用：{method} {url}")

        try:
            async with aiohttp.ClientSession() as session:
                if method.upper() == "GET":
                    async with session.get(url, headers=headers, timeout=aiohttp.ClientTimeout(total=timeout)) as response:
                        data = await response.json() if 'application/json' in response.headers.get('content-type', '') else await response.text()
                        return {
                            "success": True,
                            "status_code": response.status,
                            "data": data
                        }
                else:
                    async with session.post(url, headers=headers, json=data, timeout=aiohttp.ClientTimeout(total=timeout)) as response:
                        data = await response.json() if 'application/json' in response.headers.get('content-type', '') else await response.text()
                        return {
                            "success": True,
                            "status_code": response.status,
                            "data": data
                        }
        except asyncio.TimeoutError:
            return {
                "success": False,
                "error": "Request timeout",
                "retry_possible": True
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "retry_possible": True
            }

    async def _execute_message_send(self, action: Dict[str, Any]) -> Dict[str, Any]:
        """
        发送消息（异步）

        Args:
            action: 行动配置

        Returns:
            执行结果
        """
        recipient = action.get("recipient")
        message = action.get("message")
        channel = action.get("channel")

        print(f"[异步行动] 发送消息：{channel} -> {recipient}")

        # 模拟异步发送
        await asyncio.sleep(0.5)

        return {
            "success": True,
            "message_id": f"msg_{int(time.time())}",
            "recipient": recipient,
            "channel": channel
        }

    async def _execute_state_update(self, action: Dict[str, Any]) -> Dict[str, Any]:
        """
        更新状态（异步）

        Args:
            action: 行动配置

        Returns:
            执行结果
        """
        state_type = action.get("state_type")
        data = action.get("data")

        print(f"[异步行动] 更新状态：{state_type}")

        # 模拟异步更新
        await asyncio.sleep(0.3)

        return {
            "success": True,
            "state_type": state_type,
            "updated_at": time.time()
        }

    def _is_retry_possible(self, error: Exception) -> bool:
        """
        判断是否可以重试

        Args:
            error: 错误对象

        Returns:
            是否可以重试
        """
        # 网络错误、超时等可以重试
        return isinstance(error, (asyncio.TimeoutError, aiohttp.ClientError))

    async def execute_parallel(self, actions: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        并行执行多个行动

        Args:
            actions: 行动列表

        Returns:
            执行结果列表
        """
        print(f"[异步行动] 并行执行 {len(actions)} 个行动")

        # 并行执行所有行动
        tasks = [self.execute_action(action) for action in actions]
        results = await asyncio.gather(*tasks, return_exceptions=True)

        # 处理异常
        formatted_results = []
        for i, result in enumerate(results):
            if isinstance(result, Exception):
                formatted_results.append({
                    "success": False,
                    "error": str(result),
                    "action_index": i
                })
            else:
                formatted_results.append(result)

        return formatted_results

    async def execute_sequential(self, actions: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        顺序执行多个行动

        Args:
            actions: 行动列表

        Returns:
            执行结果列表
        """
        print(f"[异步行动] 顺序执行 {len(actions)} 个行动")

        results = []
        for action in actions:
            result = await self.execute_action(action)
            results.append(result)

            # 如果行动失败，可以选择中断或继续
            if not result.get("success") and not result.get("retry_possible", False):
                print(f"[异步行动] 行动失败且不可重试，中断执行")
                break

        return results

    def get_action_history(self) -> List[Dict[str, Any]]:
        """
        获取行动历史

        Returns:
            行动历史列表
        """
        return self.action_history

# 使用示例
async def main():
    # 初始化异步行动模块
    async_module = AsyncActionModule()

    # 顺序执行
    actions = [
        {"type": "api_call", "url": "https://api1.com"},
        {"type": "api_call", "url": "https://api2.com"},
        {"type": "message_send", "recipient": "user@example.com", "message": "Hello", "channel": "email"}
    ]
    sequential_results = await async_module.execute_sequential(actions)
    print("\n顺序执行结果：")
    for i, result in enumerate(sequential_results):
        print(f"  行动 {i + 1}: {result['success']}")

    # 并行执行
    actions_parallel = [
        {"type": "api_call", "url": "https://api1.com"},
        {"type": "api_call", "url": "https://api2.com"},
        {"type": "api_call", "url": "https://api3.com"}
    ]
    parallel_results = await async_module.execute_parallel(actions_parallel)
    print("\n并行执行结果：")
    for i, result in enumerate(parallel_results):
        print(f"  行动 {i + 1}: {result['success']}")

if __name__ == "__main__":
    # 运行异步示例
    asyncio.run(main())
```

#### 行动执行方式对比表

| 执行方式 | 性能 | 复杂度 | 适用场景 |
|----------|------|--------|----------|
| **同步执行** | 较低 | 低 | 简单任务、依赖关系强 |
| **异步执行** | 高 | 中高 | 并行任务、需要提高效率 |
| **批量执行** | 中 | 中 | 批量操作、需要减少网络调用 |

---

### 2.1.4 记忆模块（Memory）

记忆模块负责存储和检索历史信息，为 Agent 提供上下文和经验。记忆模块是 Agent 的"记忆"，类似于人类的短期记忆和长期记忆。

#### 记忆的定义

记忆（Memory）是指 Agent 存储和检索历史信息的能力，包括对话历史、任务历史、用户偏好等。记忆模块使 Agent 能够记住过去的信息，提供更好的上下文感知和个性化服务。

**学术定义**（来源：2024-2025 年最新研究）

- **LangChain（2024）**：记忆是 Agent 的核心能力，使用向量存储（Vector Store）和语义检索实现高效的记忆管理。
- **CoALA（2024）**：将人类记忆类型（Working Memory、Episodic Memory、Semantic Memory、Procedural Memory）映射到 Agent 记忆系统。

**工程定义**

在实际工程中，记忆模块通常负责：

1. **记忆存储**：将信息存储到合适的存储介质（内存、向量数据库、关系数据库）
2. **记忆检索**：根据查询检索相关的历史信息
3. **记忆管理**：管理记忆的生命周期（创建、更新、删除、过期）
4. **记忆优化**：优化记忆的存储和检索效率

#### 记忆类型

记忆模块可以根据存储方式和用途分为不同类型：

| 记忆类型 | 作用 | 存储方式 | 典型应用 |
|----------|------|----------|----------|
| **工作记忆** | 当前任务的状态信息 | 内存、Redis | 实时决策、上下文维护 |
| **情景记忆** | 具体事件和经历的记录 | 向量数据库、时序数据库 | 对话历史、任务历史 |
| **语义记忆** | 通用知识和概念的存储 | 知识图谱、向量数据库 | 领域知识、概念定义 |
| **程序记忆** | 技能和过程的记忆 | 代码库、脚本库 | 熟练任务、最佳实践 |

**工作记忆**（来源：2024-2025 年最新研究）

工作记忆（Working Memory）是 Agent 的短期记忆，用于存储当前任务的状态信息：

- **ConversationBufferMemory**：存储对话历史
- **InMemoryStore**：内存存储，快速访问
- **Redis**：高性能键值存储，适合分布式场景

**情景记忆**（来源：2024-2025 年最新研究）

情景记忆（Episodic Memory）是 Agent 的事件记忆，用于记录具体事件和经历：

- **向量数据库**：ChromaDB、Pinecone、Weaviate
- **时序数据库**：TimescaleDB、InfluxDB
- **语义检索**：基于向量相似度的检索

**语义记忆**（来源：2024-2025 年最新研究）

语义记忆（Semantic Memory）是 Agent 的知识记忆，用于存储通用知识和概念：

- **知识图谱**：Neo4j、Amazon Neptune
- **向量数据库**：存储知识的向量表示
- **知识库**：结构化的知识存储

**程序记忆**（来源：2024-2025 年最新研究）

程序记忆（Procedural Memory）是 Agent 的技能记忆，用于存储技能和过程：

- **代码库**：Git 仓库、代码版本控制
- **脚本库**：可重用的脚本和工具
- **工具优化**：从使用中积累经验

#### 记忆存储方式

记忆模块可以使用多种存储方式：

| 存储方式 | 优势 | 劣势 | 适用场景 |
|----------|------|------|----------|
| **内存存储** | 速度快、实现简单 | 容量小、重启丢失 | 临时数据、工作记忆 |
| **向量存储** | 语义检索、高效相似度计算 | 存储成本高、需要嵌入模型 | 情景记忆、语义记忆 |
| **数据库存储** | 持久化、支持复杂查询 | 性能较低、需要 schema 设计 | 长期存储、结构化数据 |

**向量存储**（来源：2024-2025 年最新研究）

向量存储是 Agent 记忆的核心技术，通过将文本转换为向量，实现语义检索：

- **ChromaDB**：开源向量数据库，易于使用
- **Pinecone**：托管向量数据库服务
- **Weaviate**：开源向量数据库，支持多模态
- **FAISS**：Facebook 的向量检索库

#### 记忆检索方式

记忆模块可以使用多种检索方式：

| 检索方式 | 原理 | 优势 | 劣势 |
|----------|------|------|------|
| **基于关键词** | 关键词匹配、BM25 | 快速、简单 | 语义理解能力弱 |
| **基于语义** | 向量检索、余弦相似度 | 语义理解能力强 | 计算成本高 |
| **混合检索** | 关键词 + 向量检索 | 综合优势 | 实现复杂 |

#### 记忆挑战

记忆模块在实际应用中面临多种挑战：

| 挑战 | 描述 | 解决方案 |
|------|------|----------|
| **记忆容量限制** | 如何管理有限的记忆容量 | 记忆分层（热数据、温数据、冷数据） |
| **记忆检索效率** | 如何快速检索相关信息 | 使用索引和向量数据库 |
| **记忆一致性** | 如何保证记忆的一致性 | 使用事务机制和版本控制 |
| **记忆遗忘机制** | 如何选择性地遗忘过时信息 | 使用重要性评分和时间衰减 |

**记忆容量限制**（来源：2024-2025 年最新研究）

- **解决方案**：记忆分层（Memory Tiering）、数据压缩（Data Compression）、记忆摘要（Memory Summarization）。

**记忆检索效率**（来源：2024-2025 年最新研究）

- **解决方案**：使用索引（Indexing）、向量数据库（Vector Database）、缓存机制（Caching）。

#### 记忆最佳实践

基于 2024-2025 年的工程实践和研究成果：

1. **使用向量数据库进行语义检索**：
   - ChromaDB：开源、易于使用
   - Pinecone：托管服务、自动扩展
   - Weaviate：支持多模态

2. **实现记忆的分层存储（热数据、温数据、冷数据）**：
   - 热数据：内存存储（Redis）
   - 温数据：向量数据库（ChromaDB）
   - 冷数据：持久化存储（数据库）

3. **实现记忆的定期清理和压缩**：
   - 设置记忆过期时间（TTL）
   - 定期清理过期记忆
   - 使用记忆摘要压缩长记忆

4. **使用重要性评分机制管理记忆**：
   - 评估记忆的重要性（访问频率、时效性）
   - 优先保留重要记忆
   - 删除不重要的记忆

#### 代码示例 1：LangChain 记忆

以下代码示例展示如何使用 LangChain 实现记忆管理：

```python
from langchain.memory import (
    ConversationBufferMemory,
    ConversationSummaryMemory,
    VectorStoreRetrieverMemory,
)
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import Chroma
from typing import List, Dict, Any

class LangChainMemoryModule:
    """基于 LangChain 的记忆模块"""

    def __init__(self, model_name: str = "gpt-4"):
        self.llm = ChatOpenAI(model=model_name, temperature=0.0)
        self.embeddings = OpenAIEmbeddings()

        # 初始化不同类型的记忆
        self.buffer_memory = ConversationBufferMemory()
        self.summary_memory = ConversationSummaryMemory(llm=self.llm)
        self.vector_memory = self._create_vector_memory()

    def _create_vector_memory(self):
        """
        创建向量记忆

        Returns:
            VectorStoreRetrieverMemory 对象
        """
        # 创建向量数据库
        vectorstore = Chroma(
            collection_name="agent_memory",
            embedding_function=self.embeddings,
            persist_directory="./chroma_db"
        )

        # 创建向量记忆
        retriever = vectorstore.as_retriever(
            search_type="similarity",
            search_kwargs={"k": 5}  # 返回最相似的 5 条记忆
        )

        memory = VectorStoreRetrieverMemory(
            retriever=retriever,
            memory_key="chat_history",
            input_key="input",
            output_key="output"
        )

        return memory

    def add_message(self, user_message: str, ai_message: str) -> Dict[str, Any]:
        """
        添加消息到记忆

        Args:
            user_message: 用户消息
            ai_message: AI 消息

        Returns:
            添加结果
        """
        # 添加到 Buffer Memory
        self.buffer_memory.save_context(
            {"input": user_message},
            {"output": ai_message}
        )

        # 添加到 Summary Memory
        self.summary_memory.save_context(
            {"input": user_message},
            {"output": ai_message}
        )

        # 添加到 Vector Memory
        self.vector_memory.save_context(
            {"input": user_message},
            {"output": ai_message}
        )

        return {
            "success": True,
            "added_to": ["buffer", "summary", "vector"]
        }

    def get_buffer_memory(self) -> List[Dict[str, str]]:
        """
        获取 Buffer Memory（完整对话历史）

        Returns:
            对话历史列表
        """
        return self.buffer_memory.load_memory_variables({})["history"]

    def get_summary_memory(self) -> str:
        """
        获取 Summary Memory（对话摘要）

        Returns:
            对话摘要
        """
        return self.summary_memory.load_memory_variables({})["history"]

    def search_vector_memory(self, query: str, k: int = 5) -> List[Dict[str, Any]]:
        """
        搜索 Vector Memory（语义检索）

        Args:
            query: 查询文本
            k: 返回结果数量

        Returns:
            相关记忆列表
        """
        # 使用 Vector Memory 的 retriever 检索
        results = self.vector_memory.retriever.get_relevant_documents(query)

        # 格式化结果
        formatted_results = []
        for i, doc in enumerate(results[:k]):
            formatted_results.append({
                "index": i,
                "content": doc.page_content,
                "metadata": doc.metadata,
                "similarity": doc.metadata.get("similarity", 0.0)
            })

        return formatted_results

    def get_memory_summary(self) -> Dict[str, Any]:
        """
        获取记忆摘要

        Returns:
            记忆摘要
        """
        buffer_history = self.get_buffer_memory()
        summary_history = self.get_summary_memory()

        return {
            "buffer_messages": len(buffer_history) // 2,  # 对话对数
            "summary_length": len(summary_history),
            "vector_documents": self.vector_memory.retriever.index.index.ntotal
        }

    def clear_memory(self, memory_type: str = "all"):
        """
        清除记忆

        Args:
            memory_type: 记忆类型（"buffer"、"summary"、"vector"、"all"）
        """
        if memory_type in ["buffer", "all"]:
            self.buffer_memory.clear()

        if memory_type in ["summary", "all"]:
            self.summary_memory.clear()

        if memory_type in ["vector", "all"]:
            # Vector Memory 需要重新创建来清除
            self.vector_memory = self._create_vector_memory()

        return {"success": True, "cleared": memory_type}

# 使用示例
if __name__ == "__main__":
    # 初始化记忆模块
    memory_module = LangChainMemoryModule(model_name="gpt-4")

    # 添加消息
    messages = [
        ("用户", "我叫小明，喜欢编程"),
        ("AI", "你好小明！很高兴认识你，你喜欢什么编程语言？"),
        ("用户", "我喜欢 Python 和 JavaScript"),
        ("AI", "Python 和 JavaScript 都是很棒的语言！你最近在做什么项目？"),
        ("用户", "我正在做一个聊天机器人项目"),
    ]

    for i in range(0, len(messages), 2):
        user_msg, ai_msg = messages[i], messages[i + 1]
        result = memory_module.add_message(user_msg[1], ai_msg[1])
        print(f"添加消息 {i // 2 + 1}: {result}")

    # 获取 Buffer Memory
    print("\nBuffer Memory（完整对话）：")
    buffer = memory_module.get_buffer_memory()
    for msg in buffer:
        print(f"  {msg['role']}: {msg['content']}")

    # 获取 Summary Memory
    print("\nSummary Memory（对话摘要）：")
    summary = memory_module.get_summary_memory()
    print(f"  {summary}")

    # 搜索 Vector Memory
    print("\n搜索 Vector Memory（'编程'）：")
    search_results = memory_module.search_vector_memory("编程", k=3)
    for result in search_results:
        print(f"  [{result['index']}] {result['content']} (相似度: {result['similarity']:.2f})")

    # 获取记忆摘要
    print("\n记忆摘要：")
    summary = memory_module.get_memory_summary()
    for key, value in summary.items():
        print(f"  {key}: {value}")
```

#### 代码示例 2：向量存储

以下代码示例展示如何使用 ChromaDB 实现向量存储和检索：

```python
import chromadb
from chromadb.config import Settings
from typing import List, Dict, Any
import openai
import time

class VectorStoreMemory:
    """基于 ChromaDB 的向量存储记忆"""

    def __init__(self, collection_name: str = "agent_memory", persist_directory: str = "./chroma_db"):
        self.collection_name = collection_name
        self.persist_directory = persist_directory

        # 初始化 ChromaDB 客户端
        self.client = chromadb.PersistentClient(path=persist_directory)

        # 创建或获取集合
        self.collection = self.client.get_or_create_collection(
            name=collection_name,
            metadata={"hnsw:space": "cosine"}  # 使用余弦相似度
        )

        # 初始化 OpenAI 客户端（用于嵌入）
        self.openai_client = openai.OpenAI()

    def _get_embedding(self, text: str) -> List[float]:
        """
        获取文本的向量嵌入

        Args:
            text: 输入文本

        Returns:
            向量嵌入
        """
        response = self.openai_client.embeddings.create(
            model="text-embedding-3-small",
            input=text
        )
        return response.data[0].embedding

    def add_memory(
        self,
        text: str,
        metadata: Dict[str, Any] = None,
        importance: float = 1.0
    ) -> Dict[str, Any]:
        """
        添加记忆

        Args:
            text: 记忆文本
            metadata: 元数据（可选）
            importance: 重要性评分（可选，0-1）

        Returns:
            添加结果
        """
        # 生成唯一 ID
        memory_id = f"mem_{int(time.time() * 1000)}_{hash(text) % 10000}"

        # 获取向量嵌入
        embedding = self._get_embedding(text)

        # 添加到向量数据库
        self.collection.add(
            documents=[text],
            embeddings=[embedding],
            metadatas=[{
                **(metadata or {}),
                "importance": importance,
                "timestamp": time.time()
            }],
            ids=[memory_id]
        )

        return {
            "success": True,
            "memory_id": memory_id,
            "importance": importance
        }

    def search_memory(
        self,
        query: str,
        n_results: int = 5,
        importance_threshold: float = 0.0
    ) -> List[Dict[str, Any]]:
        """
        搜索记忆

        Args:
            query: 查询文本
            n_results: 返回结果数量
            importance_threshold: 重要性阈值（只返回高于此阈值的记忆）

        Returns:
            相关记忆列表
        """
        # 获取查询向量
        query_embedding = self._get_embedding(query)

        # 搜索向量数据库
        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=n_results
        )

        # 格式化结果
        formatted_results = []
        for i in range(len(results["ids"][0])):
            memory_id = results["ids"][0][i]
            text = results["documents"][0][i]
            metadata = results["metadatas"][0][i]
            distance = results["distances"][0][i]

            # 计算相似度（余弦距离转相似度）
            similarity = 1 - distance

            # 检查重要性阈值
            if metadata.get("importance", 0.0) >= importance_threshold:
                formatted_results.append({
                    "memory_id": memory_id,
                    "text": text,
                    "metadata": metadata,
                    "similarity": similarity,
                    "distance": distance
                })

        return formatted_results

    def get_memory(self, memory_id: str) -> Dict[str, Any]:
        """
        获取指定记忆

        Args:
            memory_id: 记忆 ID

        Returns:
            记忆详情
        """
        results = self.collection.get(ids=[memory_id])

        if len(results["ids"]) == 0:
            return {"error": "Memory not found"}

        return {
            "memory_id": results["ids"][0],
            "text": results["documents"][0],
            "metadata": results["metadatas"][0]
        }

    def update_memory(
        self,
        memory_id: str,
        text: str = None,
        metadata: Dict[str, Any] = None,
        importance: float = None
    ) -> Dict[str, Any]:
        """
        更新记忆

        Args:
            memory_id: 记忆 ID
            text: 新文本（可选）
            metadata: 新元数据（可选）
            importance: 新重要性评分（可选）

        Returns:
            更新结果
        """
        # 获取现有记忆
        existing_memory = self.get_memory(memory_id)
        if "error" in existing_memory:
            return {"error": "Memory not found"}

        # 准备更新数据
        update_data = {}

        if text is not None:
            update_data["documents"] = [text]
            update_data["embeddings"] = [self._get_embedding(text)]

        if metadata is not None or importance is not None:
            existing_metadata = existing_memory["metadata"]
            if metadata is not None:
                existing_metadata.update(metadata)
            if importance is not None:
                existing_metadata["importance"] = importance
            update_data["metadatas"] = [existing_metadata]

        # 更新记忆
        if update_data:
            self.collection.update(
                ids=[memory_id],
                **update_data
            )

        return {"success": True, "memory_id": memory_id}

    def delete_memory(self, memory_id: str) -> Dict[str, Any]:
        """
        删除记忆

        Args:
            memory_id: 记忆 ID

        Returns:
            删除结果
        """
        self.collection.delete(ids=[memory_id])
        return {"success": True, "deleted_memory_id": memory_id}

    def clear_old_memories(
        self,
        days: int = 30,
        importance_threshold: float = 0.5
    ) -> Dict[str, Any]:
        """
        清除旧记忆

        Args:
            days: 天数阈值（删除超过此天数的记忆）
            importance_threshold: 重要性阈值（保留高于此阈值的记忆）

        Returns:
            清除结果
        """
        # 获取所有记忆
        all_memories = self.collection.get()

        # 计算时间阈值
        time_threshold = time.time() - (days * 24 * 60 * 60)

        # 找出需要删除的记忆 ID
        ids_to_delete = []
        for i in range(len(all_memories["ids"])):
            memory_id = all_memories["ids"][i]
            metadata = all_memories["metadatas"][i]
            timestamp = metadata.get("timestamp", time.time())
            importance = metadata.get("importance", 0.0)

            # 删除条件：旧且重要性低
            if timestamp < time_threshold and importance < importance_threshold:
                ids_to_delete.append(memory_id)

        # 删除记忆
        if ids_to_delete:
            self.collection.delete(ids=ids_to_delete)

        return {
            "success": True,
            "deleted_count": len(ids_to_delete),
            "deleted_ids": ids_to_delete
        }

    def get_memory_stats(self) -> Dict[str, Any]:
        """
        获取记忆统计信息

        Returns:
            统计信息
        """
        all_memories = self.collection.get()

        # 计算统计信息
        total_count = len(all_memories["ids"])
        importances = [m.get("importance", 0.0) for m in all_memories["metadatas"]]

        return {
            "total_memories": total_count,
            "avg_importance": sum(importances) / total_count if total_count > 0 else 0.0,
            "collection_name": self.collection_name
        }

# 使用示例
if __name__ == "__main__":
    # 初始化向量存储
    vector_store = VectorStoreMemory(collection_name="test_memory")

    # 添加记忆
    memories = [
        ("用户喜欢 Python 编程", {"type": "user_preference", "language": "python"}, 0.9),
        ("用户正在做一个聊天机器人项目", {"type": "project", "status": "ongoing"}, 0.8),
        ("用户想知道如何使用 LangChain", {"type": "query", "topic": "langchain"}, 0.7),
    ]

    for text, metadata, importance in memories:
        result = vector_store.add_memory(text, metadata, importance)
        print(f"添加记忆：{result}")

    # 搜索记忆
    print("\n搜索记忆（'编程'）：")
    search_results = vector_store.search_memory("编程", n_results=3)
    for result in search_results:
        print(f"  [{result['memory_id']}] {result['text']} (相似度: {result['similarity']:.2f}, 重要性: {result['metadata']['importance']})")

    # 获取统计信息
    print("\n记忆统计：")
    stats = vector_store.get_memory_stats()
    for key, value in stats.items():
        print(f"  {key}: {value}")

    # 清除旧记忆
    print("\n清除旧记忆（> 30 天，重要性 < 0.5）：")
    clear_result = vector_store.clear_old_memories(days=30, importance_threshold=0.5)
    print(f"  删除了 {clear_result['deleted_count']} 条记忆")
```

#### 记忆存储方式对比表

| 存储方式 | 性能 | 容量 | 检索效率 | 适用场景 |
|----------|------|------|----------|----------|
| **内存存储** | 高 | 低 | 高 | 临时数据、工作记忆 |
| **向量存储** | 中 | 中 | 中 | 情景记忆、语义记忆 |
| **数据库存储** | 低 | 高 | 低 | 长期存储、结构化数据 |

---

### 2.1.5 反思模块（Reflection）

反思模块负责从经验中学习，评估 Agent 的行为，提供改进建议。反思模块是 Agent 的"自我意识"，类似于人类的反思和学习能力。

#### 反思的定义

反思（Reflection）是指 Agent 对自己的行为、决策和结果进行评估和学习的过程。反思模块使 Agent 能够从错误中学习，优化策略，提高性能。

**学术定义**（来源：2024-2025 年最新研究）

- **LangChain（2024）**：反思是 Agentic AI 的核心设计模式之一，包括任务反思（Task Reflection）、行为反思（Behavior Reflection）和结果反思（Result Reflection）。
- **Reflexion（2024）**：一种自批判 Agent 框架，通过显式批判每个响应并基于外部数据进行改进。

**工程定义**

在实际工程中，反思模块通常负责：

1. **评估行为**：评估 Agent 的行为是否合理和有效
2. **分析结果**：分析执行结果是否满足预期
3. **学习经验**：从成功和失败中学习经验
4. **提供改进**：提供改进建议和策略调整

#### 反思类型

反思模块可以根据评估的内容分为不同类型：

| 反思类型 | 评估内容 | 触发方式 | 输出 |
|----------|----------|----------|------|
| **任务反思** | 任务执行过程和结果 | 任务完成时 | 任务优化建议 |
| **行为反思** | 具体行为的合理性和有效性 | 行为执行后 | 行为调整建议 |
| **结果反思** | 执行结果是否满足预期 | 结果产生后 | 结果改进建议 |

**任务反思**（来源：2024-2025 年最新研究）

任务反思是指 Agent 对整个任务执行过程进行反思，包括：

- 任务是否按计划完成
- 行动是否合理和有效
- 结果是否满足预期
- 有哪些问题和改进点
- 有哪些可以学习的经验

**行为反思**（来源：2024-2025 年最新研究）

行为反思是指 Agent 对具体的行为进行反思，包括：

- 行动选择是否合理
- 行动参数是否正确
- 行动时机是否恰当
- 行动结果是否有效

**结果反思**（来源：2024-2025 年最新研究）

结果反思是指 Agent 对执行结果进行反思，包括：

- 结果是否满足目标
- 结果质量是否达标
- 是否有更好的替代方案
- 如何改进下次执行

#### 反思触发方式

反思模块可以根据不同的情况触发：

| 触发方式 | 描述 | 示例 |
|----------|------|------|
| **定期触发** | 定时反思（每小时、每天） | 每日总结、每周回顾 |
| **错误触发** | 错误发生后触发反思 | 工具调用失败、行动执行失败 |
| **用户触发** | 用户反馈后触发反思 | 用户不满意、用户建议 |
| **任务完成触发** | 任务完成后触发反思 | 任务成功、任务失败 |

#### 反思最佳实践

基于 2024-2025 年的工程实践和研究成果：

1. **实现多维度的反思（任务、行为、结果）**：
   - 任务反思：评估整个任务执行过程
   - 行为反思：评估具体的行为
   - 结果反思：评估执行结果

2. **使用 LLM 进行反思推理**：
   - 使用 GPT-4、Claude 3.5 Sonnet 等大模型
   - 设计详细的反思 Prompt
   - 结构化反思输出

3. **实现反思结果的可视化展示**：
   - 反思摘要
   - 改进建议
   - 经验总结

4. **建立反思历史的追踪机制**：
   - 记录每次反思
   - 分析反思模式
   - 跟踪改进效果

#### 代码示例 1：LangChain 自我批判

以下代码示例展示如何使用 LangChain 实现自我批判循环：

```python
from langchain_openai import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage
from typing import Dict, Any, List
import time

class SelfCritiqueReflectionModule:
    """基于 LangChain 的自我批判反思模块"""

    def __init__(self, model_name: str = "gpt-4"):
        self.llm = ChatOpenAI(model=model_name, temperature=0.3)
        self.reflection_history = []

    def reflect(
        self,
        task: str,
        action: str,
        result: str,
        context: str = ""
    ) -> Dict[str, Any]:
        """
        反思任务执行

        Args:
            task: 任务描述
            action: 执行的行动
            result: 执行结果
            context: 上下文信息（可选）

        Returns:
            反思结果
        """
        # 构建反思 Prompt
        prompt = f"""
        请对以下任务执行进行反思：

        任务：{task}
        行动：{action}
        结果：{result}
        上下文：{context}

        请从以下维度进行反思：

        1. 任务是否按计划完成？
        2. 行动是否合理和有效？
        3. 结果是否满足预期？
        4. 有哪些问题和改进点？
        5. 有哪些可以学习的经验？

        以 JSON 格式输出：
        {{
            "task_completed": true/false,
            "action_effective": true/false,
            "result_satisfactory": true/false,
            "issues": ["问题1", "问题2", ...],
            "improvements": ["改进1", "改进2", ...],
            "lessons_learned": ["经验1", "经验2", ...]
        }}
        """

        messages = [
            SystemMessage(content="你是一个反思专家，善于分析任务执行过程并提出改进建议。"),
            HumanMessage(content=prompt)
        ]

        # 调用 LLM
        response = self.llm.invoke(messages)

        # 解析 JSON
        import json
        try:
            reflection = json.loads(response.content)
        except:
            reflection = {
                "task_completed": False,
                "action_effective": False,
                "result_satisfactory": False,
                "issues": ["解析失败"],
                "improvements": [],
                "lessons_learned": []
            }

        # 记录反思历史
        self.reflection_history.append({
            "task": task,
            "action": action,
            "result": result,
            "context": context,
            "reflection": reflection,
            "timestamp": time.time()
        })

        return reflection

    def reflect_with_critique(
        self,
        task: str,
        initial_answer: str,
        external_data: str = ""
    ) -> Dict[str, Any]:
        """
        带外部数据的自我批判

        Args:
            task: 任务描述
            initial_answer: 初始答案
            external_data: 外部数据（用于验证答案）

        Returns:
            反思和改进后的答案
        """
        # 第一步：生成批判
        critique_prompt = f"""
        任务：{task}

        初始答案：{initial_answer}

        外部数据（用于验证）：{external_data}

        请批判这个初始答案：

        1. 答案是否准确？
        2. 有哪些遗漏的信息？
        3. 有哪些错误的陈述？
        4. 如何改进答案？

        请引用外部数据来支持你的批判。
        """

        critique_messages = [
            SystemMessage(content="你是一个批判专家，善于发现答案中的问题。"),
            HumanMessage(content=critique_prompt)
        ]

        critique = self.llm.invoke(critique_messages)

        # 第二步：根据批判改进答案
        improve_prompt = f"""
        任务：{task}

        初始答案：{initial_answer}

        批判：{critique.content}

        请根据批判改进答案，提供一个更准确、更完整的答案。
        """

        improve_messages = [
            SystemMessage(content="你是一个改进专家，善于根据反馈改进答案。"),
            HumanMessage(content=improve_prompt)
        ]

        improved_answer = self.llm.invoke(improve_messages)

        return {
            "initial_answer": initial_answer,
            "critique": critique.content,
            "improved_answer": improved_answer.content
        }

    def analyze_patterns(self) -> Dict[str, Any]:
        """
        分析反思历史，发现模式和趋势

        Returns:
            模式分析结果
        """
        if len(self.reflection_history) < 3:
            return {"message": "Reflection history too short for pattern analysis"}

        # 提取反思记录
        reflections = [r["reflection"] for r in self.reflection_history]

        # 构建分析 Prompt
        prompt = f"""
        以下是一系列反思记录：
        {reflections}

        请分析这些反思记录，发现模式和趋势：

        1. 有哪些常见的问题？
        2. 有哪些可以应用的改进？
        3. 有哪些可以学习的经验？
        4. 哪些行动是有效的？
        5. 哪些行动需要避免？

        以 JSON 格式输出：
        {{
            "common_issues": ["问题1", "问题2", ...],
            "recommended_improvements": ["改进1", "改进2", ...],
            "key_lessons": ["经验1", "经验2", ...],
            "effective_actions": ["行动1", "行动2", ...],
            "actions_to_avoid": ["行动1", "行动2", ...]
        }}
        """

        messages = [
            SystemMessage(content="你是一个模式分析专家，善于从历史数据中发现规律。"),
            HumanMessage(content=prompt)
        ]

        response = self.llm.invoke(messages)

        # 解析 JSON
        import json
        try:
            patterns = json.loads(response.content)
        except:
            patterns = {
                "common_issues": [],
                "recommended_improvements": [],
                "key_lessons": [],
                "effective_actions": [],
                "actions_to_avoid": []
            }

        return patterns

    def get_reflection_history(self, n: int = None) -> List[Dict[str, Any]]:
        """
        获取反思历史

        Args:
            n: 返回最近 n 条记录（None 表示返回全部）

        Returns:
            反思历史列表
        """
        if n is None:
            return self.reflection_history
        else:
            return self.reflection_history[-n:]

# 使用示例
if __name__ == "__main__":
    # 初始化反思模块
    reflection_module = SelfCritiqueReflectionModule(model_name="gpt-4")

    # 反思一次任务执行
    reflection = reflection_module.reflect(
        task="查询北京天气",
        action="调用天气 API",
        result="成功获取天气数据，温度 25°C，湿度 60%",
        context="用户计划明天去北京"
    )

    print("反思结果：")
    print(f"  任务完成: {reflection['task_completed']}")
    print(f"  行动有效: {reflection['action_effective']}")
    print(f"  结果满意: {reflection['result_satisfactory']}")
    print(f"  问题: {reflection['issues']}")
    print(f"  改进: {reflection['improvements']}")
    print(f"  经验: {reflection['lessons_learned']}")

    # 带外部数据的自我批判
    critique_result = reflection_module.reflect_with_critique(
        task="解释什么是人工智能",
        initial_answer="人工智能就是让机器像人一样思考和行动的技术。",
        external_data="人工智能（AI）是指由机器表现出的智能，通常通过计算机系统模拟人类的认知功能。"
    )

    print("\n自我批判结果：")
    print(f"  初始答案: {critique_result['initial_answer']}")
    print(f"  批判: {critique_result['critique']}")
    print(f"  改进后答案: {critique_result['improved_answer']}")

    # 分析模式（需要更多反思历史）
    # patterns = reflection_module.analyze_patterns()
    # print("\n模式分析：", patterns)
```

#### 反思类型对比表

| 反思类型 | 触发时机 | 输出类型 | 应用场景 |
|----------|----------|----------|----------|
| **任务反思** | 任务完成时 | 任务优化建议 | 复杂任务、长期项目 |
| **行为反思** | 行为执行后 | 行为调整建议 | 工具调用、行动优化 |
| **结果反思** | 结果产生后 | 结果改进建议 | 结果验证、质量控制 |

---

## 2.2 单 Agent 架构

单 Agent 架构是指单个 Agent 完成任务的架构设计，根据 Agent 的决策方式和规划能力，可以分为反应式、审慎式、混合式和学习型架构。

### 2.2.1 反应式架构（Reactive）

反应式架构（Reactive Architecture）是一种基于规则的 Agent 架构，Agent 感知环境后直接根据预定义的规则执行行动，无需显式规划。

#### 反应式架构的定义

反应式架构是指 Agent 在感知环境后，立即根据预定义的规则或策略执行行动，无需复杂的内部状态管理和长期规划。反应式架构强调快速响应和实时性。

**学术定义**（来源：最新研究）

- **Galileo（2025）**：反应式架构直接将传感器输入映射到执行器输出，通常用于时间关键的操作，如避障和伺服控制。
- **SmythOS（2026）**：反应式 Agent 基于预定义规则或模式匹配，在感知输入后立即执行相应行动，响应速度快但缺乏长期规划能力。

**工程定义**

在实际工程中，反应式架构通常负责：

1. **规则定义**：定义输入到输出的映射规则
2. **模式匹配**：将感知结果与规则进行匹配
3. **立即执行**：匹配成功后立即执行对应行动
4. **快速响应**：优化响应速度，降低延迟

#### 反应式架构的特点

反应式架构具有以下特点：

| 特点 | 说明 | 优势 | 劣势 |
|------|------|------|------|
| **直接映射** | 感知输入直接映射到行动输出 | 响应速度快、实现简单 | 缺乏灵活性和适应性 |
| **无内部状态** | Agent 不维护内部状态或记忆 | 实现简单、资源消耗低 | 无法学习、无法适应复杂任务 |
| **规则驱动** | 基于预定义规则执行行动 | 可预测、可解释 | 规则维护复杂、扩展性差 |
| **实时性** | 强调快速响应和实时性 | 适用于实时场景 | 长期任务处理能力弱 |

#### 反应式架构的实现方式

反应式架构可以通过以下方式实现：

**1. 基于规则的系统**

使用 if-else 规则或决策表实现输入到输出的映射。

**2. 状态机**

使用有限状态机（FSM）管理 Agent 的状态转换。

**3. 模式匹配**

使用模式匹配算法（如正则表达式）识别输入模式并执行对应行动。

#### 反应式架构的优势与劣势

**优势**

- **响应速度快**：无需复杂规划，直接执行行动，响应延迟低
- **实现简单**：基于规则或状态机，易于理解和维护
- **可预测**：基于预定义规则，行为可预测和可解释
- **资源消耗低**：无需维护复杂内部状态，资源消耗低

**劣势**

- **缺乏规划能力**：无法进行长期规划和复杂决策
- **适应性差**：规则固定，无法适应环境和任务的变化
- **扩展性差**：规则数量增长导致维护复杂度增加
- **无法学习**：无法从经验中学习，无法优化策略

#### 反应式架构的适用场景

反应式架构适用于以下场景：

- **简单任务**：任务逻辑简单，规则清晰
- **确定性环境**：环境状态可预测，变化较少
- **实时性要求高**：需要快速响应，延迟敏感
- **可预测性要求**：需要可预测和可解释的行为

#### 代码示例：反应式 Agent

以下代码示例展示如何实现一个简单的反应式 Agent：

```python
from typing import Dict, Any, Callable

class ReactiveAgent:
    """反应式 Agent"""

    def __init__(self):
        self.action_history = []

    def perceive(self, user_input: str) -> Dict[str, Any]:
        """
        感知用户输入

        Args:
            user_input: 用户输入

        Returns:
            感知结果
        """
        # 简单的关键词匹配
        return {
            "type": "text",
            "raw": user_input,
            "keywords": self._extract_keywords(user_input)
        }

    def decide_action(self, perception: Dict[str, Any]) -> Dict[str, Any]:
        """
        决定行动（基于规则）

        Args:
            perception: 感知结果

        Returns:
            行动配置
        """
        keywords = perception.get("keywords", [])

        # 规则库
        rules = [
            {"keywords": ["天气", "weather"], "action": "query_weather"},
            {"keywords": ["时间", "time"], "action": "get_time"},
            {"keywords": ["预订", "订", "book"], "action": "book_service"},
            {"keywords": ["帮助", "help", "?"], "action": "show_help"},
        ]

        # 规则匹配
        for rule in rules:
            if any(keyword in perception["raw"].lower() for keyword in rule["keywords"]):
                return {
                    "type": rule["action"],
                    "confidence": 1.0
                }

        # 默认行动
        return {
            "type": "unknown",
            "confidence": 0.0
        }

    def execute_action(self, action: Dict[str, Any]) -> Dict[str, Any]:
        """
        执行行动

        Args:
            action: 行动配置

        Returns:
            执行结果
        """
        action_type = action.get("type")

        if action_type == "query_weather":
            result = self._query_weather()
        elif action_type == "get_time":
            result = self._get_time()
        elif action_type == "book_service":
            result = self._book_service()
        elif action_type == "show_help":
            result = self._show_help()
        else:
            result = {"message": "抱歉，我不理解您的请求。可以尝试询问天气、时间、预订服务或帮助。"}

        # 记录行动历史
        self.action_history.append({
            "action": action,
            "result": result,
            "timestamp": time.time()
        })

        return result

    def _extract_keywords(self, text: str) -> List[str]:
        """
        提取关键词

        Args:
            text: 输入文本

        Returns:
            关键词列表
        """
        keywords = ["天气", "weather", "时间", "time", "预订", "订", "book", "帮助", "help"]
        return [kw for kw in keywords if kw.lower() in text.lower()]

    def _query_weather(self) -> Dict[str, Any]:
        """
        查询天气（模拟）

        Returns:
            天气信息
        """
        return {
            "success": True,
            "message": "北京今天天气：晴天，温度 25°C，湿度 60%",
            "data": {"city": "北京", "temperature": 25, "humidity": 60}
        }

    def _get_time(self) -> Dict[str, Any]:
        """
        获取时间

        Returns:
            时间信息
        """
        import datetime
        current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        return {
            "success": True,
            "message": f"当前时间：{current_time}",
            "data": {"time": current_time}
        }

    def _book_service(self) -> Dict[str, Any]:
        """
        预订服务（模拟）

        Returns:
            预订结果
        """
        return {
            "success": True,
            "message": "预订服务已启动，请提供更多详细信息（如服务类型、时间、地点）",
            "data": {"status": "pending"}
        }

    def _show_help(self) -> Dict[str, Any]:
        """
        显示帮助信息

        Returns:
            帮助信息
        """
        help_text = """
        我可以帮助您：
        - 查询天气：输入"天气"或"weather"
        - 获取时间：输入"时间"或"time"
        - 预订服务：输入"预订"或"book"
        - 显示帮助：输入"帮助"或"help"
        """
        return {
            "success": True,
            "message": help_text
        }

    def run(self, user_input: str) -> Dict[str, Any]:
        """
        运行完整流程

        Args:
            user_input: 用户输入

        Returns:
            执行结果
        """
        print(f"[反应式 Agent] 用户输入：{user_input}")

        # 感知
        perception = self.perceive(user_input)
        print(f"[反应式 Agent] 感知结果：{perception}")

        # 决定行动
        action = self.decide_action(perception)
        print(f"[反应式 Agent] 决定行动：{action}")

        # 执行行动
        result = self.execute_action(action)
        print(f"[反应式 Agent] 执行结果：{result}")

        return result

# 使用示例
if __name__ == "__main__":
    import time

    # 初始化反应式 Agent
    agent = ReactiveAgent()

    # 测试不同输入
    test_inputs = [
        "北京今天天气怎么样？",
        "现在几点了？",
        "帮我预订酒店",
        "你能做什么？",
        "我不理解这个问题"
    ]

    for user_input in test_inputs:
        result = agent.run(user_input)
        print(f"回复：{result['message']}\n")
        time.sleep(0.5)
```

#### 反应式 vs 其他架构对比表

| 维度 | 反应式 | 审慎式 | 混合式 |
|----------|--------|--------|--------|
| **响应速度** | 快 | 慢 | 中 |
| **规划能力** | 无 | 强 | 中 |
| **适应性** | 差 | 强 | 中 |
| **复杂度** | 低 | 高 | 中 |
| **适用场景** | 简单任务、实时性要求高 | 复杂任务、长期规划 | 混合场景 |

---

### 2.2.2 审慎式架构（Deliberative）

审慎式架构（Deliberative Architecture）是一种基于规划的 Agent 架构，Agent 感知环境后进行显式规划，然后执行规划的行动。

#### 审慎式架构的定义

审慎式架构是指 Agent 在感知环境后，通过显式规划生成行动计划，然后按计划执行行动。审慎式架构强调深度思考和长期规划。

**学术定义**（来源：最新研究）

- **Galileo（2025）**：审慎式架构维护内部世界模型，基于这些模型进行信息决策，能够根据目标和预测结果规划行动。
- **MDPI（2024）**：审慎式层提供状态估计、符号或数值规划、模型预测控制和中视野决策制定。
- **Codelevate（2025）**：审慎式 Agent 具有内部世界模型并使用这些模型做出信息决策，能够根据目标和预测结果规划行动。

**工程定义**

在实际工程中，审慎式架构通常负责：

1. **世界建模**：维护环境的内部模型
2. **显式规划**：基于模型生成详细行动计划
3. **状态管理**：跟踪 Agent 的内部状态和外部环境状态
4. **计划执行**：按计划逐步执行行动
5. **重新规划**：根据环境变化或执行结果调整计划

#### 审慎式架构的特点

审慎式架构具有以下特点：

| 特点 | 说明 | 优势 | 劣势 |
|------|------|------|------|
| **显式规划** | 生成详细的行动计划 | 适应性强、可解释 | 规划复杂度高 |
| **内部模型** | 维护环境的内部模型 | 支持预测和推理 | 模型构建复杂 |
| **状态管理** | 跟踪内部和外部状态 | 上下文感知强 | 状态管理复杂 |
| **长期规划** | 支持长期规划和目标分解 | 复杂任务处理能力强 | 计算成本高 |

#### 审慎式架构的实现方式

审慎式架构可以通过以下方式实现：

**1. 基于 LLM 的规划**

使用大语言模型生成规划。

**2. 基于图的工作流（LangGraph）**

使用图结构定义工作流和状态转换。

**3. 层次规划（HTN）**

使用层次化任务网络进行任务分解和规划。

#### 审慎式架构的优势与劣势

**优势**

- **适应性强**：能够根据环境变化调整计划
- **准确度高**：通过显式规划提高决策质量
- **可解释**：规划过程可追踪和解释
- **支持复杂任务**：能够处理复杂、长期的任务

**劣势**

- **响应速度慢**：需要时间进行规划，响应延迟高
- **计算成本高**：规划和推理消耗大量计算资源
- **模型复杂**：需要构建和维护内部世界模型
- **规划失败风险**：规划可能因模型不准确或环境变化而失败

#### 审慎式架构的适用场景

审慎式架构适用于以下场景：

- **复杂任务**：任务逻辑复杂，需要深度思考
- **长期规划需求**：任务需要长期规划和分解
- **可解释性要求高**：需要可解释的决策过程
- **不确定性环境**：环境状态不完全可知，需要预测

#### 代码示例：审慎式 Agent

以下代码示例展示如何实现一个基于规划的审慎式 Agent：

```python
from langchain_openai import ChatOpenAI
from langchain.schema import HumanMessage
from typing import Dict, Any, List
import time

class DeliberativeAgent:
    """审慎式 Agent"""

    def __init__(self, model_name: str = "gpt-4"):
        self.llm = ChatOpenAI(model=model_name, temperature=0.0)
        self.action_history = []
        self.internal_state = {}

    def perceive(self, user_input: str) -> Dict[str, Any]:
        """
        感知用户输入

        Args:
            user_input: 用户输入

        Returns:
            感知结果
        """
        # 使用 LLM 理解用户意图
        prompt = f"""
        请理解以下用户输入，并提取关键信息：

        用户输入：{user_input}

        请提取：
        1. 用户意图（如查询天气、预订服务、获取时间等）
        2. 关键参数（如城市、服务类型、时间等）
        3. 上下文信息（如用户历史、当前状态）

        以 JSON 格式输出。
        """
        messages = [HumanMessage(content=prompt)]
        response = self.llm.invoke(messages)

        # 解析 JSON
        import json
        try:
            understanding = json.loads(response.content)
        except:
            understanding = {
                "intent": "unknown",
                "parameters": {},
                "context": {}
            }

        return {
            "type": "text",
            "raw": user_input,
            "understanding": understanding
        }

    def plan(self, perception: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        制定行动计划

        Args:
            perception: 感知结果

        Returns:
            行动计划
        """
        understanding = perception.get("understanding", {})
        intent = understanding.get("intent", "unknown")
        parameters = understanding.get("parameters", {})

        # 使用 LLM 生成规划
        prompt = f"""
        用户意图：{intent}
        参数：{parameters}
        当前状态：{self.internal_state}

        请生成一个详细的行动计划，包括以下步骤：

        1. 分析用户需求和当前状态
        2. 分解任务为多个子步骤
        3. 为每个子步骤选择合适的行动
        4. 定义子步骤的执行顺序和依赖关系

        输出格式：
        步骤1: <行动描述>
        步骤2: <行动描述>
        步骤3: <行动描述>
        ...
        """
        messages = [HumanMessage(content=prompt)]
        response = self.llm.invoke(messages)

        # 解析规划
        plan = self._parse_plan(response.content)

        return plan

    def execute_plan(self, plan: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        执行行动计划

        Args:
            plan: 行动计划

        Returns:
            执行结果
        """
        results = []

        for i, step in enumerate(plan):
            print(f"[审慎式 Agent] 执行步骤 {i + 1}/{len(plan)}: {step['description']}")

            # 执行行动
            result = self._execute_action(step)
            results.append(result)

            # 更新内部状态
            self.internal_state["last_step"] = step
            self.internal_state["step_results"] = results

            # 如果行动失败，重新规划
            if not result.get("success"):
                print(f"[审慎式 Agent] 行动失败，重新规划...")
                # 这里可以触发重新规划逻辑
                break

            # 记录行动历史
            self.action_history.append({
                "step": step,
                "result": result,
                "timestamp": time.time()
            })

        return {
            "success": all(r.get("success") for r in results),
            "steps_executed": len(results),
            "total_steps": len(plan),
            "results": results
        }

    def _execute_action(self, step: Dict[str, Any]) -> Dict[str, Any]:
        """
        执行单个行动

        Args:
            step: 行动步骤

        Returns:
            执行结果
        """
        action_type = step.get("action_type")

        # 模拟不同类型的行动
        if "查询天气" in step.get("description", ""):
            result = self._query_weather(step.get("parameters"))
        elif "获取时间" in step.get("description", ""):
            result = self._get_time()
        elif "预订服务" in step.get("description", ""):
            result = self._book_service(step.get("parameters"))
        else:
            result = {
                "success": False,
                "error": f"未知的行动类型：{action_type}"
            }

        return result

    def _query_weather(self, parameters: Dict[str, Any]) -> Dict[str, Any]:
        """查询天气"""
        city = parameters.get("city", "北京")
        return {
            "success": True,
            "message": f"{city} 今天天气：晴天，温度 25°C，湿度 60%",
            "data": {"city": city, "temperature": 25, "humidity": 60}
        }

    def _get_time(self) -> Dict[str, Any]:
        """获取时间"""
        import datetime
        current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        return {
            "success": True,
            "message": f"当前时间：{current_time}",
            "data": {"time": current_time}
        }

    def _book_service(self, parameters: Dict[str, Any]) -> Dict[str, Any]:
        """预订服务"""
        service_type = parameters.get("service_type", "酒店")
        return {
            "success": True,
            "message": f"已预订{service_type}，预订号：{int(time.time())}",
            "data": {"service_type": service_type, "booking_id": int(time.time())}
        }

    def _parse_plan(self, plan_text: str) -> List[Dict[str, Any]]:
        """
        解析规划文本

        Args:
            plan_text: 规划文本

        Returns:
            规划步骤列表
        """
        lines = plan_text.strip().split('\n')
        plan = []

        for line in lines:
            if ':' in line:
                step_desc = line.split(':', 1)[1].strip()
                if step_desc:
                    plan.append({
                        "description": step_desc,
                        "action_type": self._infer_action_type(step_desc),
                        "parameters": {}
                    })

        return plan

    def _infer_action_type(self, description: str) -> str:
        """推断行动类型"""
        if "天气" in description:
            return "query_weather"
        elif "时间" in description:
            return "get_time"
        elif "预订" in description:
            return "book_service"
        else:
            return "unknown"

    def run(self, user_input: str) -> Dict[str, Any]:
        """
        运行完整流程

        Args:
            user_input: 用户输入

        Returns:
            执行结果
        """
        print(f"[审慎式 Agent] 用户输入：{user_input}\n")

        # 感知
        perception = self.perceive(user_input)
        print(f"[审慎式 Agent] 感知结果：{perception}\n")

        # 规划
        plan = self.plan(perception)
        print(f"[审慎式 Agent] 生成的规划：")
        for i, step in enumerate(plan, 1):
            print(f"  {i}. {step['description']}")
        print()

        # 执行规划
        result = self.execute_plan(plan)
        print(f"\n[审慎式 Agent] 执行结果：{result}")

        return result

# 使用示例
if __name__ == "__main__":
    # 初始化审慎式 Agent
    agent = DeliberativeAgent(model_name="gpt-4")

    # 测试复杂输入
    test_inputs = [
        "我想预订北京到上海的酒店，时间是下周五，住两天",
        "帮我查询一下上海明天的天气，看看是否需要带伞",
        "现在几点了？我需要确认一下会议时间"
    ]

    for user_input in test_inputs:
        result = agent.run(user_input)
        print(f"\n{'='*50}\n")
        time.sleep(1)
```

#### 审慎式 vs 其他架构对比表

| 维度 | 审慎式 | 反应式 | 混合式 |
|----------|--------|--------|--------|
| **思考深度** | 深 | 浅 | 中 |
| **响应速度** | 慢 | 快 | 中 |
| **准确度** | 高 | 低 | 中 |
| **复杂度** | 高 | 低 | 中 |
| **适用场景** | 复杂任务、长期规划 | 简单任务、实时性要求高 | 混合场景 |

---

### 2.2.3 混合式架构（Hybrid）

混合式架构（Hybrid Architecture）是一种结合反应式和审慎式架构优点的 Agent 架构，Agent 根据任务特点选择反应式或审慎式处理方式。

#### 混合式架构的定义

混合式架构是指 Agent 同时具备反应式和审慎式的能力，根据任务特点、环境状态或时间约束，动态选择使用反应式或审慎式处理方式。混合式架构兼顾响应速度和规划深度。

**学术定义**（来源：最新研究）

- **Galileo（2025）**：混合式反应-审慎式架构代表当前最先进的技术水平，这些系统并行运行两个循环——快速反应循环处理时间关键操作，而审慎式层提供战略规划。
- **MDPI（2024）**：混合式架构结合两种方法：反应式层处理紧密控制循环，而审慎式层提供目标、约束和重新规划。
- **SmythOS（2026）**：混合式 Agent 架构通过无缝结合反应式和审慎式系统的优点，代表了人工智能的复杂演变。

**工程定义**

在实际工程中，混合式架构通常负责：

1. **模式识别**：识别当前任务或环境模式
2. **模式选择**：根据模式选择反应式或审慎式处理
3. **并行执行**：并行运行反应式和审慎式循环
4. **协调机制**：协调两种模式的输出和决策
5. **动态调整**：根据执行结果动态调整处理模式

#### 混合式架构的特点

混合式架构具有以下特点：

| 特点 | 说明 | 优势 | 劣势 |
|------|------|------|------|
| **并行处理** | 并行运行反应式和审慎式循环 | 兼顾响应速度和规划深度 | 协调复杂 |
| **动态选择** | 根据任务动态选择处理模式 | 灵活性高 | 选择逻辑复杂 |
| **平衡性能** | 平衡响应速度和规划质量 | 资源利用率高 | 资源消耗大 |
| **多层协调** | 多层结构协调不同模式 | 可扩展性好 | 架构复杂 |

#### 混合式架构的实现方式

混合式架构可以通过以下方式实现：

**1. 双层架构**

上层为审慎式规划层，下层为反应式执行层。

**2. 模式选择架构**

根据任务特点选择使用反应式或审慎式。

**3. 并行架构**

并行运行反应式和审慎式循环，协调输出。

#### 混合式架构的优势与劣势

**优势**

- **兼顾响应速度和规划深度**：简单任务用反应式，复杂任务用审慎式
- **灵活适应**：能够根据任务和环境动态调整处理模式
- **资源优化**：合理分配资源，提高资源利用率
- **可扩展**：可以扩展支持更多处理模式

**劣势**

- **架构复杂**：需要设计和维护多种处理模式
- **协调困难**：不同模式之间的协调和冲突解决复杂
- **资源消耗大**：并行运行多种模式，资源消耗较高
- **状态一致难**：维护多种模式的内部状态一致性困难

#### 混合式架构的适用场景

混合式架构适用于以下场景：

- **混合任务**：既需要快速响应又需要深度思考的任务
- **动态环境**：环境状态快速变化，需要灵活适应
- **多模态交互**：需要处理多种类型的交互
- **性能优化需求**：需要平衡响应速度和决策质量

#### 代码示例：混合式 Agent

以下代码示例展示如何实现一个混合式 Agent：

```python
from typing import Dict, Any, Callable
import time

class HybridAgent:
    """混合式 Agent"""

    def __init__(self):
        self.reactive_module = ReactiveModule()
        self.deliberative_module = DeliberativeModule()
        self.action_history = []

    def classify_task(self, user_input: str) -> str:
        """
        分类任务类型

        Args:
            user_input: 用户输入

        Returns:
            任务类型（"reactive" 或 "deliberative"）
        """
        # 简单任务用反应式
        simple_keywords = ["天气", "时间", "问候", "help"]
        complex_keywords = ["规划", "设计", "分析", "预订", "开发"]

        if any(keyword in user_input.lower() for keyword in simple_keywords):
            return "reactive"
        elif any(keyword in user_input.lower() for keyword in complex_keywords):
            return "deliberative"
        else:
            # 默认使用反应式
            return "reactive"

    def run(self, user_input: str) -> Dict[str, Any]:
        """
        运行完整流程

        Args:
            user_input: 用户输入

        Returns:
            执行结果
        """
        # 分类任务
        task_type = self.classify_task(user_input)

        print(f"[混合式 Agent] 任务类型：{task_type}")

        # 根据任务类型选择处理模块
        if task_type == "reactive":
            print("[混合式 Agent] 使用反应式模块")
            result = self.reactive_module.run(user_input)
        else:
            print("[混合式 Agent] 使用审慎式模块")
            result = self.deliberative_module.run(user_input)

        # 记录行动历史
        self.action_history.append({
            "user_input": user_input,
            "task_type": task_type,
            "result": result,
            "timestamp": time.time()
        })

        return result

class ReactiveModule:
    """反应式模块"""

    def __init__(self):
        self.rules = [
            {"keywords": ["天气", "weather"], "action": "query_weather"},
            {"keywords": ["时间", "time"], "action": "get_time"},
            {"keywords": ["问候", "hello", "hi"], "action": "greet"},
            {"keywords": ["帮助", "help"], "action": "show_help"},
        ]

    def run(self, user_input: str) -> Dict[str, Any]:
        """运行反应式流程"""
        # 规则匹配
        for rule in self.rules:
            if any(keyword in user_input.lower() for keyword in rule["keywords"]):
                action = rule["action"]
                return self._execute_action(action)

        return {"message": "抱歉，我不理解您的请求。"}

    def _execute_action(self, action: str) -> Dict[str, Any]:
        """执行行动"""
        if action == "query_weather":
            return {"message": "北京今天天气：晴天，温度 25°C"}
        elif action == "get_time":
            import datetime
            current_time = datetime.datetime.now().strftime("%H:%M:%S")
            return {"message": f"当前时间：{current_time}"}
        elif action == "greet":
            return {"message": "你好！有什么可以帮你的吗？"}
        elif action == "show_help":
            return {"message": "我可以查询天气、时间、预订服务等。"}
        else:
            return {"message": "未知的行动"}

class DeliberativeModule:
    """审慎式模块"""

    def __init__(self):
        # 这里简化实现，实际应该使用 LLM 规划
        self.planner = SimplePlanner()

    def run(self, user_input: str) -> Dict[str, Any]:
        """运行审慎式流程"""
        # 生成规划
        plan = self.planner.plan(user_input)

        # 执行规划
        results = []
        for step in plan:
            result = self._execute_step(step)
            results.append(result)

        return {
            "message": f"已完成 {len(results)} 个步骤：{', '.join([r['message'] for r in results])}",
            "plan": plan,
            "results": results
        }

    def _execute_step(self, step: str) -> Dict[str, Any]:
        """执行步骤"""
        # 简化实现
        return {"message": f"执行：{step}"}

class SimplePlanner:
    """简单规划器"""

    def plan(self, objective: str) -> list:
        """生成简单规划"""
        if "预订" in objective:
            return ["确认需求", "查询可用资源", "生成预订方案", "确认预订"]
        elif "规划" in objective:
            return ["分析需求", "收集信息", "制定方案", "优化方案", "输出结果"]
        else:
            return ["分析需求", "制定方案", "执行方案"]

# 使用示例
if __name__ == "__main__":
    agent = HybridAgent()

    # 测试不同类型的输入
    test_inputs = [
        "你好",
        "北京今天天气怎么样？",  # 简单任务，用反应式
        "帮我规划一个北京到上海的旅行",  # 复杂任务，用审慎式
        "现在几点了？",  # 简单任务，用反应式
        "帮我设计一个聊天机器人"  # 复杂任务，用审慎式
    ]

    for user_input in test_inputs:
        result = agent.run(user_input)
        print(f"回复：{result['message']}\n")
        time.sleep(0.5)
```

#### 混合式 vs 其他架构对比表

| 维度 | 混合式 | 反应式 | 审慎式 |
|----------|--------|--------|--------|
| **灵活性** | 高 | 低 | 中 |
| **响应速度** | 中 | 快 | 慢 |
| **规划质量** | 中 | 低 | 高 |
| **复杂度** | 高 | 低 | 高 |
| **资源消耗** | 高 | 低 | 中 |

---

### 2.2.4 学习型架构（Learning）

学习型架构（Learning Architecture）是一种基于学习的 Agent 架构，Agent 通过学习从经验中获得策略，持续改进性能。

#### 学习型架构的定义

学习型架构是指 Agent 能够从经验中学习，优化其决策策略和行动模式，随着时间推移不断提高性能。学习型架构强调自适应和持续改进。

**学术定义**（来源：最新研究）

- **Nature（2025）**：一种自主方法发现了强化学习规则，从大量复杂环境中的一群 Agent 的累积经验中，发现的规则在具有挑战性的任务中实现了最先进的性能。
- **Agent-R1（2025）**：Agent-R1 是一个灵活且用户友好的基于 RL 的 LLM Agents 训练平台，支持快速集成各种环境接口和任务场景，并可以动态适应不同的计算资源需求。
- **Agent Lightning（2025）**：Agent Lightning 是一个灵活且可扩展的框架，支持基于强化学习（RL）的大语言模型（LLMs）的 AI Agent 训练。

**工程定义**

在实际工程中，学习型架构通常负责：

1. **经验收集**：收集行动和结果的经验数据
2. **策略学习**：从经验中学习优化策略
3. **性能评估**：评估学习效果和性能改进
4. **策略更新**：更新 Agent 的决策策略
5. **持续优化**：持续学习和优化，不断提高性能

#### 学习型架构的特点

学习型架构具有以下特点：

| 特点 | 说明 | 优势 | 劣势 |
|------|------|------|------|
| **自主学习** | 从经验中自动学习 | 无需人工标注，降低成本 | 学习质量依赖数据质量 |
| **持续改进** | 性能持续提升 | 适应性强，长期效果好 | 需要大量数据 |
| **泛化能力** | 能泛化到相似场景 | 可迁移，减少训练成本 | 可能过拟合 |
| **在线学习** | 支持在线学习和更新 | 实时适应，动态优化 | 需要稳定的在线环境 |

#### 学习型架构的实现方式

学习型架构可以通过以下方式实现：

**1. 强化学习（RL）**

使用强化学习算法（如 Q-Learning、DQN、PPO）学习策略。

**2. 监督学习（SL）**

使用标注数据训练模型。

**3. 自监督学习**

使用无标注数据学习表征。

**4. 在线学习**

支持在线实时学习和更新。

#### 学习型架构的优势与劣势

**优势**

- **自适应**：能够适应环境和任务的变化
- **持续改进**：性能随时间推移持续提升
- **泛化能力强**：能够泛化到新场景
- **减少人工**：减少人工调参和规则编写

**劣势**

- **数据依赖**：需要大量训练数据
- **训练成本高**：训练过程消耗大量计算资源
- **黑盒性**：学习过程难以解释
- **不稳定性**：可能产生不稳定的学习结果

#### 学习型架构的适用场景

学习型架构适用于以下场景：

- **动态环境**：环境状态快速变化，需要持续适应
- **复杂任务**：任务逻辑复杂，难以手工设计规则
- **大规模数据**：有大量历史数据可用于学习
- **长期运行**：Agent 长期运行，有持续改进需求

#### 代码示例：学习型 Agent（Q-Learning）

以下代码示例展示如何实现一个简单的 Q-Learning Agent：

```python
import numpy as np
from typing import Dict, Any, List, Tuple
import random

class QLearningAgent:
    """基于 Q-Learning 的学习型 Agent"""

    def __init__(
        self,
        state_size: int,
        action_size: int,
        learning_rate: float = 0.1,
        discount: float = 0.95,
        epsilon: float = 0.1
    ):
        self.state_size = state_size
        self.action_size = action_size
        self.q_table = np.zeros((state_size, action_size))

        # 超参数
        self.learning_rate = learning_rate
        self.discount = discount
        self.epsilon = epsilon

        # 训练统计
        self.episode_rewards = []
        self.episode_lengths = []

    def choose_action(self, state: int) -> int:
        """
        选择行动（ε-greedy 策略）

        Args:
            state: 当前状态

        Returns:
            选择的行动
        """
        # ε-greedy：以 ε 概率探索，以 1-ε 概率利用
        if random.random() < self.epsilon:
            # 探索：随机选择
            action = random.randint(0, self.action_size - 1)
            # print(f"[Q-Learning Agent] 探索：选择随机行动 {action}")
        else:
            # 利用：选择最优行动
            action = np.argmax(self.q_table[state])
            # print(f"[Q-Learning Agent] 利用：选择最优行动 {action}")

        return action

    def learn(
        self,
        state: int,
        action: int,
        reward: float,
        next_state: int,
        done: bool
    ):
        """
        学习（Q-Learning 更新）

        Args:
            state: 当前状态
            action: 执行的行动
            reward: 获得的奖励
            next_state: 下一个状态
            done: 是否结束
        """
        # Q-Learning 更新公式
        # Q(s,a) = Q(s,a) + α * [r + γ * max(Q(s',a')) - Q(s,a)]

        best_next_action = np.argmax(self.q_table[next_state])
        td_target = reward + self.discount * self.q_table[next_state][best_next_action]
        td_error = td_target - self.q_table[state][action]

        self.q_table[state][action] += self.learning_rate * td_error

        # print(f"[Q-Learning Agent] Q-更新：状态 {state}，行动 {action}，奖励 {reward:.2f}，Q 值 {self.q_table[state][action]:.2f}")

    def run_episode(
        self,
        env: 'Environment',
        max_steps: int = 100
    ) -> Tuple[float, int]:
        """
        运行一个回合

        Args:
            env: 环境
            max_steps: 最大步数

        Returns:
            (总奖励，步数）
        """
        state = env.reset()
        total_reward = 0

        for step in range(max_steps):
            # 选择行动
            action = self.choose_action(state)

            # 执行行动
            next_state, reward, done, _ = env.step(action)

            # 学习
            self.learn(state, action, reward, next_state, done)

            # 更新状态
            state = next_state
            total_reward += reward

            if done:
                break

        return total_reward, step + 1

    def train(
        self,
        env: 'Environment',
        n_episodes: int = 1000,
        max_steps: int = 100
    ):
        """
        训练 Agent

        Args:
            env: 环境
            n_episodes: 训练回合数
            max_steps: 每回合最大步数
        """
        print(f"[Q-Learning Agent] 开始训练：{n_episodes} 回合")

        for episode in range(n_episodes):
            total_reward, steps = self.run_episode(env, max_steps)

            self.episode_rewards.append(total_reward)
            self.episode_lengths.append(steps)

            # 定期衰减 ε
            if (episode + 1) % 100 == 0:
                avg_reward = np.mean(self.episode_rewards[-100:])
                avg_length = np.mean(self.episode_lengths[-100:])
                print(f"回合 {episode + 1}/{n_episodes}，平均奖励：{avg_reward:.2f}，平均步数：{avg_length:.1f}")
                # print(f"Q 表格：\n{self.q_table}\n")

        print(f"[Q-Learning Agent] 训练完成")

    def get_policy(self) -> Dict[int, int]:
        """
        获取当前策略

        Returns:
            状态到最优行动的映射
        """
        policy = {}
        for state in range(self.state_size):
            policy[state] = np.argmax(self.q_table[state])
        return policy

class SimpleEnvironment:
    """简单的环境用于测试 Q-Learning Agent"""

    def __init__(self, n_states: int = 5, goal_state: int = 4):
        self.n_states = n_states
        self.goal_state = goal_state
        self.current_state = 0

    def reset(self) -> int:
        """重置环境"""
        self.current_state = 0
        return self.current_state

    def step(self, action: int) -> Tuple[int, float, bool, Dict]:
        """
        执行行动

        Args:
            action: 行动（0：左，1：右）

        Returns:
            (next_state, reward, done, info)
        """
        # 简化实现：0 是左，1 是右
        if action == 0:  # 左
            self.current_state = max(0, self.current_state - 1)
        else:  # 右
            self.current_state = min(self.n_states - 1, self.current_state + 1)

        # 奖励设计
        if self.current_state == self.goal_state:
            reward = 10.0  # 到达目标
            done = True
        elif self.current_state < self.goal_state:
            reward = -0.1  # 接近目标
            done = False
        else:
            reward = -0.5  # 远离目标
            done = False

        return self.current_state, reward, done, {}

# 使用示例
if __name__ == "__main__":
    # 创建环境
    env = SimpleEnvironment(n_states=5, goal_state=4)

    # 创建 Q-Learning Agent
    agent = QLearningAgent(
        state_size=env.n_states,
        action_size=2,  # 0：左，1：右
        learning_rate=0.1,
        discount=0.95,
        epsilon=0.1
    )

    # 训练 Agent
    agent.train(env, n_episodes=500, max_steps=20)

    # 获取学习到的策略
    policy = agent.get_policy()
    print("\n学习到的策略：")
    for state, action in policy.items():
        action_name = "左" if action == 0 else "右"
        print(f"  状态 {state} -> {action_name}")

    # 测试训练好的 Agent
    print("\n测试训练好的 Agent：")
    state = env.reset()
    steps = 0
    print(f"初始状态：{state}")

    while state != env.goal_state and steps < 20:
        action = policy[state]
        action_name = "左" if action == 0 else "右"
        next_state, reward, done, _ = env.step(action)
        print(f"  步骤 {steps + 1}：状态 {state}，{action_name} -> 状态 {next_state}，奖励 {reward:.2f}")
        state = next_state
        steps += 1

    print(f"\n到达目标！总步数：{steps}")
```

#### 学习型 vs 其他架构对比表

| 维度 | 学习型 | 反应式 | 审慎式 |
|----------|--------|--------|--------|
| **学习能力** | 强 | 无 | 无 |
| **适应性** | 强 | 弱 | 中 |
| **泛化能力** | 强 | 弱 | 中 |
| **资源消耗** | 高 | 低 | 中 |
| **适用场景** | 动态环境、复杂任务 | 简单任务、确定性环境 | 复杂任务、长期规划 |

---

## 2.3 多 Agent 架构

多 Agent 架构是指多个 Agent 协作完成任务的架构设计，根据协作方式、组织结构和通信模式，可以分为层次化、并行协作、对抗式和联邦式架构。

### 2.3.1 层次化架构

层次化架构（Hierarchical Architecture）是一种分层组织的多 Agent 架构，Agent 按照层次结构组织，上层 Agent 管理和协调下层 Agent，下层 Agent 执行具体任务。

#### 层次化架构的定义

层次化架构是指多个 Agent 按照层次结构组织，上层 Agent（Manager Agent）负责整体规划和任务分配，下层 Agent（Worker Agent）负责执行具体任务。层次化架构通过分层管理实现复杂任务的分解和协调。

**学术定义**（来源：最新研究）

- **MarkTechPost（2025）**：层次化认知架构将智能划分为具有不同时间尺度和抽象等级的堆叠层，每一层负责不同层次的任务。
- **arXiv（2025）**：层次化多 Agent 系统通过三层 Agent 架构实现：设备级 Agent、微网（社区）Agent 和主电网 Agent，实现了带有可再生能源渗透的模拟电网的实时监控和控制。
- **AAMAS（2025）**：层次化框架通过自组织神经网络的集成和层次化管理，实现了多 Agent 协调的可扩展性。

**工程定义**

在实际工程中，层次化架构通常负责：

1. **层次划分**：将系统划分为多个层次
2. **任务分解**：上层 Agent 将任务分解为子任务
3. **任务分配**：上层 Agent 将子任务分配给下层 Agent
4. **结果整合**：下层 Agent 执行结果上报，上层 Agent 整合结果
5. **协调管理**：上层 Agent 协调和管理下层 Agent 的执行

#### 层次化架构的特点

层次化架构具有以下特点：

| 特点 | 说明 | 优势 | 劣势 |
|------|------|------|------|
| **分层管理** | Agent 按层次结构组织 | 管理清晰、责任明确 | 层次过多导致通信延迟 |
| **任务分解** | 上层分解任务，下层执行 | 复杂任务可分解处理 | 分解不当影响效率 |
| **集中控制** | 上层集中控制和协调 | 控制统一、决策一致 | 上层成为瓶颈 |
| **可扩展** | 支持多层次扩展 | 适应大规模系统 | 维护复杂度高 |

#### 层次化架构的实现方式

层次化架构可以通过以下方式实现：

**1. 三层架构**

设备层、社区层、控制层三层架构。

**2. Manager-Worker 模式**

一个 Manager Agent 管理多个 Worker Agent。

**3. 层次化任务网络（HTN）**

使用 HTN 进行层次化任务分解和规划。

#### 层次化架构的优势与劣势

**优势**

- **管理清晰**：层次结构明确，管理责任清晰
- **可扩展性强**：支持多层次扩展，适应大规模系统
- **任务分解能力强**：能够分解复杂任务
- **统一控制**：上层统一控制和协调，决策一致

**劣势**

- **通信延迟高**：层次多导致通信延迟增加
- **上层瓶颈**：上层 Agent 可能成为性能瓶颈
- **单点故障**：上层 Agent 故障影响整个系统
- **维护复杂**：层次多导致维护复杂度高

#### 层次化架构的适用场景

层次化架构适用于以下场景：

- **大规模系统**：需要管理和协调大量 Agent
- **复杂任务**：任务复杂，需要分解处理
- **统一控制需求**：需要统一的控制和管理
- **层次化组织**：系统具有层次化组织结构

#### 代码示例：层次化多 Agent 系统

以下代码示例展示如何实现一个层次化的多 Agent 系统：

```python
from typing import Dict, Any, List
from abc import ABC, abstractmethod
import time

class Agent(ABC):
    """Agent 基类"""

    def __init__(self, name: str):
        self.name = name
        self.tasks = []
        self.results = []

    @abstractmethod
    def execute(self, task: Dict[str, Any]) -> Dict[str, Any]:
        """执行任务"""
        pass

    def receive_task(self, task: Dict[str, Any]):
        """接收任务"""
        self.tasks.append(task)

    def report_result(self, result: Dict[str, Any]):
        """上报结果"""
        self.results.append(result)

class ManagerAgent(Agent):
    """管理 Agent"""

    def __init__(self, name: str, workers: List[Agent]):
        super().__init__(name)
        self.workers = workers
        self.current_task = None

    def decompose_task(self, task: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        分解任务

        Args:
            task: 主任务

        Returns:
            子任务列表
        """
        task_type = task.get("type")

        if task_type == "data_analysis":
            return [
                {"type": "data_collection", "source": task.get("source")},
                {"type": "data_cleaning", "data": "collected_data"},
                {"type": "data_visualization", "data": "cleaned_data"}
            ]
        elif task_type == "software_development":
            return [
                {"type": "design", "requirement": task.get("requirement")},
                {"type": "implementation", "design": "design_doc"},
                {"type": "testing", "code": "source_code"},
                {"type": "deployment", "tested_code": "code"}
            ]
        else:
            return [task]

    def allocate_tasks(self, subtasks: List[Dict[str, Any]]):
        """
        分配子任务给 Worker Agent

        Args:
            subtasks: 子任务列表
        """
        for i, subtask in enumerate(subtasks):
            worker = self.workers[i % len(self.workers)]
            worker.receive_task(subtask)
            print(f"[{self.name}] 分配子任务 '{subtask['type']}' 给 Worker: {worker.name}")

    def collect_results(self) -> Dict[str, Any]:
        """
        收集 Worker Agent 的结果

        Returns:
            整合后的结果
        """
        all_results = []
        for worker in self.workers:
            if worker.results:
                all_results.extend(worker.results)

        return {
            "success": True,
            "task": self.current_task,
            "subtask_results": all_results,
            "summary": self._summarize_results(all_results)
        }

    def _summarize_results(self, results: List[Dict[str, Any]]) -> str:
        """汇总结果"""
        return f"已完成 {len(results)} 个子任务"

    def execute(self, task: Dict[str, Any]) -> Dict[str, Any]:
        """
        执行主任务

        Args:
            task: 主任务

        Returns:
            执行结果
        """
        self.current_task = task

        print(f"\n[{self.name}] 接收主任务：{task}")

        # 分解任务
        subtasks = self.decompose_task(task)
        print(f"[{self.name}] 任务分解为 {len(subtasks)} 个子任务")

        # 分配任务
        self.allocate_tasks(subtasks)

        # 等待 Worker 执行
        time.sleep(1)

        # 收集结果
        result = self.collect_results()

        print(f"[{self.name}] 主任务完成，结果：{result['summary']}")

        return result

class WorkerAgent(Agent):
    """工作 Agent"""

    def __init__(self, name: str, specialties: List[str]):
        super().__init__(name)
        self.specialties = specialties  # 专长

    def can_execute(self, task: Dict[str, Any]) -> bool:
        """
        判断是否能执行该任务

        Args:
            task: 任务

        Returns:
            是否能执行
        """
        task_type = task.get("type")
        return task_type in self.specialties

    def execute(self, task: Dict[str, Any]) -> Dict[str, Any]:
        """
        执行任务

        Args:
            task: 任务

        Returns:
            执行结果
        """
        task_type = task.get("type")
        print(f"[{self.name}] 正在执行任务：{task_type}")

        # 模拟执行
        time.sleep(0.5)

        result = {
            "worker": self.name,
            "task_type": task_type,
            "success": True,
            "output": f"{task_type} 的执行结果"
        }

        self.report_result(result)
        print(f"[{self.name}] 任务完成：{task_type}")

        return result

class HierarchicalMultiAgentSystem:
    """层次化多 Agent 系统"""

    def __init__(self):
        # 创建 Worker Agents
        self.workers = [
            WorkerAgent("DataWorker", ["data_collection", "data_cleaning", "data_visualization"]),
            WorkerAgent("DevWorker", ["design", "implementation", "testing", "deployment"]),
            WorkerAgent("AnalysisWorker", ["data_analysis", "software_development"])
        ]

        # 创建 Manager Agent
        self.manager = ManagerAgent("Manager", self.workers)

    def execute_task(self, task: Dict[str, Any]) -> Dict[str, Any]:
        """
        执行任务

        Args:
            task: 任务

        Returns:
            执行结果
        """
        return self.manager.execute(task)

# 使用示例
if __name__ == "__main__":
    system = HierarchicalMultiAgentSystem()

    # 测试数据分析任务
    task1 = {
        "type": "data_analysis",
        "source": "customer_data.csv"
    }

    print("=" * 60)
    print("测试 1：数据分析任务")
    print("=" * 60)
    result1 = system.execute_task(task1)
    print(f"\n最终结果：{result1['summary']}\n")

    # 测试软件开发任务
    task2 = {
        "type": "software_development",
        "requirement": "开发一个聊天机器人"
    }

    print("=" * 60)
    print("测试 2：软件开发任务")
    print("=" * 60)
    result2 = system.execute_task(task2)
    print(f"\n最终结果：{result2['summary']}")
```

#### 层次化 vs 其他架构对比表

| 维度 | 层次化 | 并行协作 | 对抗式 |
|----------|--------|----------|--------|
| **管理方式** | 集中管理 | 分布式管理 | 对抗管理 |
| **协作方式** | 上下层协作 | 平行协作 | 对抗竞争 |
| **可扩展性** | 强 | 强 | 弱 |
| **复杂度** | 高 | 中 | 中 |
| **适用场景** | 大规模系统、复杂任务 | 并行任务、独立任务 | 博弈、对抗训练 |

---

### 2.3.2 并行协作架构

并行协作架构（Parallel Collaboration Architecture）是一种多个 Agent 并行执行任务的多 Agent 架构，Agent 同时处理不同的子任务，通过协作完成整体任务。

#### 并行协作架构的定义

并行协作架构是指多个 Agent 并行执行不同的子任务，通过信息共享和协作完成整体任务。并行协作架构强调并行执行和任务分工。

**学术定义**（来源：最新研究）

- **SpringsApps（2025）**：多 Agent 系统并行运行，允许不同的 Agent 同时处理不同的任务，协作通过汇集多样化的技能集来扩展能力。
- **Aalpha（2024）**：从 2020 年到 2024 年，资金从核心 NLP 显著转向基于 LLM 的 Agent 编排平台、基于 MAS 的机器人和分布式 AI 基础设施。

**工程定义**

在实际工程中，并行协作架构通常负责：

1. **任务分工**：将任务分解为可并行的子任务
2. **并行执行**：多个 Agent 同时执行不同的子任务
3. **信息共享**：Agent 之间共享执行结果和状态
4. **协作协调**：协调 Agent 的执行顺序和依赖关系
5. **结果整合**：整合多个 Agent 的执行结果

#### 并行协作架构的特点

并行协作架构具有以下特点：

| 特点 | 说明 | 优势 | 劣势 |
|------|------|------|------|
| **并行执行** | 多个 Agent 同时执行任务 | 执行效率高、节省时间 | 资源消耗大 |
| **任务分工** | 每个 Agent 负责特定任务 | 专业化、质量高 | 分工不当影响效率 |
| **信息共享** | Agent 之间共享信息 | 协作性强、避免重复 | 通信开销大 |
| **分布式管理** | 分布式执行和管理 | 无单点故障 | 协调复杂 |

#### 并行协作架构的实现方式

并行协作架构可以通过以下方式实现：

**1. CrewAI 平台**

使用 CrewAI 实现多 Agent 协作。

**2. LangChain Agent 协作**

使用 LangChain 的 Agent 工具和协作机制。

**3. 并行任务队列**

使用任务队列实现并行任务分配。

#### 并行协作架构的优势与劣势

**优势**

- **执行效率高**：并行执行节省时间
- **专业化强**：每个 Agent 专注于特定任务
- **无单点故障**：分布式执行，无单点故障
- **灵活可扩展**：可以动态增加或减少 Agent

**劣势**

- **资源消耗大**：并行执行消耗大量资源
- **通信开销大**：Agent 间通信增加开销
- **协调复杂**：协调多个 Agent 执行复杂
- **冲突处理难**：可能产生资源或任务冲突

#### 并行协作架构的适用场景

并行协作架构适用于以下场景：

- **并行任务**：任务可分解为独立的子任务
- **时间敏感**：需要在有限时间内完成任务
- **资源充足**：有足够的计算和存储资源
- **分布式环境**：Agent 分布在不同节点上

#### 代码示例：并行协作多 Agent 系统

以下代码示例展示如何实现一个并行协作的多 Agent 系统：

```python
from typing import Dict, Any, List
from concurrent.futures import ThreadPoolExecutor
import time

class CollaborativeAgent:
    """协作 Agent"""

    def __init__(self, name: str, specialty: str):
        self.name = name
        self.specialty = specialty
        self.shared_context = {}
        self.completed_tasks = []

    def execute_task(self, task: Dict[str, Any]) -> Dict[str, Any]:
        """
        执行任务

        Args:
            task: 任务

        Returns:
            执行结果
        """
        task_type = task.get("type")

        # 更新共享上下文
        if "context" in task:
            self.shared_context.update(task["context"])

        print(f"[{self.name}] 执行任务：{task_type}")

        # 模拟执行
        time.sleep(0.5)

        # 根据专长执行不同任务
        if self.specialty == "researcher":
            result = self._research(task)
        elif self.specialty == "writer":
            result = self._write(task)
        elif self.specialty == "reviewer":
            result = self._review(task)
        else:
            result = {"success": False, "error": "未知专长"}

        self.completed_tasks.append(result)
        print(f"[{self.name}] 任务完成")

        return result

    def _research(self, task: Dict[str, Any]) -> Dict[str, Any]:
        """研究任务"""
        return {
            "agent": self.name,
            "type": "research",
            "success": True,
            "output": f"关于 {task.get('topic')} 的研究资料",
            "data": ["资料1", "资料2", "资料3"]
        }

    def _write(self, task: Dict[str, Any]) -> Dict[str, Any]:
        """写作任务"""
        research_data = self.shared_context.get("research_data", [])
        return {
            "agent": self.name,
            "type": "write",
            "success": True,
            "output": f"基于 {len(research_data)} 条资料撰写的文章",
            "content": "文章内容..."
        }

    def _review(self, task: Dict[str, Any]) -> Dict[str, Any]:
        """审查任务"""
        content = task.get("content", "")
        return {
            "agent": self.name,
            "type": "review",
            "success": True,
            "output": "审查意见",
            "feedback": ["修改建议1", "修改建议2"],
            "approved": True
        }

class ParallelCollaborativeSystem:
    """并行协作多 Agent 系统"""

    def __init__(self):
        # 创建 Agents
        self.agents = [
            CollaborativeAgent("Researcher1", "researcher"),
            CollaborativeAgent("Researcher2", "researcher"),
            CollaborativeAgent("Writer1", "writer"),
            CollaborativeAgent("Writer2", "writer"),
            CollaborativeAgent("Reviewer1", "reviewer")
        ]

    def execute_workflow(self, tasks: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        执行工作流

        Args:
            tasks: 任务列表

        Returns:
            执行结果
        """
        print(f"\n{'='*60}")
        print(f"开始执行工作流，共 {len(tasks)} 个任务")
        print(f"{'='*60}\n")

        results = []
        shared_context = {}

        # 并行执行任务
        with ThreadPoolExecutor(max_workers=len(self.agents)) as executor:
            futures = []

            for i, task in enumerate(tasks):
                # 选择合适的 Agent
                task_type = task.get("type")
                agent = self._select_agent(task_type)

                if agent:
                    # 添加共享上下文
                    task["context"] = shared_context

                    # 提交任务
                    future = executor.submit(agent.execute_task, task)
                    futures.append((future, agent))

            # 收集结果
            for future, agent in futures:
                result = future.result()
                results.append(result)

                # 更新共享上下文
                if result.get("success"):
                    if result.get("data"):
                        shared_context["research_data"] = result.get("data", [])
                    if result.get("content"):
                        shared_context["article_content"] = result.get("content")
                    if result.get("feedback"):
                        shared_context["review_feedback"] = result.get("feedback")

        print(f"\n{'='*60}")
        print("工作流执行完成")
        print(f"{'='*60}")

        return {
            "success": True,
            "tasks_completed": len(results),
            "results": results,
            "shared_context": shared_context
        }

    def _select_agent(self, task_type: str) -> CollaborativeAgent:
        """
        选择合适的 Agent

        Args:
            task_type: 任务类型

        Returns:
            选择的 Agent
        """
        if task_type == "research":
            return self.agents[0] if not self.agents[0].completed_tasks else self.agents[1]
        elif task_type == "write":
            return self.agents[2] if not self.agents[2].completed_tasks else self.agents[3]
        elif task_type == "review":
            return self.agents[4]
        else:
            return None

# 使用示例
if __name__ == "__main__":
    system = ParallelCollaborativeSystem()

    # 定义工作流任务
    workflow_tasks = [
        {"type": "research", "topic": "AI Agent 架构"},
        {"type": "research", "topic": "多 Agent 协作"},
        {"type": "write", "topic": "AI Agent 架构与协作"},
        {"type": "write", "topic": "最佳实践"},
        {"type": "review", "content": "待审查的文章"}
    ]

    # 执行工作流
    result = system.execute_workflow(workflow_tasks)

    # 输出结果摘要
    print("\n执行结果摘要：")
    print(f"  完成任务数：{result['tasks_completed']}")
    print(f"  共享上下文键：{list(result['shared_context'].keys())}")

    for r in result['results']:
        if r.get('success'):
            print(f"  - {r['agent']}: {r['output']}")
```

#### 并行协作 vs 其他架构对比表

| 维度 | 并行协作 | 层次化 | 对抗式 |
|----------|----------|--------|--------|
| **执行方式** | 并行执行 | 顺序执行 | 竞争执行 |
| **资源利用** | 高 | 中 | 中 |
| **协作方式** | 平等协作 | 上下级协作 | 对抗竞争 |
| **复杂度** | 中 | 高 | 中 |
| **适用场景** | 并行任务、时间敏感 | 大规模系统、复杂任务 | 博弈、对抗训练 |

---

### 2.3.3 对抗式架构

对抗式架构（Adversarial Architecture）是一种多个 Agent 竞争或对抗的多 Agent 架构，Agent 通过竞争或对抗提高系统性能或生成更优结果。

#### 对抗式架构的定义

对抗式架构是指多个 Agent 以竞争或对抗的方式交互，通过对抗提高系统的鲁棒性、安全性或生成质量。对抗式架构常用于安全防护、对抗训练和游戏博弈。

**学术定义**（来源：最新研究）

- **arXiv（2025）**：多 Agent LLM 防御管道通过协调器管道和 Agent 链设计两种互补架构，提供了灵活的输入前筛选和输出后验证选项，结果表明将安全责任分配给专门的 Agent 提供了实用的解决方案。
- **GitHub（2025）**：对抗性鲁棒性分析揭示了多模态语言模型 Agent 的脆弱性，为对抗防御提供了新的研究方向。

**工程定义**

在实际工程中，对抗式架构通常负责：

1. **对抗生成**：一个或多个 Agent 生成对抗样本
2. **对抗检测**：其他 Agent 检测和防御对抗攻击
3. **对抗训练**：通过对抗训练提高鲁棒性
4. **安全验证**：验证系统的安全性
5. **结果对比**：通过对比生成更优结果

#### 对抗式架构的特点

对抗式架构具有以下特点：

| 特点 | 说明 | 优势 | 劣势 |
|------|------|------|------|
| **竞争对抗** | Agent 之间竞争或对抗 | 提高鲁棒性和安全性 | 可能产生不必要冲突 |
| **动态演化** | 通过对抗不断演化 | 持续改进性能 | 演化方向不可控 |
| **安全增强**： | 提高系统安全性 | 防御能力强 | 防御成本高 |
| **质量提升** | 通过对抗提高生成质量 | 结果更优 | 需要平衡对抗强度 |

#### 对抗式架构的实现方式

对抗式架构可以通过以下方式实现：

**1. 对抗生成网络（GAN）**

生成器生成对抗样本，判别器检测对抗。

**2. 红蓝对抗**：红队攻击，蓝队防御。

**3. 多 Agent 辩论**：多个 Agent 辩论，生成更优结果。

#### 对抗式架构的优势与劣势

**优势**

- **提高鲁棒性**：通过对抗训练提高系统鲁棒性
- **增强安全性**：检测和防御对抗攻击
- **提升质量**：通过对抗生成更优结果
- **持续改进**：动态演化，持续改进

**劣势**

- **资源消耗大**：对抗训练消耗大量资源
- **演化不可控**：对抗演化方向可能不可控
- **平衡困难**：需要平衡对抗强度
- **可能不稳定**：对抗过程可能不稳定

#### 对抗式架构的适用场景

对抗式架构适用于以下场景：

- **安全防护**：需要防御对抗攻击
- **对抗训练**：需要提高鲁棒性
- **质量提升**：需要生成高质量结果
- **游戏博弈**：需要竞争和对抗

#### 代码示例：对抗式多 Agent 系统

以下代码示例展示如何实现一个对抗式的多 Agent 系统：

```python
from typing import Dict, Any, List
import time
import random

class AdversarialAgent:
    """对抗 Agent"""

    def __init__(self, name: str, role: str):
        self.name = name
        self.role = role  # "attacker" or "defender"
        self.actions = []

    def generate_attack(self, target: str) -> Dict[str, Any]:
        """
        生成攻击

        Args:
            target: 攻击目标

        Returns:
            攻击内容
        """
        attack_types = ["prompt_injection", "data_poisoning", "adversarial_example"]

        attack_type = random.choice(attack_types)
        print(f"[{self.name}] 生成攻击：{attack_type}，目标：{target}")

        attack = {
            "agent": self.name,
            "role": self.role,
            "attack_type": attack_type,
            "target": target,
            "content": f"对抗性 {attack_type} 内容",
            "success": True
        }

        self.actions.append(attack)
        return attack

    def detect_attack(self, input_data: str) -> Dict[str, Any]:
        """
        检测攻击

        Args:
            input_data: 输入数据

        Returns:
            检测结果
        """
        # 模拟检测
        time.sleep(0.3)
        detected = random.choice([True, False, True])  # 2/3 概率检测到

        print(f"[{self.name}] 检测攻击：{input_data}，结果：{'检测到' if detected else '未检测到'}")

        detection = {
            "agent": self.name,
            "role": self.role,
            "input_data": input_data,
            "detected": detected,
            "confidence": random.uniform(0.7, 0.99) if detected else 0.0
        }

        self.actions.append(detection)
        return detection

    def generate_defense(self, attack: Dict[str, Any]) -> Dict[str, Any]:
        """
        生成防御

        Args:
            attack: 攻击内容

        Returns:
            防御策略
        """
        print(f"[{self.name}] 生成防御：对抗 {attack['attack_type']}")

        defense = {
            "agent": self.name,
            "role": self.role,
            "attack_type": attack.get("attack_type"),
            "defense_strategy": f"防御 {attack.get('attack_type')}",
            "success": True
        }

        self.actions.append(defense)
        return defense

class AdversarialMultiAgentSystem:
    """对抗式多 Agent 系统"""

    def __init__(self):
        # 创建攻击 Agent（红队）
        self.attacker = AdversarialAgent("Attacker", "attacker")

        # 创建防御 Agent（蓝队）
        self.defender = AdversarialAgent("Defender", "defender")

        # 创建验证 Agent
        self.validator = AdversarialAgent("Validator", "validator")

    def run_adversarial_round(self, target: str, rounds: int = 3) -> Dict[str, Any]:
        """
        运行对抗回合

        Args:
            target: 目标
            rounds: 回合数

        Returns:
            对抗结果
        """
        print(f"\n{'='*60}")
        print(f"开始对抗，目标：{target}，回合数：{rounds}")
        print(f"{'='*60}\n")

        results = []
        defense_success = 0

        for round_num in range(1, rounds + 1):
            print(f"\n--- 第 {round_num} 回合 ---")

            # 攻击方生成攻击
            attack = self.attacker.generate_attack(target)

            # 防御方检测攻击
            detection = self.defender.detect_attack(attack["content"])

            # 如果检测到，生成防御
            if detection["detected"]:
                defense = self.defender.generate_defense(attack)
                defense_success += 1

            # 验证方验证结果
            validation = self._validate_round(attack, detection)
            results.append(validation)

            time.sleep(0.5)

        # 输出统计结果
        print(f"\n{'='*60}")
        print("对抗结束")
        print(f"{'='*60}")
        print(f"总回合数：{rounds}")
        print(f"防御成功：{defense_success} ({defense_success/rounds*100:.1f}%)")
        print(f"攻击成功：{rounds - defense_success} ({(rounds-defense_success)/rounds*100:.1f}%)")

        return {
            "target": target,
            "rounds": rounds,
            "attacks": rounds,
            "defenses_successful": defense_success,
            "defenses_failed": rounds - defense_success,
            "results": results
        }

    def _validate_round(self, attack: Dict[str, Any], detection: Dict[str, Any]) -> Dict[str, Any]:
        """
        验证回合结果

        Args:
            attack: 攻击
            detection: 检测结果

        Returns:
            验证结果
        """
        validation = {
            "round": len(self.validator.actions) + 1,
            "attack_type": attack.get("attack_type"),
            "detected": detection.get("detected"),
            "confidence": detection.get("confidence"),
            "success": detection.get("detected") and detection.get("confidence") > 0.8
        }

        self.validator.actions.append(validation)
        return validation

# 使用示例
if __name__ == "__main__":
    system = AdversarialMultiAgentSystem()

    # 运行对抗回合
    result = system.run_adversarial_round("AI Agent 安全性", rounds=5)

    # 输出详细结果
    print("\n详细结果：")
    for i, r in enumerate(result["results"], 1):
        status = "✓" if r["success"] else "✗"
        print(f"  {status} 回合 {i}: {r['attack_type']} - 检测: {r['detected']}, 置信度: {r['confidence']:.2f}")
```

#### 对抗式 vs 其他架构对比表

| 维度 | 对抗式 | 层次化 | 并行协作 |
|----------|--------|--------|----------|
| **交互方式** | 竞争对抗 | 上下协作 | 平等协作 |
| **目标导向** | 安全/质量提升 | 任务完成 | 效率提升 |
| **复杂度** | 中 | 高 | 中 |
| **稳定性** | 低 | 高 | 中 |
| **适用场景** | 安全防护、对抗训练 | 大规模系统、复杂任务 | 并行任务、时间敏感 |

---

### 2.3.4 联邦式架构

联邦式架构（Federated Architecture）是一种分布式多 Agent 架构，多个 Agent 在本地训练或处理数据，通过联邦学习或联邦计算聚合结果，保护数据隐私。

#### 联邦式架构的定义

联邦式架构是指多个 Agent 分布在本地或边缘节点上，每个 Agent 本地训练或处理数据，通过联邦学习（Federated Learning）或联邦计算聚合全局模型或结果，保护数据隐私和安全。

**学术定义**（来源：最新研究）

- **arXiv（2025）**：联邦强化学习（FRL）构成了分布式计算客户端团队协作解决 RL 问题，客户端可以驻留在不同的自主系统上。
- **ScienceDirect（2026）**：提供了从 2023 年到 2025 年 FL 研究的结构化和最新回顾，提供了统一的分类法，将工作按数据分布（水平 FL、垂直 FL、联邦迁移学习和个性化 FL）分类。

**工程定义**

在实际工程中，联邦式架构通常负责：

1. **本地训练**：每个 Agent 本地训练或处理数据
2. **隐私保护**：保护数据隐私和安全
3. **模型聚合**：聚合多个 Agent 的本地模型
4. **通信优化**：优化通信开销和延迟
5. **结果验证**：验证聚合结果的有效性

#### 联邦式架构的特点

联邦式架构具有以下特点：

| 特点 | 说明 | 优势 | 劣势 |
|------|------|------|------|
| **数据隐私**： | 数据不离开本地 | 保护隐私和安全 | 聚合结果可能不理想 |
| **分布式训练** | Agent 分布在本地节点 | 降低中心服务器负载 | 通信开销大 |
| **个性化** | 每个可有个性化模型 | 适应本地需求 | 模型一致难 |
| **可扩展** | 支持大规模 Agent | 适应大规模部署 | 协调复杂 |

#### 联邦式架构的实现方式

联邦式架构可以通过以下方式实现：

**1. 联邦学习（FL）**

本地训练模型，中心聚合参数。

**2. 联邦计算**

本地计算，聚合结果。

**3. 联邦迁移学习**

本地迁移学习，聚合知识。

#### 联邦式架构的优势与劣势

**优势**

- **隐私保护**：数据不离开本地，保护隐私
- **分布式负载**：降低中心服务器负载
- **个性化**：支持个性化模型
- **可扩展**：支持大规模部署

**劣势**

- **通信开销大**：需要频繁通信
- **聚合难**：聚合结果可能不理想
- **模型一致难**：保持模型一致性困难
- **协调复杂**：协调多个 Agent 复杂

#### 联邦式架构的适用场景

联邦式架构适用于以下场景：

- **隐私敏感**：数据隐私要求高
- **分布式环境**：Agent 分布在不同节点
- **个性化需求**：需要个性化模型
- **大规模部署**：大规模 Agent 部署

#### 代码示例：联邦式多 Agent 系统

以下代码示例展示如何实现一个联邦式的多 Agent 系统：

```python
from typing import Dict, Any, List
import time
import random

class FederatedAgent:
    """联邦 Agent"""

    def __init__(self, name: str, local_data: List[Dict[str, Any]]):
        self.name = name
        self.local_data = local_data
        self.local_model = self._initialize_model()

    def _initialize_model(self) -> Dict[str, float]:
        """初始化本地模型"""
        return {"weight1": random.random(), "weight2": random.random(), "bias": random.random()}

    def train_locally(self, epochs: int = 5) -> Dict[str, Any]:
        """
        本地训练

        Args:
            epochs: 训练轮数

        Returns:
            本地模型
        """
        print(f"[{self.name}] 本地训练开始，数据量：{len(self.local_data)}")

        # 模拟本地训练
        for epoch in range(epochs):
            loss = self._train_one_epoch()
            if (epoch + 1) % 2 == 0:
                print(f"[{self.name}] Epoch {epoch + 1}/{epochs}, Loss: {loss:.4f}")

        print(f"[{self.name}] 本地训练完成")

        return self.local_model

    def _train_one_epoch(self) -> float:
        """
        训练一个 epoch

        Returns:
            Loss
        """
        # 模拟训练
        time.sleep(0.2)

        # 更新模型
        for key in self.local_model:
            self.local_model[key] += random.uniform(-0.01, 0.01)

        # 计算模拟 Loss
        loss = random.uniform(0.1, 0.5)
        return loss

    def get_model_update(self) -> Dict[str, float]:
        """
        获取模型更新

        Returns:
            模型参数
        """
        return self.local_model.copy()

    def update_model(self, global_model: Dict[str, float]):
        """
        更新本地模型

        Args:
            global_model: 全局模型
        """
        print(f"[{self.name}] 更新本地模型")
        self.local_model = global_model.copy()

class FederatedLearningCoordinator:
    """联邦学习协调器"""

    def __init__(self):
        self.global_model = {"weight1": 0.5, "weight2": 0.5, "bias": 0.0}
        self.agents = []
        self.history = []

    def add_agent(self, agent: FederatedAgent):
        """
        添加 Agent

        Args:
            agent: Agent
        """
        self.agents.append(agent)

    def aggregate_models(self, model_updates: List[Dict[str, float]]) -> Dict[str, float]:
        """
        聚合模型（FedAvg）

        Args:
            model_updates: 模型更新列表

        Returns:
            聚合后的模型
        """
        print("\n[协调器] 聚合模型")

        n_agents = len(model_updates)

        # FedAvg: 平均
        aggregated = {}
        for key in self.global_model:
            sum_weight = sum(update[key] for update in model_updates)
            aggregated[key] = sum_weight / n_agents

        # 更新全局模型
        self.global_model = aggregated

        print(f"[协调器] 聚合完成，模型参数：{self.global_model}")

        return aggregated

    def run_federated_round(self, epochs: int = 5) -> Dict[str, Any]:
        """
        运行联邦学习回合

        Args:
            epochs: 本地训练轮数

        Returns:
            回合结果
        """
        print(f"\n{'='*60}")
        print("开始联邦学习回合")
        print(f"{'='*60}\n")

        # 本地训练
        local_models = []
        for agent in self.agents:
            model = agent.train_locally(epochs)
            local_models.append(model)

        # 获取模型更新
        model_updates = [agent.get_model_update() for agent in self.agents]

        # 聚合模型
        global_model = self.aggregate_models(model_updates)

        # 更新本地模型
        for agent in self.agents:
            agent.update_model(global_model)

        # 记录历史
        round_result = {
            "round": len(self.history) + 1,
            "global_model": global_model.copy(),
            "local_models": local_models.copy()
        }
        self.history.append(round_result)

        return round_result

    def train(self, rounds: int, local_epochs: int = 5) -> Dict[str, Any]:
        """
        训练多个回合

        Args:
            rounds: 回合数
            local_epochs: 本地训练轮数

        Returns:
            训练结果
        """
        print(f"\n{'='*60}")
        print(f"联邦学习训练，回合数：{rounds}，本地训练轮数：{local_epochs}")
        print(f"{'='*60}")

        for round_num in range(rounds):
            self.run_federated_round(local_epochs)
            time.sleep(0.5)

        print(f"\n{'='*60}")
        print("训练完成")
        print(f"{'='*60}")

        return {
            "rounds": rounds,
            "final_model": self.global_model,
            "history": self.history
        }

# 使用示例
if __name__ == "__main__":
    # 创建协调器
    coordinator = FederatedLearningCoordinator()

    # 创建 Agent（模拟不同的本地数据）
    agent1 = FederatedAgent("Agent1", [{"x": 1, "y": 2}, {"x": 2, "y": 4}])
    agent2 = FederatedAgent("Agent2", [{"x": 3, "y": 6}, {"x": 4, "y": 8}])
    agent3 = FederatedAgent("Agent3", [{"x": 5, "y": 10}, {"x": 6, "y": 12}])

    # 添加 Agent
    coordinator.add_agent(agent1)
    coordinator.add_agent(agent2)
    coordinator.add_agent(agent3)

    # 训练
    result = coordinator.train(rounds=3, local_epochs=5)

    # 输出最终模型
    print(f"\n最终全局模型：{result['final_model']}")
    print(f"训练回合数：{result['rounds']}")
```

#### 联邦式 vs 其他架构对比表

| 维度 | 联邦式 | 层次化 | 并行协作 |
|----------|--------|--------|----------|
| **数据隐私** | 高 | 低 | 低 |
| **通信开销** | 高 | 中 | 中 |
| **个性化** | 强 | 弱 | 弱 |
| **可扩展性** | 强 | 强 | 强 |
| **适用场景** | 隐私敏感、分布式 | 大规模系统、复杂任务 | 并行任务、时间敏感 |

---

## 2.4 Agent 通信机制

Agent 通信机制是指 Agent 之间、Agent 与环境、Agent 与人之间的信息交换方式，包括协议、格式和交互模式。

### 2.4.1 Agent 间通信

Agent 间通信（Agent-to-Agent Communication）是指多个 Agent 之间的信息交换，用于协作、协调和共享信息。

#### Agent 间通信的定义

Agent 间通信是指 Agent 之间通过特定的协议和格式交换信息，包括消息传递、共享状态、工具调用等方式。Agent 间通信是多 Agent 系统的基础。

**学术定义**（来源：最新研究）

- **IBM（2025）**：Agent2Agent（A2A）协议最初由 Google 和其他技术合作伙伴在 Google Cloud 平台上于 2025 年 4 月启动，现由 Linux Foundation 托管作为开源 Agent2Agent（A2A）项目。
- **Subramanya（2025）**：2025 年，两个关键发展为混乱带来了秩序。2024 年底引入的模型上下文协议（MCP）成为 Agent 到工具通信的事实标准。
- **arXiv（2025）**：2024-2025 年的协议导向互操作性阶段强调了 MCP、ACP、ANP 和 A2A 等轻量级、标准化协议，这些协议通过支持动态发现、安全通信和跨异构系统的去中心化协作，解决了先前的局限性。

**工程定义**

在实际工程中，Agent 间通信通常负责：

1. **消息传递**：Agent 之间传递消息
2. **协议协商**：协商通信协议和格式
3. **状态共享**：共享 Agent 状态和上下文
4. **任务协调**：协调 Agent 的任务执行
5. **错误处理**：处理通信错误和异常

#### Agent 间通信的方式

Agent 间通信可以通过以下方式实现：

**1. 模型上下文协议（MCP）**

标准化 Agent 到工具的通信协议。

**2. Agent-to-Agent 协议（A2A）**

Google 和 Linux Foundation 推出的 Agent 间通信协议。

**3. 消息队列**

使用消息队列（如 RabbitMQ、Kafka）实现异步通信。

#### Agent 间通信的特点

Agent 间通信具有以下特点：

| 特点 | 说明 | 优势 | 劣势 |
|------|------|------|------|
| **标准化** | 使用标准协议 | 互操作性强 | 协议更新复杂 |
| **异步通信**： | 支持异步消息传递 | 降低耦合、提高吞吐 | 顺序难以保证 |
| **可扩展** | 支持大规模 Agent | 适应大规模部署 | 协调复杂 |
| **安全**： | 支持安全通信 | 保护通信安全 | 开销大 |

#### Agent 间通信的优势与劣势

**优势**

- **互操作性强**：标准协议支持不同 Agent 互操作
- **异步通信**：支持异步消息传递
- **可扩展**：支持大规模 Agent 部署
- **安全**：支持安全通信

**劣势**

- **协议复杂**：标准协议实现复杂
- **顺序难保证**：异步通信顺序难以保证
- **协调复杂**：大规模 Agent 协调复杂
- **开销大**：通信开销大

#### Agent 间通信的适用场景

Agent 间通信适用于以下场景：

- **多 Agent 协作**：多个 Agent 协作完成任务
- **分布式系统**：Agent 分布在不同节点
- **大规模部署**：大规模 Agent 部署
- **安全要求**：需要安全通信

#### 代码示例：Agent 间通信

以下代码示例展示如何实现 Agent 间通信：

```python
from typing import Dict, Any, List, Callable
import time
from collections import deque

class Message:
    """消息类"""

    def __init__(self, sender: str, receiver: str, content: Dict[str, Any]):
        self.sender = sender
        self.receiver = receiver
        self.content = content
        self.timestamp = time.time()

class MessageQueue:
    """消息队列"""

    def __init__(self):
        self.queues = {}  # {receiver: deque(messages)}
        self.message_handlers = {}  # {receiver: handler_function}

    def register_agent(self, agent_name: str, handler: Callable[[Message], None]):
        """
        注册 Agent

        Args:
            agent_name: Agent 名称
            handler: 消息处理函数
        """
        self.queues[agent_name] = deque()
        self.message_handlers[agent_name] = handler
        print(f"[消息队列] 注册 Agent: {agent_name}")

    def send_message(self, message: Message):
        """
        发送消息

        Args:
            message: 消息
        """
        receiver = message.receiver

        if receiver in self.queues:
            self.queues[receiver].append(message)
            print(f"[消息队列] 消息已发送: {message.sender} -> {receiver}")
        else:
            print(f"[消息队列] 错误: 接收者 {receiver} 未注册")

    def process_messages(self):
        """处理所有 Agent 的消息"""
        for agent_name, queue in self.queues.items():
            if queue:
                message = queue.popleft()
                handler = self.message_handlers.get(agent_name)

                if handler:
                    print(f"[消息队列] 处理消息: {message.sender} -> {agent_name}")
                    handler(message)
                else:
                    print(f"[消息队列] 错误: {agent_name} 无处理器")

class CommunicatingAgent:
    """通信 Agent"""

    def __init__(self, name: str, message_queue: MessageQueue):
        self.name = name
        self.message_queue = message_queue
        self.message_history = []

        # 注册 Agent
        self.message_queue.register_agent(name, self.handle_message)

    def send_message(self, receiver: str, content: Dict[str, Any]):
        """
        发送消息

        Args:
            receiver: 接收者
            content: 消息内容
        """
        message = Message(self.name, receiver, content)
        self.message_queue.send_message(message)

    def handle_message(self, message: Message):
        """
        处理消息

        Args:
            message: 消息
        """
        self.message_history.append(message)
        print(f"[{self.name}] 收到消息: {message.sender}, 内容: {message.content}")

        # 处理消息
        self._process_message(message)

    def _process_message(self, message: Message):
        """
        处理消息（子类可覆盖）

        Args:
            message: 消息
        """
        message_type = message.content.get("type")

        if message_type == "task":
            self._handle_task(message)
        elif message_type == "result":
            self._handle_result(message)
        elif message_type == "status":
            self._handle_status(message)

    def _handle_task(self, message: Message):
        """处理任务消息"""
        task = message.content.get("task")
        print(f"[{self.name}] 处理任务: {task}")

    def _handle_result(self, message: Message):
        """处理结果消息"""
        result = message.content.get("result")
        print(f"[{self.name}] 收到结果: {result}")

    def _handle_status(self, message: Message):
        """处理状态消息"""
        status = message.content.get("status")
        print(f"[{self.name}] 收到状态: {status}")

class AgentCommunicationSystem:
    """Agent 通信系统"""

    def __init__(self):
        # 创建消息队列
        self.message_queue = MessageQueue()

        # 创建 Agents
        self.agents = []

    def add_agent(self, agent: CommunicatingAgent):
        """
        添加 Agent

        Args:
            agent: Agent
        """
        self.agents.append(agent)

    def run_communication_round(self):
        """运行通信回合"""
        print(f"\n{'='*60}")
        print("开始通信回合")
        print(f"{'='*60}\n")

        # 处理所有消息
        self.message_queue.process_messages()

        time.sleep(0.5)

        print(f"\n{'='*60}")
        print("通信回合结束")
        print(f"{'='*60}")

    def broadcast_message(self, sender: str, content: Dict[str, Any]):
        """
        广播消息

        Args:
            sender: 发送者
            content: 消息内容
        """
        for agent in self.agents:
            if agent.name != sender:
                sender_agent = next((a for a in self.agents if a.name == sender), None)
                if sender_agent:
                    sender_agent.send_message(agent.name, content)

# 使用示例
if __name__ == "__main__":
    # 创建通信系统
    system = AgentCommunicationSystem()

    # 创建 Agents
    agent1 = CommunicatingAgent("Agent1", system.message_queue)
    agent2 = CommunicatingAgent("Agent2", system.message_queue)
    agent3 = CommunicatingAgent("Agent3", system.message_queue)

    # 添加 Agents
    system.add_agent(agent1)
    system.add_agent(agent2)
    system.add_agent(agent3)

    # Agent1 发送任务给 Agent2
    print("\n--- 测试 1: 点对点通信 ---")
    agent1.send_message("Agent2", {"type": "task", "task": "分析数据"})
    system.run_communication_round()

    # Agent2 发送结果给 Agent3
    print("\n--- 测试 2: 点对点通信 ---")
    agent2.send_message("Agent3", {"type": "result", "result": "分析完成"})
    system.run_communication_round()

    # Agent3 广播状态
    print("\n--- 测试 3: 广播通信 ---")
    system.broadcast_message("Agent3", {"type": "status", "status": "就绪"})
    system.run_communication_round()

    # 输出消息历史
    print("\n消息历史:")
    for agent in system.agents:
        print(f"  {agent.name}: {len(agent.message_history)} 条消息")
```

#### Agent 间通信协议对比表

| 协议 | 发布者 | 特点 | 适用场景 |
|----------|--------|------|----------|
| **MCP** | Anthropic | Agent 到工具通信 | 工具集成、系统扩展 |
| **A2A** | Google/Linux Foundation | Agent 间通信 | 多 Agent 协作、分布式系统 |
| **ACP** | 开源社区 | Agent 通信协议 | 通用通信 |
| **ANP** | 开源社区 | Agent 网络协议 | 大规模部署 |

---

### 2.4.2 Agent 与环境通信

Agent 与环境通信（Agent-Environment Communication）是指 Agent 与外部环境（包括工具、API、数据库、物理环境等）的信息交换，用于感知环境状态和执行环境操作。

#### Agent 与环境通信的定义

Agent 与环境通信是指 Agent 通过工具、API、传感器、执行器等与外部环境交互，包括感知环境状态和执行环境操作。Agent 与环境通信是 Agent 执行任务的基础。

**学术定义**（来源：最新研究）

- **Hugging Face（2025）**：AgentScope 平台通过分布式机制、灵活环境和用户友好工具提高了大规模多 Agent 模拟的可扩展性、效率和易用性。
- **IEEE（2025）**：基于 LLM 的 GUI Agent 通过关键帧选择和状态表示优化，显著提高了与图形用户界面的交互效率。

**工程定义**

在实际工程中，Agent 与环境通信通常负责：

1. **环境感知**：获取环境状态和信息
2. **工具调用**：调用外部工具完成操作
3. **API 访问**：访问外部 API 获取数据
4. **数据库操作**：读写数据库
5. **物理交互**：与物理环境交互（机器人、IoT 等）

#### Agent 与环境通信的方式

Agent 与环境通信可以通过以下方式实现：

**1. 工具调用（Function Calling）**

通过函数调用接口调用工具。

**2. API 访问**

调用外部 API（如 HTTP API）。

**3. 数据库访问**

直接访问数据库（如 SQL、NoSQL）。

**4. 传感器/执行器**

通过传感器和执行器与物理环境交互。

#### Agent 与环境通信的特点

Agent 与环境通信具有以下特点：

| 特点 | 说明 | 优势 | 劣势 |
|------|------|------|------|
| **工具集成**： | 集成多种工具 | 扩展能力强 | 工具管理复杂 |
| **实时性** | 支持实时交互 | 响应快 | 延迟敏感 |
| **异步支持** | 支持异步操作 | 提高吞吐 | 顺序难保证 |
| **错误处理** | 支持错误处理 | 提高鲁棒性 | 处理逻辑复杂 |

#### Agent 与环境通信的优势与劣势

**优势**

- **扩展性强**：可以集成各种工具和 API
- **实时性好**：支持实时交互
- **异步支持**：支持异步操作
- **错误处理**：支持错误处理

**劣势**

- **工具管理复杂**：管理多种工具复杂
- **延迟敏感**：实时性要求高
- **顺序难保证**：异步操作顺序难保证
- **错误处理复杂**：错误处理逻辑复杂

#### Agent 与环境通信的适用场景

Agent 与环境通信适用于以下场景：

- **工具集成**：需要集成多种工具
- **实时交互**：需要实时交互
- **API 访问**：需要访问外部 API
- **数据库操作**：需要操作数据库

#### 代码示例：Agent 与环境通信

以下代码示例展示如何实现 Agent 与环境通信：

```python
from typing import Dict, Any, List
import time

class Tool:
    """工具基类"""

    def __init__(self, name: str):
        self.name = name

    def execute(self, **kwargs) -> Dict[str, Any]:
        """
        执行工具

        Args:
            kwargs: 参数

        Returns:
            执行结果
        """
        pass

class WeatherTool(Tool):
    """天气工具"""

    def __init__(self):
        super().__init__("WeatherTool")

    def execute(self, city: str) -> Dict[str, Any]:
        """
        查询天气

        Args:
            city: 城市名称

        Returns:
            天气信息
        """
        print(f"[{self.name}] 查询天气: {city}")

        # 模拟 API 调用
        time.sleep(0.5)

        weather_data = {
            "city": city,
            "temperature": 25,
            "humidity": 60,
            "condition": "晴天"
        }

        return {
            "success": True,
            "data": weather_data,
            "message": f"{city} 今天天气：{weather_data['condition']}，温度 {weather_data['temperature']}°C"
        }

class DatabaseTool(Tool):
    """数据库工具"""

    def __init__(self):
        super().__init__("DatabaseTool")
        self.database = {
            "users": [
                {"id": 1, "name": "Alice", "email": "alice@example.com"},
                {"id": 2, "name": "Bob", "email": "bob@example.com"}
            ]
        }

    def execute(self, operation: str, **kwargs) -> Dict[str, Any]:
        """
        执行数据库操作

        Args:
            operation: 操作类型
            kwargs: 参数

        Returns:
            操作结果
        """
        print(f"[{self.name}] 执行操作: {operation}")

        # 模拟数据库操作
        time.sleep(0.3)

        if operation == "query":
            return self._query(kwargs.get("table"), kwargs.get("filters"))
        elif operation == "insert":
            return self._insert(kwargs.get("table"), kwargs.get("data"))
        elif operation == "update":
            return self._update(kwargs.get("table"), kwargs.get("filters"), kwargs.get("data"))
        else:
            return {"success": False, "error": "未知操作"}

    def _query(self, table: str, filters: Dict[str, Any]) -> Dict[str, Any]:
        """查询数据"""
        if table in self.database:
            if filters:
                results = [item for item in self.database[table] if all(item.get(k) == v for k, v in filters.items())]
            else:
                results = self.database[table]

            return {
                "success": True,
                "data": results,
                "count": len(results)
            }
        else:
            return {"success": False, "error": "表不存在"}

    def _insert(self, table: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """插入数据"""
        if table in self.database:
            self.database[table].append(data)
            return {"success": True, "message": "数据已插入"}
        else:
            return {"success": False, "error": "表不存在"}

    def _update(self, table: str, filters: Dict[str, Any], data: Dict[str, Any]) -> Dict[str, Any]:
        """更新数据"""
        if table in self.database:
            count = 0
            for item in self.database[table]:
                if all(item.get(k) == v for k, v in filters.items()):
                    item.update(data)
                    count += 1

            return {
                "success": True,
                "count": count,
                "message": f"已更新 {count} 条记录"
            }
        else:
            return {"success": False, "error": "表不存在"}

class APITool(Tool):
    """API 工具"""

    def __init__(self):
        super().__init__("APITool")

    def execute(self, endpoint: str, method: str = "GET", **kwargs) -> Dict[str, Any]:
        """
        调用 API

        Args:
            endpoint: 端点
            method: 方法
            kwargs: 参数

        Returns:
            API 响应
        """
        print(f"[{self.name}] 调用 API: {method} {endpoint}")

        # 模拟 API 调用
        time.sleep(0.5)

        return {
            "success": True,
            "data": {
                "endpoint": endpoint,
                "method": method,
                "response": "API 响应数据"
            }
        }

class EnvironmentInteractingAgent:
    """与环境交互的 Agent"""

    def __init__(self, name: str):
        self.name = name
        self.tools = {}
        self.execution_history = []

    def register_tool(self, tool: Tool):
        """
        注册工具

        Args:
            tool: 工具
        """
        self.tools[tool.name] = tool
        print(f"[{self.name}] 注册工具: {tool.name}")

    def execute_tool(self, tool_name: str, **kwargs) -> Dict[str, Any]:
        """
        执行工具

        Args:
            tool_name: 工具名称
            kwargs: 参数

        Returns:
            执行结果
        """
        if tool_name in self.tools:
            print(f"\n[{self.name}] 执行工具: {tool_name}")

            tool = self.tools[tool_name]
            result = tool.execute(**kwargs)

            self.execution_history.append({
                "tool": tool_name,
                "parameters": kwargs,
                "result": result,
                "timestamp": time.time()
            })

            return result
        else:
            return {"success": False, "error": f"工具 {tool_name} 未注册"}

    def run_workflow(self, workflow: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        运行工作流

        Args:
            workflow: 工作流步骤

        Returns:
            执行结果
        """
        print(f"\n{'='*60}")
        print(f"[{self.name}] 开始执行工作流，步骤数: {len(workflow)}")
        print(f"{'='*60}\n")

        results = []

        for step in workflow:
            tool_name = step.get("tool")
            parameters = step.get("parameters", {})

            result = self.execute_tool(tool_name, **parameters)
            results.append(result)

            if not result.get("success"):
                print(f"[{self.name}] 工作流执行失败")
                break

            time.sleep(0.5)

        print(f"\n{'='*60}")
        print(f"[{self.name}] 工作流执行完成")
        print(f"{'='*60}")

        return {
            "success": all(r.get("success") for r in results),
            "steps_executed": len(results),
            "results": results
        }

# 使用示例
if __name__ == "__main__":
    # 创建 Agent
    agent = EnvironmentInteractingAgent("EnvironmentAgent")

    # 注册工具
    agent.register_tool(WeatherTool())
    agent.register_tool(DatabaseTool())
    agent.register_tool(APITool())

    # 定义工作流
    workflow = [
        {
            "tool": "WeatherTool",
            "parameters": {"city": "北京"}
        },
        {
            "tool": "DatabaseTool",
            "parameters": {
                "operation": "query",
                "table": "users"
            }
        },
        {
            "tool": "DatabaseTool",
            "parameters": {
                "operation": "insert",
                "table": "users",
                "data": {"id": 3, "name": "Charlie", "email": "charlie@example.com"}
            }
        },
        {
            "tool": "APITool",
            "parameters": {
                "endpoint": "/api/data",
                "method": "POST"
            }
        }
    ]

    # 执行工作流
    result = agent.run_workflow(workflow)

    # 输出结果
    print(f"\n执行结果: {result['steps_executed']} 个步骤")
    if result['success']:
        print("工作流执行成功！")
    else:
        print("工作流执行失败！")
```

#### Agent 与环境通信方式对比表

| 方式 | 特点 | 适用场景 |
|----------|--------|----------|
| **工具调用** | 调用预定义工具 | 任务执行、系统操作 |
| **API 访问** | 调用外部 API | 数据获取、服务集成 |
| **数据库访问** | 直接操作数据库 | 数据管理、持久化 |
| **传感器/执行器** | 与物理环境交互 | 机器人、IoT 设备 |

---

### 2.4.3 Agent 与人通信

Agent 与人通信（Agent-Human Communication）是指 Agent 与人之间的信息交换，包括文本、语音、图像、视频等多模态交互方式。

#### Agent 与人通信的定义

Agent 与人通信是指 Agent 通过自然语言、语音、图像、视频等方式与人交互，包括理解和生成多模态内容。Agent 与人通信是人机交互的核心。

**学术定义**（来源：最新研究）

- **Frontiers（2025）**：一些机器人如 Pepper 现在可以支持 ChatGPT 模块，允许它们说话和响应用户的声音，而像 Claude 或 Gemini 这样的聊天机器人也提供基于音频的通信，而不仅仅是基于文本的通信。

**工程定义**

在实际工程中，Agent 与人通信通常负责：

1. **多模态理解**：理解文本、语音、图像、视频
2. **多模态生成**：生成文本、语音、图像、视频
3. **上下文感知**：理解对话上下文和用户状态
4. **个性化交互**：提供个性化的交互体验
5. **安全过滤**：过滤不当内容和攻击

#### Agent 与人通信的方式

Agent 与人通信可以通过以下方式实现：

**1. 文本交互**

基于文本的对话和交互。

**2. 语音交互**

基于语音的对话和交互（ASR + TTS）。

**3. 多模态交互**

文本、语音、图像、视频等多模态交互。

#### Agent 与人通信的特点

Agent 与人通信具有以下特点：

| 特点 | 说明 | 优势 | 劣势 |
|------|------|------|------|
| **多模态** | 支持多种交互方式 | 体验丰富、适应性强 | 实现复杂 |
| **上下文感知** | 理解对话上下文 | 交互自然、连贯 | 上下文管理复杂 |
| **个性化** | 提供个性化交互 | 提升用户体验 | 个性化学习难 |
| **安全过滤**： | 过滤不当内容 | 保护用户和系统 | 过滤精度难保证 |

#### Agent 与人通信的优势与劣势

**优势**

- **体验丰富**：多模态交互体验丰富
- **交互自然**：上下文感知交互自然
- **个性化**：提供个性化交互体验
- **安全保护**：过滤不当内容

**劣势**

- **实现复杂**：多模态交互实现复杂
- **上下文管理复杂**：上下文管理复杂
- **个性化学习难**：个性化学习困难
- **过滤精度难保证**：内容过滤精度难保证

#### Agent 与人通信的适用场景

Agent 与人通信适用于以下场景：

- **智能助手**：个人智能助手
- **客户服务**：自动客服系统
- **教育辅导**：智能教育系统
- **娱乐交互**：娱乐和游戏

#### 代码示例：Agent 与人通信

以下代码示例展示如何实现 Agent 与人通信：

```python
from typing import Dict, Any, List
import time

class HumanAgent:
    """与人交互的 Agent"""

    def __init__(self, name: str):
        self.name = name
        self.conversation_history = []
        self.user_context = {}
        self.preferences = {}

    def receive_message(self, message: str, modality: str = "text") -> Dict[str, Any]:
        """
        接收用户消息

        Args:
            message: 用户消息
            modality: 模态（text/voice/image/video）

        Returns:
            理解结果
        """
        print(f"\n[{self.name}] 收到消息 ({modality}): {message}")

        # 理解消息
        understanding = self._understand_message(message, modality)

        # 记录对话历史
        self.conversation_history.append({
            "role": "user",
            "message": message,
            "modality": modality,
            "timestamp": time.time()
        })

        # 更新用户上下文
        self._update_context(understanding)

        return understanding

    def generate_response(self, understanding: Dict[str, Any], modality: str = "text") -> str:
        """
        生成回复

        Args:
            understanding: 理解结果
            modality: 模态（text/voice/image/video）

        Returns:
            回复内容
        """
        intent = understanding.get("intent", "unknown")

        # 根据意图生成回复
        response = self._generate_by_intent(intent, understanding)

        # 记录对话历史
        self.conversation_history.append({
            "role": "agent",
            "message": response,
            "modality": modality,
            "timestamp": time.time()
        })

        print(f"[{self.name}] 生成回复: {response}")

        return response

    def _understand_message(self, message: str, modality: str) -> Dict[str, Any]:
        """
        理解消息

        Args:
            message: 消息
            modality: 模态

        Returns:
            理解结果
        """
        # 简化实现：基于关键词理解
        message_lower = message.lower()

        if any(kw in message_lower for kw in ["你好", "hello", "hi"]):
            intent = "greeting"
        elif any(kw in message_lower for kw in ["天气", "weather"]):
            intent = "query_weather"
        elif any(kw in message_lower for kw in ["时间", "time"]):
            intent = "query_time"
        elif any(kw in message_lower for kw in ["帮助", "help", "?"]):
            intent = "request_help"
        elif any(kw in message_lower for kw in ["再见", "bye", "再见"]):
            intent = "farewell"
        else:
            intent = "unknown"

        return {
            "intent": intent,
            "entities": self._extract_entities(message_lower),
            "modality": modality,
            "confidence": 0.9
        }

    def _extract_entities(self, message_lower: str) -> Dict[str, Any]:
        """提取实体"""
        entities = {}

        # 提取城市
        cities = ["北京", "上海", "深圳", "广州"]
        for city in cities:
            if city in message_lower:
                entities["city"] = city
                break

        # 提取时间
        import datetime
        if "今天" in message_lower:
            entities["time"] = "今天"
        elif "明天" in message_lower:
            entities["time"] = "明天"
        elif "后天" in message_lower:
            entities["time"] = "后天"

        return entities

    def _update_context(self, understanding: Dict[str, Any]):
        """
        更新用户上下文

        Args:
            understanding: 理解结果
        """
        intent = understanding.get("intent")
        entities = understanding.get("entities", {})

        # 更新上下文
        if "city" in entities:
            self.user_context["last_city"] = entities["city"]

        if "time" in entities:
            self.user_context["last_time"] = entities["time"]

        # 更新偏好
        if intent == "query_weather" and "city" in entities:
            self.preferences["default_city"] = entities["city"]

    def _generate_by_intent(self, intent: str, understanding: Dict[str, Any]) -> str:
        """
        根据意图生成回复

        Args:
            intent: 意图
            understanding: 理解结果

        Returns:
            回复
        """
        entities = understanding.get("entities", {})

        if intent == "greeting":
            return "你好！很高兴见到你，有什么我可以帮助你的吗？"
        elif intent == "query_weather":
            city = entities.get("city", self.preferences.get("default_city", "北京"))
            return f"{city} 今天天气：晴天，温度 25°C，湿度 60%"
        elif intent == "query_time":
            import datetime
            current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            return f"当前时间：{current_time}"
        elif intent == "request_help":
            help_text = """
            我可以帮助你：
            - 查询天气：输入"天气"或"weather"
            - 获取时间：输入"时间"或"time"
            - 问候：输入"你好"或"hello"
            - 帮助：输入"帮助"或"help"
            - 再见：输入"再见"或"bye"
            """
            return help_text.strip()
        elif intent == "farewell":
            return "再见！很高兴为你服务，下次见！"
        else:
            return "抱歉，我不理解你的请求。可以试试询问天气、时间，或输入'help'查看帮助。"

    def get_conversation_summary(self) -> Dict[str, Any]:
        """
        获取对话摘要

        Returns:
            对话摘要
        """
        return {
            "total_messages": len(self.conversation_history),
            "user_messages": len([m for m in self.conversation_history if m["role"] == "user"]),
            "agent_messages": len([m for m in self.conversation_history if m["role"] == "agent"]),
            "modalities": list(set(m["modality"] for m in self.conversation_history)),
            "user_context": self.user_context,
            "preferences": self.preferences
        }

class HumanAgentSystem:
    """与人交互的 Agent 系统"""

    def __init__(self):
        self.agent = HumanAgent("Assistant")

    def interact(self) -> None:
        """交互循环"""
        print("\n" + "="*60)
        print("Agent 交互系统启动（输入 'quit' 退出）")
        print("="*60)

        while True:
            # 接收用户输入
            user_input = input("\n你: ").strip()

            if user_input.lower() in ["quit", "exit", "退出"]:
                print("\nAssistant: 再见！")
                break

            # 理解消息
            understanding = self.agent.receive_message(user_input, modality="text")

            # 生成回复
            response = self.agent.generate_response(understanding, modality="text")

            # 输出回复
            print(f"\nAssistant: {response}")

            time.sleep(0.5)

        # 输出对话摘要
        print("\n" + "="*60)
        print("对话摘要")
        print("="*60)
        summary = self.agent.get_conversation_summary()
        for key, value in summary.items():
            print(f"  {key}: {value}")

# 使用示例
if __name__ == "__main__":
    system = HumanAgentSystem()
    system.interact()
```

#### Agent 与人通信方式对比表

| 方式 | 技术栈 | 优势 | 劣势 |
|----------|--------|------|------|
| **文本交互** | LLM、NLP | 实现简单、理解准确 | 无语音/视觉 |
| **语音交互** | ASR + TTS + LLM | 自然便捷 | 识别精度、隐私 |
| **多模态交互** | Multimodal LLM | 体验丰富、适应性强 | 实现复杂、成本高 |

---

## 小结

本章详细介绍了 AI Agent 的架构设计，包括核心组件、单 Agent 架构、多 Agent 架构和通信机制。

**Agent 核心组件**

- **感知模块**：从环境中获取信息并转换为内部状态表示
- **规划模块**：制定行动计划，分解任务
- **行动模块**：执行具体操作，将决策转换为环境影响
- **记忆模块**：存储和检索历史信息
- **反思模块**：从经验中学习，提供改进建议

**单 Agent 架构**

- **反应式架构**：基于规则，响应快，但缺乏规划
- **审慎式架构**：基于规划，适应性强，但响应慢
- **混合式架构**：结合反应式和审慎式，兼顾响应和规划
- **学习型架构**：基于学习，自适应，但需要大量数据

**多 Agent 架构**

- **层次化架构**：分层管理，清晰可控，但层次多导致延迟
- **并行协作架构**：并行执行，效率高，但协调复杂
- **对抗式架构**：竞争对抗，提高鲁棒性，但不稳定
- **联邦式架构**：联邦学习，隐私保护，但通信开销大

**Agent 通信机制**

- **Agent 间通信**：标准化协议（MCP、A2A）支持互操作
- **Agent 与环境通信**：工具调用、API 访问、数据库操作
- **Agent 与人通信**：多模态交互，上下文感知，个性化体验

---

_文档版本：v1.0_
_最后更新：2026-03-17_
