export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="grid gap-3">{children}</div>;
}
