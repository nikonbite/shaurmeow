import { ShaurmaSize, ShaurmaType, mapShaurmaType } from '../constants/shaurma';
import { CartStateItem } from './get-cart-details';

export const getCartItemDetails = (
  ingredients: CartStateItem['ingredients'],
  shaurmaType?: ShaurmaType,
  shaurmaSize?: ShaurmaSize,
): string => {
  const details = [];

  if (shaurmaSize && shaurmaType) {
    const typeName = mapShaurmaType[shaurmaType];
    details.push(`Размер: ${shaurmaSize}, ${typeName} лаваш`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(', ');
};
