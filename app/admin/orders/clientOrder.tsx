'use client';
import { OrderType } from '@/app/Types';
import s from './style.module.scss';
import { useState } from 'react';
import { deleteOrder } from '@/app/actions';
import ModalData from './ModalData/ModalData';
import ModalOrder from './ModalOrder/ModalOrder';
import { toast } from 'react-toastify';

type Props = {
  ServerOrders: OrderType[];
};
export default function ClientOrders({ ServerOrders }: Props) {
  const [orders, setOrders] = useState(ServerOrders);
  const [modalData, setModalData] = useState(false);
  const [modalOrder, setModalOrder] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);

  async function handlerDelete(id: number) {
    const result = await deleteOrder(id);
    if (result?.status) {
      const newOrders = orders.filter((item) => item.id !== id);
      setOrders(newOrders);
      toast.success('Заказ удален');
    }
  }
  function handlerOpenData(id: number) {
    const order = orders.find((item) => item.id === id);
    setSelectedOrder(order || null);
    setModalData(true);
  }
  function handlerOpenOrder(id: number) {
    const order = orders.find((item) => item.id === id);
    setSelectedOrder(order || null);
    setModalOrder(true);
  }
  return (
    <>
      {modalData && <ModalData setModalData={setModalData} order={selectedOrder} />}
      {modalOrder && <ModalOrder setModalOrder={setModalOrder} order={selectedOrder} />}
      <div className={s.wrapper}>
        <h1>Заказы</h1>
        <table className={s.table}>
          <tbody>
            <tr>
              <th>Имя</th>
              <th>Номер телефона</th>
              <th>Самовывоз или доставка</th>
              <th>Действия</th>
            </tr>
            {orders.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>
                  <div className={s.tel}>{item.tel}</div>
                </td>
                <td>{item.receive}</td>
                <td>
                  <div className={s.actions}>
                    <div
                      className={s.data}
                      onClick={() => {
                        handlerOpenData(item.id);
                      }}
                    >
                      Данные
                    </div>
                    <div
                      className={s.order}
                      onClick={() => {
                        handlerOpenOrder(item.id);
                      }}
                    >
                      Заказ
                    </div>
                    <div
                      className={s.delete}
                      onClick={() => {
                        handlerDelete(item.id);
                      }}
                    >
                      Удалить
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
