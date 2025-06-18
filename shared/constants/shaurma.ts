export const mapShaurmaSize = {
  'M': 'Маленькая',
  'L': 'Средняя',
  'XL': 'Большая',
} as const;

export const mapShaurmaType = {
  1: 'обычный',
  2: 'сырный',
} as const;

export const shaurmaSizes = Object.entries(mapShaurmaSize).map(([value, name]) => ({
  name,
  value,
}));

export const shaurmaTypes = Object.entries(mapShaurmaType).map(([value, name]) => ({
  name,
  value,
}));

export type ShaurmaSize = keyof typeof mapShaurmaSize;
export type ShaurmaType = 1 | 2;
