import { Content } from './Content';
import { getProducts } from '@/app/actions';
import { ProductType } from '@/app/Types';
import { cookies } from 'next/headers';

type Props = {
  category: string;
};

export const ServerContent = async ({ category }: Props) => {
  const cookieStore = cookies();
  const cookieProducts = cookieStore.get('products')?.value;
  const products = (await getProducts(category, 1)) as ProductType[];

  return (
    <>
      <Content products={products} cookieProducts={cookieProducts} category={category} />
    </>
  );
};
