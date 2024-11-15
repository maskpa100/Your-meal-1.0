import { getProducts } from '@/app/actions';
import { ProductType } from '@/app/Types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

type Props = {
  category: string;
  setStateProducts: Dispatch<SetStateAction<ProductType[]>>;
};

export function LoadMore({ category, setStateProducts }: Props) {
  const [pageNumber, setPageNumber] = useState(2);
  const { ref, inView } = useInView();

  const loadMoreProducts = async () => {
    const products = (await getProducts(category, pageNumber)) ?? [];
    console.log(products);

    setStateProducts((prevPosts) => [...prevPosts, ...products]);
    setPageNumber(pageNumber + 1);
  };

  useEffect(() => {
    if (inView) {
      loadMoreProducts();
    }
  }, [inView]);
  return (
    <>
      <div ref={ref}></div>
    </>
  );
}
