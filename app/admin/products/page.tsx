'use client';
import { list } from '@/data/NavList';
import s from './style.module.scss';
import { deleteProduct, getProductsAll } from '@/app/actions';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ModalProduct } from '@/components/ModalProduct/ModalProduct';
import Link from 'next/link';
import { ProductType } from '@/app/Types';

export default function Product() {
  const [products, setProducts] = useState<ProductType[]>();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(0);
  function productBlocked() {
    toast.error('Продукт заблокирован в базе данных разработчиком');
  }
  const receive = async (categorys: string) => {
    const products: ProductType[] = await getProductsAll(categorys);
    setProducts(products);
    setSelectedCategory(categorys);
  };
  const deleteImg = async (id: number, blocking: boolean) => {
    if (blocking) {
      productBlocked();
    } else {
      const result = await deleteProduct(id);
      if (result?.status) {
        toast.success('Продукт удален');
        receive(selectedCategory);
      }
    }
  };
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    receive(selectedCategory);
  };
  return (
    <div className={s.wrapper}>
      {modal && (
        <ModalProduct setModal={setModal} id={id} category={selectedCategory} admin="admin" />
      )}
      <h1>Тавары</h1>
      <div className={s.category}>
        <select className={s.items} name="category" onChange={handleCategoryChange}>
          <option>Выберите категорию</option>
          {list.map((item, index) => (
            <option key={index} value={item.url}>
              {item.title}
            </option>
          ))}
        </select>
      </div>
      <table className={s.table}>
        <tbody>
          <tr>
            <th>Наименование товара</th>
            <th>Цена</th>
            <th>Действия</th>
          </tr>
          {products &&
            products.map((product: ProductType, index: number) => (
              <tr key={index}>
                <td>{product.title}</td>
                <td>{product.price} руб</td>
                <td>
                  <div className={s.actions}>
                    <div
                      className={s.watch}
                      onClick={() => {
                        setModal(true);
                        setId(product.id);
                      }}
                    >
                      Посмотреть
                    </div>
                    <Link
                      className={s.editLink}
                      href={product.blocking ? '#' : `edit-product/${product.id}`}
                      onClick={product.blocking ? productBlocked : undefined}
                    >
                      <div className={`${s.edit} ${product.blocking ? s.blocked : s.active}`}>
                        Изменить
                      </div>
                    </Link>
                    <div
                      className={`${s.delete} ${product.blocking ? s.blocked : s.active}`}
                      onClick={() => {
                        deleteImg(product.id, product.blocking);
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
  );
}
