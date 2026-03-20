# 第五章：Agent 进阶主题

本章介绍 AI Agent 的进阶主题，包括 Agent 进阶架构、记忆增强技术和持续学习能力，帮助开发者构建更加智能和强大的 Agent 系统。

## 5.1 Agent 进阶架构

### 5.1.1 记忆增强 Agent（MemGPT）

MemGPT 是一种基于记忆的 Agent 架构，通过缓存优先机制，优先保留近期信息，实现长期记忆的高效管理。

#### MemGPT 的定义

MemGPT 是一种 Agent 记忆增强架构，通过模拟计算机内存的层次结构，优先保留近期信息，实现对长期对话的高效管理。

**学术定义**（来源：最新研究）

- **Packer et al.（2023）**：MemGPT 通过缓存优先机制，优先保留近期信息，实现对长期对话的高效管理。
- **arXiv（2024）**：MemGPT 利用缓存优先架构，优先保留近期信息，实现对长期对话的高效管理。

**工程定义**

在实际工程中，MemGPT 包括：

1. **记忆存储**：模拟计算机内存的层次结构
2. **记忆更新**：优先保留近期信息的更新机制
3. **记忆检索**：基于相关性的记忆检索
4. **记忆压缩**：压缩旧信息的压缩机制
5. **记忆淘汰**：淘汰不相关信息的淘汰机制

#### MemGPT 的核心机制

**1. 分层记忆结构**

模拟计算机内存的层次结构，包括：
- **寄存器**：最近的操作
- **L1 Cache**：近期访问的信息
- **L2 Cache**：较旧的信息
- **主存**：长期存储的信息

**2. 缓存优先机制**

优先保留近期访问的信息，淘汰不相关的旧信息。

**3. 语义相似性检索**

基于语义相似性检索相关的记忆片段。

#### MemGPT 的优势与劣势

| 优势 | 劣势 |
|------|------|
| 效率高：优先检索近期信息 | 旧信息可能被淘汰 |
| 长期记忆能力强 | 实现复杂度高 |
| 对话一致性高 | 资源消耗大 |

### 5.1.2 向量数据库记忆（VectorDB）

VectorDB 是一种基于向量数据库的记忆架构，通过向量化存储和相似性检索，实现对大规模知识库的高效访问。

#### VectorDB 的定义

VectorDB 是一种基于向量数据库的记忆架构，通过将文本向量化并存储，基于向量相似性检索相关信息，实现对大规模知识库的高效访问。

**学术定义**（来源：最新研究）

- **VentureBeat（2025）**：向量数据库不再只是炒作对象，而是多流程架构中的关键构建模块。
- **DataNucleus（2026）**：检索从向量数据库中获取前 K 个候选，使用语义或混合（关键词 + 向量）搜索。

**工程定义**

在实际工程中，VectorDB 包括：

1. **向量化**：将文本转化为向量表示
2. **向量存储**：高效存储和索引向量
3. **向量检索**：基于向量相似性的检索
4. **重排序**：使用交叉编码器或重排序器对检索结果进行重排序
5. **生成**：基于检索上下文生成答案

#### VectorDB 的核心机制

**1. 向量化**

使用嵌入模型（Embedding Model）将文本转化为向量。

**2. 向量存储**

使用高效的向量数据库（如 Pinecone、Weaviate、Milvus）存储和索引向量。

**3. 向量检索**

基于向量相似性（如余弦相似性）检索前 K 个最相似的向量。

**4. 重排序**

使用重排序模型（如 Cross-Encoder）对检索结果进行精确重排序。

**5. 生成**

基于检索的上下文和原始查询，使用 LLM 生成答案。

#### VectorDB 的优势与劣势

| 优势 | 劣势 |
|------|------|
| 可扩展性强 | 向量化计算成本高 |
| 语义检索准确度高 | 需要训练嵌入模型 |
| 支持大规模知识库 | 需要维护向量数据库 |

### 5.1.3 图记忆（Graph Memory）

Graph Memory 是一种基于图结构的记忆架构，通过知识图谱存储实体和关系，实现对复杂知识的推理和检索。

#### Graph Memory 的定义

Graph Memory 是一种基于知识图谱的记忆架构，通过存储实体和关系，支持复杂推理和查询，实现对复杂知识的高效管理。

**学术定义**（来源：最新研究）

- **DataNucleus（2026）**：Graph RAG（检索增强生成）使用知识图谱连接信息，支持复杂推理和查询。

**工程定义**

在实际工程中，Graph Memory 包括：

1. **知识图谱构建**：构建实体和关系的知识图谱
2. **图查询**：支持复杂的图查询（如路径查询、子图查询）
3. **图推理**：基于图结构进行推理
4. **图嵌入**：将图结构向量化
5. **图检索**：基于图嵌入和图结构进行检索

#### Graph Memory 的核心机制

**1. 知识图谱构建**

- 实体识别：从文本中识别实体
- 关系抽取：从文本中抽取实体之间的关系
- 图构建：将实体和关系构建为图

**2. 图查询**

- 路径查询：查询实体之间的路径
- 子图查询：查询与实体相关的子图
- 模式查询：查询图中的特定模式

**3. 图推理**

- 基于路径的推理：沿着图路径进行推理
- 基于模式的推理：基于图模式进行推理
- 多跳推理：进行多跳推理

#### Graph Memory 的优势与劣势

| 优势 | 劣势 |
|------|------|
| 支持复杂推理 | 图构建复杂 |
| 知识关联性强 | 图查询成本高 |
| 支持多跳查询 | 图嵌入训练成本高 |

### 5.1.4 混合记忆架构

混合记忆架构是指结合多种记忆技术（如向量数据库、知识图谱、缓存优先），发挥各种记忆技术的优势，实现更强大的记忆能力。

#### 混合记忆架构的定义

混合记忆架构是指结合 MemGPT、VectorDB、Graph Memory 等多种记忆技术，发挥各种技术的优势，实现更强大的记忆能力。

**学术定义**（来源：最新研究）

- **arXiv（2024）**：评估不同记忆架构的效果，包括 MemGPT、ReadAgent、MemoryBank、MemGPT、A-Mem。
- **Robust Framework for Evaluating**：评估不同记忆架构在事实准确性、计算效率和可扩展性等方面的效果。

**工程定义**

在实际工程中，混合记忆架构包括：

1. **多层记忆**：分层存储不同类型的记忆
2. **记忆路由**：根据查询类型路由到合适的记忆层
3. **记忆聚合**：聚合来自不同记忆层的检索结果
4. **记忆更新**：更新不同记忆层的信息
5. **记忆压缩**：压缩和优化记忆存储

#### 混合记忆架构的核心机制

**1. 多层记忆**

- L1：近期操作缓存
- L2：向量数据库记忆
- L3：知识图谱记忆

**2. 记忆路由**

根据查询类型（如事实查询、关系查询、推理查询）路由到合适的记忆层。

**3. 记忆聚合**

聚合来自不同记忆层的检索结果，形成完整的上下文。

**4. 记忆更新**

根据新的交互更新不同记忆层的信息。

#### 混合记忆架构的优势与劣势

| 优势 | 劣势 |
|------|------|
| 发挥多种记忆技术优势 | 架构复杂度高 |
| 记忆能力强 | 维护成本高 |
| 支持多种查询类型 | 性能优化复杂 |

### 5.1.5 记忆架构对比表

| 记忆架构 | 核心机制 | 优势 | 劣势 | 适用场景 |
|----------|----------|------|------|----------|
| **MemGPT** | 缓存优先、分层记忆 | 效率高、长期记忆能力强 | 实现复杂、资源消耗大 | 长期对话、实时应用 |
| **VectorDB** | 向量化、语义检索 | 可扩展性强、语义检索准确 | 计算成本高、需要训练嵌入 | 大规模知识库、RAG |
| **Graph Memory** | 知识图谱、图推理 | 支持复杂推理、知识关联 | 图构建复杂、查询成本高 | 复杂知识、多跳推理 |
| **混合记忆** | 多层记忆、记忆路由 | 发挥多种优势 | 架构复杂、维护成本高 | 复杂应用、多种需求 |

### 5.1.6 记忆增强 Agent 代码示例

以下代码示例展示如何实现一个混合记忆的 Agent：

```python
"""
混合记忆 Agent 示例

这个示例展示如何实现一个结合 MemGPT、VectorDB 和 Graph Memory 的混合记忆 Agent。
"""

import os
import logging
import time
from typing import Dict, Any, List, Optional, Tuple
from dataclasses import dataclass
from enum import Enum
from abc import ABC, abstractmethod

from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.memory import ConversationBufferMemory
from langchain.schema import BaseMessage

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class MemoryType(Enum):
    """记忆类型"""
    CACHE = "cache"
    VECTOR_DB = "vector_db"
    GRAPH = "graph"

@dataclass
class MemoryItem:
    """记忆项"""
    content: str
    timestamp: float
    importance: float
    memory_type: MemoryType
    vector: Optional[List[float]] = None
    relationships: Optional[List[Dict[str, Any]]] = None

class MemoryBase(ABC):
    """记忆基类"""

    @abstractmethod
    def store(self, item: MemoryItem) -> bool:
        """存储记忆"""
        pass

    @abstractmethod
    def retrieve(self, query: str, top_k: int = 5) -> List[MemoryItem]:
        """检索记忆"""
        pass

    @abstractmethod
    def update(self, item: MemoryItem) -> bool:
        """更新记忆"""
        pass

class CacheMemory(MemoryBase):
    """缓存记忆（MemGPT 风格）"""

    def __init__(self, max_size: int = 100):
        self.cache = []
        self.max_size = max_size

    def store(self, item: MemoryItem) -> bool:
        """存储记忆"""
        if len(self.cache) >= self.max_size:
            # 淘汰最不重要的记忆
            self.cache.sort(key=lambda x: x.importance)
            self.cache.pop(0)

        self.cache.append(item)
        logger.info(f"缓存记忆存储：{item.content[:30]}...")
        return True

    def retrieve(self, query: str, top_k: int = 5) -> List[MemoryItem]:
        """检索记忆"""
        # 检索相关的记忆（简化实现）
        relevant = [
            item for item in self.cache
            if any(word.lower() in item.content.lower() for word in query.split())
        ]

        # 返回最近的 top_k 个相关记忆
        relevant.sort(key=lambda x: x.timestamp, reverse=True)

        logger.info(f"缓存记忆检索：找到 {len(relevant)} 个相关记忆")
        return relevant[:top_k]

    def update(self, item: MemoryItem) -> bool:
        """更新记忆"""
        # 简化实现：更新相同内容的记忆
        for existing_item in self.cache:
            if existing_item.content == item.content:
                existing_item.importance = max(existing_item.importance, item.importance)
                existing_item.timestamp = item.timestamp
                logger.info(f"缓存记忆更新：{item.content[:30]}...")
                return True

        # 如果没有找到，则存储新记忆
        return self.store(item)

class VectorDBMemory(MemoryBase):
    """向量数据库记忆"""

    def __init__(self, dimension: int = 768):
        self.vectors = []
        self.dimension = dimension

    def store(self, item: MemoryItem) -> bool:
        """存储记忆"""
        # 模拟向量化
        vector = [hash(word) % 100 / 100.0 for word in item.content.split()[:self.dimension]]
        item.vector = vector

        self.vectors.append(item)
        logger.info(f"向量数据库记忆存储：{item.content[:30]}...")
        return True

    def retrieve(self, query: str, top_k: int = 5) -> List[MemoryItem]:
        """检索记忆"""
        # 模拟向量化查询
        query_vector = [hash(word) % 100 / 100.0 for word in query.split()[:self.dimension]]

        # 计算相似度
        similarities = []
        for item in self.vectors:
            if item.vector:
                similarity = sum(1 - abs(a - b) for a, b in zip(query_vector, item.vector)) / len(query_vector)
                similarities.append((item, similarity))

        # 按相似度排序
        similarities.sort(key=lambda x: x[1], reverse=True)

        # 返回 top_k 个最相似的记忆
        top_items = [item for item, _ in similarities[:top_k]]

        logger.info(f"向量数据库记忆检索：找到 {len(top_items)} 个相关记忆")
        return top_items

    def update(self, item: MemoryItem) -> bool:
        """更新记忆"""
        # 简化实现：替换相同内容的记忆
        for i, existing_item in enumerate(self.vectors):
            if existing_item.content == item.content:
                self.vectors[i] = item
                logger.info(f"向量数据库记忆更新：{item.content[:30]}...")
                return True

        # 如果没有找到，则存储新记忆
        return self.store(item)

class GraphMemory(MemoryBase):
    """图记忆"""

    def __init__(self):
        self.nodes = []
        self.edges = []

    def store(self, item: MemoryItem) -> bool:
        """存储记忆"""
        # 模拟实体和关系提取
        node = {
            "id": len(self.nodes),
            "content": item.content,
            "timestamp": item.timestamp,
            "attributes": {}
        }

        self.nodes.append(node)

        # 模拟关系抽取
        if item.relationships:
            for rel in item.relationships:
                edge = {
                    "source": node["id"],
                    "target": rel.get("target", 0),
                    "relation": rel.get("relation", "related_to"),
                    "attributes": rel
                }
                self.edges.append(edge)

        logger.info(f"图记忆存储：节点 {node['id']}, 边 {len(self.edges)}")
        return True

    def retrieve(self, query: str, top_k: int = 5) -> List[MemoryItem]:
        """检索记忆"""
        # 模拟图查询（简化实现）
        # 查询与 query 相关的节点
        related_nodes = [
            node for node in self.nodes
            if any(word.lower() in node["content"].lower() for word in query.split())
        ]

        # 返回 top_k 个相关节点
        top_nodes = related_nodes[:top_k]

        # 转换为 MemoryItem
        items = []
        for node in top_nodes:
            item = MemoryItem(
                content=node["content"],
                timestamp=node["timestamp"],
                importance=1.0,
                memory_type=MemoryType.GRAPH
            )
            items.append(item)

        logger.info(f"图记忆检索：找到 {len(items)} 个相关记忆")
        return items

    def update(self, item: MemoryItem) -> bool:
        """更新记忆"""
        # 简化实现：图记忆更新比较复杂，这里简化处理
        return self.store(item)

class HybridMemoryAgent:
    """混合记忆 Agent"""

    def __init__(
        self,
        name: str,
        model: str = "gpt-4"
    ):
        """
        初始化混合记忆 Agent

        Args:
            name: Agent 名称
            model: LLM 模型名称
        """
        self.name = name

        # 初始化 LLM
        self.llm = ChatOpenAI(model=model, temperature=0.0)

        # 初始化记忆系统
        self.cache_memory = CacheMemory(max_size=100)
        self.vector_db_memory = VectorDBMemory(dimension=768)
        self.graph_memory = GraphMemory()

        # 初始化对话记忆
        self.conversation_memory = ConversationBufferMemory(
            memory_key="chat_history",
            return_messages=True
        )

        # 初始化提示词模板
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", f"你是一个有用的助手，名为 {self.name}，拥有混合记忆能力。"),
            ("user", "{input}"),
            MessagesPlaceholder(variable_name="chat_history"),
            MessagesPlaceholder(variable_name="agent_scratchpad")
        ])

        logger.info(f"混合记忆 Agent '{self.name}' 初始化完成")

    def store_memory(self, content: str, memory_type: MemoryType, importance: float = 1.0):
        """
        存储记忆到所有记忆层

        Args:
            content: 记忆内容
            memory_type: 记忆类型
            importance: 重要性
        """
        item = MemoryItem(
            content=content,
            timestamp=time.time(),
            importance=importance,
            memory_type=memory_type
        )

        # 存储到所有记忆层
        self.cache_memory.store(item)
        self.vector_db_memory.store(item)
        self.graph_memory.store(item)

        logger.info(f"记忆已存储到所有记忆层：{content[:30]}...")

    def retrieve_memory(self, query: str, top_k: int = 5) -> List[MemoryItem]:
        """
        从所有记忆层检索记忆

        Args:
            query: 查询
            top_k: 返回前 top_k 个记忆

        Returns:
            检索到的记忆列表
        """
        # 从各个记忆层检索
        cache_results = self.cache_memory.retrieve(query, top_k)
        vector_db_results = self.vector_db_memory.retrieve(query, top_k)
        graph_results = self.graph_memory.retrieve(query, top_k)

        # 合并所有结果
        all_results = cache_results + vector_db_results + graph_results

        # 去重（简化实现）
        seen = set()
        unique_results = []
        for item in all_results:
            if item.content not in seen:
                seen.add(item.content)
                unique_results.append(item)

        logger.info(f"从所有记忆层检索到 {len(unique_results)} 个唯一记忆")

        # 按重要性排序
        unique_results.sort(key=lambda x: x.importance, reverse=True)

        # 返回 top_k 个记忆
        return unique_results[:top_k]

    def generate_response(self, user_input: str) -> str:
        """
        生成响应

        Args:
            user_input: 用户输入

        Returns:
            Agent 响应
        """
        # 检索相关记忆
        memories = self.retrieve_memory(user_input, top_k=3)

        # 构建记忆上下文
        memory_context = "\n".join([
            f"- {mem.content}" for mem in memories
        ])

        # 构建完整输入
        full_input = f"""
        用户输入：{user_input}

        相关记忆：
        {memory_context}

        请基于用户输入和相关记忆生成响应。
        """

        # 记忆
        self.conversation_memory.save_context({"input": user_input})

        # 生成响应
        try:
            response = self.llm.invoke(full_input)
            content = response.content

            # 存储新的记忆
            self.store_memory(
                content=content,
                memory_type=MemoryType.CACHE,  # 默认使用缓存记忆
                importance=1.0
            )

            return content

        except Exception as e:
            logger.error(f"生成响应失败：{str(e)}")
            return "抱歉，我遇到了一个错误。"

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
    # 创建混合记忆 Agent
    agent = HybridMemoryAgent(
        name="HybridMemoryAgent",
        model="gpt-4"
    )

    # 对话示例
    print("="*60)
    print("混合记忆 Agent 对话示例")
    print("="*60)

    agent.chat("你好，我是小明")
    agent.chat("我喜欢编程和人工智能")
    agent.chat("你能介绍一下自己吗？")
    agent.chat("什么是机器学习？")
    agent.chat("什么是深度学习？")

if __name__ == "__main__":
    main()
```

---

## 5.2 Agent 记忆增强技术

### 5.2.1 RAG（Retrieval-Augmented Generation）

RAG（检索增强生成）是一种将检索和生成结合的技术，通过从外部知识库检索相关信息，增强生成的准确性和可靠性。

#### RAG 的定义

RAG 是一种将检索和生成结合的技术，通过从外部知识库（如向量数据库、知识图谱）检索相关信息，然后使用 LLM 基于检索的上下文生成回答。

**学术定义**（来源：最新研究）

- **VentureBeat（2025）**：向量数据库不再只是炒作对象，而是多流程架构中的关键构建模块。
- **DataNucleus（2026）**：RAG（检索增强生成）：从向量数据库中获取前 K 个候选，使用语义或混合（关键词 + 向量）搜索。重排序：使用交叉编码器或重排序器对检索结果进行重排序。生成：基于检索的上下文和原始查询，使用 LLM 生成答案。
- **Pinecone（2025）**：Agent 可以跨多个生成步骤进行推理，制定计划以访问存储在数据库中的缺失信息，并运行多个查询以告知决策或生成报告。

**工程定义**

在实际工程中，RAG 包括：

1. **文档加载**：加载和分块文档
2. **向量化**：将文本块向量化
3. **向量存储**：存储向量到向量数据库
4. **检索**：基于向量相似性检索相关文档块
5. **重排序**：重排序检索结果
6. **生成**：基于检索的上下文生成答案

#### RAG 的核心流程

**1. 文档加载和分块**

加载文档并分块为适合检索的块。

**2. 向量化**

使用嵌入模型将文本块向量化。

**3. 向量存储**

将向量存储到向量数据库中。

**4. 检索**

基于向量相似性检索前 K 个相关文档块。

**5. 重排序**

使用重排序模型对检索结果进行精确重排序。

**6. 生成**

基于检索的上下文和原始查询生成答案。

#### RAG 的优势与劣势

| 优势 | 劣势 |
|------|------|
| 答案准确、有依据 | 检索成本高 |
| 可扩展性强 | 向量化计算成本高 |
| 支持大规模知识库 | 需要维护向量数据库 |

### 5.2.2 Graph RAG

Graph RAG 是一种结合知识图谱和 RAG 的技术，通过将知识图谱作为知识库，增强 RAG 的推理能力和知识关联性。

#### Graph RAG 的定义

Graph RAG 是一种结合知识图谱和 RAG 的技术，通过将知识图谱作为知识库，增强 RAG 的推理能力和知识关联性，支持复杂的多跳推理。

**学术定义**（来源：最新研究）

- **DataNucleus（2026）**：Graph RAG（检索增强生成）使用知识图谱连接信息，支持复杂推理和查询。

**工程定义**

在实际工程中，Graph RAG 包括：

1. **知识图谱构建**：构建实体和关系的知识图谱
2. **图嵌入**：将图结构向量化
3. **图检索**：基于图嵌入和图结构进行检索
4. **图推理**：基于图结构进行推理
5. **多跳推理**：进行多跳推理
6. **生成**：基于检索的上下文生成答案

#### Graph RAG 的核心流程

**1. 知识图谱构建**

构建实体和关系的知识图谱。

**2. 图嵌入**

将图结构向量化。

**3. 图检索**

基于图嵌入和图结构检索相关实体和关系。

**4. 图推理**

基于图结构进行推理，支持多跳推理。

**5. 生成**

基于检索的上下文生成答案。

#### Graph RAG 的优势与劣势

| 优势 | 劣势 |
|------|------|
| 支持复杂推理 | 图构建复杂 |
| 知识关联性强 | 图查询成本高 |
| 支持多跳推理 | 图嵌入训练成本高 |

### 5.2.3 记忆架构对比表

| 记忆技术 | 核心特点 | 优势 | 劣势 | 适用场景 |
|----------|----------|------|------|----------|
| **RAG** | 检索增强生成 | 答案准确、有依据 | 检索成本高 | 大规模知识库 |
| **Graph RAG** | 知识图谱 RAG | 支持复杂推理、知识关联 | 图构建复杂 | 复杂知识、多跳推理 |

### 5.2.4 RAG Agent 代码示例

以下代码示例展示如何实现一个简单的 RAG Agent：

```python
"""
RAG Agent 示例

这个示例展示如何实现一个简单的 RAG（检索增强生成）Agent。
"""

import os
import logging
from typing import Dict, Any, List
from dataclasses import dataclass
from abc import ABC, abstractmethod

import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.memory import ConversationBufferMemory
from langchain.schema import BaseMessage

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@dataclass
class Document:
    """文档"""
    content: str
    embedding: np.ndarray
    metadata: Dict[str, Any]

class EmbeddingModel:
    """嵌入模型"""

    def __init__(self, dimension: int = 768):
        self.dimension = dimension

    def encode(self, text: str) -> np.ndarray:
        """
        编码文本为向量

        Args:
            text: 文本

        Returns:
            向量
        """
        # 简化实现：使用 hash 模拟嵌入
        # 在实际应用中，应该使用真实的嵌入模型（如 OpenAI Embeddings）
        words = text.split()[:self.dimension]
        embedding = np.array([hash(word) % 1000 / 1000.0 for word in words])
        return embedding

class VectorStore:
    """向量存储"""

    def __init__(self, embedding_model: EmbeddingModel):
        self.embedding_model = embedding_model
        self.documents = []

    def add_document(self, content: str, metadata: Dict[str, Any] = None):
        """
        添加文档

        Args:
            content: 文档内容
            metadata: 元数据
        """
        # 向量化文档
        embedding = self.embedding_model.encode(content)

        # 存储文档
        document = Document(
            content=content,
            embedding=embedding,
            metadata=metadata or {}
        )

        self.documents.append(document)
        logger.info(f"添加文档：{content[:30]}...")

    def search(self, query: str, top_k: int = 3) -> List[Document]:
        """
        搜索文档

        Args:
            query: 查询
            top_k: 返回前 top_k 个最相似的文档

        Returns:
            最相似的文档列表
        """
        # 向量化查询
        query_embedding = self.embedding_model.encode(query)

        # 计算余弦相似度
        embeddings = np.array([doc.embedding for doc in self.documents])
        similarities = cosine_similarity([query_embedding], embeddings)[0]

        # 获取 top_k 个最相似的文档索引
        top_k_indices = similarities.argsort()[-top_k:][::-1]

        # 返回 top_k 个最相似的文档
        top_documents = [self.documents[i] for i in top_k_indices]

        logger.info(f"搜索到 {len(top_documents)} 个相关文档")

        return top_documents

class RAGAgent:
    """RAG Agent"""

    def __init__(
        self,
        name: str,
        model: str = "gpt-4"
    ):
        """
        初始化 RAG Agent

        Args:
            name: Agent 名称
            model: LLM 模型名称
        """
        self.name = name

        # 初始化 LLM
        self.llm = ChatOpenAI(model=model, temperature=0.0)

        # 初始化嵌入模型
        self.embedding_model = EmbeddingModel(dimension=768)

        # 初始化向量存储
        self.vector_store = VectorStore(self.embedding_model)

        # 初始化对话记忆
        self.conversation_memory = ConversationBufferMemory(
            memory_key="chat_history",
            return_messages=True
        )

        # 初始化提示词模板
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", f"你是一个有用的助手，名为 {self.name}，可以使用检索到的信息回答问题。"),
            ("user", "{input}"),
            MessagesPlaceholder(variable_name="chat_history"),
            MessagesPlaceholder(variable_name="agent_scratchpad")
        ])

        logger.info(f"RAG Agent '{self.name}' 初始化完成")

    def add_document(self, content: str, metadata: Dict[str, Any] = None):
        """
        添加文档到向量存储

        Args:
            content: 文档内容
            metadata: 元数据
        """
        self.vector_store.add_document(content, metadata)

    def generate_response(self, user_input: str, top_k: int = 3) -> str:
        """
        生成响应

        Args:
            user_input: 用户输入
            top_k: 检索前 top_k 个文档

        Returns:
            Agent 响应
        """
        # 检索相关文档
        retrieved_docs = self.vector_store.search(user_input, top_k)

        # 构建检索上下文
        context = "\n".join([
            f"文档{i+1}: {doc.content}\n元数据: {doc.metadata}"
            for i, doc in enumerate(retrieved_docs)
        ])

        # 构建完整输入
        full_input = f"""
        用户输入：{user_input}

        检索到的文档：
        {context}

        请基于用户输入和检索到的文档生成响应。
        """

        # 记忆
        self.conversation_memory.save_context({"input": user_input})

        # 生成响应
        try:
            response = self.llm.invoke(full_input)
            return response.content

        except Exception as e:
            logger.error(f"生成响应失败：{str(e)}")
            return "抱歉，我遇到了一个错误。"

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
    # 创建 RAG Agent
    agent = RAGAgent(
        name="RAGAgent",
        model="gpt-4"
    )

    # 添加文档
    agent.add_document("人工智能是计算机科学的一个分支", {"source": "wiki"})
    agent.add_document("机器学习是人工智能的一个子集", {"source": "wiki"})
    agent.add_document("深度学习是机器学习的一个子集", {"source": "wiki"})
    agent.add_document("强化学习是机器学习的一个子集", {"source": "wiki"})

    # 对话示例
    print("="*60)
    print("RAG Agent 对话示例")
    print("="*60)

    agent.chat("什么是人工智能？")
    agent.chat("机器学习和深度学习有什么区别？")
    agent.chat("什么是强化学习？")

if __name__ == "__main__":
    main()
```

---

## 5.3 Agent 持续学习能力

### 5.3.1 强化学习 Agent（RL Agent）

强化学习 Agent 是一种通过强化学习算法（如 Q-Learning、PPO、DQN）优化决策策略的 Agent，能够通过与环境的交互不断学习和改进。

#### RL Agent 的定义

RL Agent 是一种通过强化学习算法优化决策策略的 Agent，通过与环境的交互（如获得奖励或惩罚），不断学习和改进策略，以最大化累积奖励。

**学术定义**（来源：最新研究）

- **arXiv（2025）**：Agent Lightning: Train ANY AI Agents with Reinforcement Learning。作者：Xufang Luo 等人。
- **Microsoft Research（2025）**：Agent Lightning: Adding reinforcement learning to AI agents without code rewrites。通过将 Agent 的工作方式与其训练方式解耦，Agent Lightning 将 Agent 的每一步转化为强化学习数据，使开发者能够几乎无需代码更改就改进 Agent 的性能。

**工程定义**

在实际工程中，RL Agent 包括：

1. **环境**：Agent 与之交互的环境
2. **状态空间**：环境的可观测状态
3. **动作空间**：Agent 可执行的动作
4. **奖励函数**：定义 Agent 目标的奖励函数
5. **策略网络**：Agent 的决策网络（如神经网络）
6. **学习算法**：强化学习算法（如 Q-Learning、PPO、DQN）
7. **经验回放**：存储和重放经验

#### RL Agent 的核心机制

**1. 环境交互**

Agent 在环境中执行动作，获得奖励和新状态。

**2. 经验收集**

Agent 收集状态、动作、奖励的经验。

**3. 策略更新**

根据收集的经验更新策略网络。

**4. 策略评估**

评估策略的性能，决定是否需要继续训练。

#### RL Agent 的优势与劣势

| 优势 | 劣势 |
|------|------|
| 能自主学习并改进策略 | 训练成本高 |
| 能适应动态环境 | 需要设计奖励函数 |
| 能解决复杂决策问题 | 可能收敛到次优策略 |

### 5.3.2 持续学习与在线学习

持续学习和在线学习是指 Agent 在运行过程中不断学习和更新模型，而不需要离线训练，能够快速适应环境的变化。

#### 持续学习的定义

持续学习和在线学习是指 Agent 在运行过程中不断学习和更新模型，不需要离线训练，能够快速适应环境的变化。

**学术定义**（来源：最新研究）

- **Medium（2025）**：RL for AI Agents: The future of autonomy is Reinforcement...。策略更新：Agent 使用反馈（如 Q-learning、PPO、DQN 或策略梯度）更新策略，具体取决于架构。

**工程定义**

在实际工程中，持续学习包括：

1. **在线数据收集**：在运行过程中收集数据
2. **增量训练**：基于新数据增量更新模型
3. **模型更新**：定期更新模型参数
4. **A/B 测试**：使用 A/B 测试验证新模型
5. **回滚机制**：支持模型回滚

#### 持续学习的核心机制

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

#### 持续学习的优势与劣势

| 优势 | 劣势 |
|------|------|
| 能快速适应环境变化 | 模型更新成本高 |
| 不需要离线训练 | 可能出现漂移 |
| 支持实时学习 | 需要设计增量学习算法 |

### 5.3.3 学习架构对比表

| 学习类型 | 核心特点 | 优势 | 劣势 | 适用场景 |
|----------|----------|------|------|----------|
| **RL Agent** | 强化学习、策略优化 | 能自主学习、适应动态环境 | 训练成本高 | 复杂决策、动态环境 |
| **持续学习** | 在线学习、增量更新 | 快速适应、实时学习 | 模型更新成本高 | 动态环境、实时需求 |

### 5.3.4 RL Agent 代码示例

以下代码示例展示如何实现一个简单的 RL Agent：

```python
"""
RL Agent 示例

这个示例展示如何实现一个简单的 Q-Learning Agent。
"""

import numpy as np
import logging
from typing import Dict, Any, List, Tuple
from dataclasses import dataclass
from enum import Enum
import time

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class ActionType(Enum):
    """动作类型"""
    LEFT = "left"
    RIGHT = "right"
    UP = "up"
    DOWN = "down"

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
        self.current_state = State(x=0, y=0)

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
        if action == ActionType.LEFT:
            self.current_state.y = max(0, self.current_state.y - 1)
        elif action == ActionType.RIGHT:
            self.current_state.y = min(self.height - 1, self.current_state.y + 1)
        elif action == ActionType.UP:
            self.current_state.x = max(0, self.current_state.x - 1)
        elif action == ActionType.DOWN:
            self.current_state.x = min(self.width - 1, self.current_state.x + 1)

        # 检查是否到达目标
        done = (self.current_state == self.goal_state)

        # 检查是否遇到障碍物
        if self.current_state in self.obstacles:
            # 惩罚：回到旧状态
            self.current_state = old_state
            reward = -1.0
            done = False
        elif done:
            # 奖励：到达目标
            reward = 100.0
        else:
            # 奖励：接近目标
            old_distance = abs(old_state.x - self.goal_state.x) + abs(old_state.y - self.goal_state.y)
            new_distance = abs(self.current_state.x - self.goal_state.x) + abs(self.current_state.y - self.goal_state.y)
            reward = (old_distance - new_distance) * 10.0

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
        self.state_space_size = state_space_size
        self.action_space_size = action_space_size
        self.learning_rate = learning_rate
        self.discount_factor = discount_factor
        self.epsilon = epsilon
        self.epsilon_decay = epsilon_decay

        # 初始化 Q 表
        self.q_table = np.zeros((state_space_size, action_space_size))

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

if __name__ == "__main__":
    main()
```

---

## 小结（第五章全部完成）

本章详细介绍了 AI Agent 的进阶主题，包括 Agent 进阶架构、记忆增强技术和持续学习能力，帮助开发者构建更加智能和强大的 Agent 系统。

**Agent 进阶架构**

- **记忆增强 Agent**：MemGPT、VectorDB、Graph Memory、混合记忆
- **记忆增强技术**：RAG、Graph RAG
- **持续学习能力**：RL Agent、持续学习与在线学习

---

_文档版本：v1.0_
_最后更新：2026-03-17_
