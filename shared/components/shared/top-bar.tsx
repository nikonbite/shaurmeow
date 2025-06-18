'use client';

import { cn } from '@/shared/lib/utils';
import React, { useEffect, useState } from 'react';
import { Container } from './container';
import { Categories } from './categories';
import { Category } from '@prisma/client';
import { useFilters } from '@/shared/hooks';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

interface Props {
  categories: Category[];
  className?: string;
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
  const filters = useFilters();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (header) {
        const headerRect = header.getBoundingClientRect();
        setIsHeaderVisible(headerRect.top >= 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={cn(
      'border-b border-border/40 backdrop-blur-md bg-background/80 fixed left-0 right-0 z-40 transition-all duration-300',
      isHeaderVisible ? 'top-16' : 'top-0',
      'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-border/40 after:to-transparent',
      className
    )}>
      <Container className="py-3 flex items-center gap-4 justify-between">
        <Categories categories={categories} />
        <div className="flex gap-2 min-w-[260px]">
          <Select
            value={Array.from(filters.shaurmaTypes)[0] || ''}
            onValueChange={(value) => {
              filters.setShaurmaTypes(value);
            }}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Тип лаваша" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Обычный</SelectItem>
              <SelectItem value="2">Сырный</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={Array.from(filters.sizes)[0] || ''}
            onValueChange={(value) => {
              filters.setSizes(value);
            }}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Размер" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="M">M</SelectItem>
              <SelectItem value="L">L</SelectItem>
              <SelectItem value="XL">XL</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Container>
    </div>
  );
};
