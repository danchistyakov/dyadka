import '../styles/App.sass'
import Header from '../Components/Header.js';
import Footer from '../Components/Footer.js';
import '../styles/Slider.sass';
import '../styles/Player.sass';
import '../styles/Navigation.sass';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import Router from 'next/router';

const MyApp = ({ Component, pageProps }) => {
  Router.events.on('routeChangeStart', () => NProgress.start());
  Router.events.on('routeChangeComplete', () => NProgress.done());
  Router.events.on('routeChangeError', () => NProgress.done());

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap" rel="stylesheet" />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
