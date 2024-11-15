import { ReactNode } from 'react';
import s from './style.module.scss';
import { Header } from '../Header/Header';
import { Nav } from '../Nav/Nav';
import { Sidebar } from '../Sidebar/Sidebar';
import { Footer } from '../Footer/Footer';

type Props = {
  title?: string;
  children: ReactNode;
};

export const ProductsLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div className={s.block}>
        <Nav />
        <div className={s.content}>{children}</div>
        <Footer />
      </div>
    </>
  );
};
