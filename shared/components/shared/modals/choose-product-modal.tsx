'use client';

import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ProductWithRelations } from '@/@types/prisma';
import { ProductForm } from '../product-form';

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0 w-full md:w-[400px] max-w-[400px] min-h-[300px] md:min-h-[500px]',
          'bg-background/95 dark:bg-background/90 backdrop-blur-xl overflow-hidden',
          'border border-border/50 shadow-xl shadow-black/5 dark:shadow-black/10',
          'rounded-3xl',
          className,
        )}>
        <div className="w-full max-w-[400px] mx-auto">
          <ProductForm product={product} onSubmit={() => router.back()} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
