import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
* Склоняет русские слова в зависимости от числа
* @param count - количество
* @param forms - массив из трех форм слова [одна, две/три/четыре, пять и более]
* @returns правильно склоненное слово
* 
* @example
* declension(1, ['салон', 'салона', 'салонов']) // 'салон'
* declension(2, ['салон', 'салона', 'салонов']) // 'салона'
* declension(5, ['салон', 'салона', 'салонов']) // 'салонов'
* declension(11, ['салон', 'салона', 'салонов']) // 'салонов'
*/
export function declension(count: number, forms: [string, string, string]): string {
  const lastDigit = count % 10
  const lastTwoDigits = count % 100

  // Особые случаи: 11, 12, 13, 14 всегда используют третью форму
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return forms[2]
  }

  // Числа, заканчивающиеся на 1
  if (lastDigit === 1) {
    return forms[0]
  }

  // Числа, заканчивающиеся на 2, 3, 4
  if (lastDigit >= 2 && lastDigit <= 4) {
    return forms[1]
  }

  // Все остальные числа (0, 5-9)
  return forms[2]
}