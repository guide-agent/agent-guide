import assert from 'node:assert/strict';
import { test } from 'node:test';

for (const basePath of [undefined, '', '/agent-guide', '/agent-guide/']) {
  test(`部署路径：${basePath || '根目录'}`, async () => {
    const previous = process.env.NEXT_PUBLIC_BASE_PATH;
    if (basePath === undefined) delete process.env.NEXT_PUBLIC_BASE_PATH;
    else process.env.NEXT_PUBLIC_BASE_PATH = basePath;
    try {
      const { withBasePath } = await import(`../lib/base-path.ts?base=${encodeURIComponent(basePath)}`);
      const prefix = basePath?.replace(/\/+$/, '') ?? '';

      for (const path of ['/', '/logo.svg', '/api/search', '/llms.mdx/docs/guide/content.md']) {
        assert.equal(withBasePath(path), `${prefix}${path}`);
      }
      for (const path of ['https://example.com/image.png', '//cdn.example.com/image.png', './image.png', '#heading', 'data:image/png;base64,AA==']) {
        assert.equal(withBasePath(path), path);
      }
      assert.equal(withBasePath('/agent-guide/logo.svg'), '/agent-guide/logo.svg');
      assert.equal(withBasePath('/agent-guide'), '/agent-guide');
      assert.equal(withBasePath('/agent-guide-other/image.png'), `${prefix}/agent-guide-other/image.png`);
    } finally {
      if (previous === undefined) delete process.env.NEXT_PUBLIC_BASE_PATH;
      else process.env.NEXT_PUBLIC_BASE_PATH = previous;
    }
  });
}
