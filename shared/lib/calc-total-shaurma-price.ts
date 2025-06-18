import { Ingredient, ProductItem } from '@prisma/client';
import { ShaurmaSize, ShaurmaType } from '../constants/shaurma';

/**
 * Функция для подсчета общей стоимости шаурма
 *
 * @param type - тип теста выбранной шаурма
 * @param size - размер выбранной шаурма
 * @param items - список вариаций
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - выбранные ингредиенты
 *
 * @returns number общую стоимость
 */
export const calcTotalShaurmaPrice = (
  type: ShaurmaType,
  size: ShaurmaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
) => {
  const shaurmaPrice =
    items.find((item) => item.shaurmaType === type && item.size === size)?.price || 0;

  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return shaurmaPrice + totalIngredientsPrice;
};
