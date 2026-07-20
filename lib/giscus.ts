import type { Repo } from '@giscus/react';

export interface GiscusConfig {
  repo: Repo;
  repoId: string;
  category: string;
  categoryId: string;
}

const repoPattern = /^[^/\s]+\/[^/\s]+$/u;
const defaultConfig: GiscusConfig = {
  repo: 'guide-agent/agent-guide-discussions',
  repoId: 'R_kgDOTeJAfA',
  category: 'Announcements',
  categoryId: 'DIC_kwDOTeJAfM4DBlaP',
};

/**
 * 读取构建期注入的 giscus 公开配置。
 *
 * 默认连接站点的公开讨论仓库；环境变量可以整组覆盖配置。
 * 只覆盖一部分时主动终止构建，避免仓库与 ID 不匹配。
 */
export function getGiscusConfig(): GiscusConfig {
  const values = {
    repo: process.env.NEXT_PUBLIC_GISCUS_REPO?.trim(),
    repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID?.trim(),
    category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY?.trim(),
    categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID?.trim(),
  };
  const entries = Object.entries(values);

  if (entries.every(([, value]) => !value)) return defaultConfig;

  const missing = entries
    .filter(([, value]) => !value)
    .map(([key]) => key)
    .join(', ');

  if (missing) {
    throw new Error(`giscus 配置不完整，缺少：${missing}`);
  }

  if (!repoPattern.test(values.repo!)) {
    throw new Error('NEXT_PUBLIC_GISCUS_REPO 必须使用 owner/repo 格式');
  }

  return {
    repo: values.repo as Repo,
    repoId: values.repoId!,
    category: values.category!,
    categoryId: values.categoryId!,
  };
}
