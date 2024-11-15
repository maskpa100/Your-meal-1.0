import Image from 'next/image';
import { Modal } from '../Modal/Modal';
import s from './ModalOrder.module.scss';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Validate, ValidateField } from '@/utils/validate';
import { OrderType } from '@/app/Types';
import { actionSetOrder } from '@/app/actions';
import { CookiesArray, ProductOrder } from '../Content/types';

type Props = {
  setOrder: Dispatch<SetStateAction<boolean>>;
  cookiesArray: CookiesArray[];
};

export const ModalOrder = ({ setOrder, cookiesArray }: Props) => {
  const [orderAdd, setOrderAdd] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderType>();

  const productsOrder: ProductOrder[] = cookiesArray.map((item) => ({
    id: item.id,
    volume: item.volume,
  }));

  const onSubmit = async (data: OrderType) => {
    const result = await actionSetOrder(data, productsOrder);
    if (result.status) {
      setOrderAdd(true);
    }
  };

  return (
    <Modal>
      {orderAdd ? (
        <div className={s.contentOrderOk}>
          <Image
            className={s.close}
            width={24}
            height={24}
            src="/icons/close.svg"
            alt="close"
            onClick={() => {
              setOrder(false);
            }}
          />
          <div className={s.content}>
            <h1 className={s.title}>Заказ успешно добавлен</h1>
            <Image src="/img/ok.png" width={200} height={200} alt="OK" />
          </div>
        </div>
      ) : (
        <div className={s.content}>
          <div className={s.left}>
            <Image src="/img/donut.png" width={302} height={302} alt="donut" />
          </div>
          <div className={s.right}>
            <Image
              className={s.close}
              width={24}
              height={24}
              src="/icons/close.svg"
              alt="close"
              onClick={() => {
                setOrder(false);
              }}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={s.title}>Доставка</div>
              <input
                className={errors.name && s.errorInput}
                type="text"
                placeholder="Ваше имя"
                {...register('name', Validate(ValidateField.Name))}
              />
              {errors.name && <span className={s.error}>{errors.name?.message}</span>}
              <input
                className={errors.tel && s.errorInput}
                type="tel"
                placeholder="Телефон"
                {...register('tel', Validate(ValidateField.Tel))}
              />
              {errors.tel && <span className={s.error}>{errors.tel?.message}</span>}
              <div className={s.receive}>
                <label>
                  <input
                    type="radio"
                    value="Самовывоз"
                    {...register('receive', Validate(ValidateField.Receive))}
                  />
                  <p>Самовывоз</p>
                </label>
                <label>
                  <input
                    type="radio"
                    value="Доставка"
                    {...register('receive', Validate(ValidateField.Receive))}
                  />
                  <p>Доставка</p>
                </label>
              </div>
              {errors.receive && <span className={s.error}>{errors.receive?.message}</span>}
              <input
                className={errors.address && s.errorInput}
                type="text"
                placeholder="Улица, дом, квартира"
                {...register('address', Validate(ValidateField.Address))}
              />
              {errors.address && <span className={s.error}>{errors.address?.message}</span>}
              <div className={s.addressDetails}>
                <input
                  className={errors.floor && s.errorInput}
                  type="number"
                  placeholder="Этаж"
                  {...register('floor', Validate(ValidateField.Floor))}
                />
                <input type="text" placeholder="Домофон" {...register('intercom')} />
              </div>
              {errors.floor && <p className={s.error}>{errors.floor?.message}</p>}
              <button className={s.button} type="submit">
                Оформить
              </button>
            </form>
          </div>
        </div>
      )}
    </Modal>
  );
};
