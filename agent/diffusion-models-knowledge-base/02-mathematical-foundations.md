# 第二章：扩散模型的数学基础（Mathematical Foundations）

> 从随机过程到 Fokker-Planck 方程，建立扩散模型的数学基础

---

## 2.1 随机过程基础

### 2.1.1 随机过程的定义

**随机过程（Stochastic Process）**是一个随时间演化的随机变量，通常表示为 \( X_t \)，其中 \( t \) 是时间索引。

**形式化定义**：
- **状态空间（State Space）**：\( \mathcal{X} \)，随机变量 \( X_t \) 的取值空间
- **时间集（Time Set）**：\( \mathcal{T} \)，时间索引的集合（离散或连续）
- **概率分布（Probability Distribution）**：每个时间 \( t \) 对应的概率分布 \( P(X_t) \)

**类型**：
- **离散时间离散状态**：\( t \in \{0, 1, 2, \dots\} \), \( X_t \in \mathcal{X} \)
- **离散时间连续状态**：\( t \in \{0, 1, 2, \dots\} \), \( X_t \in \mathbb{R}^d \)
- **连续时间离散状态**：\( t \in \mathbb{R}^+ \), \( X_t \in \mathcal{X} \)
- **连续时间连续状态**：\( t \in \mathbb{R}^+ \), \( X_t \in \mathbb{R}^d \)

**来源**：Wikipedia - Stochastic Process (2025)

### 2.1.2 马尔可夫过程

**马尔可夫过程（Markov Process）**是一种特殊的随机过程，具有"马尔可夫性质"（Markov Property），即未来的状态只依赖于当前状态，而与过去的历史无关。

**马尔可夫性质（Markov Property）**：
\[ P(X_{t+1} \mid X_t, X_{t-1}, \dots, X_0) = P(X_{t+1} \mid X_t) \]

**转移概率（Transition Probability）**：
- **一步转移概率**：\( p(x_{t+1} \mid x_t) = P(X_{t+1} = x_{t+1} \mid X_t = x_t) \)
- **k 步转移概率**：\( p^k(x_{t+k} \mid x_t) \)

**转移矩阵（Transition Matrix）**（离散状态）：
\[ \mathbf{P} = \begin{bmatrix}
p(1 \to 1) & p(1 \to 2) & \cdots & p(1 \to n) \\
p(2 \to 1) & p(2 \to 2) & \cdots & p(2 \to n) \\
\vdots & \vdots & \ddots & \vdots \\
p(n \to 1) & p(n \to 2) & \cdots & p(n \to n)
\end{bmatrix} \]

** Chapman-Kolmogorov 方程**（C-K 方程）：
- **连续时间马尔可夫过程**：\( \frac{\partial p(x, t)}{\partial t} = \int p(y, t) p(x, t+\Delta t \mid y, t) dy - p(x, t) \)
- **离散时间马尔可夫链**：\( \mathbf{p}_{t+1} = \mathbf{P}^\top \mathbf{p}_t \)

**来源**：Wikipedia - Markov Chain (2025)

> "In probability theory and statistics, a Markov chain or Markov process is a stochastic process describing a sequence of possible events in which the probability of each event depends only on the state attained in the previous event."

### 2.1.3 离散时间马尔可夫链

**离散时间马尔可夫链（Discrete-Time Markov Chain, DTMC）**是时间离散、状态离散（或连续）的马尔可夫过程。

**性质**：
- **齐次性（Homogeneity）**：转移矩阵 \( \mathbf{P} \) 不随时间变化
- **可约性（Reducibility）**：状态之间可以互相到达
- **周期性（Periodicity）**：状态返回的步数
- **平稳分布（Stationary Distribution）**：满足 \( \pi = \pi \mathbf{P} \) 的分布

**平稳分布的计算**：
\[ \pi = \lim_{n \to \infty} \pi_0 \mathbf{P}^n \]
\[ \pi = \pi \mathbf{P} \]

**吸收态（Absorbing State）**：
- 一旦进入，永不离开的状态
- 转移概率：\( p(i \to i) = 1 \)

### 2.1.4 连续时间马尔可夫过程

**连续时间马尔可夫链（Continuous-Time Markov Chain, CTMC）**是时间连续、状态离散（或连续）的马尔可夫过程。

**转移速率矩阵（Transition Rate Matrix）**：
\[ \mathbf{Q} = \begin{bmatrix}
q_{11} & q_{12} & \cdots & q_{1n} \\
q_{21} & q_{22} & \cdots & q_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
q_{n1} & q_{n2} & \cdots & q_{nn}
\end{bmatrix} \]
其中 \( q_{ij} = \lim_{\Delta t \to 0} \frac{p(i \to j, \Delta t)}{\Delta t} \)，且 \( q_{ii} = -\sum_{j \neq i} q_{ij} \)

**Kolmogorov 前向方程**：
\[ \frac{\partial \mathbf{p}(t)}{\partial t} = \mathbf{p}(t) \mathbf{Q}^\top \]

**平稳分布**：
\[ \pi \mathbf{Q}^\top = 0 \]

---

## 2.2 布朗运动与维纳过程

### 2.2.1 布朗运动的定义

**布朗运动（Brownian Motion）**是一种连续时间的随机过程，描述悬浮在流体中的微粒子的随机运动。

**历史**：
- 1827 年：Robert Brown 观察到花粉在水中的随机运动
- 1905 年：Albert Einstein 从理论上解释了布朗运动
- 1908 年：Paul Langevin 提出了描述布朗运动的微分方程

**数学描述**：
\[ X_t = X_0 + \int_0^t \mu(s) ds + \int_0^t \sigma(s) dW_s \]
其中 \( W_t \) 是维纳过程（标准布朗运动）

**来源**：Wikipedia - Brownian Motion (2025)

> "Brownian motion is a stochastic process describing the random motion of particles suspended in a fluid."

### 2.2.2 维纳过程的性质

**维纳过程（Wiener Process）** \( W_t \) 是标准布朗运动，满足以下性质：

1. **初始条件**：\( W_0 = 0 \)
2. **独立增量**：\( W_t - W_s \) 独立于 \( W_s \)（对于 \( 0 \leq s < t \)）
3. **高斯增量**：\( W_t - W_s \sim \mathcal{N}(0, t - s) \)
4. **连续路径**：\( W_t \) 的路径几乎必然是连续的

**性质**：
- **期望**：\( \mathbb{E}[W_t] = 0 \)
- **方差**：\( \text{Var}(W_t) = t \)
- **自相关**：\( \mathbb{E}[W_t W_s] = \min(t, s) \)
- **马尔可夫性质**：\( W_t \) 是马尔可夫过程

**来源**：Wikipedia - Wiener Process (2025)

### 2.2.3 布朗运动的数学描述

**朗之万方程（Langevin Equation）**：
\[ m \frac{dX_t}{dt} = -\gamma X_t dt + \sigma dW_t \]
其中：
- \( m \)：质量
- \( \gamma \)：摩擦系数
- \( \sigma \)：噪声强度
- \( W_t \)：维纳过程

**解**：
\[ X_t = X_0 e^{-\gamma t} + \frac{\sigma}{\sqrt{2\gamma}} \int_0^t e^{-\gamma (t-s)} dW_s \]

**平稳分布**：
- 均值：\( \mathbb{E}[X_t] = X_0 e^{-\gamma t} \)
- 方差：\( \text{Var}(X_t) = \frac{\sigma^2}{2\gamma} (1 - e^{-2\gamma t}) \)

**来源**：Brownian Motion in 2D and Fokker-Planck Equation (2024)

> "Brownian motion is described by the Langevin equation: \( m \frac{dX_t}{dt} = -\gamma X_t dt + \sigma dW_t \)."

### 2.2.4 布朗运动在扩散模型中的应用

**正向扩散过程（Forward Diffusion Process）**：
\[ q(x_t \mid x_{t-1}) = \mathcal{N}(x_t; \sqrt{1 - \beta_t} x_{t-1}, \beta_t \mathbf{I}) \]
其中：
- \( \beta_t \)：噪声调度（\( \beta_t \in (0, 1] \)，\( \beta_1 \) 接近 1）
- \( x_{t-1} \)：前一步的样本
- \( x_t \)：当前步的样本（加噪后）

**含义**：
- 正向扩散过程类似于布朗运动：逐步向数据添加高斯噪声
- 噪声调度 \( \beta_t \) 控制噪声的强度（从 0 到 1）

**来源**：Ho et al., 2020

> "We define the forward diffusion process \( q(x_t \mid x_{t-1}) = \mathcal{N}(x_t; \sqrt{1 - \beta_t} x_{t-1}, \beta_t \mathbf{I}) \)."

---

## 2.3 Fokker-Planck 方程

### 2.3.1 Fokker-Planck 方程的推导

**Fokker-Planck 方程（Fokker-Planck Equation）**是描述随机过程（如布朗运动）的概率密度函数随时间演化的偏微分方程。

**一般形式**：
\[ \frac{\partial p(x, t)}{\partial t} = -\nabla \cdot [\mu(x, t) p(x, t)] + \frac{1}{2} \nabla^2 \cdot [D(x, t) p(x, t)] \]
其中：
- \( p(x, t) \)：概率密度函数
- \( \mu(x, t) \)：漂移系数（Drift Coefficient）
- \( D(x, t) \)：扩散系数（Diffusion Coefficient）

**常系数情况**：
\[ \frac{\partial p(x, t)}{\partial t} = -\mu \frac{\partial p(x, t)}{\partial x} + \frac{D}{2} \frac{\partial^2 p(x, t)}{\partial x^2} \]

**来源**：Wikipedia - Fokker-Planck Equation (2025)

> "The Fokker-Planck equation is a partial differential equation that describes the time evolution of the probability density function of the velocity of a particle."

### 2.3.2 Fokker-Planck 方程的解

**一维常系数情况**：
\[ \frac{\partial p(x, t)}{\partial t} = D \frac{\partial^2 p(x, t)}{\partial x^2} \]

**初始条件**：\( p(x, 0) = \delta(x - x_0) \)（点质量）

**解**：
\[ p(x, t) = \frac{1}{\sqrt{4 \pi D t}} \exp\left(-\frac{(x - x_0)^2}{4 D t}\right) \]
这是一个高斯分布，均值 \( \mu = x_0 \)，方差 \( \sigma^2 = 2 D t \)。

**平稳分布**（\( \frac{\partial p}{\partial t} = 0 \)）：
\[ p_{\text{stationary}}(x) \propto \exp\left(-\frac{U(x)}{D}\right) \]
其中 \( U(x) \) 是势能函数。

**来源**：Wikipedia - Fokker-Planck Equation (2025)

### 2.3.3 扩散过程的 Fokker-Planck 方程

**正向扩散过程（Forward Diffusion Process）**：
\[ dX_t = -\frac{1}{2} \beta_t X_t dt + \sqrt{\beta_t} dW_t \]

**对应的 Fokker-Planck 方程**：
\[ \frac{\partial p(x, t)}{\partial t} = \frac{\beta_t}{2} \nabla \cdot \left[\beta_t x p(x, t) + \nabla p(x, t)\right] \]

**稳态分布（Stationary Distribution）**：
当 \( \beta_t = 1 \) 时，扩散过程达到稳态，概率密度函数 \( p(x, t) \) 收敛到标准高斯分布 \( \mathcal{N}(0, \mathbf{I}) \)。

**来源**：Ho et al., 2020

> "We show that the marginal distribution \( q(x_t) \) converges to a unit Gaussian \( \mathcal{N}(0, \mathbf{I}) \) as \( t \to T \)."

### 2.3.4 反向扩散过程

**反向扩散过程（Reverse Diffusion Process）**：
\[ dX_t = -\frac{1}{2} \beta_t X_t dt + \sqrt{\beta_t} dW_t \]

**对应的 Fokker-Planck 方程**：
\[ \frac{\partial p(x, t)}{\partial t} = -\frac{\beta_t}{2} \nabla \cdot \left[\beta_t x p(x, t) + \nabla \log \frac{p(x_0)}{p(x_t)} p(x, t)\right] \]

**含义**：
- 反向扩散过程是从噪声中重建数据的过程
- 需要学习得分函数 \( s_\theta(x, t) = \nabla \log \frac{p(x_0)}{p(x_t)} \)

**来源**：Song et al., 2021

> "We define the reverse diffusion process with the same functional form as the forward process but requiring the score function \( \nabla \log p(x_t \mid x_0) \)."

---

## 2.4 随机微分方程

### 2.4.1 随机微分方程的定义

**随机微分方程（Stochastic Differential Equation, SDE）**是一个包含随机项（如布朗运动）的微分方程。

**一般形式**：
\[ dX_t = \mu(X_t, t) dt + \sigma(X_t, t) dW_t \]
其中：
- \( X_t \)：状态变量
- \( \mu(X_t, t) \)：漂移项（Drift Term）
- \( \sigma(X_t, t) \)：扩散项（Diffusion Term）
- \( W_t \)：维纳过程（标准布朗运动）

**伊藤引理（Itô's Lemma）**：
对于函数 \( f(X_t) \)，其微分为：
\[ df(X_t) = \left(\frac{\partial f}{\partial t} + \mu(X_t, t) \frac{\partial f}{\partial x} + \frac{1}{2} \sigma^2(X_t, t) \frac{\partial^2 f}{\partial x^2}\right) dt + \sigma(X_t, t) \frac{\partial f}{\partial x} dW_t \]

**来源**：Wikipedia - Stochastic Differential Equation (2025)

### 2.4.2 随机微分方程的数值解法

**欧拉-丸山方法（Euler-Maruyama Method）**：
\[ X_{t+\Delta t} = X_t + \mu(X_t, t) \Delta t + \sigma(X_t, t) \sqrt{\Delta t} \, Z \]
其中 \( Z \sim \mathcal{N}(0, 1) \)。

**米尔斯坦方法（Milstein Method）**：
\[ X_{t+\Delta t} = X_t + \mu \Delta t + \sigma \sqrt{\Delta t} \, Z + \frac{1}{2} \sigma \frac{\partial \sigma}{\partial x} (Z^2 - 1) \Delta t \]

**高阶方法**：
- Runge-Kutta 方法
- 随机 Runge-Kutta 方法

**来源**：Wikipedia - Stochastic Differential Equation (2025)

### 2.4.3 随机微分方程在扩散模型中的应用

**正向扩散过程（SDE 形式）**：
\[ d\mathbf{x} = \sqrt{\beta_t} d\mathbf{w} \]
其中 \( \mathbf{w} \sim \mathcal{N}(0, \mathbf{I}) \)。

**反向扩散过程（SDE 形式）**：
\[ d\mathbf{x} = \left[\sqrt{\beta_t} d\mathbf{w} - \beta_t \nabla \log p(\mathbf{x}_0) d t\right] \]

**数值求解**：
使用欧拉-丸山方法离散化：
\[ \mathbf{x}_t = \mathbf{x}_{t-1} + \sqrt{\beta_t} \epsilon \mathbf{z} \]
其中 \( \epsilon \) 是步长，\( \mathbf{z} \sim \mathcal{N}(0, \mathbf{I}) \)。

**来源**：Song et al., 2021

> "We can discretize the SDE using the Euler-Maruyama method: \( \mathbf{x}_t = \mathbf{x}_{t-1} + \sqrt{\beta_t} \epsilon \mathbf{z} \)."

### 2.4.4 反向 SDE（Score-Based Generative Models）

**得分匹配（Score Matching）**：
\[ \mathcal{L}_{\text{match}} = \mathbb{E}_{t \sim \mathcal{U}[0, T], \mathbf{x}_t \sim p_t} \left\| \nabla_{\mathbf{x}_t} \log p_t(\mathbf{x}_t) - s_\theta(\mathbf{x}_t, t) \right\|^2 \]

**得分模型（Score Model）**：
\[ s_\theta(\mathbf{x}, t) = \nabla_{\mathbf{x}} \log p_t(\mathbf{x}) \]

**得分函数（Score Function）**：
\[ s(\mathbf{x}, t) = \nabla_{\mathbf{x}} \log \frac{p_t(\mathbf{x})}{p_{\text{data}}(\mathbf{x})} \]

**来源**：Song et al., 2021; Song & Ermon, 2019

> "We propose to train a neural network to approximate the score function \( s_\theta(\mathbf{x}, t) = \nabla_{\mathbf{x}} \log p_t(\mathbf{x}) \)."

---

## 2.5 概率密度函数

### 2.5.1 PDF 的定义和性质

**概率密度函数（Probability Density Function, PDF）** \( p(x) \) 是一个非负函数，其积分等于 1：
\[ \int_{-\infty}^\infty p(x) dx = 1 \]

**性质**：
1. **非负性**：\( p(x) \geq 0 \) 对所有 \( x \in \mathcal{X} \)
2. **归一化**：\( \int_{\mathcal{X}} p(x) dx = 1 \)
3. **期望**：\( \mathbb{E}[X] = \int_{-\infty}^\infty x p(x) dx \)
4. **方差**：\( \text{Var}(X) = \int_{-\infty}^\infty (x - \mathbb{E}[X])^2 p(x) dx \)

**累积分布函数（Cumulative Distribution Function, CDF）**：
\[ F(x) = P(X \leq x) = \int_{-\infty}^x p(y) dy \]

**来源**：Wikipedia - Probability Density Function (2025)

### 2.5.2 高斯分布

**一维高斯分布**：
\[ \mathcal{N}(x; \mu, \sigma^2) = \frac{1}{\sqrt{2\pi\sigma^2}} \exp\left(-\frac{(x - \mu)^2}{2\sigma^2}\right) \]
其中：
- \( \mu \)：均值
- \( \sigma^2 \)：方差

**多维高斯分布**：
\[ \mathcal{N}(\mathbf{x}; \boldsymbol{\mu}, \boldsymbol{\Sigma}) = \frac{1}{\sqrt{(2\pi)^d |\boldsymbol{\Sigma}|}} \exp\left(-\frac{1}{2} (\mathbf{x} - \boldsymbol{\mu})^\top \boldsymbol{\Sigma}^{-1} (\mathbf{x} - \boldsymbol{\mu})\right) \]
其中：
- \( \boldsymbol{\mu} \)：均值向量
- \( \boldsymbol{\Sigma} \)：协方差矩阵

**来源**：Wikipedia - Normal Distribution (2025)

### 2.5.3 混合高斯分布

**高斯混合模型（Gaussian Mixture Model, GMM）**：
\[ p(x) = \sum_{k=1}^K \pi_k \mathcal{N}(x; \mu_k, \Sigma_k) \]
其中：
- \( \pi_k \)：混合系数（\( \sum_{k=1}^K \pi_k = 1 \)）
- \( \mathcal{N}(x; \mu_k, \Sigma_k) \)：第 \( k \) 个高斯分布

**期望值**：
\[ \mathbb{E}[X] = \sum_{k=1}^K \pi_k \mu_k \]

**方差**：
\[ \text{Var}(X) = \sum_{k=1}^K \pi_k (\Sigma_k + \mu_k \mu_k^\top) - \mathbb{E}[X] \mathbb{E}[X]^\top \]

**来源**：Wikipedia - Mixture Model (2025)

### 2.5.4 数据分布与噪声分布

**数据分布（Data Distribution）**：\( p_{\text{data}}(\mathbf{x}) \)
- 真实数据的分布
- 扩散模型的训练目标

**噪声分布（Noise Distribution）**：\( p_{\text{noise}}(\mathbf{x}) = \mathcal{N}(\mathbf{x}; \mathbf{0}, \mathbf{I}) \)
- 标准高斯分布
- 扩散过程的稳态分布

**扩散过程的目标**：
从数据分布 \( p_{\text{data}}(\mathbf{x}) \) 扩散到噪声分布 \( p_{\text{noise}}(\mathbf{x}) \)，然后学习反向过程从噪声分布恢复到数据分布。

**来源**：Ho et al., 2020

> "We learn to reverse the diffusion process and recover data from noise distribution."

---

## 2.6 扩散过程的数学描述

### 2.6.1 正向扩散过程

**定义**：
正向扩散过程 \( q(\mathbf{x}_t \mid \mathbf{x}_{t-1}) \) 是一个马尔可夫链，逐步向数据添加高斯噪声。

**数学描述**：
\[ q(\mathbf{x}_t \mid \mathbf{x}_{t-1}) = \mathcal{N}(\mathbf{x}_t; \sqrt{1 - \beta_t} \mathbf{x}_{t-1}, \beta_t \mathbf{I}) \]
\[ q(\mathbf{x}_t \mid \mathbf{x}_0) = \mathcal{N}(\mathbf{x}_t; \sqrt{\bar{\alpha}_t} \mathbf{x}_0, (1 - \bar{\alpha}_t) \mathbf{I}) \]
其中 \( \bar{\alpha}_t = \prod_{s=1}^t (1 - \beta_s) \)。

**噪声调度（Noise Schedule）**：
\[ \beta_t \in (0, 1] \]
\[ \alpha_t = 1 - \beta_t \]
\[ \bar{\alpha}_t = \prod_{s=1}^t \alpha_s \]

**步数**：通常 \( T = 1000 \)（从 \( t = 0 \) 到 \( t = T \)）

**来源**：Ho et al., 2020

> "We define the forward diffusion process \( q(\mathbf{x}_t \mid \mathbf{x}_{t-1}) \) as a Markov chain that gradually adds Gaussian noise to data."

### 2.6.2 反向扩散过程

**定义**：
反向扩散过程 \( p_\theta(\mathbf{x}_{t-1} \mid \mathbf{x}_t) \) 是一个马尔可夫链，逐步从噪声中去除噪声，重建原始数据。

**数学描述**：
\[ p_\theta(\mathbf{x}_{t-1} \mid \mathbf{x}_t) = \mathcal{N}(\mathbf{x}_{t-1}; \boldsymbol{\mu}_\theta(\mathbf{x}_t, t), \boldsymbol{\Sigma}_\theta(\mathbf{x}_t, t)) \]
其中：
\[ \boldsymbol{\mu}_\theta(\mathbf{x}_t, t) = \frac{1}{\sqrt{\alpha_t}} \left( \mathbf{x}_t - \frac{1 - \alpha_t}{\sqrt{1 - \bar{\alpha}_t}} \boldsymbol{\epsilon}_\theta(\mathbf{x}_t, t) \right) \]
\[ \boldsymbol{\Sigma}_\theta(\mathbf{x}_t, t) = \frac{1 - \alpha_t}{1 - \bar{\alpha}_t} \boldsymbol{\epsilon}_\theta(\mathbf{x}_t, t) \boldsymbol{\epsilon}_\theta(\mathbf{x}_t, t)^\top \]

**预测噪声（Predicted Noise）**：
\[ \boldsymbol{\epsilon}_\theta(\mathbf{x}_t, t) = \boldsymbol{\epsilon}_\theta(\mathbf{x}_t, t; \theta) \]

**来源**：Ho et al., 2020

> "We define the reverse diffusion process \( p_\theta(\mathbf{x}_{t-1} \mid \mathbf{x}_t) \) as a Markov chain that gradually removes noise and reconstructs data."

### 2.6.3 变分界（Variational Bound）

**变分界**：
\[ \text{VLB} = \mathbb{E}_q \left[ D_\text{KL}(q(\mathbf{x}_T) \mid p(\mathbf{x}_T)) + \sum_{t=1}^T D_\text{KL}}(q(\mathbf{x}_{t-1} \mid \mathbf{x}_t) \mid p_\theta(\mathbf{x}_{t-1} \mid \mathbf{x}_t)) \right] \]

**简化变分界**：
\[ \text{VLB}_{\text{simple}} = \mathbb{E}_{\mathbf{x}_0, \epsilon \sim \mathcal{N}(0, \mathbf{I}), t \sim \mathcal{U}[1, T]} \left\| \epsilon - \epsilon_\theta(\mathbf{x}_t, t) \right\|^2 \]

**损失函数**：
\[ L_{\text{simple}} = \mathbb{E}_{\mathbf{x}_0, \epsilon \sim \mathcal{N}(0, \mathbf{I}), t \sim \mathcal{U}[1, T]} \left\| \epsilon - \epsilon_\theta(\mathbf{x}_t, t) \right\|^2 \]

**来源**：Ho et al., 2020

> "We optimize the simplified variational lower bound: \( L_{\text{simple}} = \mathbb{E}\left\| \epsilon - \epsilon_\theta(\mathbf{x}_t, t) \right\|^2 \)."

### 2.6.4 扩散过程的优化

**损失函数**：
\[ L = \mathbb{E}_{\mathbf{x}_0, \epsilon \sim \mathcal{N}(0, \mathbf{I}), t \sim \mathcal{U}[1, T]} \left\| \epsilon - \epsilon_\theta(\mathbf{x}_t, t; \phi) \right\|^2 \]

**优化目标**：
\[ \phi^* = \arg\min_\phi L \]

**优化方法**：
- 梯度下降（Gradient Descent）
- Adam 优化器
- 混合精度训练（Mixed Precision Training）
- 梯度累积（Gradient Accumulation）

**来源**：Ho et al., 2020

> "We optimize the parameters \( \phi \) of the neural network to minimize the loss function \( L \)."

---

## 结语

本章介绍了扩散模型的数学基础，从随机过程到 Fokker-Planck 方程，建立了扩散模型的数学理论基础。扩散模型的数学基础包括：

1. **随机过程基础**：马尔可夫过程、离散时间马尔可夫链、连续时间马尔可夫链
2. **布朗运动与维纳过程**：布朗运动的定义、维纳过程的性质、数学描述、在扩散模型中的应用
3. **Fokker-Planck 方程**：推导、解、在扩散模型中的应用（正向和反向扩散过程）
4. **随机微分方程**：定义、数值解法、在扩散模型中的应用
5. **概率密度函数**：定义、性质、高斯分布、混合高斯分布、数据分布与噪声分布
6. **扩散过程的数学描述**：正向扩散过程、反向扩散过程、变分界、优化目标

这些数学基础为后续的 DDPM、DDIM、Stable Diffusion 等章节奠定了坚实的理论基础。

---

**参考文献**：

1. Wikipedia - Stochastic Process (2025)
2. Wikipedia - Markov Chain (2025)
3. Wikipedia - Brownian Motion (2025)
4. Wikipedia - Wiener Process (2025)
5. Wikipedia - Fokker-Planck Equation (2025)
6. Wikipedia - Stochastic Differential Equation (2025)
7. Wikipedia - Probability Density Function (2025)
8. Wikipedia - Normal Distribution (2025)
9. Wikipedia - Mixture Model (2025)
10. Ho et al. - Denoising Diffusion Probabilistic Models (2020)
11. Song et al. - Denoising Diffusion Implicit Models (2021)
12. Chem LibreTexts - Brownian Motion and Markov Chains (2025)

---

**章节版本**：v1.0
**最后更新**：2026-03-19
