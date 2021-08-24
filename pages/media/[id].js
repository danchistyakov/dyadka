import React, { useEffect } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import Staff from "../../Components/Staff";
import Episodes from "../../Components/Episodes";
import FilmInfo from "../../Components/FilmInfo";
import Similar from "../../Components/Similar";
import Info from "../../Store/Info";
import Video from "../../Store/Video";
import Layout from "../../Store/Layout";
import Playlist from "../../Store/Playlist";
import style from "../../styles/Film.module.sass";
import ErrorPage from "next/error";
import Head from "next/head";

const Film = ({ info }) => {
  useEffect(() => {
    const Fetch = async () => {
      Layout.setWatch(false);
      Info.videoCDN(null);
      Info.setInfo(null);
      Info.setDetails(null);
      Video.setUrl(null);
      Playlist.setTranslations(null);
      Info.setInfo(info);
    };
    Fetch();
  }, [info.hdrezka_id]);

  if (info !== undefined) {
    return (
      <SkeletonTheme color="#202020" highlightColor="#444">
        <Head>
          <title>{`${info.title} — смотреть у Дядьки онлайн без регистрации и СМС`}</title>
        </Head>
        <FilmInfo info={info} />
        <div className={style.film_container} key={info.hdrezka_id}>
          {info.serial && <Episodes info={info} />}
          <Staff kp={info.kp_id} />
          <Similar kp={info.kp_id} />
        </div>
      </SkeletonTheme>
    );
  } else {
    return <ErrorPage statusCode={404} />;
  }
};

export const getServerSideProps = async (context) => {
  const id = context.params.id;
  const { source } = context.query;
  console.log(source);
  var info;

  if (source === undefined) {
    const response = await fetch(`https://api.dyadka.gq/film?id=${id}`);
    info = await response.json();
  }

  if (source === "kp") {
    const response = await fetch(`https://api.dyadka.gq/film?id=${id}`);
    info = await response.json();
  }

  return {
    props: {
      info,
    },
  };
};

export default Film;
