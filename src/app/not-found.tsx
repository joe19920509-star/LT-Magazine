import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-light flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="font-heading font-bold text-8xl text-primary mb-4">404</h1>
        <h2 className="font-heading font-bold text-2xl mb-4">页面不存在</h2>
        <p className="text-muted mb-8">
          你访问的页面可能已被删除或地址有误
        </p>
        <Link
          href="/"
          className="inline-block bg-primary text-white px-6 py-3 rounded font-heading font-semibold hover:bg-primary/90 transition-colors"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
