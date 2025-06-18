import { ProductItem } from '@prisma/client';
import { Ingredient } from '@prisma/client';
import { ShaurmaType, mapShaurmaSize } from '../constants/shaurma';

interface ReturnProps {
  totalPrice: number;
  textDetaills: string;
}

export const getShaurmaDetails = (
  type: ShaurmaType,
  size: string,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
): ReturnProps => {
  const currentItem = items.find((item) => item.shaurmaType === type && item.size === size);
  const typeText = type === 1 ? 'обычный' : 'сырный';

  const ingredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  const totalPrice = (currentItem?.price ?? 0) + ingredientsPrice;

  const textDetaills = `${mapShaurmaSize[size as keyof typeof mapShaurmaSize]}, ${typeText} лаваш`;

  return {
    totalPrice,
    textDetaills,
  };
};
