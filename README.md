# Agent 面试指南

基于 Fumadocs MDX、Next.js App Router 和 Turbopack 构建的中文静态文档站，用于沉淀 AI Agent 面试题、答案框架与工程实践。

## 技术方案

- Fumadocs：Markdown/MDX、目录、文档布局与组件。
- Next.js 16：路由与静态导出，开发和构建默认使用 Turbopack。
- Orama：构建期生成索引，浏览器端完成中文全文搜索。
- mise：锁定 Node.js 24.18.0 与 pnpm 11.15.1。

`pnpm build` 会将完整静态站点生成到 `out/`，部署时不需要 Node.js 服务。

正式部署前通过 `NEXT_PUBLIC_SITE_URL` 设置站点公开地址，以便生成正确的 Open Graph 绝对链接：

```bash
NEXT_PUBLIC_SITE_URL=https://docs.example.com pnpm build
```

## GitHub Pages 部署

仓库使用 `.github/workflows/build.yml` 构建并发布静态产物，无需另建 `gh-pages` 分支，也无需配置 PAT。

1. 在仓库 **Settings → Pages → Build and deployment → Source** 中选择 **GitHub Actions**。首次部署前需由有权限的维护者完成此设置。
2. 将改动合入 `main`；每次推送到 `main` 会执行 lint、类型检查、路径测试、静态构建，并上传 `out/`、部署至 `github-pages` 环境。
3. 也可在 **Actions → Deploy GitHub Pages → Run workflow** 手动运行。仅 `main` 分支可以发布，其他分支手动运行只构建和上传产物。
4. 首次部署后，在工作流的部署环境链接中打开站点。未配置自定义域名时，本仓库地址为 <https://guide-agent.github.io/agent-guide/>。

工作流通过 GitHub 官方 `configure-pages` 获取公开地址和子路径，构建时分别注入 `NEXT_PUBLIC_SITE_URL` 和 `NEXT_PUBLIC_BASE_PATH`。Next.js 导航、静态资源、搜索索引和 Markdown 复制链接均支持子路径；页面导出为目录下的 `index.html`，支持直接打开或刷新深层文档链接。giscus 的 Discussion 匹配词仍使用不含部署前缀的文档路径，保持原评论关联。

本地复现项目 Pages 构建：

```bash
NEXT_PUBLIC_SITE_URL=https://guide-agent.github.io/agent-guide \
NEXT_PUBLIC_BASE_PATH=/agent-guide pnpm build
```

此时 `out/` 的内容应挂载在服务器的 `/agent-guide/` 下；`pnpm start` 仅适用于未设置子路径的根目录构建。切回本地开发或根域名部署时，清空 `NEXT_PUBLIC_BASE_PATH` 后重新构建。

无迁移，直接替换。回滚站点时，将已知正常的代码恢复到 `main` 并重新运行部署；停止自动发布可在 Actions 中禁用此工作流。首次启用 Pages 前应确认仓库内容及构建产物适合公开访问。

## 本地开发

```bash
mise install
pnpm install
pnpm dev
```

浏览器访问 <http://localhost:3000>。

## 文档评论

文档详情页通过 [giscus](https://github.com/giscus/giscus) 接入 GitHub Discussions，默认使用公开仓库 [`guide-agent/agent-guide-discussions`](https://github.com/guide-agent/agent-guide-discussions) 的 `Announcements` 分类。

如需切换评论仓库，请准备另一个公开仓库、启用 Discussions、安装 [giscus GitHub App](https://github.com/apps/giscus)，再通过以下四个环境变量整组覆盖默认配置：

```dotenv
NEXT_PUBLIC_GISCUS_REPO=guide-agent/agent-guide-discussions
NEXT_PUBLIC_GISCUS_REPO_ID=R_kgDOTeJAfA
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_kwDOTeJAfM4DBlaP
```

每篇文档使用自身不含前导斜杠的 `/docs/...` 路径作为严格匹配词，对应一个独立 Discussion。显式匹配词会在客户端切换文章时同步更新评论区，并兼容 giscus 原 `pathname` 映射创建的 Discussion。页面路径变更时，如需保留原评论，应同步修改对应 Discussion 标题或保持旧路径。

## 新增内容

文档位于 `content/docs`。创建 Markdown 或 MDX 文件，并添加 frontmatter：

```md
---
title: 页面标题
description: 一句话说明页面内容。
---
```

同级目录的 `meta.json` 用于控制导航标题和页面顺序。具体题目模板参见 `content/docs/guide.mdx`。

## 本地验证

```bash
pnpm lint
pnpm types:check
pnpm test:paths
pnpm build
```

构建成功后可本地预览静态产物：

```bash
pnpm start
```

## 目录说明

| 路径 | 说明 |
| --- | --- |
| `content/docs` | Markdown/MDX 文档与导航元数据 |
| `app/docs` | Fumadocs 文档路由和布局 |
| `app/api/search` | 构建期导出的 Orama 搜索索引 |
| `components/search.tsx` | 浏览器端中文搜索客户端 |
| `components/giscus-comments.tsx` | GitHub Discussions 评论组件 |
| `lib/giscus.ts` | giscus 构建期配置校验 |
| `public/logo.svg` | 导航栏与浏览器站点图标 |
| `lib/source.ts` | Fumadocs 内容源适配 |
| `next.config.mjs` | Next.js 静态导出配置 |
