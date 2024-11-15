import { Header } from '@/components/Header/Header';
import s from './style.module.scss';
import { Nav } from '@/components/Nav/Nav';
import { Footer } from '@/components/Footer/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
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
}
