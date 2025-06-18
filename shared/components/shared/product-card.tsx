'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { Ingredient } from '@prisma/client';

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  ingredients: Ingredient[];
  className?: string;
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  ingredients,
  className,
}) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/product/${id}`);
  };

  return (
    <div
      className={cn(
        'group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300',
        'bg-card/50 dark:bg-card/20 backdrop-blur-sm border border-border/10',
        'hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20',
        'hover:-translate-y-1',
        className,
      )}
      onClick={onClick}>
      {/* Изображение */}
      <div className="relative aspect-square overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50 dark:to-background/30 z-10" />
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Контент */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <h3 className="text-lg sm:text-xl font-bold mb-2 line-clamp-2">{name}</h3>
        
        {/* Ингредиенты */}
        {ingredients.length > 0 && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {ingredients.slice(0, 3).map((ingredient) => ingredient.name).join(', ')}
            {ingredients.length > 3 && '...'}
          </p>
        )}

        {/* Кнопка и цена */}
        <div className="mt-auto flex items-center justify-between gap-4">
          <Button
            className="h-9 sm:h-10 px-4 sm:px-6 rounded-xl font-medium w-full"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}>
            В корзину от {price} ₽
          </Button>
        </div>
      </div>
    </div>
  );
};
