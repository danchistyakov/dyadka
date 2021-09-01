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
import axios from "axios";

const Film = ({ info, trailer }) => {
  useEffect(() => {
    const Fetch = async () => {
      Layout.setWatch(false);
      Info.videoCDN(null);
      Info.setInfo(null);
      Info.setDetails(null);
      Video.setUrl(null);
      Info.setInfo(info);
      Playlist.setTranslations(info.translations.list);
      Video.setTranslation(
        info.translations.default.id,
        info.translations.default.name
      );
    };
    Fetch();
  }, [info.id]);

  if (info !== undefined) {
    return (
      <SkeletonTheme color="#202020" highlightColor="#444">
        <Head>
          <title>{`${info.title} — смотреть у Дядьки онлайн без регистрации и СМС`}</title>
        </Head>
        <FilmInfo info={info} trailer={trailer} />
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

export const getStaticProps = async (context) => {
  const url = context.params.id;
  const source = null;
  const id = url.slice(0, url.indexOf("-"));
  console.log(id);
  const slug = url.slice(url.indexOf("-") + 1);
  console.log(slug);
  var info;

  if (source === null) {
    const response = await fetch(`https://api.dyadka.gq/film`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ id, slug }),
    });
    info = await response.json();
  }

  /*if (source === "kp") {
    const response = await fetch(`https://api.dyadka.gq/film`);
    info = await response.json();
  }*/

  const { data } = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?part=id,snippet&maxResults=1&key=AIzaSyCsT5C4pBFWpzyP4hEOen2ZBhn26AhMCkM&q=${encodeURIComponent(
      info.title + " трейлер кинопоиск"
    )}`
  );

  const trailer = data.items[0].id.videoId;

  return {
    props: {
      info,
      trailer,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};
export default Film;
