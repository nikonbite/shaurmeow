import { cn } from '@/shared/lib/utils';
import { ArrowUpDown } from 'lucide-react';
import React from 'react';

interface Props {
  className?: string;
}

export const SortPopup: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 bg-muted/50 dark:bg-muted/20 px-4 sm:px-5 h-9 sm:h-11 rounded-xl',
        'cursor-pointer text-sm sm:text-base transition-colors hover:bg-muted/70 dark:hover:bg-muted/30',
        className,
      )}>
      <ArrowUpDown size={16} className="text-muted-foreground" />
      <span className="font-bold">Сортировка:</span>
      <span className="font-bold text-primary">популярное</span>
    </div>
  );
};
