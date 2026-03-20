# 第十章：Agent 自主学习（Agent Autonomous Learning）

自主学习是 AI Agent 的高级能力之一，通过强化学习、在线学习和自我更新等机制，使 Agent 能够从经验中持续改进，自主适应环境变化。

## 10.1 自主学习基础

### 10.1.1 强化学习 Agent（RL Agent）

强化学习 Agent 是一种通过强化学习算法（如 Q-Learning、PPO、DQN）优化决策策略的 Agent，能够通过与环境的交互不断学习和改进。

#### 强化学习 Agent 的定义

强化学习 Agent 是一种通过强化学习算法优化决策策略的 Agent，通过与环境的交互（如获得奖励或惩罚），不断学习和改进策略，以最大化累积奖励。

**学术定义**（来源：最新研究）

- **Nature（2025）**：一个自主方法从大量 Agent 的累积经验中在大量复杂环境中发现强化学习规则，并在具有挑战性的环境中实现最先进性能。
- **arXiv（2025）**：Agent-R1: Training Powerful LLM Agents with End-to-End Reinforcement Learning，介绍了端到端强化学习训练 LLM Agent 的方法。

**工程定义**

在实际工程中，强化学习 Agent 包括：

1. **环境**：Agent 与之交互的环境
2. **状态空间**：环境的可观测状态
3. **动作空间**：Agent 可执行的动作
4. **奖励函数**：定义 Agent 目标的奖励函数
5. **策略网络**：Agent 的决策网络（如神经网络）
6. **学习算法**：强化学习算法（如 Q-Learning、PPO、DQN）
7. **经验回放**：存储和重放经验

#### 强化学习 Agent 的核心机制

**1. 环境交互**

Agent 在环境中执行动作，获得奖励和新状态。

**2. 经验收集**

Agent 收集状态、动作、奖励的经验。

**3. 策略更新**

根据收集的经验更新策略网络。

**4. 策略评估**

评估策略的性能，决定是否需要继续训练。

#### 强化学习 Agent 的优势与劣势

| 优势 | 劣势 |
|------|------|
| 能自主学习并改进策略 | 训练成本高 |
| 能适应动态环境 | 需要设计奖励函数 |
| 能解决复杂决策问题 | 可能收敛到次优策略 |
| 支持长期目标 | 需要大量的经验 |

### 10.1.2 在线学习与持续学习

在线学习和持续学习是指 Agent 在运行过程中不断学习和更新模型，而不需要离线训练，能够快速适应环境的变化。

#### 在线学习与持续学习的定义

在线学习和持续学习是指 Agent 在运行过程中不断学习和更新模型，不需要离线训练，能够快速适应环境的变化。

**学术定义**（来源：最新研究）

- **Powerdrill（2025）**：强化学习（RL）是自我改进的核心技术，其中 agent 通过与环境的试错交互学习最优行为。
- **arXiv（2025）**：SEAL (Zweiger et al., 2025) 提出了自反思和自学习 LMs，通过模型生成自我编辑并立即通过梯度更新应用，使用强化信号训练。

**工程定义**

在实际工程中，在线学习和持续学习包括：

1. **在线数据收集**：在运行过程中收集数据
2. **增量训练**：基于新数据增量更新模型
3. **模型更新**：定期将更新的模型部署到生产环境
4. **A/B 测试**：使用 A/B 测试验证新模型
5. **回滚机制**：支持模型回滚

#### 在线学习与持续学习的核心机制

**1. 在线数据收集**

Agent 在运行过程中收集数据（如用户反馈、性能指标）。

**2. 增量训练**

基于新数据增量更新模型，而不需要从头训练。

**3. 模型更新**

定期将更新的模型部署到生产环境。

**4. A/B 测试**

使用 A/B 测试验证新模型的性能。

**5. 回滚机制**

如果新模型性能下降，支持回滚到旧模型。

#### 在线学习与持续学习的优势与劣势

| 优势 | 劣势 |
|------|------|
| 能快速适应环境变化 | 模型更新成本高 |
| 不需要离线训练 | 可能出现漂移 |
| 支持实时学习 | 需要设计增量学习算法 |
| 支持模型迭代 | 需要良好的监控机制 |

### 10.1.3 自我编辑与自我训练

自我编辑和自我训练是指 Agent 能够自主编辑和训练自己，通过生成自我编辑、应用梯度更新和使用强化信号，实现自我改进。

#### 自我编辑与自我训练的定义

自我编辑和自我训练是指 Agent 能够自主编辑和训练自己，通过生成自我编辑、应用梯度更新和使用强化信号，实现自我改进。

**学术定义**（来源：最新研究）

- **arXiv（2025）**：SEAL (Zweiger et al., 2025) 提出了自反思和自学习 LMs，通过模型生成自我编辑并立即通过梯度更新应用，使用强化信号训练。
- **arXiv（2024）**：Gödel Agent 草拟了一个自我指涉架构，agent 可以提议修改自己并接受它们。

**工程定义**

在实际工程中，自我编辑和自我训练包括：

1. **自我编辑生成**：模型生成自己的编辑
2. **编辑应用**：应用编辑到模型参数
3. **梯度更新**：使用梯度更新模型参数
4. **强化信号**：使用强化信号训练
5. **自我评估**：评估改进效果

#### 自我编辑与自我训练的核心机制

**1. 自我编辑生成**

模型生成自己的编辑，包括参数修改、架构修改等。

**2. 编辑应用**

应用编辑到模型参数或架构。

**3. 梯度更新**

使用梯度更新模型参数，优化性能。

**4. 强化信号**

使用强化信号训练，指导改进方向。

**5. 自我评估**

评估改进效果，形成反馈循环。

#### 自我编辑与自我训练的优势与劣势

| 优势 | 劣势 |
|------|------|
| 无需外部干预 | 训练成本高 |
| 持续自我改进 | 可能出现不稳定的改进 |
| 支持长期自主 | 需要良好的自我评估能力 |
| 支持复杂任务 | 计算资源消耗大 |

---

## 10.2 自主学习框架

### 10.2.1 ALAS 自主学习框架

ALAS 是一种自主学习 Agent 框架，使用 LLMs 推断高级或隐藏上下文，帮助多 Agent 环境中的地址限制和部分可观测性。

#### ALAS 的定义

ALAS 是一种自主学习 Agent 框架，使用 LLMs 推断高级或隐藏上下文，帮助多 Agent 环境中的地址限制和部分可观测性。

**学术定义**（来源：最新研究）

- **arXiv（2025）**：2025) use LLMs to infer high-level or hidden context in multi-agent environments, helping to address limitations from partial observability.

**工程定义**

在实际工程中，ALAS 包括：

1. **上下文推断**：使用 LLMs 推断高级或隐藏上下文
2. **多 Agent 环境支持**：支持多 Agent 环境中的协作
3. **部分可观测性处理**：处理部分可观测性问题
4. **自主决策**：支持 Agent 的自主决策
5. **策略优化**：优化 Agent 的策略

#### ALAS 的核心机制

**1. 上下文推断**

使用 LLMs 推断高级或隐藏上下文。

**2. 多 Agent 环境支持**

支持多 Agent 环境中的协作。

**3. 部分可观测性处理**

处理部分可观测性问题，提高决策质量。

**4. 自主决策**

支持 Agent 的自主决策，无需外部干预。

**5. 策略优化**

优化 Agent 的策略，提高整体性能。

#### ALAS 的优势与劣势

| 优势 | 劣势 |
|------|------|
| 支持复杂环境 | 上下文推断成本高 |
| 处理部分可观测性 | 需要 LLM 支持 |
| 支持多 Agent 协作 | 策略优化复杂 |
| 提高决策质量 | 依赖 LLM 的推理能力 |

### 10.2.2 Agent Lightning 框架

Agent Lightning 是一种灵活且可扩展的框架，支持使用强化学习训练任何 LLM Agent。

#### Agent Lightning 的定义

Agent Lightning 是一种灵活且可扩展的框架，支持使用强化学习训练任何 LLM Agent。

**学术定义**（来源：最新研究）

- **arXiv（2025）**：我们提出 Agent Lightning，一个灵活且可扩展的框架，支持使用强化学习训练任何 LLM Agent。
- **Powerdrill（2025）**：150+ AI Agent Statistics [2026] 中提到了 Agent Lightning 的统计和应用。

**工程定义**

在实际工程中，Agent Lightning 包括：

1. **RL 训练支持**：支持强化学习训练
2. **LLM Agent 支持**：支持训练任何 LLM Agent
3. **灵活架构**：灵活且可扩展的架构
4. **训练接口**：简化的训练接口
5. **性能优化**：优化训练性能

#### Agent Lightning 的核心机制

**1. RL 训练支持**

支持强化学习训练，包括各种 RL 算法。

**2. LLM Agent 支持**

支持训练任何 LLM Agent，不受 LLM 类型限制。

**3. 灵活架构**

灵活且可扩展的架构，支持自定义组件。

**4. 训练接口**

简化的训练接口，降低使用门槛。

**5. 性能优化**

优化训练性能，提高训练效率。

#### Agent Lightning 的优势与劣势

| 优势 | 劣势 |
|------|------|
| 灵活可扩展 | 学习曲线陡峭 |
| 支持多种 RL 算法 | 需要 RL 知识 |
| 简化训练接口 | 需要配置和优化 |
| 性能优化好 | 依赖计算资源 |

### 10.2.3 Agent-R1 框架

Agent-R1 是一种端到端强化学习训练 LLM Agents 的框架，训练 LLM Agents 执行认知任务并自主生成或重构任务相关状态。

#### Agent-R1 的定义

Agent-R1 是一种端到端强化学习训练 LLM Agents 的框架，训练 LLM Agents 执行认知任务并自主生成或重构任务相关状态。

**学术定义**（来源：最新研究）

- **arXiv（2025）**：Agent-R1: Training Powerful LLM Agents with End-to-End Reinforcement Learning，介绍了端到端强化学习训练 LLM Agent 的方法。
- **arXiv（2025）**：当 LLMs 被分配一个"agent"角色时，它们被预期不仅执行认知任务（如推理和决策），还要自主行动，持续学习，并适应交互环境中的变化。

**工程定义**

在实际工程中，Agent-R1 包括：

1. **端到端 RL 训练**：端到端强化学习训练
2. **认知任务支持**：支持执行认知任务
3. **状态生成**：自主生成或重构任务相关状态
4. **环境适应**：适应交互环境中的变化
5. **策略优化**：优化决策策略

#### Agent-R1 的核心机制

**1. 端到端 RL 训练**

端到端强化学习训练，从状态到动作。

**2. 认知任务支持**

支持执行认知任务，如推理和决策。

**3. 状态生成**

自主生成或重构任务相关状态。

**4. 环境适应**

适应交互环境中的变化，持续学习。

**5. 策略优化**

优化决策策略，提高整体性能。

#### Agent-R1 的优势与劣势

| 优势 | 劣势 |
|------|------|
| 端到端训练 | 训练成本高 |
| 支持认知任务 | 需要设计奖励函数 |
| 状态生成能力强 | 策略优化复杂 |
| 环境适应性强 | 依赖环境交互 |

### 10.2.4 LESR 框架

LESR（Learning Efficiently to Self-Reflect）是一种自反思和自学习框架，通过自我编辑和自我训练，实现 LLMs 的自我改进。

#### LESR 的定义

LESR 是一种自反思和自学习框架，通过自我编辑和自我训练，实现 LLMs 的自我改进。

**学术定义**（来源：最新研究）

- **arXiv（2025）**：SEAL (Zweiger et al., 2025) 提出了自反思和自学习 LMs，通过模型生成自我编辑并立即通过梯度更新应用，使用强化信号训练。
- **Reflected Intelligence（2025）**：Reflexion 是一个轻量级的反馈循环，每次任务尝试后，agent 以自然语言批判自己的表现，存储反思到记忆中，并使用它来指导下一次尝试。

**工程定义**

在实际工程中，LESR 包括：

1. **自我反思**：Agent 反思自己的表现
2. **自我编辑**：Agent 编辑自己的输出
3. **自我训练**：Agent 训练自己，改进性能
4. **强化信号**：使用强化信号训练
5. **性能监控**：监控性能改进

#### LESR 的核心机制

**1. 自我反思**

Agent 反思自己的表现，识别问题和改进空间。

**2. 自我编辑**

Agent 编辑自己的输出，改进质量。

**3. 自我训练**

Agent 训练自己，改进决策策略。

**4. 强化信号**

使用强化信号训练，指导改进方向。

**5. 性能监控**

监控性能改进，形成反馈循环。

#### LESR 的优势与劣势

| 优势 | 劣势 |
|------|------|
| 持续自我改进 | 自我反思成本高 |
| 无需外部干预 | 可能过度自我批判 |
| 支持复杂任务 | 需要良好的自我评估能力 |
| 提高整体性能 | 计算资源消耗大 |

---

## 10.3 自主学习应用场景

### 10.3.1 游戏与模拟

游戏与模拟是自主学习 Agent 的重要应用场景，通过强化学习和自主决策，在游戏和模拟环境中实现高性能。

#### 游戏与模拟的定义

游戏与模拟是自主学习 Agent 的重要应用场景，通过强化学习和自主决策，在游戏和模拟环境中实现高性能。

**学术定义**（来源：最新研究）

- **Nature（2025）**：在具有挑战性的环境中实现最先进性能。
- **arXiv（2025）**：Agent Lightning: Train ANY AI Agents with Reinforcement Learning，强调了训练 AI Agent 在各种环境中。

**工程定义**

在实际工程中，游戏与模拟包括：

1. **游戏环境**：模拟的游戏环境
2. **Agent 定义**：定义 Agent 的角色和能力
3. **训练过程**：训练 Agent 在游戏环境中
4. **性能评估**：评估 Agent 的游戏性能
5. **策略优化**：优化 Agent 的游戏策略

#### 游戏与模拟的核心机制

**1. 游戏环境**

模拟的游戏环境，支持 Agent 交互。

**2. Agent 定义**

定义 Agent 的角色、目标和能力。

**3. 训练过程**

训练 Agent 在游戏环境中，学习最优策略。

**4. 性能评估**

评估 Agent 的游戏性能，如得分、胜率等。

**5. 策略优化**

优化 Agent 的游戏策略，提高游戏表现。

#### 游戏与模拟的优势与劣势

| 优势 | 劣势 |
|------|------|
| 高性能游戏 Agent | 训练成本高 |
| 自主决策能力 | 游戏策略可能过拟合 |
| 适应性强 | 需要设计游戏环境 |
| 支持复杂任务 | 游戏结果可能不稳定 |

### 10.3.2 自动化任务执行

自动化任务执行是自主学习 Agent 的另一个重要应用场景，通过强化学习和自主决策，实现任务的自动化执行和优化。

#### 自动化任务执行的定义

自动化任务执行是自主学习 Agent 的另一个重要应用场景，通过强化学习和自主决策，实现任务的自动化执行和优化。

**学术定义**（来源：最新研究）

- **Powerdrill（2025）**：自动化复杂任务，减少人工成本，提高效率。
- **arXiv（2025）**：当 LLMs 被分配一个"agent"角色时，它们被预期不仅执行认知任务，还要自主行动，持续学习，并适应交互环境中的变化。

**工程定义**

在实际工程中，自动化任务执行包括：

1. **任务定义**：定义自动化任务的目标和流程
2. **Agent 配置**：配置 Agent 的角色和能力
3. **自动化执行**：Agent 自动执行任务
4. **错误处理**：处理任务执行中的错误
5. **性能优化**：优化任务执行的性能

#### 自动化任务执行的核心机制

**1. 任务定义**

定义自动化任务的目标和流程。

**2. Agent 配置**

配置 Agent 的角色、目标和能力。

**3. 自动化执行**

Agent 自动执行任务，无需人工干预。

**4. 错误处理**

处理任务执行中的错误，支持重试和恢复。

**5. 性能优化**

优化任务执行的性能，提高效率和可靠性。

#### 自动化任务执行的优势与劣势

| 优势 | 劣势 |
|------|------|
| 自动化复杂任务 | 任务设计复杂度高 |
| 提高效率和降低成本 | 需要良好的错误处理 |
| 支持24/7服务 | 可能出现意外行为 |
| 持续优化 | 需要性能监控 |

### 10.3.3 智能客服与助手

智能客服与助手是自主学习 Agent 的实际应用场景，通过强化学习和自主决策，提供智能、个性化和主动的客户服务。

#### 智能客服与助手的定义

智能客服与助手是自主学习 Agent 的实际应用场景，通过强化学习和自主决策，提供智能、个性化和主动的客户服务。

**学术定义**（来源：最新研究）

- **arXiv（2025）**：持续学习和在线学习是指 Agent 在运行过程中不断学习和更新模型，能够快速适应环境的变化。
- **Powerdrill（2025）**：个性化服务，根据用户偏好提供个性化推荐和服务。

**工程定义**

在实际工程中，智能客服与助手包括：

1. **对话管理**：管理对话历史和上下文
2. **意图识别**：识别用户意图和需求
3. **自主决策**：自主决定下一步行动
4. **个性化服务**：根据用户偏好提供个性化服务
5. **持续学习**：从用户反馈中学习，持续改进

#### 智能客服与助手的核心机制

**1. 对话管理**

管理对话历史和上下文，提供连贯的对话体验。

**2. 意图识别**

识别用户意图和需求，提供准确的服务。

**3. 自主决策**

自主决定下一步行动，提高服务效率。

**4. 个性化服务**

根据用户偏好提供个性化服务，提高用户满意度。

**5. 持续学习**

从用户反馈中学习，持续改进服务质量。

#### 智能客服与助手的优势与劣势

| 优势 | 劣势 |
|------|------|
| 24/7 服务 | 可能出现意外回答 |
| 个性化服务 | 需要大量用户数据 |
| 主动服务 | 需要良好的意图识别 |
| 持续改进 | 需要有效的反馈机制 |

---

## 10.4 自主学习代码示例

以下代码示例展示如何实现一个简单的强化学习 Agent：

```python
"""
自主学习 Agent 示例（强化学习）

这个示例展示如何实现一个简单的 Q-Learning Agent，
通过与环境的交互，学习最优策略。
"""

import os
import logging
import numpy as np
from typing import Dict, Any, List, Optional, Tuple
from dataclasses import dataclass
from enum import Enum
import time

from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class ActionType(Enum):
    """行动类型"""
    UP = "up"
    DOWN = "down"
    LEFT = "left"
    RIGHT = "right"

@dataclass
class State:
    """状态"""
    x: int
    y: int

@dataclass
class Experience:
    """经验"""
    state: State
    action: ActionType
    reward: float
    next_state: State
    done: bool

class Environment:
    """环境"""

    def __init__(self, width: int = 5, height: int = 5):
        self.width = width
        self.height = height
        self.goal_state = State(x=width-1, y=height-1)
        self.obstacles = [
            State(x=2, y=2),
            State(x=3, y=3),
            State(x=1, y=3)
        ]
        self.reset()

    def reset(self) -> State:
        """重置环境"""
        self.current_state = State(x=0, y=0)
        return self.current_state

    def step(self, action: ActionType) -> Tuple[State, float, bool]:
        """
        执行动作

        Args:
            action: 动作

        Returns:
            (新状态, 奖励, 是否完成)
        """
        old_state = self.current_state

        # 更新状态
        if action == ActionType.UP:
            self.current_state.y = max(0, self.current_state.y - 1)
        elif action == ActionType.DOWN:
            self.current_state.y = min(self.height - 1, self.current_state.y + 1)
        elif action == ActionType.LEFT:
            self.current_state.x = max(0, self.current_state.x - 1)
        elif action == ActionType.RIGHT:
            self.current_state.x = min(self.width - 1, self.current_state.x + 1)

        # 检查障碍物
        if self.current_state in self.obstacles:
            # 回到旧状态
            self.current_state = old_state
            reward = -1.0
            done = False
        elif self.current_state == self.goal_state:
            # 到达目标
            reward = 100.0
            done = True
        else:
            # 接近目标
            old_distance = abs(old_state.x - self.goal_state.x) + abs(old_state.y - self.goal_state.y)
            new_distance = abs(self.current_state.x - self.goal_state.x) + abs(self.current_state.y - self.goal_state.y)
            reward = (old_distance - new_distance) * 10.0
            done = False

        logger.info(f"动作：{action}, 状态：{self.current_state}, 奖励：{reward}, 完成：{done}")

        return self.current_state, reward, done

class QLearningAgent:
    """Q-Learning Agent"""

    def __init__(
        self,
        name: str,
        state_space_size: int = 25,  # 5x5 grid
        action_space_size: int = 4,  # 4 actions
        learning_rate: float = 0.1,
        discount_factor: float = 0.9,
        epsilon: float = 1.0,
        epsilon_decay: float = 0.995
    ):
        """
        初始化 Q-Learning Agent

        Args:
            name: Agent 名称
            state_space_size: 状态空间大小
            action_space_size: 动作空间大小
            learning_rate: 学习率
            discount_factor: 折扣因子
            epsilon: 探索率
            epsilon_decay: 探索率衰减
        """
        self.name = name

        # 初始化 Q 表
        self.q_table = np.zeros((state_space_size, action_space_size))

        # 学习参数
        self.learning_rate = learning_rate
        self.discount_factor = discount_factor
        self.epsilon = epsilon
        self.epsilon_decay = epsilon_decay

        # 初始化统计信息
        self.episode = 0
        self.steps = 0
        self.total_reward = 0

        logger.info(f"Q-Learning Agent '{self.name}' 初始化完成")

    def get_state_index(self, state: State) -> int:
        """
        获取状态索引

        Args:
            state: 状态

        Returns:
            状态索引
        """
        return state.x * 5 + state.y

    def get_action(self, state: State) -> ActionType:
        """
        获取动作（ε-贪婪策略）

        Args:
            state: 状态

        Returns:
            动作
        """
        state_index = self.get_state_index(state)

        # ε-贪婪策略
        if np.random.random() < self.epsilon:
            action = np.random.choice(list(ActionType))
        else:
            action_index = np.argmax(self.q_table[state_index])
            action = ActionType(action_index)

        return action

    def update_q_table(self, experience: Experience):
        """
        更新 Q 表

        Args:
            experience: 经验
        """
        state_index = self.get_state_index(experience.state)
        action_index = list(ActionType).index(experience.action)
        next_state_index = self.get_state_index(experience.next_state)

        # Q-Learning 更新规则
        old_q_value = self.q_table[state_index, action_index]
        learned_value = experience.reward + self.discount_factor * np.max(self.q_table[next_state_index])
        new_q_value = (1 - self.learning_rate) * old_q_value + self.learning_rate * learned_value

        self.q_table[state_index, action_index] = new_q_value

        logger.info(f"更新 Q 表：状态 {experience.state}, 动作 {experience.action}, Q 值 {old_q_value:.2f} -> {new_q_value:.2f}")

    def decay_epsilon(self):
        """衰减 ε"""
        self.epsilon *= self.epsilon_decay
        self.epsilon = max(0.01, self.epsilon)
        logger.info(f"衰减 ε：{self.epsilon:.4f}")

    def train(self, environment: Environment, episodes: int = 100):
        """
        训练 Agent

        Args:
            environment: 环境
            episodes: 训练轮数
        """
        logger.info(f"开始训练，共 {episodes} 轮")

        for episode in range(episodes):
            state = environment.reset()
            done = False
            episode_reward = 0
            steps = 0

            while not done:
                # 选择动作
                action = self.get_action(state)

                # 执行动作
                next_state, reward, done = environment.step(action)

                # 更新 Q 表
                experience = Experience(
                    state=state,
                    action=action,
                    reward=reward,
                    next_state=next_state,
                    done=done
                )
                self.update_q_table(experience)

                # 更新统计信息
                episode_reward += reward
                steps += 1
                state = next_state

                if done:
                    break

            # 衰减 ε
            self.decay_epsilon()

            # 记录统计信息
            self.episode += 1
            self.steps += steps
            self.total_reward += episode_reward

            # 每 10 轮输出一次统计信息
            if episode % 10 == 0:
                logger.info(f"轮次 {episode}：步数 {steps}, 奖励 {episode_reward:.2f}, ε {self.epsilon:.4f}")

        logger.info(f"训练完成，总轮次：{episodes}, 总步数：{self.steps}, 总奖励：{self.total_reward:.2f}, 最终 ε：{self.epsilon:.4f}")

    def test(self, environment: Environment) -> float:
        """
        测试 Agent

        Args:
            environment: 环境

        Returns:
            平均奖励
        """
        logger.info("开始测试")

        state = environment.reset()
        done = False
        total_reward = 0
        steps = 0

        while not done and steps < 100:
            # 选择最优动作（不探索）
            state_index = self.get_state_index(state)
            action_index = np.argmax(self.q_table[state_index])
            action = ActionType(action_index)

            # 执行动作
            next_state, reward, done = environment.step(action)

            total_reward += reward
            steps += 1
            state = next_state

        average_reward = total_reward / steps

        logger.info(f"测试完成：步数 {steps}, 平均奖励：{average_reward:.2f}")

        return average_reward

# 使用示例
def main():
    """主函数"""
    # 创建环境
    env = Environment(width=5, height=5)

    # 创建 Q-Learning Agent
    agent = QLearningAgent(
        name="QLearningAgent",
        state_space_size=25,  # 5x5 grid
        action_space_size=4,  # 4 actions
        learning_rate=0.1,
        discount_factor=0.9,
        epsilon=1.0,
        epsilon_decay=0.995
    )

    # 训练 Agent
    agent.train(env, episodes=100)

    # 测试 Agent
    avg_reward = agent.test(env)

    print("\n" + "="*60)
    print("Q-Learning Agent 测试结果")
    print("="*60)
    print(f"平均奖励：{avg_reward:.2f}")

if __name__ == "__main__":
    main()
```

---

## 小结（第十章全部完成）

本章详细介绍了 Agent 自主学习的核心概念和实践，包括自主学习基础、自主学习框架、自主学习应用场景等内容，帮助开发者构建强大的自主学习能力。

**自主学习基础**

- **强化学习 Agent（RL Agent）**：定义、核心机制、优势与劣势
- **在线学习与持续学习**：定义、核心机制、优势与劣势
- **自我编辑与自我训练**：定义、核心机制、优势与劣势

**自主学习框架**

- **ALAS 框架**：定义、核心机制、优势与劣势
- **Agent Lightning 框架**：定义、核心机制、优势与劣势
- **Agent-R1 框架**：定义、核心机制、优势与劣势
- **LESR 框架**：定义、核心机制、优势与劣势

**自主学习应用场景**

- **游戏与模拟**：定义、核心机制、优势与劣势
- **自动化任务执行**：定义、核心机制、优势与劣势
- **智能客服与助手**：定义、核心机制、优势与劣势

---

_文档版本：v1.0_
_最后更新：2026-03-18_
