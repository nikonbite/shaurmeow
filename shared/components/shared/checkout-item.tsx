'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import * as CartItemDetails from './cart-item-details';

interface Props extends CartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemove?: () => void;
  className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  quantity,
  details,
  className,
  disabled,
  onClickCountButton,
  onClickRemove,
}) => {
  return (
    <div
      className={cn(
        'flex items-center gap-4 sm:gap-6 p-3 sm:p-4 bg-card text-foreground rounded-2xl shadow',
        { 'opacity-40': disabled },
        className,
      )}>
      <img src={imageUrl} alt={name} className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] object-contain" />

      <div className="flex-1">
        <h3 className="text-base sm:text-lg font-bold mb-1">{name}</h3>
        {details && <p className="text-xs sm:text-sm text-muted-foreground">{details}</p>}
      </div>

      <div className="flex flex-col items-end gap-2 sm:gap-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 sm:h-9 sm:w-9"
            onClick={() => onClickCountButton('minus')}
            disabled={disabled || quantity === 1}>
            <Minus size={16} />
          </Button>

          <span className="text-base sm:text-lg font-bold w-4 sm:w-5 text-center">{quantity}</span>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 sm:h-9 sm:w-9"
            onClick={() => onClickCountButton('plus')}
            disabled={disabled}>
            <Plus size={16} />
          </Button>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-base sm:text-lg font-bold">{price * quantity} ₽</span>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-9 sm:w-9 text-red-500 hover:text-red-600"
            onClick={onClickRemove}
            disabled={disabled}>
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};
