import { Onest } from 'next/font/google';

import './globals.css';
import { Providers } from '@/shared/components/shared/providers';

const onest = Onest({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-onest',
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link data-rh="true" rel="icon" href="/logo.png" />
      </head>
      <body className={`${onest.className} dark:bg-background`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
