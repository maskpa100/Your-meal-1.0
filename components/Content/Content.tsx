'use client';
import Image from 'next/image';
import s from './Content.module.scss';
import { useEffect, useState } from 'react';
import { ModalProduct } from '../ModalProduct/ModalProduct';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import { Sidebar } from '../Sidebar/Sidebar';
import { ProductVolumeDecrement } from '@/utils/ProductVolumeDecrement';
import { ProductVolumeIncrement } from '@/utils/ProductVolumeIncrement';
import { LoadMore } from './load-more';
import { ModalOrder } from '../ModalOrder/ModalOrder';
import { CookiesArray } from './types';
import { list } from '@/data/NavList';
import { ProductType } from '@/app/Types';

type Props = {
  products: ProductType[];
  cookieProducts: string | undefined;
  category: string;
};

export const Content = ({ products, cookieProducts, category }: Props) => {
  const [modal, setModal] = useState(false);
  const [cookiesState, setCookiesState] = useState(cookieProducts);
  const [idModal, setItModal] = useState(1);
  const [stateProducts, setStateProducts] = useState(products);
  const [order, setOrder] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  //console.log(cookiesState);

  function handleOpenModal(id: number) {
    setModal(!modal);
    setItModal(id);
    router.push(`/${category}/?product=${id}`, { scroll: false });
  }

  const prodoct = searchParams.get('product');

  useEffect(() => {
    if (prodoct !== null && prodoct !== undefined) {
      const id = parseInt(prodoct, 10);
      setItModal(id);
      setModal(true);
    }
  }, [prodoct]);

  function updatedCookie(currentProducts: string) {
    setCookiesState(currentProducts);
    Cookies.set('products', currentProducts);
  }

  function handlerIncrement(id: number) {
    // увеличить
    const result = ProductVolumeIncrement(id, cookiesState, stateProducts);
    updatedCookie(result);
  }

  function handlerDecrement(id: number, allDelete?: string) {
    // уменьшить
    if (cookiesState) {
      const result = ProductVolumeDecrement(id, cookiesState, allDelete);
      updatedCookie(result);
    }
  }

  const cookiesArray: CookiesArray[] = cookiesState ? JSON.parse(cookiesState) : [];

  const listItem = list.find((item) => item.url === category);

  return (
    <>
      {order && <ModalOrder setOrder={setOrder} cookiesArray={cookiesArray} />}
      <Sidebar
        cookiesArray={cookiesArray}
        handlerIncrement={handlerIncrement}
        handlerDecrement={handlerDecrement}
        updatedCookie={updatedCookie}
        handleOpenModal={handleOpenModal}
        setOrder={setOrder}
      />
      <div className={s.content}>
        {modal && (
          <ModalProduct
            category={category}
            setModal={setModal}
            id={idModal}
            cookiesState={cookiesState}
            handlerIncrement={handlerIncrement}
            handlerDecrement={handlerDecrement}
          />
        )}
        <div className={s.title}> {listItem && listItem.title}</div>
        <div className={s.items}>
          {stateProducts.map((item: ProductType, index: number) => (
            <div className={s.item} key={index}>
              <div
                className={s.img}
                onClick={() => {
                  handleOpenModal(item.id);
                }}
              >
                <Image width={276} height={220} src={`/api/img?file=${item.img}`} alt="Бургеры" />
              </div>
              <div className={s.price}>{item.price}₽</div>
              <div className={s.titleProduct}>{item.title}</div>
              <div className={s.weight}>{item.weight}г</div>
              {cookiesArray.some((cookieItem: any) => cookieItem.id === item.id) ? (
                <div
                  className={`${s.button} ${s.buttonDelete}`}
                  onClick={() => {
                    handlerDecrement(item.id);
                  }}
                >
                  Удалить
                </div>
              ) : (
                <div
                  className={`${s.button} ${s.buttonAdd}`}
                  onClick={() => {
                    handlerIncrement(item.id);
                  }}
                >
                  Добавить
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <LoadMore category={category} setStateProducts={setStateProducts} />
    </>
  );
};
