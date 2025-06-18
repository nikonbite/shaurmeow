'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Button } from '../ui';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/shared/store';

interface Props {
  className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
  const [totalAmount, items, loading, fetchCartItems] = useCartStore((state) => [
    state.totalAmount,
    state.items,
    state.loading,
    state.fetchCartItems,
  ]);

  React.useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <Link href="/cart">
      <Button
        loading={loading}
        variant="default"
        className={cn(
          'group relative overflow-hidden',
          'transition-all duration-300 hover:shadow-lg hover:shadow-primary/20',
          { 'w-[105px]': loading },
          className
        )}>
        <ShoppingCart size={20} className="mr-2" />
        {totalAmount > 0 && <span>{totalAmount} ₽</span>}
      </Button>
    </Link>
  );
};
