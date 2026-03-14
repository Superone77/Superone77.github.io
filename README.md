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

可选环境变量：

```bash
SITE_URL=https://<username>.github.io
GITHUB_REPOSITORY_URL=https://github.com/<username>/<username>.github.io.git
GH_PAGES_BRANCH=gh-pages
GITHUB_PAGES_CNAME=your.domain.com
```

## 发布范围

默认公开以下内容：

- 项目根目录 `README.md`
- `knowledge/*.md` 正文文件
- `STATUS.yaml` 元数据

默认不公开以下过程文件：

- `REVIEW.md`
- `SUBMISSION.md`
- `TASKS.md`
- `RESEARCH.md`
- `OUTLINE.md`

## 备注

- GitHub Actions 无法直接读取你本机的 `~/Documents/知识库/projects/`
- 因此当前方案采用“本地构建 + 本地部署”
- 知识库内容更新后，重新执行 `npm run deploy` 即可发布最新静态页面
