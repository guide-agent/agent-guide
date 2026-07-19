import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1">
      <h1 className="text-3xl font-bold mb-4">Agent 面试指南</h1>
      <p className="text-fd-muted-foreground mb-6">
        从 0 - 1 成为 Agent 开发工程师
      </p>
      <p>
        <Link href="/docs" className="font-medium underline">
          开始阅读
        </Link>
      </p>
    </div>
  );
}
