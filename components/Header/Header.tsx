import Image from 'next/image';
import s from './Header.module.scss';
export const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.ellipse}></div>
      <div className={s.logo}>
        <Image width={153} height={35} src="/icons/logo.svg" alt="Logo" />
      </div>
      <div className={s.block}>
        <div className={s.left}>
          <Image width={253} height={289} src="/img/header_burger.svg" alt="Бургер" />
        </div>
        <div className={s.right}>
          <div className={s.title}>
            Только самые
            <br />
            <span className="orange">сочные бургеры!</span>
          </div>
          <div className={s.delivery}>Бесплатная доставка от 599₽</div>
        </div>
      </div>
    </header>
  );
};
