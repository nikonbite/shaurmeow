import { Container, Header } from '@/shared/components/shared';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Shaurmeow | Корзина',
  description: '',
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Suspense>
        <Header hasCart={false} className="border-b-border/40" />
      </Suspense>
      {children}
    </main>
  );
}
