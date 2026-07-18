import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1">
      <h1 className="text-3xl font-bold mb-4">Agent 面试指南</h1>
      <p className="text-fd-muted-foreground mb-6">
        系统整理 AI Agent 面试题、核心概念与工程实践。
      </p>
      <p>
        <Link href="/docs" className="font-medium underline">
          开始阅读
        </Link>
      </p>
    </div>
  );
}
