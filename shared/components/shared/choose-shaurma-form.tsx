'use client';

import React from 'react';
import { Ingredient, ProductItem } from '@prisma/client';

import { ShaurmaImage } from './shaurma-image';
import { Title } from './title';
import { Button } from '../ui';
import { ShaurmaSize, ShaurmaType, shaurmaTypes } from '@/shared/constants/shaurma';
import { IngredientItem } from './ingredient-item';
import { cn } from '@/shared/lib/utils';
import { getShaurmaDetails } from '@/shared/lib';
import { useShaurmaOptions } from '@/shared/hooks';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

/**
 * Форма выбора ШАУРМА
 */
export const ChooseShaurmaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  loading,
  onSubmit,
  className,
}) => {
  const {
    size,
    type,
    availableSizes,
    currentItemId,
    setSize,
    setType,
  } = useShaurmaOptions(items);

  const { totalPrice, textDetaills } = getShaurmaDetails(
    type,
    size,
    items,
    [],
    new Set(),
  );

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, []);
    }
  };

  return (
    <div className={cn(className, 'flex flex-col flex-1 max-w-[400px] mx-auto')}>
      {/* Изображение */}
      <div className="flex items-center justify-center relative w-full h-[200px] md:h-[250px] bg-muted/30 dark:bg-muted/10 rounded-t-3xl">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/5 rounded-t-3xl" />
        <img
          src={imageUrl}
          alt={name}
          className="relative z-10 w-[180px] h-[180px] md:w-[220px] md:h-[220px] object-cover"
        />
      </div>

      {/* Контент */}
      <div className="w-full bg-card dark:bg-card/50 p-4 md:p-7 rounded-b-3xl backdrop-blur-sm">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-muted-foreground">{textDetaills}</p>

        <div className="flex flex-col gap-4 mt-5">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Размер</h3>
            <Select value={size} onValueChange={(value) => setSize(value as ShaurmaSize)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выберите размер" />
              </SelectTrigger>
              <SelectContent>
                {availableSizes.map((item) => (
                  <SelectItem key={item.value} value={item.value} disabled={item.disabled}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Тип лаваша</h3>
            <Select value={String(type)} onValueChange={(value) => setType(Number(value) as ShaurmaType)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выберите тип лаваша" />
              </SelectTrigger>
              <SelectContent>
                {shaurmaTypes.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          loading={loading}
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-2xl w-full mt-5 md:mt-10 font-bold">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
