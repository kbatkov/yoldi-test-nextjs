import s from "./layout.module.scss";

export default function ListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={s.layout}>{children}</div>;
}
