import '../styles/App.sass'
import Header from '../Components/Header.js';
import Footer from '../Components/Footer.js';
import '../styles/Slider.sass';
import '../styles/Player.sass';
import '../styles/Navigation.sass';

const MyApp = ({ Component, pageProps }) => {
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
