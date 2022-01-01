import "../styles/App.sass";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import "../styles/Slider.sass";
import "../styles/Player.sass";
import "../styles/Navigation.sass";
import "swiper/swiper.min.css";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import Router from "next/router";
import "react-lazy-load-image-component/src/effects/blur.css";

const MyApp = ({ Component, pageProps }) => {
  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());

  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default MyApp;
