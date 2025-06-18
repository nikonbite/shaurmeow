import { Prisma } from '@prisma/client';
import { categories, _ingredients, products } from './constants';
import { prisma } from './prisma-client';
import { hashSync } from 'bcrypt';

const randomDecimalNumber = (min: number, max: number) => {
  return Number((Math.random() * (max - min) + min).toFixed(2));
};

const generateProductItem = ({
  productId,
  shaurmaType,
  size,
}: {
  productId: number;
  shaurmaType?: 1 | 2;
  size?: 'M' | 'L' | 'XL';
}) => {
  return {
    productId,
    price: randomDecimalNumber(190, 600),
    shaurmaType,
    size,
  } as Prisma.ProductItemUncheckedCreateInput;
};

async function clear() {
  // 🚫 Без TRUNCATE — используем deleteMany
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.productItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.ingredient.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
}

async function seed() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'Тестовый пользователь',
        email: 'user@user.me',
        password: hashSync('123123', 10),
        verified: new Date(),
        role: 'USER',
      },
      {
        fullName: 'Администратор',
        email: 'admin@admin.me',
        password: hashSync('123123', 10),
        verified: new Date(),
        role: 'ADMIN',
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: _ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  // Теперь создаём конкретные шаурмы
  const shaurma1 = await prisma.product.create({
    data: {
      name: 'Классическая шаурма',
      imageUrl: 'https://danar.ru/_next/image?url=https%3A%2F%2Fdanar.ru%2Fi%2Fuploads%2F1732880887-danar-v-lavashe-s-kuriceyjpg.jpg&w=3840&q=75',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 4).map((i) => ({ id: i.id })),
      },
    },
  });

  const shaurma2 = await prisma.product.create({
    data: {
      name: 'Шаурма с курицей и грибами',
      imageUrl: 'https://danar.ru/_next/image?url=https%3A%2F%2Fdanar.ru%2Fi%2Fuploads%2F1732880801-danar-v-lavashe-po-derevenski-s-kuriceyjpg.jpg&w=3840&q=75',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(4, 8).map((i) => ({ id: i.id })),
      },
    },
  });

  const shaurma3 = await prisma.product.create({
    data: {
      name: 'Шаурма с говядиной и овощами',
      imageUrl: 'https://danar.ru/_next/image?url=https%3A%2F%2Fdanar.ru%2Fi%2Fuploads%2F1732880956-danar-v-lavashe-s-kuriceyjpg.jpg&w=3840&q=75',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(8, 12).map((i) => ({ id: i.id })),
      },
    },
  });

  const shaurma4 = await prisma.product.create({
    data: {
      name: 'Шаурма с креветками и авокадо',
      imageUrl: 'https://danar.ru/_next/image?url=https%3A%2F%2Fdanar.ru%2Fi%2Fuploads%2F1732880819-danar-v-lavashe-po-meksikanski-s-kuriceyjpg.jpg&w=3840&q=75',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(12, 16).map((i) => ({ id: i.id })),
      },
    },
  });

  const shaurma5 = await prisma.product.create({
    data: {
      name: 'Шаурма с индейкой и клюквой',
      imageUrl: 'https://danar.ru/_next/image?url=https%3A%2F%2Fdanar.ru%2Fi%2Fuploads%2F1732880989-danar-v-lavashe-syrnyy-s-kuriceyjpg.jpg&w=3840&q=75',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(16, 20).map((i) => ({ id: i.id })),
      },
    },
  });

  await prisma.productItem.createMany({
    data: [
      ...[
        shaurma1, shaurma2, shaurma3, shaurma4, shaurma5
      ].flatMap(shaurma => [
        generateProductItem({ productId: shaurma.id, shaurmaType: 1, size: 'M' }),
        generateProductItem({ productId: shaurma.id, shaurmaType: 1, size: 'L' }),
        generateProductItem({ productId: shaurma.id, shaurmaType: 1, size: 'XL' }),
        generateProductItem({ productId: shaurma.id, shaurmaType: 2, size: 'M' }),
        generateProductItem({ productId: shaurma.id, shaurmaType: 2, size: 'L' }),
        generateProductItem({ productId: shaurma.id, shaurmaType: 2, size: 'XL' }),
      ]),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: '11111',
      },
      {
        userId: 2,
        totalAmount: 0,
        token: '222222',
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });
}

async function main() {
  try {
    await clear();
    await seed();
    console.log('✅ Seeding done!');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
