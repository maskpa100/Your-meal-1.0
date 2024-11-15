import s from './Modal.module.scss';
type Props = {
  children: React.ReactNode;
};
export const Modal = ({ children }: Props) => {
  return (
    <div className={s.modal}>
      <div className={s.modalContent}>{children}</div>
    </div>
  );
};
