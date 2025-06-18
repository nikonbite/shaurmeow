import {
  Container,
  TopBar,
  ProductsGroupList,
} from '@/shared/components/shared';
import { GetSearchParams, findShaurmas } from '@/shared/lib/find-shaurmas';

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
  const categories = await findShaurmas(searchParams);
  const categoriesWithProducts = categories.filter((category: any) => Array.isArray(category.products) && category.products.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 dark:from-background dark:to-background/90">
      {/* Верхняя панель с категориями и фильтрами */}
      <div className="relative">
        <TopBar categories={categoriesWithProducts} />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background pointer-events-none" />
      </div>

      <Container className="mt-32 sm:mt-36 md:mt-40 pb-14">
        {/* Список товаров */}
        <div className="flex flex-col gap-12 sm:gap-16 md:gap-20">
          {categoriesWithProducts.map(
            (category: any) => (
              <div key={category.id} className="relative">
                <div className="absolute -top-6 left-0 w-full h-6 bg-gradient-to-b from-transparent to-background/50 dark:to-background/30 pointer-events-none" />
                <ProductsGroupList
                  title={category.name}
                  categoryId={category.id}
                  items={category.products}
                />
                <div className="h-px w-full bg-gradient-to-r from-transparent via-border/40 to-transparent mt-12" />
              </div>
            )
          )}
        </div>
      </Container>
    </div>
  );
}
