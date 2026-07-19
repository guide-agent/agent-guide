import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      nav={{ enabled: false }}
      searchToggle={{ enabled: false }}
      themeSwitch={{ enabled: false }}
      tabs={false}
      containerProps={{
        className:
          '[--fd-banner-height:3.5rem] [--fd-docs-height:calc(100dvh-3.5rem)]',
      }}
    >
      {children}
    </DocsLayout>
  );
}
