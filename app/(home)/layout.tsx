export default function Layout({ children }: LayoutProps<'/'>) {
  // 全站导航已提升到根布局，路由组仅保留页面分组职责。
  return children;
}
