export const metadata = {
  title: 'Админ панель',
  description: 'Админ панель',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
