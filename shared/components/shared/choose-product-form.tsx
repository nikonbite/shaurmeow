import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  loading?: boolean;
  onSubmit?: VoidFunction;
  className?: string;
}

/**
 * Форма выбора ПРОДУКТА
 */
export const ChooseProductForm: React.FC<Props> = ({
  name,
  imageUrl,
  price,
  onSubmit,
  className,
  loading,
}) => {
  return (
    <div className={cn(className, 'flex flex-col flex-1 max-w-[800px] mx-auto')}>
      <div className="flex items-center justify-center relative w-full h-[200px] md:h-[250px] bg-muted/30 dark:bg-muted/10 rounded-t-3xl">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/5 rounded-t-3xl" />
        <img
          src={imageUrl}
          alt={name}
          className="relative z-10 w-[180px] h-[180px] md:w-[220px] md:h-[220px] object-cover"
        />
      </div>

      <div className="w-full bg-card dark:bg-card/50 p-4 md:p-7 rounded-b-3xl backdrop-blur-sm">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <Button
          loading={loading}
          onClick={() => onSubmit?.()}
          className="h-[55px] px-10 text-base rounded-2xl w-full mt-5 md:mt-10 font-bold">
          Добавить в корзину за {price} ₽
        </Button>
      </div>
    </div>
  );
};
