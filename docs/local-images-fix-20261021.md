# 文档远程图片编译错误修复

最后验证日期：2026-10-21。

## 根因与修改

Fumadocs 的 `remarkImage` 在编译 Markdown 图片时读取图片尺寸。原文直接引用 `raw.githubusercontent.com`，网络连接超时会使 MDX 编译失败。此前带 `NODE_USE_ENV_PROXY=1` 的构建通过，并不足以证明普通环境可用。

- 将 RAG 的 4 张、Token 与 Tokenizer 的 7 张原有插图原样保存到 `public/images/docs/`，两篇正文改用本地路径。
- 11 张图片共 707173 字节，保留原有内容；来源固定提交、SHA-256、尺寸和大小记录在 `docs/local-image-sources.json`。
- 在 `content/docs/guide.mdx` 增加本地图片维护说明。
- 未修改 Fumadocs、Next.js 或代理配置，未增加依赖，未关闭尺寸检查，未提交或推送。

## 验证结果

- 所有 PNG 的签名、尺寸、chunk CRC 和 IEND 完整性检查通过。
- 使用项目实际安装的 `remarkImage` 插件，在禁止远程 `fetch` 时成功解析全部 11 张本地图片尺寸；原远程地址在相同条件下失败，负例有效。
- 移开旧 `.next`、`.source` 缓存后，禁止远程 `fetch` 的干净构建成功，生成 423 个静态路由。此测试出现 OG 分享图动态字体加载失败的非致命日志，因此不代表全站已完全离线化。
- 不设置 `NODE_USE_ENV_PROXY`、清除 `NODE_OPTIONS` 后执行普通 `next build`，退出码为 0，生成 423 个静态路由；日志中未发现 error、warn 或 failed。
- 禁止服务端远程 `fetch` 的开发服务中，两篇页面均返回 HTTP 200；浏览器逐张滚动并执行图片解码，11 张全部同源且加载成功。390 × 844 视口下，两页均无横向溢出。
- 浏览器仍有图片 LCP 加载建议；RAG 页的外部 giscus 评论接口返回讨论不存在的 404，并提示首次评论时创建讨论。这些不是 MDX 编译或图片加载错误，本轮未修改评论系统。
- ESLint 与 `git diff --check` 通过。本轮为文档和静态资产修改，不涉及集群、性能、覆盖率或依赖安全扫描验收。

## 证据与回滚

临时证据目录：`/tmp/agent-guide-local-images-20261021-582ai3qs`，保存普通构建日志 `build-normal.log`、插件验证脚本、原内容快照 `before-content.tar.gz`、旧生成缓存以及 `browser-qa/` 浏览器记录。临时开发服务已停止。

无迁移，直接替换。如需回滚，仅从本轮快照恢复两篇正文及 `guide.mdx`，按来源清单移除本轮新增的 11 张图片，再移除本轮来源清单和修复记录。不要回滚此前 K8s DRA、GPU 虚拟化及其他文档扩充，也不要覆盖用户原有的 `mise.toml` 修改。回滚后会重新引入远程图片编译依赖。
