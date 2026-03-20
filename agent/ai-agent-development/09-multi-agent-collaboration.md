# 第九章：多 Agent 协作（Multi-Agent Collaboration）

多 Agent 协作是指多个 Agent 之间协同工作，通过分工、协作和整合，实现复杂任务的分解和完成。

## 9.1 多 Agent 协作基础

### 9.1.1 多 Agent 系统（MAS）的定义

多 Agent 系统（Multi-Agent System，MAS）是指由多个 Agent 组成的系统，通过分工、协作和整合，实现复杂任务的分解和完成。

#### 多 Agent 系统的定义

多 Agent 系统（MAS）是指由多个 Agent 组成的系统，通过分工、协作和整合，实现复杂任务的分解和完成。

**学术定义**（来源：最新研究）

- **Google Developers Blog（2025）**：Multi-Agent Systems (MAS) 允许你构建相当于微服务架构的 AI 系统。通过分配特定角色给个体 Agent，你可以构建本质上更加模块化、可测试和可靠的系统。
- **Insight Partners（2025）**：多 Agent 系统将大任务分解为更小的子任务，分配给专门的 Agent 协作实现共同目标。

**工程定义**

在实际工程中，多 Agent 系统包括：

1. **Agent 定义**：定义每个 Agent 的角色和能力
2. **Agent 通信**：实现 Agent 之间的通信机制
3. **Agent 协作**：设计 Agent 之间的协作流程
4. **Agent 整合**：整合多个 Agent 的结果
5. **Agent 调度**：调度和分配任务给 Agent

#### 多 Agent 系统的核心机制

**1. Agent 定义**

定义每个 Agent 的角色、目标和能力。

**2. Agent 通信**

实现 Agent 之间的通信机制，支持信息交换和协调。

**3. Agent 协作**

设计 Agent 之间的协作流程，包括任务分配、结果整合等。

**4. Agent 整合**

整合多个 Agent 的结果，形成最终的输出。

**5. Agent 调度**

调度和分配任务给 Agent，优化资源利用。

#### 多 Agent 系统的优势与劣势

| 优势 | 劣势 |
|------|------|
| 提高任务完成效率 | 通信成本高 |
| 支持复杂任务 | 协调复杂度高 |
| 提高系统鲁棒性 | 需要良好的设计 |
| 支持专业化 | 调试困难 |

### 9.1.2 多 Agent 协作模式

多 Agent 协作模式是指多个 Agent 之间的协作方式，包括顺序协作、并行协作、层次协作等。

#### 多 Agent 协作模式的定义

多 Agent 协作模式是指多个 Agent 之间的协作方式，包括顺序协作、并行协作、层次协作、群聊协作等。

**学术定义**（来源：最新研究）

- **Microsoft Azure（2025）**：AI Agent 编排模式包括顺序、并发、群聊、交接和编排模式。
- **Google Cloud（2025）**：选择 Agent 模式是基本的架构决策。每个模式提供不同的灵活性、复杂度和性能权衡。

**工程定义**

在实际工程中，多 Agent 协作模式包括：

1. **顺序协作**：Agent 按顺序执行任务
2. **并行协作**：多个 Agent 并行执行任务
3. **层次协作**：Manager Agent 分配任务给 Worker Agent
4. **群聊协作**：多个 Agent 在群聊中协作
5. **交接协作**：Agent 将任务交接给其他 Agent

#### 多 Agent 协作模式对比表

| 模式 | 核心特点 | 优势 | 劣势 | 适用场景 |
|------|----------|------|------|----------|
| **顺序协作** | 按顺序执行 | 简单、可控 | 效率低 | 任务依赖性强 |
| **并行协作** | 并行执行 | 效率高 | 协调复杂 | 任务独立性高 |
| **层次协作** | Manager 分配任务 | 专业化强 | 依赖 Manager | 大型团队 |
| **群聊协作** | 群聊协作 | 透明、实时协作 | 控制困难 | 头脑风暴 |
| **交接协作** | 任务交接 | 专业化 | 交接点复杂 | 流程化任务 |

---

## 9.2 CrewAI 多 Agent 协作

### 9.2.1 CrewAI 核心概念

CrewAI 是一个多 Agent 协作框架，通过定义 Agent、任务和团队（Crew），实现多 Agent 协作。

#### CrewAI 的定义

CrewAI 是一个多 Agent 协作框架，通过定义 Agent、任务和团队（Crew），实现多 Agent 协作。

**学术定义**（来源：最新研究）

- **CrewAI（2025）**：CrewAI 让企业能够操作 AI Agent 团队，自主地、可靠地和完全控制地执行复杂任务。
- **CrewAI GitHub（2025）**：通过促进协作智能，CrewAI 赋能 Agent 无缝协作，处理复杂任务。

**工程定义**

在实际工程中，CrewAI 包括：

1. **Agents**：定义 Agent 的角色、目标和背景
2. **Tasks**：定义任务、分配 Agent、设置依赖关系
3. **Crews**：定义 Agent 集合、任务集合、流程类型
4. **Tools**：定义工具库、工具使用
5. **Processes**：定义执行流程（Sequential、Hierarchical）

#### CrewAI 的核心概念

**1. Agents（智能体）**

- **Role**：Agent 的角色定义
- **Goal**：Agent 的目标
- **Backstory**：Agent 的背景故事
- **Tools**：Agent 可用的工具

**2. Tasks（任务）**

- **Description**：任务的描述
- **Expected Output**：期望的输出
- **Agent Assignment**：分配的 Agent
- **Dependencies**：任务依赖关系

**3. Crews（团队）**

- **Agent Set**：Agent 集合
- **Task Set**：任务集合
- **Process**：执行流程（Sequential、Hierarchical）

**4. Tools（工具）**

- **Built-in Tools**：内置工具
- **Custom Tools**：自定义工具
- **Tool Library**：工具库

**5. Processes（流程）**

- **Sequential Process**：顺序流程
- **Hierarchical Process**：层次流程
- **Custom Process**：自定义流程

#### CrewAI 的优势与劣势

| 优势 | 劣势 |
|------|------|
| 易于使用 | 灵活性有限 |
| 支持多种流程 | 需要良好的设计 |
| 可视化编辑器 | 性能优化复杂 |
| 开源免费 | 企业级功能需要付费 |

### 9.2.2 CrewAI 架构模式

CrewAI 提供了多种架构模式，包括顺序流程、层次流程、群聊流程等。

#### CrewAI 架构模式的定义

CrewAI 架构模式是指 CrewAI 提供的多种协作流程，包括顺序流程、层次流程、群聊流程等。

**学术定义**（来源：最新研究）

- **CrewAI（2025）**：CrewAI 提供了两种常见的编排范例——Crews 和 Flows——允许你将系统从原型扩展到生产环境。

**工程定义**

在实际工程中，CrewAI 架构模式包括：

1. **Sequential Process（顺序流程）**：Agent 顺序执行任务
2. **Hierarchical Process（层次流程）**：Manager Agent 分配任务给 Worker Agent
3. **Flows（流程）**：更灵活的流程定义方式
4. **Custom Process（自定义流程）**：自定义流程

#### CrewAI 架构模式的核心机制

**1. Sequential Process（顺序流程）**

Agent 顺序执行任务，每个 Agent 完成任务后，下一个 Agent 开始执行。

**2. Hierarchical Process（层次流程）**

Manager Agent 分配任务给 Worker Agent，协调多个 Agent 的执行。

**3. Flows（流程）**

更灵活的流程定义方式，支持复杂的流程控制。

**4. Custom Process（自定义流程）**

自定义流程，满足特定的需求。

#### CrewAI 架构模式对比表

| 模式 | 核心特点 | 优势 | 劣势 | 适用场景 |
|------|----------|------|------|----------|
| **Sequential Process** | 顺序执行 | 简单、可控 | 效率低 | 线性任务 |
| **Hierarchical Process** | Manager 分配任务 | 专业化强 | 依赖 Manager | 大型团队 |
| **Flows** | 灵活流程 | 控制力强 | 复杂度高 | 复杂流程 |
| **Custom Process** | 自定义流程 | 完全控制 | 开发成本高 | 特定需求 |

### 9.2.3 CrewAI 使用方法

CrewAI 的使用方法包括安装、Agent 定义、Task 定义、Crew 执行等。

#### CrewAI 使用方法的定义

CrewAI 的使用方法是指如何使用 CrewAI 框架来构建多 Agent 协作系统，包括安装、配置、Agent 定义、Task 定义、Crew 执行等。

**学术定义**（来源：最新研究）

- **CrewAI Docs（2025）**：CrewAI 提供了直观但强大的 API，可以构建 agent 驱动的工作流，并使用两种常见范式部署到生产环境。
- **DeepLearning.AI（2025）**：构建可以一起工作的 agent 系统：创建多 Agent 工作流，其中 agent 规划、推理并协作以可靠地完成复杂任务。

**工程定义**

在实际工程中，CrewAI 使用方法包括：

1. **安装与配置**：pip install crewai，配置环境
2. **Agent 定义**：定义 Agent 的角色、目标、背景
3. **Task 定义**：定义任务、分配 Agent、设置依赖关系
4. **Crew 执行**：创建 Crew、添加 Agent、kickoff Crew
5. **结果整合**：整合 Agent 的结果

#### CrewAI 使用方法的核心步骤

**1. 安装与配置**

安装 CrewAI，配置环境和 API Key。

**2. Agent 定义**

定义 Agent 的角色、目标、背景和工具。

**3. Task 定义**

定义任务的描述、期望输出、Agent 分配和依赖关系。

**4. Crew 执行**

创建 Crew，添加 Agent，kickoff Crew 执行任务。

**5. 结果整合**

整合 Agent 的结果，形成最终输出。

#### CrewAI 使用方法的优势与劣势

| 优势 | 劣势 |
|------|------|
| 简单易用 | 灵活性有限 |
| 可视化编辑器 | 性能优化困难 |
| 支持多种流程 | 需要设计经验 |
| 开源免费 | 企业功能需要付费 |

---

## 9.3 Agent 编排模式

### 9.3.1 编排模式概述

Agent 编排模式是指管理和协调多个 Agent 执行的模式，包括顺序、并发、群聊、交接、编排等模式。

#### 编排模式概述的定义

Agent 编排模式是指管理和协调多个 Agent 执行的模式，包括顺序、并发、群聊、交接、编排等模式。

**学术定义**（来源：最新研究）

- **Microsoft Azure（2025）**：AI Agent 编排模式包括顺序、并发、群聊、交接和编排模式。
- **Google Developers Blog（2025）**：Google 的 Agent 开发工具包（ADK）中提供了八种基本设计模式，包括 Sequential Pipeline、Loop、Parallel、Human-in-the-loop 等。

**工程定义**

在实际工程中，Agent 编排模式包括：

1. **顺序模式**：Agent 按顺序执行任务
2. **并发模式**：多个 Agent 并发执行任务
3. **群聊模式**：多个 Agent 在群聊中协作
4. **交接模式**：Agent 将任务交接给其他 Agent
5. **编排模式**：编排器管理和协调多个 Agent

#### 编排模式概述的核心机制

**1. 顺序模式**

Agent 按顺序执行任务，前一个 Agent 的输出作为下一个 Agent 的输入。

**2. 并发模式**

多个 Agent 并发执行任务，提高效率。

**3. 群聊模式**

多个 Agent 在群聊中协作，实时沟通和协调。

**4. 交接模式**

Agent 将任务交接给其他 Agent，支持专业化。

**5. 编排模式**

编排器管理和协调多个 Agent，优化整体性能。

#### 编排模式概述对比表

| 模式 | 核心特点 | 优势 | 劣势 | 适用场景 |
|------|----------|------|------|----------|
| **顺序模式** | 按顺序执行 | 简单、可控 | 效率低 | 任务依赖性强 |
| **并发模式** | 并发执行 | 效率高 | 协调复杂 | 任务独立性高 |
| **群聊模式** | 群聊协作 | 透明、实时协作 | 控制困难 | 头脑风暴 |
| **交接模式** | 任务交接 | 专业化强 | 交接点复杂 | 流程化任务 |
| **编排模式** | 统一管理 | 控制力强 | 复杂度高 | 复杂系统 |

### 9.3.2 Microsoft Azure 编排模式

Microsoft Azure 提供了多种 Agent 编排模式，包括顺序、并发、群聊、交接、编排等。

#### Microsoft Azure 编排模式的定义

Microsoft Azure 编排模式是指 Azure 提供的 AI Agent 编排模式，包括顺序、并发、群聊、交接、编排等模式。

**学术定义**（来源：最新研究）

- **Microsoft Azure（2025）**：AI Agent 编排模式包括顺序、并发、群聊、交接和编排模式。

**工程定义**

在实际工程中，Microsoft Azure 编排模式包括：

1. **Sequential（顺序）**：Agent 按顺序执行
2. **Concurrent（并发）**：多个 Agent 并发执行
3. **Group Chat（群聊）**：多个 Agent 在群聊中协作
4. **Handoff（交接）**：Agent 将任务交接给其他 Agent
5. **Orchestration（编排）**：编排器管理多个 Agent

#### Microsoft Azure 编排模式的核心机制

**1. Sequential（顺序）**

Agent 按顺序执行任务。

**2. Concurrent（并发）**

多个 Agent 并发执行任务。

**3. Group Chat（群聊）**

多个 Agent 在群聊中协作。

**4. Handoff（交接）**

Agent 将任务交接给其他 Agent。

**5. Orchestration（编排）**

编排器管理多个 Agent。

#### Microsoft Azure 编排模式的优势与劣势

| 优势 | 劣势 |
|------|------|
| 模式丰富 | 学习曲线陡峭 |
| 企业级支持 | 成本高 |
| 可扩展性强 | 需要 Azure 平台 |
| 性能优化好 | 依赖 Azure 生态 |

### 9.3.3 Google ADK 编排模式

Google ADK（Agent Development Kit）提供了多种编排模式，包括 Sequential Pipeline、Loop、Parallel、Human-in-the-loop 等。

#### Google ADK 编排模式的定义

Google ADK（Agent Development Kit）提供了多种编排模式，支持构建复杂的 Agent 系统。

**学术定义**（来源：最新研究）

- **Google Developers Blog（2025）**：Google 的 Agent 开发工具包（ADK）中提供了八种基本设计模式，包括 Sequential Pipeline、Loop、Parallel、Human-in-the-loop 等。

**工程定义**

在实际工程中，Google ADK 编排模式包括：

1. **Sequential Pipeline**：顺序流水线
2. **Loop**：循环模式
3. **Parallel**：并行模式
4. **Human-in-the-loop**：人机协作模式
5. **Switch**：分支模式
6. **Map-Reduce**：映射归约模式
7. **Router**：路由模式
8. **Tool Integration**：工具集成模式

#### Google ADK 编排模式的核心机制

**1. Sequential Pipeline**

顺序流水线，多个 Agent 按顺序处理数据。

**2. Loop**

循环模式，Agent 可以迭代处理任务。

**3. Parallel**

并行模式，多个 Agent 并发执行任务。

**4. Human-in-the-loop**

人机协作模式，支持人工干预。

#### Google ADK 编排模式的优势与劣势

| 优势 | 劣势 |
|------|------|
| 模式丰富 | 需要学习成本 |
| Google 生态支持 | 依赖 Google 平台 |
| 开源可用 | 文档相对较少 |
| 性能优化好 | 更新频率快 |

---

## 9.4 多 Agent 协作代码示例

以下代码示例展示如何使用 CrewAI 构建多 Agent 协作系统：

```python
"""
多 Agent 协作示例（CrewAI）

这个示例展示如何使用 CrewAI 构建多 Agent 协作系统。
"""

import os
import logging
from typing import Dict, Any, List
from dataclasses import dataclass
from crewai import Agent, Task, Crew, Process

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# 初始化 LLM
from langchain_openai import ChatOpenAI
llm = ChatOpenAI(model="gpt-4", temperature=0.0)

# 定义 Agent
researcher = Agent(
    role="Researcher",
    goal="Research and gather information on a given topic",
    backstory="""You are a senior researcher with expertise in information gathering and analysis.
    You are thorough, methodical, and can synthesize information from multiple sources.""",
    verbose=True,
    llm=llm
)

writer = Agent(
    role="Writer",
    goal="Write comprehensive reports based on research findings",
    backstory="""You are a skilled writer with expertise in creating clear, engaging,
    and well-structured content. You can transform complex research into readable prose.""",
    verbose=True,
    llm=llm
)

reviewer = Agent(
    role="Reviewer",
    goal="Review and critique content for accuracy, clarity, and quality",
    backstory="""You are a meticulous reviewer with a keen eye for detail.
    You can identify errors, inconsistencies, and areas for improvement.""",
    verbose=True,
    llm=llm
)

# 定义 Task
research_task = Task(
    description="Research the latest developments in AI agents and multi-agent collaboration frameworks",
    expected_output="A comprehensive summary of recent developments and key findings",
    agent=researcher,
    verbose=True
)

writing_task = Task(
    description="Write a comprehensive report on multi-agent collaboration in AI",
    expected_output="A well-structured, engaging article suitable for publication",
    agent=writer,
    context=[research_task],
    verbose=True
)

review_task = Task(
    description="Review the article for accuracy, clarity, and quality",
    expected_output="A detailed review with specific feedback and suggestions",
    agent=reviewer,
    context=[writing_task],
    verbose=True
)

# 创建 Crew
crew = Crew(
    agents=[researcher, writer, reviewer],
    tasks=[research_task, writing_task, review_task],
    process=Process.sequential,
    verbose=True
)

# 执行 Crew
if __name__ == "__main__":
    logger.info("Starting Multi-Agent Collaboration with CrewAI")
    
    result = crew.kickoff()
    
    logger.info("Multi-Agent Collaboration completed")
    print("\n" + "="*60)
    print("Multi-Agent Collaboration Results")
    print("="*60)
    print(result)
```

---

## 小结（第九章全部完成）

本章详细介绍了多 Agent 协作的核心概念和实践，包括多 Agent 协作基础、CrewAI 多 Agent 协作、Agent 编排模式等内容，帮助开发者构建强大的多 Agent 协作能力。

**多 Agent 协作基础**

- **多 Agent 系统（MAS）**：定义、核心机制、优势与劣势
- **多 Agent 协作模式**：定义、对比表

**CrewAI 多 Agent 协作**

- **CrewAI 核心概念**：定义、核心概念
- **CrewAI 架构模式**：定义、核心机制、对比表
- **CrewAI 使用方法**：定义、核心步骤、优势与劣势

**Agent 编排模式**

- **编排模式概述**：定义、核心机制、对比表
- **Microsoft Azure 编排模式**：定义、核心机制、优势与劣势
- **Google ADK 编排模式**：定义、核心机制、优势与劣势

---

_文档版本：v1.0_
_最后更新：2026-03-18_
