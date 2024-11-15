import Image from 'next/image';
import s from './ModalProduct.module.scss';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Modal } from '../Modal/Modal';
import { getProduct } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { ProductType } from '@/app/Types';

type Props = {
  id: number;
  setModal: Dispatch<SetStateAction<boolean>>;
  cookiesState?: string | undefined;
  handlerIncrement?: (id: number) => void;
  handlerDecrement?: (id: number, deleteProduct?: string) => void;
  category: string;
  admin?: string;
};

export const ModalProduct = ({
  id,
  setModal,
  cookiesState,
  handlerIncrement,
  handlerDecrement,
  category,
  admin,
}: Props) => {
  const router = useRouter();

  const [imgZoom, setImgZoom] = useState(false);
  const [product, setProduct] = useState<ProductType>();
  const dataStructure = product?.structure ? product.structure.split(', ') : [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProduct = await getProduct(id);
        setProduct(fetchedProduct[0]);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    window.addEventListener('popstate', function (event) {
      close();
    });
  }, []);

  function close() {
    setModal(false);
    if (!admin) {
      router.push(`/${category}`, { scroll: false });
    }
  }

  function handleZoom() {
    setImgZoom(!imgZoom);
  }

  const selectedArray = cookiesState ? JSON.parse(cookiesState) : [];

  return (
    <>
      {imgZoom && (
        <div className={s.image}>
          {product && (
            <Image
              className={s.img}
              width={491}
              height={391}
              src={`/api/img?file=${product.img}`}
              alt="product"
              onClick={handleZoom}
            />
          )}
        </div>
      )}

      {product && (
        <Modal>
          <div
            className={s.close}
            onClick={() => {
              close();
            }}
          >
            <Image width={24} height={24} src="/icons/close.svg" alt="close" />
          </div>
          <div className={s.modal}>
            <div className={s.title}>{product?.title}</div>
            <div className={s.blockTop}>
              <div className={s.img}>
                {product && (
                  <Image
                    width={276}
                    height={220}
                    src={`/api/img?file=${product.img}`}
                    alt="product"
                    onClick={handleZoom}
                  />
                )}
              </div>
              <div className={s.text}>
                <div className={s.item}>
                  <div className={s.descriptions}>{product?.descriptions}</div>
                  <div className={s.composition}>
                    Состав:
                    {dataStructure.map((item: string, index: number) => ' ' + item + ',')}
                  </div>
                  <div className={s.info}>
                    {product?.weight}г, {product?.calories} ккал
                  </div>
                </div>
              </div>
            </div>
            {admin != 'admin' && (
              <div className={s.blockBottom}>
                {selectedArray &&
                selectedArray.some((cookieItem: any) => cookieItem.id === product?.id) ? (
                  <div
                    className={`${s.button} ${s.delete}`}
                    onClick={() => {
                      if (product && handlerDecrement) {
                        handlerDecrement(product.id, 'delete');
                      }
                    }}
                  >
                    Удалить
                  </div>
                ) : (
                  <div
                    className={`${s.button} ${s.add}`}
                    onClick={() => {
                      if (product && handlerIncrement) {
                        handlerIncrement(product.id);
                      }
                    }}
                  >
                    Добавить
                  </div>
                )}
                <div className={s.info}>
                  <div className={s.count}>
                    <div
                      className={s.decrement}
                      onClick={() => {
                        if (product && handlerDecrement) {
                          handlerDecrement(product.id);
                        }
                      }}
                    >
                      -
                    </div>
                    <div className={s.number}>
                      {selectedArray.some((cookieItem: any) => cookieItem.id === product?.id) ? (
                        <>{selectedArray.find((item: any) => item.id === product?.id)?.volume}</>
                      ) : (
                        <>0</>
                      )}
                    </div>
                    <div
                      className={s.intercalate}
                      onClick={() => {
                        if (product && handlerIncrement) {
                          handlerIncrement(product.id);
                        }
                      }}
                    >
                      +
                    </div>
                  </div>
                  <div className={s.price}>{product.price}₽</div>
                </div>
              </div>
            )}
            {admin === 'admin' && <div className={s.priceAdmin}>{product.price}₽</div>}
          </div>
        </Modal>
      )}
    </>
  );
};
