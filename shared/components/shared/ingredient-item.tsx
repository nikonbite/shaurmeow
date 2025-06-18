import { cn } from '@/shared/lib/utils';
import { CircleCheck } from 'lucide-react';
import React from 'react';

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const IngredientItem: React.FC<Props> = ({
  className,
  active,
  price,
  name,
  imageUrl,
  onClick,
}) => {
  return (
    <div
      className={cn(
        'flex items-center flex-col p-1 rounded-md w-full md:w-32 text-center relative cursor-pointer shadow-md bg-white',
        { 'border border-primary': active },
        className,
      )}
      onClick={onClick}>
      {active && <CircleCheck className="absolute top-2 right-2 text-primary" />}
      <img width={80} height={80} className="md:w-[110px] md:h-[110px] w-[80px] h-[80px]" src={imageUrl} />
      <span className="text-[10px] md:text-xs mb-1">{name}</span>
      <span className="font-bold text-xs md:text-base">{price} ₽</span>
    </div>
  );
};
