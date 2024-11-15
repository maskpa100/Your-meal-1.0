import Image from 'next/image';
import s from './Sidebar.module.scss';
import { useWindowSize } from 'react-use';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CookiesArray } from '../Content/types';

type Props = {
  cookiesArray: CookiesArray[];
  handlerIncrement: (id: number) => void;
  handlerDecrement: (id: number, allDelete?: string) => void;
  updatedCookie: (currentProducts: string) => void;
  handleOpenModal: (id: number) => void;
  setOrder: Dispatch<SetStateAction<boolean>>;
};

export const Sidebar = ({
  cookiesArray,
  handlerDecrement,
  handlerIncrement,
  updatedCookie,
  handleOpenModal,
  setOrder,
}: Props) => {
  const { width } = useWindowSize();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenBasket = () => {
    if (width < 980) {
      setOpenModal(!openModal);
    }
  };
  const [style, setStyle] = useState({});

  const totalPrices = (items: { volume: number; price: number }[]): number => {
    let total = 0;
    items.forEach((item) => {
      total += item.volume * item.price;
    });
    return total;
  };

  const countProducts = (items: { volume: number }[]): number => {
    let volumeSum = 0;
    items.forEach((item) => {
      volumeSum += item.volume;
    });
    return volumeSum;
  };
  const orderSum =
    cookiesArray.length === 0
      ? 0
      : totalPrices(cookiesArray) >= 599
        ? totalPrices(cookiesArray)
        : totalPrices(cookiesArray) + 300;
  useEffect(() => {
    const styleBlock = {
      display: width > 980 ? '' : openModal ? 'flex' : 'none',
    };
    setStyle(styleBlock);
  }, [openModal, width]);

  return (
    <div className={s.sidebar}>
      <div className={s.header} onClick={handleOpenBasket}>
        <div className={s.title}>
          <p>Корзина</p>
          <div className={openModal ? s.arrowTop : s.arrowBottom}></div>
        </div>
        <div className={s.count}>{countProducts(cookiesArray)}</div>
      </div>
      <div className={s.block} style={style}>
        <div className={s.hr}></div>
        <div>
          {cookiesArray.map((product: CookiesArray, index: number) => (
            <div key={index}>
              <div className={s.item}>
                <div className={s.info}>
                  <div className={s.left}>
                    <Image
                      width={64}
                      height={52}
                      src={`/api/img?file=${product.img}`}
                      alt=""
                      onClick={() => {
                        handleOpenModal(product.id);
                      }}
                    />
                  </div>
                  <div className={s.right}>
                    <div
                      className={s.title}
                      onClick={() => {
                        handleOpenModal(product.id);
                      }}
                    >
                      {product.title}
                    </div>
                    <div className={s.weight}>{product.weight} г</div>
                    <div className={s.price}>{product.price} ₽</div>
                  </div>
                </div>
                <div className={s.count}>
                  <div
                    className={s.decrement}
                    onClick={() => {
                      handlerDecrement(product.id);
                    }}
                  >
                    -
                  </div>
                  <div className={s.number}>
                    {' '}
                    {cookiesArray.some((cookieItem: any) => cookieItem.id === product?.id) ? (
                      <>{cookiesArray.find((item: any) => item.id === product?.id)?.volume}</>
                    ) : (
                      <>0</>
                    )}
                  </div>
                  <div
                    className={s.intercalate}
                    onClick={() => {
                      handlerIncrement(product.id);
                    }}
                  >
                    +
                  </div>
                </div>
              </div>
              <div
                className={s.delete}
                onClick={() => {
                  handlerDecrement(product.id, 'delete');
                }}
              >
                Удалить
              </div>
              <div className={s.hr}></div>
            </div>
          ))}
          <div className={s.empty}>{cookiesArray.length === 0 && <>Корзина пустая</>}</div>
        </div>
        <div className={s.total}>
          <div>Итого</div>
          <div>{orderSum} ₽</div>
        </div>
        {cookiesArray.length != 0 && (
          <div
            className={s.deleteBasket}
            onClick={() => {
              updatedCookie('[]');
            }}
          >
            Очистить корзину
          </div>
        )}
        <div
          className={s.button}
          onClick={() => {
            setOrder(true);
          }}
        >
          Оформить заказ
        </div>
        <div className={s.bottom}>
          <div className={s.delivery}>
            <Image width={24} height={24} src="/icons/delivery.png" alt="Доставка" />
            {totalPrices(cookiesArray) >= 599 ? (
              <div className={s.text}>Бесплатная доставка</div>
            ) : (
              <div className={s.text}>Доставка 300 ₽</div>
            )}
          </div>
          <div className={s.rollUp} onClick={handleOpenBasket}>
            Свернуть
          </div>
        </div>
      </div>
    </div>
  );
};
