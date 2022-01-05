import { FC } from "react";
import { AppProps } from "next/app";
import "../styles/App.sass";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Slider.scss";
import "../styles/Player.sass";
import "../styles/Navigation.sass";
import "swiper/swiper.min.css";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import Router from "next/router";
import "react-lazy-load-image-component/src/effects/blur.css";

const MyApp: FC<AppProps & { err: any }> = ({ Component, pageProps, err }) => {
  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());

  return (
    <>
      <Header />
      <Component {...pageProps} err={err} />
      <Footer />
    </>
  );
};

export default MyApp;
