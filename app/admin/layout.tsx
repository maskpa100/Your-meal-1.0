import s from './style.module.scss';
import { AdminSadeBar } from '@/components/AdminSadeBar/AdminSadeBar';
type Props = {
  children: React.ReactNode;
};

export default function ResponsiveDrawer({ children }: Props) {
  return (
    <>
      <div className={s.header}>
        <h1>Aдмин панель</h1>
      </div>
      <main className={s.main}>
        <AdminSadeBar />
        <div className={s.content}>{children}</div>
      </main>
    </>
  );
}
