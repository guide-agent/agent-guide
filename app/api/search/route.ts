import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';
import { createTokenizer } from '@orama/tokenizers/mandarin';

export const revalidate = false;

export const { staticGET: GET } = createFromSource(source, {
  // 构建期索引与浏览器端查询必须使用相同的中文分词器。
  tokenizer: createTokenizer(),
});
