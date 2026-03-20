# Vinci Knowledge Base

将 `~/Documents/知识库/projects/` 下的知识库项目自动转换为前端静态网页，并通过 GitHub Pages 发布。

## 功能

- 自动扫描 `projects/` 下的全部项目目录
- 生成站点首页、项目页、知识文章页
- 渲染 Markdown 标题、表格、代码块、引用等内容
- 使用本地命令直接部署到 GitHub Pages

## 目录来源

默认读取本机目录：

```bash
~/Documents/知识库/projects
```

如需覆盖，可在运行前设置：

```bash
KB_SOURCE_DIR=/absolute/path/to/projects npm run dev
```

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## 部署到 GitHub Pages

1. 将仓库命名为 `<你的 GitHub 用户名>.github.io`
2. 配置远端仓库并确保你本机有推送权限
3. 在 GitHub 仓库设置中将 Pages Source 设为 `Deploy from a branch`
4. 选择 `gh-pages` 分支和 `/ (root)` 目录
5. 运行：

```bash
npm run deploy
```

默认会把静态产物同时发布到：

- `gh-pages`：推荐的 Pages 分支
- `master`：兼容当前仓库仍以 `master` 作为默认分支或 Pages 来源的情况

可选环境变量：

```bash
SITE_URL=https://superone77.github.io
GITHUB_REPOSITORY_URL=https://github.com/Superone77/Superone77.github.io.git
GH_PAGES_BRANCH=gh-pages
GITHUB_PAGES_CNAME=your.domain.com
```

## 发布范围

默认公开以下内容：

- 项目根目录 `README.md`
- `knowledge/*.md` 正文文件
- `agent/INDEX.md` 与 `agent/*.md` 的 agent 原始 Markdown 入口
- `STATUS.yaml` 元数据

默认不公开以下过程文件：

- `REVIEW.md`
- `SUBMISSION.md`
- `TASKS.md`
- `RESEARCH.md`
- `OUTLINE.md`

## Human / Agent 双入口

当前站点支持两套入口：

- Human：现有网页入口，继续使用 `knowledge/*.md`
- Agent：独立的 raw Markdown 入口，使用 `agent/*.md`

外部知识库项目目录约定：

```text
<project>/
  README.md
  knowledge/
    INDEX.md
    *.md
  agent/
    INDEX.md
    *.md
```

路由约定：

- Human 首页：`/`
- Human 项目：`/<project>/`
- Human 文档：`/<project>/<doc>/`
- Agent 首页：`/agent/`
- Agent 项目 raw index：`/agent/<project>/index.md`
- Agent 文档 raw markdown：`/agent/<project>/<doc>.md`

说明：

- `agent/` 内容完全独立维护，不从 human 文档自动生成
- 没有 `agent/` 目录的项目不会出现在 `/agent/` 首页
- Agent 路由直接输出 Markdown 原文，适合被 agent 或外部系统稳定抓取
- 使用显式 `.md` 路径是为了兼容静态站点输出和 GitHub Pages 文件托管

## 备注

- GitHub Actions 无法直接读取你本机的 `~/Documents/知识库/projects/`
- 因此当前方案采用“本地构建 + 本地部署”
- 知识库内容更新后，重新执行 `npm run deploy` 即可发布最新静态页面

## 一键更新 App

当前仓库支持生成一个可双击的 macOS app：

```bash
./scripts/build-update-app.sh
```

生成物：

- `Vinci Knowledge Base Update.app`

工作方式：

- 双击 app
- app 打开内部 `.command` 启动器
- Terminal 自动拉起该启动器
- 启动器执行仓库内 `scripts/run-manual-deploy.sh`
- 调用 `npm run deploy`
- 完成后保留终端结果页，方便查看日志

日志位置：

- `~/Library/Logs/vinci-knowledge-base/manual-deploy.log`

macOS 权限注意事项：

- app 通过 Terminal 运行发布流程，以降低访问 `~/Documents/知识库/projects` 时的权限问题
- 如果首次运行时 macOS 弹出访问 `Documents` 的授权提示，请允许
- 如果日志中出现 “node cannot access ... Documents”，请重新从 Terminal 运行一次或给 Terminal / Node 授予相应权限后再试
