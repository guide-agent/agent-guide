import { getPageImage, getPageMarkdownUrl, source } from '@/lib/source';
import { getGiscusConfig } from '@/lib/giscus';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { GiscusComments } from '@/components/giscus-comments';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;
  const processedText = await page.data.getText('processed');
  const hasContent = processedText.trim().length > 0;
  const giscusConfig = getGiscusConfig();

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      breadcrumb={hasContent ? undefined : { enabled: false }}
      footer={hasContent ? undefined : { enabled: false }}
      tableOfContent={hasContent ? undefined : { enabled: false }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      {page.data.description ? (
        <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      ) : null}
      {hasContent ? (
        <>
          <div className="flex flex-row gap-2 items-center border-b pb-6">
            <MarkdownCopyButton markdownUrl={markdownUrl} />
            <ViewOptionsPopover markdownUrl={markdownUrl} />
          </div>
          <DocsBody>
            <MDX
              components={getMDXComponents({
                // 让文档中的相对链接基于当前页面进行解析。
                a: createRelativeLink(source, page),
              })}
            />
          </DocsBody>
          <GiscusComments config={giscusConfig} />
        </>
      ) : null}
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
