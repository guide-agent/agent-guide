import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Logo } from '@/components/logo';
import { appName } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2.5">
          <Logo className="size-7 shrink-0" />
          <span>{appName}</span>
        </span>
      ),
    },
    links: [
      {
        text: 'Agent 八股',
        url: '/docs',
      },
      {
        text: '通用 Agent 设计',
        url: '/docs',
      },
      {
        text: '框架 | 中间件',
        url: '/docs',
      },
      {
        text: '项目',
        url: '/docs',
      },
      {
        text: '工程基础',
        url: '/docs',
      },
    ],
  };
}
