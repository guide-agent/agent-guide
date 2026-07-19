# Agent 面试指南

基于 Fumadocs MDX、Next.js App Router 和 Turbopack 构建的中文静态文档站，用于沉淀 AI Agent 面试题、答案框架与工程实践。

## 技术方案

- Fumadocs：Markdown/MDX、目录、文档布局与组件。
- Next.js 16：路由与静态导出，开发和构建默认使用 Turbopack。
- Orama：构建期生成索引，浏览器端完成中文全文搜索。
- mise：锁定 Node.js 24.18.0。

`npm run build` 会将完整静态站点生成到 `out/`，部署时不需要 Node.js 服务。

正式部署前通过 `NEXT_PUBLIC_SITE_URL` 设置站点公开地址，以便生成正确的 Open Graph 绝对链接：

```bash
NEXT_PUBLIC_SITE_URL=https://docs.example.com npm run build
```

## 本地开发

```bash
mise install
npm install
npm run dev
```

浏览器访问 <http://localhost:3000>。

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
npm run lint
npm run types:check
npm run build
```

构建成功后可本地预览静态产物：

```bash
npm start
```

## 目录说明

| 路径 | 说明 |
| --- | --- |
| `content/docs` | Markdown/MDX 文档与导航元数据 |
| `app/docs` | Fumadocs 文档路由和布局 |
| `app/api/search` | 构建期导出的 Orama 搜索索引 |
| `components/search.tsx` | 浏览器端中文搜索客户端 |
| `public/logo.svg` | 导航栏与浏览器站点图标 |
| `lib/source.ts` | Fumadocs 内容源适配 |
| `next.config.mjs` | Next.js 静态导出配置 |
