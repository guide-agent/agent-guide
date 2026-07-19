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
        text: 'Agent 通识',
        url: '/docs/agent-general',
        active: 'nested-url',
      },
      {
        text: 'Agent 架构与模式',
        url: '/docs/agent-architecture',
        active: 'nested-url',
      },
      {
        text: 'Agent 开发',
        url: '/docs/agent-development',
        active: 'nested-url',
      },
      {
        text: 'Agent 工程',
        url: '/docs/agent-engineering',
        active: 'nested-url',
      },
      {
        text: '项目实战',
        url: '/docs/project-practice',
        active: 'nested-url',
      },
      {
        text: 'AI Coding',
        url: '/docs/ai-coding',
        active: 'nested-url',
      },
    ],
  };
}
