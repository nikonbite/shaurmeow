export const categories = [
  {
    name: 'Шаурма',
  },
  {
    name: 'Напитки',
  },
  {
    name: 'Десерты',
  },
  {
    name: 'Соусы',
  },
];

export const _ingredients = [
  {
    name: 'Сырный соус',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png',
  },
  {
    name: 'Сыр моцарелла',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png',
  },
  {
    name: 'Сыр чеддер',
    price: 79,
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796',
  },
  {
    name: 'Острый перец халапеньо',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
  },
  {
    name: 'Куриное филе',
    price: 79,
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A',
  },
  {
    name: 'Шампиньоны',
    price: 59,
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324',
  },
  {
    name: 'Ветчина',
    price: 79,
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61',
  },
  {
    name: 'Пекинская капуста',
    price: 59,
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3',
  },
  {
    name: 'Свежие огурцы',
    price: 59,
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027',
  },
  {
    name: 'Маринованные огурцы',
    price: 59,
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B',
  },
  {
    name: 'Свежие томаты',
    price: 59,
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67',
  },
  {
    name: 'Красный лук',
    price: 59,
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
  },
  {
    name: 'Сладкий перец',
    price: 59,
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0',
  },
  {
    name: 'Свежая зелень',
    price: 39,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
  },
  {
    name: 'Сладкий перец',
    price: 59,
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B',
  },
  {
    name: 'Сыр фета',
    price: 79,
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
  },
  {
    name: 'Куриные наггетсы',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png',
  },
].map((obj, index) => ({ id: index + 1, ...obj }));

export const products = [
  // Напитки
  {
    name: 'Морс брусничный',
    imageUrl: 'https://danar.ru/_next/image?url=https%3A%2F%2Fdanar.ru%2Fi%2Fuploads%2F1649226383-brusnikajpg.jpg&w=3840&q=75',
    categoryId: 2,
  },
  {
    name: 'Компот цитрусовый',
    imageUrl: 'https://danar.ru/_next/image?url=https%3A%2F%2Fdanar.ru%2Fi%2Fuploads%2F1651306731-IMG-6015JPG.jpg&w=3840&q=75',
    categoryId: 2,
  },
  {
    name: 'Коктейль молочный',
    imageUrl: 'https://danar.ru/_next/image?url=https%3A%2F%2Fdanar.ru%2Fi%2Fmoloko.jpg&w=3840&q=75',
    categoryId: 2,
  },
  {
    name: 'Компот яблочный',
    imageUrl: 'https://danar.ru/_next/image?url=https%3A%2F%2Fdanar.ru%2Fi%2Fuploads%2F1651306725-IMG-6014JPG.jpg&w=3840&q=75',
    categoryId: 2,
  },
  {
    name: 'Морс из облепихи',
    imageUrl: 'https://danar.ru/_next/image?url=https%3A%2F%2Fdanar.ru%2Fi%2Fuploads%2F1649226375-oblepihajpg.jpg&w=3840&q=75',
    categoryId: 2,
  },

  // Десерты
  {
    name: 'Десерт с OREO',
    imageUrl: 'https://s7d1.scene7.com/is/image/mcdonalds/DC_202002_3832_OREOMcFlurry_1564x1564-1:nutrition-calculator-tile',
    categoryId: 3,
  },
  {
    name: 'Десерт с M&M`s',
    imageUrl: 'https://s7d1.scene7.com/is/image/mcdonalds/DC_202002_3830_MandMMcFlurry_1564x1564-1:nutrition-calculator-tile',
    categoryId: 3,
  },
  {
    name: 'Карамельное мороженое',
    imageUrl: 'https://s7d1.scene7.com/is/image/mcdonalds/DC_201907_0345_CaramelSundae_1564x1564-1:nutrition-calculator-tile',
    categoryId: 3,
  },

  // Соусы
  {
    name: 'Соус "Сырный"',
    imageUrl: 'https://danar.ru/_next/image?url=https%3A%2F%2Fdanar.ru%2Fi%2Fuploads%2F1738747728-photo-2025-02-05-122548jpeg.jpg&w=3840&q=75',
    categoryId: 4,
  },
  {
    name: 'Соус "Барбекью"',
    imageUrl: 'https://danar.ru/_next/image?url=https%3A%2F%2Fdanar.ru%2Fi%2Fuploads%2F1664442840-barbekyu-newpng.jpg&w=3840&q=75',
    categoryId: 4,
  },
  {
    name: 'Соус "Чесночный"',
    imageUrl: 'https://danar.ru/_next/image?url=https%3A%2F%2Fdanar.ru%2Fi%2Fuploads%2F1738747742-photo-2025-02-05-122540jpeg.jpg&w=3840&q=75',
    categoryId: 4,
  },
];
