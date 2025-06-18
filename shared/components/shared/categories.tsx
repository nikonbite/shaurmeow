'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { useCategoryStore } from '@/shared/store';
import { Category } from '@prisma/client';

interface Props {
  categories: Category[];
  className?: string;
}

export const Categories: React.FC<Props> = ({ categories, className }) => {
  const activeId = useCategoryStore((state) => state.activeId);
  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    setCurrent(activeId);
  }, [activeId]);

  const onClickCategory = (category: Category) => {
    const section = document.getElementById(category.name);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={cn('flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-none', className)}>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onClickCategory(category)}
          className={cn(
            'px-4 sm:px-6 h-9 sm:h-10 rounded-xl text-sm sm:text-base font-medium whitespace-nowrap transition-all',
            'bg-muted/50 dark:bg-muted/20 hover:bg-muted/70 dark:hover:bg-muted/30',
            current === category.id && 'bg-primary text-primary-foreground hover:bg-primary/90'
          )}>
          {category.name}
        </button>
      ))}
    </div>
  );
};
