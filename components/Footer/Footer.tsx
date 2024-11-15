import Image from 'next/image';
import s from './Footer.module.scss';
import Link from 'next/link';
export const Footer = () => {
  function PhoneLink() {
    const phoneNumber = '+7(930)833-38-11';
    return (
      <a className={s.tel} href={`tel:${phoneNumber}`}>
        {phoneNumber}
      </a>
    );
  }
  return (
    <>
      <hr className={s.hr} />
      <div className={s.footer}>
        <div>
          <Image width={300} height={57} src="/img/logo.svg" alt="Logo" />
        </div>
        <div className={s.telephone}>
          <div className={s.text}>Номер для заказа</div>
          <div className={s.number}>
            <Image width={24} height={24} src="/icons/Call.svg" alt="Call" />
            <PhoneLink />
          </div>
        </div>
        <div className={s.link}>
          <span>Мы в соцсетях.</span>
          <div className={s.icons}>
            <Link href="https://telegram.org/" target="_blank">
              <Image width={36} height={36} src="/icons/telegram.svg" alt="telegram" />
            </Link>
            <Link href="https://vk.com" target="_blank">
              <Image width={36} height={36} src="/icons/vk.svg" alt="telegram" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
