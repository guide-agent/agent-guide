import { source } from '@/lib/source';
import { llms } from 'fumadocs-core/source';
import { withBasePath } from '@/lib/base-path';

export const revalidate = false;

export function GET() {
  const index = llms(source).index().replace(/\]\((\/[^)]*)\)/g, (_, path: string) => `](${withBasePath(path)})`);
  return new Response(index);
}
