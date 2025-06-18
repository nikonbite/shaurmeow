'use client';

import React from 'react';
import { useCart } from '@/shared/hooks';
import { CartDrawerItem } from '@/shared/components/shared/cart-drawer-item';
import { getCartItemDetails } from '@/shared/lib';
import { ShaurmaSize, ShaurmaType } from '@/shared/constants/shaurma';
import { Title } from '@/shared/components/shared/title';
import { Button } from '@/shared/components/ui';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { declension } from '@/shared/lib/utils';

const CartPage: React.FC = () => {
  const { totalAmount, updateItemQuantity, items, removeCartItem } = useCart();

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  if (!totalAmount) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <img src="/assets/images/empty-box.png" alt="Empty cart" width={120} height={120} />
        <Title size="sm" text="Корзина пустая" className="text-center font-bold my-2" />
        <p className="text-center text-muted-foreground mb-5">
          Добавьте хотя бы одну шаурму, чтобы совершить заказ
        </p>
        <Link href="/">
          <Button className="w-56 h-12 text-base" size="lg">
            <ArrowLeft className="w-5 mr-2" />
            Вернуться назад
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-2 md:px-0">
      <Title size="lg" text={`В корзине ${items.length} ${declension(items.length, ['товар', 'товара', 'товаров'])}`} className="mb-6" />
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.id} className="mb-2">
            <CartDrawerItem
              id={item.id}
              imageUrl={item.imageUrl}
              details={getCartItemDetails(
                item.ingredients,
                item.shaurmaType as ShaurmaType,
                item.shaurmaSize as ShaurmaSize,
              )}
              disabled={item.disabled}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
              onClickRemove={() => removeCartItem(item.id)}
              className="bg-card text-foreground rounded-2xl shadow"
            />
          </div>
        ))}
      </div>
      <div className="bg-card dark:bg-card/50 p-8 mt-8 rounded-2xl shadow">
        <div className="flex mb-4">
          <span className="flex flex-1 text-lg text-muted-foreground">
            Итого
            <div className="flex-1 border-b border-dashed border-border/50 relative -top-1 mx-2" />
          </span>
          <span className="font-bold text-lg">{totalAmount} ₽</span>
        </div>
        <Link href="/checkout">
          <Button type="submit" className="w-full h-12 text-base">
            Оформить заказ
            <ArrowRight className="w-5 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CartPage; 