'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { signOut } from '@/auth';
import s from './style.module.scss';
export function AdminSadeBar() {
  const pathname = usePathname();
  const links = [
    { url: '/admin', text: 'Главная' },
    { url: '/admin/add-product', text: 'Добавить товары' },
    { url: '/admin/products', text: 'Товары' },
    { url: '/admin/orders', text: 'Заказы' },
  ];
  async function handleLogOut() {
    await signOut();
  }
  return (
    <>
      <div className={s.sadeBar}>
        <div className={s.list}>
          {links.map((item, index) => (
            <Link key={index} className={pathname === item.url ? s.active : ''} href={item.url}>
              {item.text}
            </Link>
          ))}
        </div>

        <div className={s.logOut} onClick={handleLogOut}>
          Выход из системы
        </div>
      </div>
    </>
  );
}
