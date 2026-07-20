import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  // 静态导出不提供 Next.js 图片优化 API，图片由浏览器直接加载。
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default withMDX(config);
