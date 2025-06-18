import { ProductItem } from '@prisma/client';
import { ShaurmaType, shaurmaSizes } from '../constants/shaurma';
import { Variant } from '../components/shared/group-variants';

export const getAvailableShaurmaSizes = (type: ShaurmaType, items: ProductItem[]): Variant[] => {
  const filteredShaurmasByType = items.filter((item) => item.shaurmaType === type);

  return shaurmaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredShaurmasByType.some((shaurma) => shaurma.size === item.value),
  }));
};
