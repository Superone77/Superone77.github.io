# 第七章：推理与决策（Reasoning and Decision Making）

推理与决策是 AI Agent 的核心能力之一，通过逐步推理和智能决策，使 Agent 能够解决复杂问题、规划任务路径并做出最优决策。

## 7.1 推理基础

### 7.1.1 Chain of Thought（CoT）

Chain of Thought 是一种让 LLM 逐步推理的方法，通过要求模型展示思考过程，提高复杂问题的解决能力。

#### Chain of Thought 的定义

Chain of Thought（CoT）是一种让 LLM 逐步推理的方法，通过要求模型在回答之前展示思考过程，分解复杂问题，逐步推理，最终得到答案。

**学术定义**（来源：最新研究）

- **OpenAI（2025）**：Chain of Thought 允许 AI 模型通过逐步推理解决复杂任务，提高决策能力、可解释性和透明度。
- **PromptingGuide.ai（2025）**：Chain-of-thought prompting 使 AI 模型能够通过逐步推理解决复杂任务。

**工程定义**

在实际工程中，Chain of Thought 包括：

1. **问题分解**：将复杂问题分解为多个子问题
2. **逐步推理**：逐步推理每个子问题
3. **中间结果**：记录中间推理结果
4. **最终答案**：基于推理过程生成最终答案
5. **可解释性**：提供推理过程的可解释性

#### Chain of Thought 的核心机制

**1. 问题分解**

将复杂问题分解为多个可管理的子问题。

**2. 逐步推理**

逐步推理每个子问题，记录思考过程。

**3. 中间结果**

记录中间推理结果，用于后续推理。

**4. 最终答案**

基于推理过程和中间结果生成最终答案。

#### Chain of Thought 的优势与劣势

| 优势 | 劣势 |
|------|------|
| 提高复杂问题解决能力 | 推理成本高 |
| 提供可解释性 | 可能产生幻觉 |
| 适用于多种任务 | 推理质量不稳定 |

### 7.1.2 推理与决策的关系

推理与决策是密不可分的两个过程，推理是决策的基础，决策是推理的输出。

#### 推理与决策的定义

推理是 Agent 分析信息、推导结论的过程，决策是基于推理结果选择最佳行动的过程。

**学术定义**（来源：最新研究）

- **IBM（2025）**：ReAct 框架中，推理是指 Agent 确定实现特定目标所需的行动或策略的认知过程，类似于 agentic AI 的规划阶段。
- **Sema4.ai（2025）**：Agents 思考它们的下一步行动，执行它，然后观察结果。这种迭代过程允许动态问题解决和适应。

**工程定义**

在实际工程中，推理与决策包括：

1. **信息收集**：收集相关信息
2. **推理分析**：分析信息，推导结论
3. **行动选择**：基于推理结果选择行动
4. **执行观察**：执行行动，观察结果
5. **迭代优化**：根据观察结果优化决策

#### 推理与决策的核心机制

**1. 信息收集**

收集相关信息，包括上下文、历史数据、外部知识。

**2. 推理分析**

使用 CoT 等推理方法分析信息，推导结论。

**3. 行动选择**

基于推理结果选择最佳行动。

**4. 执行观察**

执行行动，观察结果，反馈到推理过程。

#### 推理与决策的优势与劣势

| 优势 | 劣势 |
|------|------|
| 支持复杂问题解决 | 推理成本高 |
| 可解释性强 | 可能产生错误的推理 |
| 动态适应 | 需要反馈机制 |

---

## 7.2 ReAct 框架

### 7.2.1 ReAct 基础

ReAct（Reasoning and Acting）是一种结合推理和行动的框架，让 Agent 在推理的同时执行行动，动态调整推理过程。

#### ReAct 的定义

ReAct（Reasoning and Acting）是一种结合推理和行动的框架，让 LLM 生成推理轨迹和任务特定的行动，以交错的方式进行。

**学术定义**（来源：最新研究）

- **Yao et al.（2022）**：ReAct 框架中，LLM 被用来以交错的方式生成推理轨迹和任务特定的行动。
- **arXiv（2023）**：ReAct：Synergizing Reasoning and Acting in Language Models，研究了如何将推理和行动结合起来。
- **Neradot（2024）**：ReAct 框架允许 Agent 推理、规划和执行行动，支持自主 AI Agents。

**工程定义**

在实际工程中，ReAct 包括：

1. **推理**：分析当前状态和目标
2. **行动**：执行具体行动
3. **观察**：观察行动结果
4. **迭代**：基于观察结果继续推理和行动

#### ReAct 的核心流程

**1. 推理**

分析当前状态和目标，推理下一步行动。

**2. 行动**

执行推理出的行动。

**3. 观察**

观察行动结果。

**4. 迭代**

基于观察结果继续推理，直到达到目标。

#### ReAct 的优势与劣势

| 优势 | 劣势 |
|------|------|
| 结合推理和行动 | 迭代次数多 |
| 动态适应 | 推理成本高 |
| 支持复杂任务 | 需要良好的推理能力 |

### 7.2.2 ReAct vs Chain of Thought

ReAct 和 CoT 是两种不同的推理方法，ReAct 结合推理和行动，CoT 专注于推理过程。

#### ReAct vs CoT 的定义

ReAct 和 CoT 是两种不同的推理方法，ReAct 结合推理和行动，在推理的同时执行行动；CoT 专注于推理过程，在推理完成后执行行动。

**学术定义**（来源：最新研究）

- **CoForge（2025）**：ReAct vs Tree-of-Thought: How Modern Reasoning Powers Autonomous AI Agents，详细介绍了 ReAct 和 ToT 的区别和应用场景。
- **Neradot（2024）**：在 Chain-of-Thought（CoT）方法中，模型被指示在直接回答问题之前生成想法，这通常会提高模型的决策能力。

**工程定义**

在实际工程中，ReAct vs CoT 的区别包括：

1. **推理方式**：ReAct 交错推理和行动，CoT 先推理后行动
2. **适应性**：ReAct 动态适应，CoT 静态规划
3. **复杂度**：ReAct 适用于动态环境，CoT 适用于静态问题
4. **成本**：ReAct 迭代次数多，CoT 一次推理

#### ReAct vs CoT 对比表

| 维度 | ReAct | CoT |
|------|--------|-----|
| **推理方式** | 交错推理和行动 | 先推理后行动 |
| **适应性** | 动态适应 | 静态规划 |
| **复杂度** | 适用于动态环境 | 适用于静态问题 |
| **成本** | 迭代次数多 | 一次推理 |
| **适用场景** | 动态任务 | 复杂推理 |

---

## 7.3 高级推理技术

### 7.3.1 Tree of Thoughts（ToT）

Tree of Thoughts 是一种基于树的推理方法，通过生成多个思考路径，探索不同的推理可能性，选择最优路径。

#### Tree of Thoughts 的定义

Tree of Thoughts（ToT）是一种基于树的推理方法，通过生成多个思考路径，探索不同的推理可能性，选择最优路径。

**学术定义**（来源：最新研究）

- **CoForge（2025）**：Tree-of-Thoughts（ToT）是一种基于树的推理方法，通过生成多个思考路径，探索不同的推理可能性，选择最优路径。
- **Long CoT Survey（2025）**：Long CoT 的关键特征包括深度推理、广泛探索和可行反思，这些特征使推理比浅层、容易冗余的 Short CoT 更深入、更高效。

**工程定义**

在实际工程中，Tree of Thoughts 包括：

1. **思考生成**：生成多个思考路径
2. **树构建**：构建思考树
3. **路径探索**：探索不同的推理路径
4. **路径评估**：评估不同路径的质量
5. **最优选择**：选择最优路径

#### Tree of Thoughts 的核心机制

**1. 思考生成**

生成多个思考路径，探索不同的推理可能性。

**2. 树构建**

构建思考树，表示不同的推理路径。

**3. 路径探索**

探索不同的推理路径，评估路径质量。

**4. 最优选择**

基于路径评估选择最优路径。

#### Tree of Thoughts 的优势与劣势

| 优势 | 劣势 |
|------|------|
| 探索多种推理可能性 | 计算成本高 |
| 提高推理质量 | 树构建复杂 |
| 适合复杂问题 | 路径评估困难 |

### 7.3.2 ReWOO（Reasoning Without Observation）

ReWOO 是一种分离规划和执行的推理框架，先规划任务，再执行工具调用。

#### ReWOO 的定义

ReWOO（Reasoning Without Observation）是一种分离规划和执行的推理框架，先规划任务，再执行工具调用，减少推理和行动的交错。

**学术定义**（来源：最新研究）

- **IBM（2025）**：ReWOO 工作流由三个模块组成。在规划模块中，Agent 根据用户的提示预期其下一步。
- **IBM（2025）**：下一个阶段包括收集通过调用这些工具产生的输出。

**工程定义**

在实际工程中，ReWOO 包括：

1. **规划**：先规划任务，生成执行计划
2. **执行**：执行工具调用
3. **结果收集**：收集工具调用结果
4. **答案生成**：基于工具调用结果生成最终答案

#### ReWOO 的核心机制

**1. 规划**

先规划任务，生成执行计划，包括需要调用的工具。

**2. 执行**

执行工具调用，收集结果。

**3. 答案生成**

基于工具调用结果生成最终答案。

#### ReWOO 的优势与劣势

| 优势 | 劣势 |
|------|------|
| 减少迭代次数 | 规划质量依赖推理能力 |
| 提高效率 | 需要准确的规划 |
| 适合工具调用任务 | 不适合动态环境 |

### 7.3.3 其他推理框架

除了 CoT、ReAct、ToT、ReWOO 之外，还有其他推理框架，如 Reflexion、RAISE 等。

#### 其他推理框架的定义

其他推理框架包括 Reflexion、RAISE 等，它们提供了不同的推理方法和策略。

**学术定义**（来源：最新研究）

- **IBM（2025）**：其他新兴框架包括 ReWOO、RAISE 和 Reflexion，每个框架都有自己的优势和劣势。
- **CoForge（2025）**：介绍了多种推理框架，包括 ReAct、ToT、ReWOO 等，并比较了它们的优缺点。

**工程定义**

在实际工程中，其他推理框架包括：

1. **Reflexion**：基于反馈的自我反思推理
2. **RAISE**：结合检索和推理的框架
3. **Self-Critique**：自批判推理方法

#### 其他推理框架对比表

| 框架 | 核心特点 | 优势 | 劣势 | 适用场景 |
|------|----------|------|------|----------|
| **CoT** | 逐步推理 | 简单、可解释 | 可能产生幻觉 | 复杂推理问题 |
| **ReAct** | 推理 + 行动 | 动态适应 | 迭代次数多 | 动态任务 |
| **ToT** | 树形推理 | 探索多种可能性 | 计算成本高 | 复杂决策问题 |
| **ReWOO** | 规划 + 执行分离 | 减少迭代次数 | 规划质量依赖推理 | 工具调用任务 |
| **Reflexion** | 自我反思 | 持续改进 | 需要反馈 | 迭代优化 |

---

## 7.4 推理与决策代码示例

以下代码示例展示如何实现一个 ReAct Agent：

```python
"""
ReAct Agent 示例

这个示例展示如何实现一个 ReAct（Reasoning and Acting）Agent，
结合推理和行动，动态调整推理过程。
"""

import os
import logging
from typing import Dict, Any, List, Optional
from dataclasses import dataclass
from enum import Enum
import time

from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema import BaseMessage, SystemMessage, HumanMessage, AIMessage

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class ActionType(Enum):
    """行动类型"""
    THINK = "think"
    ACTION = "action"
    OBSERVE = "observe"

@dataclass
class Thought:
    """思考"""
    content: str
    action: Optional[str] = None
    observation: Optional[str] = None

class Tool:
    """工具"""

    def __init__(self, name: str, description: str):
        self.name = name
        self.description = description

    def execute(self, **kwargs) -> str:
        """执行工具"""
        raise NotImplementedError

class WeatherTool(Tool):
    """天气工具"""

    def __init__(self):
        super().__init__(
            name="weather",
            description="获取指定地点的天气"
        )

    def execute(self, location: str) -> str:
        """获取天气"""
        weather_data = {
            "北京": "晴天，温度 25°C",
            "上海": "多云，温度 28°C",
            "广州": "阵雨，温度 30°C",
            "深圳": "晴天，温度 29°C"
        }

        result = weather_data.get(location, f"未找到 {location} 的天气信息")
        logger.info(f"天气工具执行：{location} -> {result}")
        return result

class CalculatorTool(Tool):
    """计算器工具"""

    def __init__(self):
        super().__init__(
            name="calculator",
            description="计算数学表达式"
        )

    def execute(self, expression: str) -> str:
        """计算表达式"""
        try:
            result = eval(expression)
            output = f"{expression} = {result}"
            logger.info(f"计算器工具执行：{expression} -> {output}")
            return output
        except Exception as e:
            error_msg = f"计算错误：{str(e)}"
            logger.error(error_msg)
            return error_msg

class ReActAgent:
    """ReAct Agent"""

    def __init__(
        self,
        name: str,
        model: str = "gpt-4"
    ):
        """
        初始化 ReAct Agent

        Args:
            name: Agent 名称
            model: LLM 模型名称
        """
        self.name = name

        # 初始化 LLM
        self.llm = ChatOpenAI(model=model, temperature=0.0)

        # 初始化工具
        self.tools = [
            WeatherTool(),
            CalculatorTool()
        ]

        # 初始化提示词模板
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", f"你是一个有用的助手，名为 {self.name}，使用 ReAct 方法推理和行动。"),
            ("user", "{input}"),
        ])

        # 对话历史
        self.chat_history: List[BaseMessage] = []

        # 思考历史
        self.thoughts: List[Thought] = []

        logger.info(f"ReAct Agent '{self.name}' 初始化完成")

    def think(self, user_input: str, max_thoughts: int = 5) -> str:
        """
        推理

        Args:
            user_input: 用户输入
            max_thoughts: 最大思考次数

        Returns:
            最终答案
        """
        # 初始推理
        thought = Thought(content=f"用户输入：{user_input}")
        self.thoughts.append(thought)

        for iteration in range(max_thoughts):
            logger.info(f"推理迭代 {iteration + 1}/{max_thoughts}")

            # 构建推理上下文
            context = self._build_context()

            # 生成思考
            response = self.llm.invoke(context)
            content = response.content

            logger.info(f"推理：{content}")

            # 判断是否需要执行行动
            if "工具" in content or "tool" in content.lower():
                # 执行工具
                tool_result = self._execute_tool(content)

                # 记录观察
                thought = Thought(
                    content=content,
                    action=tool_result[0],
                    observation=tool_result[1]
                )
                self.thoughts.append(thought)

                logger.info(f"工具执行结果：{tool_result[1]}")

                # 检查是否已经得到答案
                if "答案" in content or "answer" in content.lower():
                    break

            else:
                # 直接回答
                thought = Thought(content=content)
                self.thoughts.append(thought)

                logger.info(f"最终答案：{content}")
                return content

        # 如果达到最大迭代次数，返回最后一个思考
        return self.thoughts[-1].content

    def _build_context(self) -> str:
        """构建推理上下文"""
        # 添加用户输入
        context = f"用户输入：{self.thoughts[0].content}\n\n"

        # 添加工具列表
        context += "可用工具：\n"
        for tool in self.tools:
            context += f"- {tool.name}: {tool.description}\n"

        # 添加思考历史
        if len(self.thoughts) > 1:
            context += "\n推理历史：\n"
            for i, thought in enumerate(self.thoughts[1:], 1):
                context += f"{i}. {thought.content}"
                if thought.action:
                    context += f" (执行工具：{thought.action})"
                if thought.observation:
                    context += f" (观察结果：{thought.observation})"
                context += "\n"

        # 添加推理指令
        context += "\n请基于推理历史和可用工具，进行推理。如果需要使用工具，请明确说明工具名称和参数。如果不需要工具，请直接给出答案。"

        return context

    def _execute_tool(self, content: str) -> tuple:
        """
        执行工具

        Args:
            content: 推理内容

        Returns:
            (工具名称, 执行结果)
        """
        # 解析工具调用（简化实现）
        tool_name = None
        tool_args = {}

        if "天气" in content or "weather" in content.lower():
            tool_name = "weather"
            # 提取地点
            location = content.replace("天气", "").replace("的", "").strip()
            tool_args = {"location": location}
        elif "计算" in content or "calculator" in content.lower():
            tool_name = "calculator"
            # 提取表达式
            expression = content.replace("计算", "").strip()
            tool_args = {"expression": expression}

        if not tool_name:
            return (None, "未找到合适的工具")

        # 查找工具
        tool = next((t for t in self.tools if t.name == tool_name), None)

        if not tool:
            return (tool_name, f"未找到工具：{tool_name}")

        # 执行工具
        try:
            result = tool.execute(**tool_args)
            return (tool_name, result)
        except Exception as e:
            error_msg = f"工具执行失败：{str(e)}"
            logger.error(error_msg)
            return (tool_name, error_msg)

    def chat(self, user_input: str) -> str:
        """
        聊天

        Args:
            user_input: 用户输入

        Returns:
            Agent 响应
        """
        print(f"\n用户：{user_input}")
        response = self.think(user_input)
        print(f"助手：{response}\n")

        return response

# 使用示例
def main():
    """主函数"""
    # 创建 ReAct Agent
    agent = ReActAgent(
        name="ReActAgent",
        model="gpt-4"
    )

    # 对话示例
    print("="*60)
    print("ReAct Agent 对话示例")
    print("="*60)

    agent.chat("北京的天气怎么样？")
    agent.chat("计算 12 * 15 + 8")
    agent.chat("北京和上海的天气有什么区别？")

if __name__ == "__main__":
    main()
```

---

## 小结（第七章全部完成）

本章详细介绍了推理与决策的核心概念和实践，包括推理基础、ReAct 框架、高级推理技术等内容，帮助开发者构建强大的推理与决策能力。

**推理基础**

- **Chain of Thought**：定义、核心机制、优势与劣势
- **推理与决策的关系**：定义、核心机制、优势与劣势

**ReAct 框架**

- **ReAct 基础**：定义、核心流程、优势与劣势
- **ReAct vs Chain of Thought**：对比分析、对比表

**高级推理技术**

- **Tree of Thoughts（ToT）**：定义、核心机制、优势与劣势
- **ReWOO（Reasoning Without Observation）**：定义、核心机制、优势与劣势
- **其他推理框架**：Reflexion、RAISE、Self-Critique

---

_文档版本：v1.0_
_最后更新：2026-03-18_
