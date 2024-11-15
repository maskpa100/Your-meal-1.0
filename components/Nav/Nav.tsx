'use client';
import Image from 'next/image';
import s from './Nav.module.scss';
import { useRef } from 'react';
import { list } from '@/data/NavList';
import { usePathname, useRouter } from 'next/navigation';
type item = {
  title: string;
  img: string;
  url: string;
};
export const Nav = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  function handlerRouter(url: string, index: number) {
    router.push(`/${url}`);
    router.refresh();
  }

  return (
    <div className={s.nav} ref={contentRef}>
      {list.map((item: item, index: number) => (
        <div
          key={index}
          className={`${s.button} ${`/${item.url}` === pathname && s.active}`}
          onClick={() => handlerRouter(item.url, index)}
        >
          <Image width={24} height={24} src={`/icons/${item.img}`} alt={item.title} />
          <span className={s.text}>{item.title}</span>
        </div>
      ))}
    </div>
  );
};
