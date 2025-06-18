import { cn } from '@/shared/lib/utils';
import React from 'react';

interface Props {
  className?: string;
  imageUrl: string;
  size: 20 | 30 | 40;
}

export const ShaurmaImage: React.FC<Props> = ({ imageUrl, size, className }) => {
  return (
    <div className={cn('flex items-center justify-center flex-1 relative w-full md:min-h-[500px] min-h-[300px]', className)}>
      <img
        src={imageUrl}
        alt="Logo"
        className={cn('relative left-2 top-2 transition-all z-10 duration-300', {
          'w-[200px] h-[200px] md:w-[300px] md:h-[300px]': size === 20,
          'w-[250px] h-[250px] md:w-[400px] md:h-[400px]': size === 30,
          'w-[300px] h-[300px] md:w-[500px] md:h-[500px]': size === 40,
        })}
      />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[300px] h-[300px] md:w-[450px] md:h-[450px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[250px] h-[250px] md:w-[370px] md:h-[370px]" />
    </div>
  );
};
