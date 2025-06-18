import { ShaurmaType } from '@/shared/constants/shaurma';
import React from 'react';
import { Variant } from '../components/shared/group-variants';
import { useSet } from 'react-use';
import { getAvailableShaurmaSizes } from '../lib';
import { ProductItem } from '@prisma/client';

type ShaurmaSize = 'M' | 'L' | 'XL';

interface ReturnProps {
  size: ShaurmaSize;
  type: ShaurmaType;
  selectedIngredients: Set<number>;
  availableSizes: Variant[];
  currentItemId?: number;
  setSize: (size: ShaurmaSize) => void;
  setType: (size: ShaurmaType) => void;
  addIngredient: (id: number) => void;
}

export const useShaurmaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = React.useState<ShaurmaSize>('M');
  const [type, setType] = React.useState<ShaurmaType>(1);
  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

  const availableSizes = getAvailableShaurmaSizes(type, items);

  const currentItemId = items.find((item) => item.shaurmaType === type && item.size === size)?.id;

  React.useEffect(() => {
    const isAvailableSize = availableSizes?.find(
      (item) => item.value === size && !item.disabled,
    );
    const availableSize = availableSizes?.find((item) => !item.disabled);

    if (!isAvailableSize && availableSize) {
      setSize(availableSize.value as ShaurmaSize);
    }
  }, [type]);

  return {
    size,
    type,
    selectedIngredients,
    availableSizes,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  };
};
