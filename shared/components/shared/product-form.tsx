'use client';

import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore } from '@/shared/store';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { ChooseShaurmaForm } from './choose-shaurma-form';
import { ChooseProductForm } from './choose-product-form';
import { useRouter } from 'next/navigation';

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ product, onSubmit: _onSubmit }) => {
  const [addCartItem, loading] = useCartStore((state) => [state.addCartItem, state.loading]);
  const router = useRouter();

  const firstItem = product.items[0];
  const isShaurmaForm = Boolean(firstItem.shaurmaType);

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      toast.success(product.name + ' добавлена в корзину');

      _onSubmit?.();
    } catch (err) {
      toast.error('Не удалось добавить товар в корзину');
      console.error(err);
    }
  };

  useEffect(() => {
    if (!isShaurmaForm) {
      onSubmit();
    }
  }, [isShaurmaForm]);

  if (isShaurmaForm) {
    return (
      <ChooseShaurmaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      onSubmit={onSubmit}
      price={firstItem.price}
      loading={loading}
    />
  );
};
