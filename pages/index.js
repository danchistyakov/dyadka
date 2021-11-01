import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Hero from "../Components/Hero";
import Auth from "../Store/Auth";
import AuthPopup from "../Components/Cabinet/AuthPopup";

const Home = ({ data, activateData }) => {
  console.log(activateData);
  const [authPopup, setAuthPopup] = useState(false);

  useEffect(() => {
    if (activateData?.email && activateData?.verificationStatus === "expired") {
      Auth.setMessage(
        "Вы успешно активировали свой аккаунт. Теперь Вы можете войти в него используя форму ниже."
      );
      setAuthPopup(true);
    }
  }, []);
  return (
    <div>
      <Head>
        <title>Привет, это Дядька в кино!</title>
        <meta name="description" content="Generated by create next app" />
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
    }, // will be passed to the page component as props
  };
}
