import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import s from './style.module.scss';
import { Modal } from '@/components/Modal/Modal';
import Image from 'next/image';
import { OrderType, ProductType } from '@/app/Types';
import { getOrderByIds } from '@/app/actions';

type Props = {
  setModalOrder: Dispatch<SetStateAction<boolean>>;
  order: OrderType | null;
};

export default function ModalOrder({ setModalOrder, order }: Props) {
  const [data, setData] = useState<ProductType[]>([]);

  const getVolumeById = (id: number) => {
    const volumeEntry = order?.products.find((entry) => entry.id === id);
    return volumeEntry ? volumeEntry.volume : 0;
  };

  const totalAmount = data.reduce((total, item) => total + item.price * getVolumeById(item.id), 0);

  useEffect(() => {
    if (order?.products) {
      const ids = order.products.map((item) => item.id);
      getOrderByIds(ids)
        .then((fetchedData) => {
          setData(fetchedData);
        })
        .catch((err) => {
          console.error('Error fetching orders:', err);
        });
    }
  }, [order]);

  function handlerClose() {
    setModalOrder(false);
  }
  return (
    <Modal>
      <div
        className={s.close}
        onClick={() => {
          handlerClose();
        }}
      >
        <Image width={24} height={24} src="/icons/close.svg" alt="close" />
      </div>
      <div className={s.wrapper}>
        <h2>Заказ</h2>
        <div className={s.products}>
          {data.map((item: ProductType, index) => (
            <div className={s.product} key={index}>
              <div className={s.left}>
                <Image width={124.8} height={101.4} src={`/products/${item.img}`} alt="" />
              </div>
              <div className={s.right}>
                <p className={s.title}>{item.title}</p>
                <p>Цена {item.price}р</p>
                <p>Количество {getVolumeById(item.id)}</p>
                <p className={s.total}>Итог {item.price * getVolumeById(item.id)}р</p>
              </div>
            </div>
          ))}
          <div className={s.allTotal}>Итог {totalAmount}р</div>
        </div>
      </div>
    </Modal>
  );
}
