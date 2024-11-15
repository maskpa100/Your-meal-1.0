import { getProduct, isProductExists } from '@/app/actions';
import ProductForm from '@/components/ProductForm/ProductForm';
import { redirect } from 'next/navigation';

export default async function Home({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  if (!isNaN(id) && Number.isFinite(id) && Number.isInteger(id)) {
    const result = await isProductExists(id);
    if (result) {
      const product = await getProduct(id);
      return <ProductForm product={product[0]} formActions="edit" />;
    } else {
      return <>Нет такого продукта</>;
    }
  } else {
    redirect('/404');
  }
}
