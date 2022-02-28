import { FC } from 'react';
import { AppProps } from 'next/app';
import '../models/init';
import '../styles/App.sass';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Slider.scss';
import '../styles/Player.sass';
import '../styles/Navigation.sass';
import 'swiper/swiper.min.css';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import Router from 'next/router';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Link from 'next/link';
import { Provider } from 'effector-react/ssr';
import { fork } from 'effector';
import { root } from '@models/Root';

export const isBrowser = () => typeof window !== 'undefined';

const MyApp: FC<AppProps & { err: any }> = ({ Component, pageProps, err }) => {
  Router.events.on('routeChangeStart', () => NProgress.start());
  Router.events.on('routeChangeComplete', () => NProgress.done());
  Router.events.on('routeChangeError', () => NProgress.done());

  const scope = fork(root, { values: pageProps.store });

  return (
    <Provider value={scope}>
      <a
        href='https://www.instagram.com/explore/tags/%D0%BD%D0%B5%D1%82%D0%B2%D0%BE%D0%B9%D0%BD%D0%B5/'
        target='_blank'
        rel='noreferrer'
        className='war'
      >
        #НЕТВОЙНЕ
      </a>
      <Header />
      <Component {...pageProps} err={err} />
      <Footer />
    </Provider>
  );
};

export default MyApp;
