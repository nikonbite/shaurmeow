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

async function up() {
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

  const shaurma1 = await prisma.product.create({
    data: {
      name: 'Классическая шаурма',
      imageUrl: 'https://danar.ru/_next/image?url=https%3A%2F%2Fdanar.ru%2Fi%2Fuploads%2F1732880887-danar-v-lavashe-s-kuriceyjpg.jpg&w=3840&q=75',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 4),
      },
    }
  })

  const shaurma2 = await prisma.product.create({
    data: {
      name: 'Шаурма с курицей и грибами',
      imageUrl: 'https://danar.ru/_next/image?url=https%3A%2F%2Fdanar.ru%2Fi%2Fuploads%2F1732880801-danar-v-lavashe-po-derevenski-s-kuriceyjpg.jpg&w=3840&q=75',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(4, 8),
      },
    }
  })

  const shaurma3 = await prisma.product.create({
    data: {
      name: 'Шаурма с говядиной и овощами',
      imageUrl: 'https://danar.ru/_next/image?url=https%3A%2F%2Fdanar.ru%2Fi%2Fuploads%2F1732880956-danar-v-lavashe-s-kuriceyjpg.jpg&w=3840&q=75',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(8, 12),
      },
    }
  })

  const shaurma4 = await prisma.product.create({
    data: {
      name: 'Шаурма с креветками и авокадо',
      imageUrl: 'https://danar.ru/_next/image?url=https%3A%2F%2Fdanar.ru%2Fi%2Fuploads%2F1732880819-danar-v-lavashe-po-meksikanski-s-kuriceyjpg.jpg&w=3840&q=75',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(12, 16),
      },
    }
  })

  const shaurma5 = await prisma.product.create({
    data: {
      name: 'Шаурма с индейкой и клюквой',
      imageUrl: 'https://danar.ru/_next/image?url=https%3A%2F%2Fdanar.ru%2Fi%2Fuploads%2F1732880989-danar-v-lavashe-syrnyy-s-kuriceyjpg.jpg&w=3840&q=75',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(16, 20),
      },
    }
  })


  await prisma.productItem.createMany({
    data: [
      // Шаурма "Классическая"
      generateProductItem({ productId: shaurma1.id, shaurmaType: 1, size: 'M' }),
      generateProductItem({ productId: shaurma1.id, shaurmaType: 1, size: 'L' }),
      generateProductItem({ productId: shaurma1.id, shaurmaType: 1, size: 'XL' }),
      generateProductItem({ productId: shaurma1.id, shaurmaType: 2, size: 'M' }),
      generateProductItem({ productId: shaurma1.id, shaurmaType: 2, size: 'L' }),
      generateProductItem({ productId: shaurma1.id, shaurmaType: 2, size: 'XL' }),

      // Шаурма "Шаурма с курицей и грибами"
      generateProductItem({ productId: shaurma2.id, shaurmaType: 1, size: 'M' }),
      generateProductItem({ productId: shaurma2.id, shaurmaType: 1, size: 'L' }),
      generateProductItem({ productId: shaurma2.id, shaurmaType: 1, size: 'XL' }),
      generateProductItem({ productId: shaurma2.id, shaurmaType: 2, size: 'M' }),
      generateProductItem({ productId: shaurma2.id, shaurmaType: 2, size: 'L' }),
      generateProductItem({ productId: shaurma2.id, shaurmaType: 2, size: 'XL' }),

      // Шаурма "Шаурма с говядиной и овощами"
      generateProductItem({ productId: shaurma3.id, shaurmaType: 1, size: 'M' }),
      generateProductItem({ productId: shaurma3.id, shaurmaType: 1, size: 'L' }),
      generateProductItem({ productId: shaurma3.id, shaurmaType: 1, size: 'XL' }),
      generateProductItem({ productId: shaurma3.id, shaurmaType: 2, size: 'M' }),
      generateProductItem({ productId: shaurma3.id, shaurmaType: 2, size: 'L' }),
      generateProductItem({ productId: shaurma3.id, shaurmaType: 2, size: 'XL' }),

      // Шаурма "Шаурма с креветками и авокадо"
      generateProductItem({ productId: shaurma4.id, shaurmaType: 1, size: 'L' }),
      generateProductItem({ productId: shaurma4.id, shaurmaType: 1, size: 'XL' }),
      generateProductItem({ productId: shaurma4.id, shaurmaType: 2, size: 'M' }),
      generateProductItem({ productId: shaurma4.id, shaurmaType: 2, size: 'L' }),
      generateProductItem({ productId: shaurma4.id, shaurmaType: 2, size: 'XL' }),


      // Шаурма "Шаурма с индейкой и клюквой"
      generateProductItem({ productId: shaurma5.id, shaurmaType: 1, size: 'M' }),
      generateProductItem({ productId: shaurma5.id, shaurmaType: 1, size: 'L' }),
      generateProductItem({ productId: shaurma5.id, shaurmaType: 1, size: 'XL' }),
      generateProductItem({ productId: shaurma5.id, shaurmaType: 2, size: 'M' }),
      generateProductItem({ productId: shaurma5.id, shaurmaType: 2, size: 'L' }),
      generateProductItem({ productId: shaurma5.id, shaurmaType: 2, size: 'XL' }),

      // Остальные продукты
      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
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

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
