import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Header.module.scss';
import Icons from '../images/Icons';
import CabinetMenu from './Cabinet/CabinetMenu';
import Menu from './Menu';
import AuthPopup from './Cabinet/AuthPopup';

const Header: FC = () => {
  const nav = [
    { title: 'Сейчас смотрят', href: '/category/watching' },
    { title: 'Новинки', href: '/category/last' },
    { title: 'Фильмы', href: '/category/films' },
    { title: 'Сериалы', href: '/category/series' },
    { title: 'Мультфильмы', href: '/category/cartoons' },
    { title: 'Телепередачи', href: '/category/show' },
    { title: 'Аниме', href: '/category/animation' },
  ];

  const [opened, setOpen] = useState<boolean>(false);
  const [authPopup, setAuthPopup] = useState<boolean>(false);
  const { asPath } = useRouter();
  return (
    <header className={styles.container}>
      {authPopup && <AuthPopup setAuthPopup={setAuthPopup} />}
      <>
        {!opened ? (
          <Icons icon='MenuIcon' onClick={() => setOpen(true)} className={styles.menu_icon} />
        ) : (
          <Icons icon='CloseIcon' onClick={() => setOpen(false)} className={styles.menu_icon} />
        )}
        {opened && <Menu setOpen={setOpen} />}
        <Link href={'/'}>
          <a className={styles.logo}>Дядька в кино</a>
        </Link>
        <div className={styles.icons}>
          <Link href='/search'>
            <a className={styles.icon}>
              <Icons icon='SearchIcon' />
            </a>
          </Link>
          <Link href='/favorites'>
            <a className={styles.icon}>
              <Icons icon='BookmarkIcon' />
            </a>
          </Link>
          <span className={styles.icon} onClick={() => setAuthPopup(true)}>
            <Icons icon='PersonIcon' />
          </span>
        </div>
      </>
      <nav className={styles.nav}>
        <div className={styles.categories}>
          {nav?.map(({ href, title }, key) => (
            <div key={key}>
              <Link href={href} passHref>
                <a className={`${styles.item}${asPath === href ? ` ${styles.item_active}` : ''}`}>
                  {title}
                </a>
              </Link>
            </div>
          ))}
        </div>
      </nav>
      <Link href='/search'>
        <a className={styles.search_icon}>
          <Icons icon='SearchIcon' />
        </a>
      </Link>
      <Link href='/favorites'>
        <a className={`${styles.item}${asPath === '/favorites' ? ` ${styles.item_active}` : ''}`}>
          Избранное
        </a>
      </Link>
      <CabinetMenu />
    </header>
  );
};

export default Header;
