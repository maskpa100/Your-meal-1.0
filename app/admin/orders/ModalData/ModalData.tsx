import { Dispatch, SetStateAction } from 'react';
import s from './style.module.scss';
import { Modal } from '@/components/Modal/Modal';
import Image from 'next/image';
import { OrderType } from '@/app/Types';

type Props = {
  setModalData: Dispatch<SetStateAction<boolean>>;
  order: OrderType | null;
};

export default function ModalData({ setModalData, order }: Props) {
  function handlerClose() {
    setModalData(false);
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
        <h2>Данные клиента</h2>
        <p>{order?.receive}</p>
        <p>
          <span>Имя:</span>
          <span>{order?.name}</span>
        </p>
        <p>
          <span>Телефон:</span>
          <span>{order?.tel}</span>
        </p>
        <p>
          <span>Адрес:</span>
          <span>{order?.address}</span>
        </p>
        <p>
          <span>Этаж:</span>
          <span>{order?.floor}</span>
        </p>
        <p>
          <span>Домофон:</span>
          <span>{order?.intercom === '' ? 'Не указана' : order?.intercom}</span>
        </p>
      </div>
    </Modal>
  );
}
