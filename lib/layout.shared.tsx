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
        text: '文档',
        url: '/docs',
      },
    ],
  };
}
