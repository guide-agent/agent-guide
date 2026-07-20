'use client';

import Giscus from '@giscus/react';
import { ExternalLink, MessageCircle } from 'lucide-react';
import type { GiscusConfig } from '@/lib/giscus';

interface GiscusCommentsProps {
  config: GiscusConfig;
  discussionTerm: string;
}

export function GiscusComments({ config, discussionTerm }: GiscusCommentsProps) {
  const discussionsUrl = `https://github.com/${config.repo}/discussions`;

  return (
    <section
      aria-labelledby="discussion-title"
      className="mt-14 border-t border-fd-border pt-8"
    >
      <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full border border-fd-border bg-fd-secondary text-fd-muted-foreground"
          >
            <MessageCircle className="size-4" />
          </span>
          <div>
            <h2
              id="discussion-title"
              className="m-0 text-base font-semibold tracking-tight text-fd-foreground"
            >
              参与讨论
            </h2>
            <p className="mt-1 text-sm leading-6 text-fd-muted-foreground">
              提问、补充案例，或分享你的实践经验。
            </p>
          </div>
        </div>
        <a
          className="inline-flex w-fit items-center gap-1.5 text-xs text-fd-muted-foreground underline-offset-4 transition-colors hover:text-fd-foreground hover:underline"
          href={discussionsUrl}
          rel="noreferrer"
          target="_blank"
        >
          GitHub Discussions
          <ExternalLink aria-hidden="true" className="size-3" />
        </a>
      </div>

      <Giscus
        id="giscus-comments"
        repo={config.repo}
        repoId={config.repoId}
        category={config.category}
        categoryId={config.categoryId}
        mapping="specific"
        term={discussionTerm}
        strict="1"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="preferred_color_scheme"
        lang="zh-CN"
        loading="lazy"
      />
    </section>
  );
}
