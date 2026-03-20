# 第六章：工具调用（Tool Calling）

工具调用是 AI Agent 的核心能力之一，通过调用外部工具和服务，扩展 Agent 的功能边界，使其能够执行各种实际任务。

## 6.1 工具调用基础

### 6.1.1 Function Calling 基础

Function Calling 是一种让 LLM 以结构化的方式调用外部函数的能力，通过定义函数的 schema（模式），让 LLM 生成符合格式的函数调用参数。

#### Function Calling 的定义

Function Calling 是一种让 LLM 以结构化的方式调用外部函数的能力，通过定义函数的 schema（模式），让 LLM 生成符合格式的函数调用参数，然后由应用程序执行这些函数。

**学术定义**（来源：最新研究）

- **OpenAI（2025）**：Function Calling 允许 LLM 生成结构化的函数调用参数，然后由应用程序执行这些函数，实现与外部系统的交互。
- **LangChain（2024）**：LangChain 引入了新的 tool_calls 属性，提供与工具调用交互的标准接口，支持所有 LLM 提供商的工具调用 API。

**工程定义**

在实际工程中，Function Calling 包括：

1. **工具定义**：定义工具的名称、描述和参数 schema
2. **工具调用**：LLM 生成工具调用的参数
3. **工具执行**：应用程序执行工具调用
4. **结果返回**：将工具执行结果返回给 LLM
5. **响应生成**：LLM 基于工具执行结果生成最终响应

#### Function Calling 的核心流程

**1. 工具定义**

定义工具的名称、描述和参数 schema（通常使用 JSON Schema 格式）。

**2. 工具选择**

LLM 根据用户输入和工具定义，选择合适的工具。

**3. 参数生成**

LLM 生成符合工具 schema 的参数。

**4. 工具执行**

应用程序执行工具调用，获取结果。

**5. 结果处理**

将工具执行结果返回给 LLM，LLM 基于结果生成最终响应。

#### Function Calling 的优势与劣势

| 优势 | 劣势 |
|------|------|
| 结构化输出 | 需要定义 schema |
| 可靠的参数解析 | 可能生成无效参数 |
| 支持复杂交互 | 执行顺序需要管理 |

### 6.1.2 工具注册与定义

工具注册与定义是指定义和管理可被 Agent 调用的工具的过程，包括工具的名称、描述、参数 schema 和执行逻辑。

#### 工具注册与定义的定义

工具注册与定义是指定义和管理可被 Agent 调用的工具的过程，包括工具的名称、描述、参数 schema 和执行逻辑，以及将这些工具注册到 Agent 的工具列表中。

**学术定义**（来源：最新研究）

- **LangChain（2025）**：Tools 模块提供了工具注册、工具调用和工具装饰器等功能，简化了工具定义和管理的过程。
- **Medium（2025）**：How Tools Are Called in AI Agents：Complete 2025 Guide，详细介绍了工具定义、工具选择、工具路由和工具编排的最佳实践。

**工程定义**

在实际工程中，工具注册与定义包括：

1. **工具定义**：定义工具的名称、描述、参数 schema
2. **工具实现**：实现工具的执行逻辑
3. **工具注册**：将工具注册到 Agent 的工具列表中
4. **工具管理**：管理工具的生命周期（启用、禁用、更新）
5. **工具权限**：管理工具的访问权限

#### 工具注册与定义的核心机制

**1. 工具定义**

使用 JSON Schema 定义工具的参数 schema。

**2. 工具装饰器**

使用装饰器（如 LangChain 的 @tool）简化工具定义。

**3. 工具注册**

将工具注册到 Agent 的工具列表中。

**4. 工具管理**

管理工具的生命周期和权限。

#### 工具注册与定义的优势与劣势

| 优势 | 劣势 |
|------|------|
| 简化工具定义 | 需要维护工具列表 |
| 支持动态加载 | 工具权限管理复杂 |
| 类型安全 | Schema 定义繁琐 |

### 6.1.3 工具调用流程

工具调用流程是指 Agent 调用工具的完整流程，从工具选择到结果返回的整个过程。

#### 工具调用流程的定义

工具调用流程是指 Agent 调用工具的完整流程，包括工具选择、参数生成、工具执行、结果返回和响应生成的整个过程。

**学术定义**（来源：最新研究）

- **Medium（2025）**：How Tools Are Called in AI Agents：Complete 2025 Guide，详细介绍了工具调用的完整流程，包括工具选择、参数生成、工具执行和结果处理。

**工程定义**

在实际工程中，工具调用流程包括：

1. **工具选择**：Agent 根据用户输入选择合适的工具
2. **参数生成**：Agent 生成符合工具 schema 的参数
3. **工具执行**：执行工具调用，获取结果
4. **结果处理**：处理工具执行结果（错误处理、重试）
5. **响应生成**：基于工具执行结果生成最终响应

#### 工具调用流程的核心步骤

**1. 工具选择**

Agent 根据用户输入和工具定义，选择合适的工具。

**2. 参数生成**

Agent 生成符合工具 schema 的参数。

**3. 工具执行**

执行工具调用，获取结果。

**4. 错误处理**

处理工具执行错误（重试、降级、日志记录）。

**5. 响应生成**

基于工具执行结果生成最终响应。

#### 工具调用流程的优势与劣势

| 优势 | 劣势 |
|------|------|
| 流程清晰 | 错误处理复杂 |
| 可扩展性强 | 性能优化困难 |
| 易于调试 | 并发控制复杂 |

---

## 6.2 工具选择与路由

### 6.2.1 工具选择策略

工具选择策略是指 Agent 根据用户输入选择合适工具的策略，包括基于规则的选择、基于 LLM 的选择和基于学习的策略。

#### 工具选择策略的定义

工具选择策略是指 Agent 根据用户输入选择合适工具的策略，包括基于规则的选择、基于 LLM 的选择和基于学习的策略，确保选择最合适的工具。

**学术定义**（来源：最新研究）

- **Medium（2025）**：How Tools Are Called in AI Agents：Complete 2025 Guide，详细介绍了工具选择的策略，包括基于规则的策略、基于 LLM 的策略和基于学习的策略。
- **DEV Community（2025）**：Build Multi-Agent Systems Using the Agents as Tools Pattern，强调了"总是选择最合适的工具"的原则。

**工程定义**

在实际工程中，工具选择策略包括：

1. **基于规则的选择**：基于预定义规则选择工具
2. **基于 LLM 的选择**：使用 LLM 选择工具
3. **基于学习的策略**：使用机器学习模型选择工具
4. **混合策略**：结合多种策略选择工具
5. **工具评分**：对工具进行评分，选择评分最高的工具

#### 工具选择策略的核心机制

**1. 基于规则的选择**

基于预定义规则选择工具（如关键词匹配、模式匹配）。

**2. 基于 LLM 的选择**

使用 LLM 分析用户输入，选择合适的工具。

**3. 基于学习的策略**

使用机器学习模型预测最合适的工具。

**4. 混合策略**

结合多种策略选择工具，提高准确率。

#### 工具选择策略的优势与劣势

| 策略类型 | 优势 | 劣势 |
|----------|------|------|
| **基于规则** | 简单、高效 | 不灵活、难以维护 |
| **基于 LLM** | 灵活、智能 | 成本高、速度慢 |
| **基于学习** | 准确、自适应 | 需要训练数据 |
| **混合策略** | 平衡各种因素 | 复杂度高 |

### 6.2.2 工具路由机制

工具路由机制是指 Agent 根据用户输入和上下文，将请求路由到合适的工具的过程。

#### 工具路由机制的定义

工具路由机制是指 Agent 根据用户输入和上下文，将请求路由到合适的工具的过程，支持多工具并发、工具链和工具组。

**学术定义**（来源：最新研究）

- **LangChain（2025）**：LangChain 支持工具路由，可以基于用户输入和上下文，将请求路由到合适的工具。
- **Medium（2025）**：How Tools Are Called in AI Agents：Complete 2025 Guide，详细介绍了工具路由的机制和最佳实践。

**工程定义**

在实际工程中，工具路由机制包括：

1. **路由规则**：定义路由规则（如基于关键词、基于意图）
2. **路由模型**：使用模型预测路由结果
3. **路由缓存**：缓存路由结果，提高性能
4. **路由监控**：监控路由结果，优化路由策略
5. **路由回退**：提供路由回退机制

#### 工具路由机制的核心机制

**1. 基于意图的路由**

基于用户意图路由到合适的工具。

**2. 基于关键词的路由**

基于关键词匹配路由到合适的工具。

**3. 基于模型的路由**

使用 LLM 或机器学习模型预测路由结果。

**4. 多层路由**

支持多层路由，提高准确率。

#### 工具路由机制的优势与劣势

| 优势 | 劣势 |
|------|------|
| 提高工具调用准确率 | 路由规则复杂 |
| 支持多工具协作 | 路由性能优化困难 |
| 易于扩展 | 路由调试困难 |

### 6.2.3 动态工具调用

动态工具调用是指 Agent 在运行时动态地选择和调用工具，而不是使用固定的工具列表。

#### 动态工具调用的定义

动态工具调用是指 Agent 在运行时动态地选择和调用工具，根据任务需求和上下文，动态加载和调用合适的工具。

**学术定义**（来源：最新研究）

- **LangChain（2025）**：动态工具调用允许 Agent 在不同步骤使用不同的工具，而不是在所有步骤使用相同的工具列表。
- **LangChain Changelog（2025）**：Dynamic Tool Calling in LangGraph Agents，详细介绍了如何在 LangGraph 中实现动态工具调用。

**工程定义**

在实际工程中，动态工具调用包括：

1. **工具动态加载**：在运行时动态加载工具
2. **工具动态选择**：根据任务需求动态选择工具
3. **工具动态卸载**：在运行时动态卸载不再使用的工具
4. **工具状态管理**：管理工具的状态（启用、禁用）
5. **工具版本管理**：管理工具的版本和兼容性

#### 动态工具调用的核心机制

**1. 工具动态加载**

在运行时根据任务需求加载工具。

**2. 工具动态选择**

根据任务需求和上下文动态选择工具。

**3. 工具动态卸载**

在运行时动态卸载不再使用的工具，释放资源。

#### 动态工具调用的优势与劣势

| 优势 | 劣势 |
|------|------|
| 灵活性高 | 实现复杂 |
| 资源利用率高 | 工具管理复杂 |
| 支持动态任务 | 性能优化困难 |

---

## 6.3 工具编排与链

### 6.3.1 工具编排模式

工具编排模式是指 Agent 如何协调多个工具的调用，包括顺序调用、并行调用、条件分支等模式。

#### 工具编排模式的定义

工具编排模式是指 Agent 如何协调多个工具的调用，包括顺序调用、并行调用、条件分支等模式，实现复杂的任务流程。

**学术定义**（来源：最新研究）

- **Ema.ai（2025）**：Outcome-driven orchestration：设置目标，由编排引擎管理路由、规划、重试和错误处理。
- **Spaceo（2026）**：Agentic AI Frameworks：Complete Enterprise Guide for 2026，介绍了各种工具编排模式和最佳实践。

**工程定义**

在实际工程中，工具编排模式包括：

1. **顺序调用**：按顺序调用多个工具
2. **并行调用**：并行调用多个工具
3. **条件分支**：根据条件调用不同的工具
4. **循环调用**：循环调用工具直到满足条件
5. **回滚机制**：支持工具调用的回滚

#### 工具编排模式的核心机制

**1. 顺序调用**

按顺序调用多个工具，前一个工具的输出作为后一个工具的输入。

**2. 并行调用**

并行调用多个工具，提高效率。

**3. 条件分支**

根据条件调用不同的工具或执行不同的流程。

**4. 循环调用**

循环调用工具直到满足条件。

#### 工具编排模式的优势与劣势

| 模式 | 优势 | 劣势 |
|------|------|------|
| **顺序调用** | 简单、可控 | 效率低 |
| **并行调用** | 效率高 | 复杂度高 |
| **条件分支** | 灵活 | 难以调试 |
| **循环调用** | 适合迭代任务 | 可能无限循环 |

### 6.3.2 工具链

工具链是指将多个工具串联起来，形成一个完整的工具调用链，实现复杂的工作流。

#### 工具链的定义

工具链是指将多个工具串联起来，形成一个完整的工具调用链，每个工具的输出作为下一个工具的输入，实现复杂的工作流。

**学术定义**（来源：最新研究）

- **LangChain（2024-2025）**：LangChain 提供了 Chain 机制，可以将多个工具串联起来，形成完整的工具调用链。
- **Medium（2025）**：How Tools Are Called in AI Agents：Complete 2025 Guide，详细介绍了工具链的构建和使用。

**工程定义**

在实际工程中，工具链包括：

1. **工具链定义**：定义工具链的结构和流程
2. **工具链执行**：执行工具链，传递数据
3. **工具链优化**：优化工具链的执行效率
4. **工具链监控**：监控工具链的执行状态
5. **工具链回滚**：支持工具链的回滚

#### 工具链的核心机制

**1. 工具链定义**

定义工具链的结构和流程，包括工具顺序、数据传递等。

**2. 工具链执行**

执行工具链，传递数据，处理错误。

**3. 工具链优化**

优化工具链的执行效率，如并行化、缓存等。

#### 工具链的优势与劣势

| 优势 | 劣势 |
|------|------|
| 实现复杂工作流 | 定义复杂 |
| 数据流清晰 | 调试困难 |
| 易于扩展 | 性能优化复杂 |

### 6.3.3 工具编排最佳实践

工具编排最佳实践是指在工具编排过程中应遵循的最佳实践，包括错误处理、重试机制、性能优化等。

#### 工具编排最佳实践的定义

工具编排最佳实践是指在工具编排过程中应遵循的最佳实践，包括错误处理、重试机制、性能优化、日志记录等，确保工具编排的可靠性和效率。

**学术定义**（来源：最新研究）

- **Sparkco.ai（2023）**：Mastering Tool Calling: Best Practices for 2025，详细介绍了工具调用的最佳实践。
- **Ema.ai（2025）**：EmaFusion™ 的Outcome-driven orchestration，强调目标驱动的编排和最佳实践。

**工程定义**

在实际工程中，工具编排最佳实践包括：

1. **错误处理**：完善的错误处理机制
2. **重试机制**：合理的重试策略
3. **性能优化**：优化工具调用的性能
4. **日志记录**：详细的日志记录
5. **监控告警**：实时监控和告警
6. **权限管理**：严格的权限管理
7. **资源限制**：合理的资源限制

#### 工具编排最佳实践的核心原则

**1. 错误处理**

完善的错误处理机制，包括异常捕获、错误传播、降级处理。

**2. 重试机制**

合理的重试策略，包括指数退避、最大重试次数等。

**3. 性能优化**

优化工具调用的性能，如并行化、缓存、批量调用等。

**4. 日志记录**

详细的日志记录，包括工具调用日志、错误日志、性能日志。

#### 工具编排最佳实践对比表

| 实践 | 核心原则 | 优势 | 适用场景 |
|------|----------|------|----------|
| **错误处理** | 异常捕获、错误传播、降级处理 | 提高可靠性 | 所有场景 |
| **重试机制** | 指数退避、最大重试次数 | 提高成功率 | 网络调用 |
| **性能优化** | 并行化、缓存、批量调用 | 提高效率 | 高并发场景 |
| **日志记录** | 详细日志、结构化日志 | 便于调试 | 所有场景 |

---

## 6.4 工具调用代码示例

以下代码示例展示如何实现一个完整的工具调用 Agent：

```python
"""
工具调用 Agent 示例

这个示例展示如何实现一个完整的工具调用 Agent，包括工具定义、工具注册、工具调用、工具路由和工具编排。
"""

import os
import logging
from typing import Dict, Any, List, Optional, Union
from dataclasses import dataclass
from enum import Enum
import time

from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.schema import BaseMessage, SystemMessage, HumanMessage, AIMessage
from langchain.tools import tool
from langchain_core.utils.function_calling import convert_to_openai_function

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class ToolType(Enum):
    """工具类型"""
    WEATHER = "weather"
    CALCULATOR = "calculator"
    SEARCH = "search"

@dataclass
class ToolResult:
    """工具执行结果"""
    tool_name: str
    success: bool
    result: Any
    error: Optional[str] = None
    execution_time: float = 0.0

# 工具定义
@tool
def get_weather(location: str) -> str:
    """
    获取指定地点的天气

    Args:
        location: 地点名称

    Returns:
        天气信息
    """
    start_time = time.time()
    logger.info(f"执行工具：get_weather，参数：{location}")

    # 模拟天气查询
    weather_data = {
        "北京": "晴天，温度 25°C",
        "上海": "多云，温度 28°C",
        "广州": "阵雨，温度 30°C",
        "深圳": "晴天，温度 29°C"
    }

    result = weather_data.get(location, f"未找到 {location} 的天气信息")

    execution_time = time.time() - start_time
    logger.info(f"工具执行完成：get_weather，结果：{result}，耗时：{execution_time:.2f}秒")

    return result

@tool
def calculator(expression: str) -> str:
    """
    计算数学表达式

    Args:
        expression: 数学表达式

    Returns:
        计算结果
    """
    start_time = time.time()
    logger.info(f"执行工具：calculator，参数：{expression}")

    try:
        # 简单的计算器实现
        result = eval(expression)
        output = f"{expression} = {result}"

        execution_time = time.time() - start_time
        logger.info(f"工具执行完成：calculator，结果：{output}，耗时：{execution_time:.2f}秒")

        return output

    except Exception as e:
        error_msg = f"计算错误：{str(e)}"
        logger.error(error_msg)
        return error_msg

@tool
def search(query: str, top_k: int = 3) -> str:
    """
    搜索信息

    Args:
        query: 搜索查询
        top_k: 返回前 top_k 个结果

    Returns:
        搜索结果
    """
    start_time = time.time()
    logger.info(f"执行工具：search，参数：{query}, top_k={top_k}")

    # 模拟搜索
    search_results = [
        f"结果1：关于 {query} 的信息",
        f"结果2：关于 {query} 的详细信息",
        f"结果3：关于 {query} 的更多内容"
    ]

    result = "\n".join(search_results[:top_k])

    execution_time = time.time() - start_time
    logger.info(f"工具执行完成：search，结果：{result[:50]}...，耗时：{execution_time:.2f}秒")

    return result

class ToolCallingAgent:
    """工具调用 Agent"""

    def __init__(
        self,
        name: str,
        model: str = "gpt-4"
    ):
        """
        初始化工具调用 Agent

        Args:
            name: Agent 名称
            model: LLM 模型名称
        """
        self.name = name

        # 初始化 LLM
        self.llm = ChatOpenAI(model=model, temperature=0.0)

        # 初始化工具
        self.tools = [get_weather, calculator, search]

        # 初始化提示词模板
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", f"你是一个有用的助手，名为 {self.name}，可以使用工具帮助用户。"),
            ("user", "{input}"),
            MessagesPlaceholder(variable_name="chat_history")
        ])

        # 对话历史
        self.chat_history: List[BaseMessage] = []

        # 工具执行历史
        self.tool_execution_history: List[ToolResult] = []

        logger.info(f"工具调用 Agent '{self.name}' 初始化完成")

    def _select_tool(self, user_input: str) -> Optional[str]:
        """
        选择工具

        Args:
            user_input: 用户输入

        Returns:
            选中的工具名称
        """
        # 简单的工具选择逻辑
        if "天气" in user_input or "weather" in user_input.lower():
            return "get_weather"
        elif any(op in user_input for op in ["+", "-", "*", "/", "计算"]):
            return "calculator"
        elif "搜索" in user_input or "search" in user_input.lower():
            return "search"

        return None

    def _execute_tool(self, tool_name: str, tool_args: Dict[str, Any]) -> ToolResult:
        """
        执行工具

        Args:
            tool_name: 工具名称
            tool_args: 工具参数

        Returns:
            工具执行结果
        """
        # 查找工具
        tool = next((t for t in self.tools if t.name == tool_name), None)

        if not tool:
            return ToolResult(
                tool_name=tool_name,
                success=False,
                result=None,
                error=f"未找到工具：{tool_name}"
            )

        try:
            # 执行工具
            result = tool.run(tool_args)

            tool_result = ToolResult(
                tool_name=tool_name,
                success=True,
                result=result
            )

            # 记录工具执行历史
            self.tool_execution_history.append(tool_result)

            return tool_result

        except Exception as e:
            error_msg = f"工具执行失败：{str(e)}"
            logger.error(error_msg)

            tool_result = ToolResult(
                tool_name=tool_name,
                success=False,
                result=None,
                error=error_msg
            )

            # 记录工具执行历史
            self.tool_execution_history.append(tool_result)

            return tool_result

    def generate_response(self, user_input: str) -> str:
        """
        生成响应

        Args:
            user_input: 用户输入

        Returns:
            Agent 响应
        """
        # 选择工具
        tool_name = self._select_tool(user_input)

        if tool_name:
            # 提取工具参数（简化实现）
            tool_args = {}

            if tool_name == "get_weather":
                # 提取地点
                location = user_input.replace("天气", "").replace("的", "").strip()
                tool_args = {"location": location}
            elif tool_name == "calculator":
                # 提取表达式
                expression = user_input.replace("计算", "").strip()
                tool_args = {"expression": expression}
            elif tool_name == "search":
                # 提取查询
                query = user_input.replace("搜索", "").strip()
                tool_args = {"query": query}

            # 执行工具
            tool_result = self._execute_tool(tool_name, tool_args)

            if tool_result.success:
                tool_context = f"\n工具调用结果：{tool_result.result}"
            else:
                tool_context = f"\n工具调用失败：{tool_result.error}"

            # 构建完整输入
            full_input = f"""
            用户输入：{user_input}

            {tool_context}

            请基于用户输入和工具调用结果生成响应。
            """

        else:
            # 不使用工具，直接生成响应
            full_input = f"""
            用户输入：{user_input}

            请直接回答用户的问题。
            """

        # 添加到对话历史
        self.chat_history.append(HumanMessage(content=user_input))

        try:
            # 生成响应
            response = self.llm.invoke(full_input)
            content = response.content

            # 添加到对话历史
            self.chat_history.append(AIMessage(content=content))

            return content

        except Exception as e:
            error_msg = f"生成响应失败：{str(e)}"
            logger.error(error_msg)
            return error_msg

    def chat(self, user_input: str) -> str:
        """
        聊天

        Args:
            user_input: 用户输入

        Returns:
            Agent 响应
        """
        print(f"\n用户：{user_input}")
        response = self.generate_response(user_input)
        print(f"助手：{response}\n")

        return response

# 使用示例
def main():
    """主函数"""
    # 创建工具调用 Agent
    agent = ToolCallingAgent(
        name="ToolCallingAgent",
        model="gpt-4"
    )

    # 对话示例
    print("="*60)
    print("工具调用 Agent 对话示例")
    print("="*60)

    agent.chat("北京的天气怎么样？")
    agent.chat("计算 12 * 15 + 8")
    agent.chat("搜索人工智能的最新进展")

if __name__ == "__main__":
    main()
```

---

## 小结（第六章全部完成）

本章详细介绍了工具调用（Tool Calling）的核心概念和实践，包括工具调用基础、工具选择与路由、工具编排与链等内容，帮助开发者构建强大的工具调用能力。

**工具调用基础**

- **Function Calling**：定义、流程、优势与劣势
- **工具注册与定义**：工具定义、工具注册、工具管理
- **工具调用流程**：完整流程、错误处理、响应生成

**工具选择与路由**

- **工具选择策略**：基于规则、基于 LLM、基于学习、混合策略
- **工具路由机制**：基于意图、基于关键词、基于模型、多层路由
- **动态工具调用**：动态加载、动态选择、动态卸载

**工具编排与链**

- **工具编排模式**：顺序调用、并行调用、条件分支、循环调用
- **工具链**：定义、执行、优化
- **工具编排最佳实践**：错误处理、重试机制、性能优化、日志记录

---

_文档版本：v1.0_
_最后更新：2026-03-18_
