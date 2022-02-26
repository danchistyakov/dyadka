import { FC, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Hero from "../components/Hero";
import Auth from "../store/Auth";

const Home = ({ data, activateData }) => {
  const AuthPopup = dynamic(() => import("../components/Cabinet/AuthPopup"));
  const [authPopup, setAuthPopup] = useState<boolean>(false);

  useEffect(() => {
    if (activateData?.email && activateData?.verificationStatus === "expired") {
      Auth.setMessage(
        "Вы успешно активировали свой аккаунт. Теперь Вы можете войти в него используя форму ниже."
      );
      setAuthPopup(true);
    }
  }, [activateData]);

  return (
    <div>
      <Head>
        <title>Привет, это Дядька в кино!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {authPopup && <AuthPopup setAuthPopup={setAuthPopup} />}
      <Hero data={data.items} />
    </div>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const { verificationStatus, email } = context.query;
  const activateData = {
    verificationStatus: verificationStatus || null,
    email: email || null,
  };
  const response = await fetch(
    "https://blackend.top/api/video/selection?name=main-slider"
  );
  const data = await response.json();

  return {
    props: {
      data,
      activateData,
    },
  };
}
