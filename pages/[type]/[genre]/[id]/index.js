import React, { useEffect } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import Staff from "../../../../Components/Staff";
import Episodes from "../../../../Components/Episodes";
import FilmInfo from "../../../../Components/FilmInfo";
import Similar from "../../../../Components/Similar";
import Info from "../../../../Store/Info";
import Video from "../../../../Store/Video";
import Layout from "../../../../Store/Layout";
import Playlist from "../../../../Store/Playlist";
import style from "../../../../styles/Film.module.sass";
import ErrorPage from "next/error";
import Head from "next/head";
import axios from "axios";

const Film = ({ info, trailer }) => {
  useEffect(() => {
    const Fetch = async () => {
      Info.videoCDN(null);
      Info.setInfo(null);
      Info.setDetails(null);
      Info.setToken(info.token);
      const buffer = Buffer.from(info.slug).toString("base64");
      Info.setSource(buffer);

      if (info.media) {
        Video.setUrl(info.media[0].urls[0]);
        Playlist.setQuality(info.media[0].quality);
        Video.setUrls(info.media);
      } else {
        Video.setUrl(null);
        Playlist.setQuality(null);
        Video.setUrls(null);
      }
      Info.setInfo(info);
      Playlist.setTranslations(info.translations.list);
      Layout.watch === "favs"
        ? setTimeout(() => Layout.setWatch(true), 2000)
        : Layout.setWatch(false);
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
          {info.series && <Episodes info={info} />}
          {<Staff kp={info.kp_id} />}
          {<Similar kp={info.kp_id} />}
        </div>
      </SkeletonTheme>
    );
  } else {
    return <ErrorPage statusCode={404} />;
  }
};

export const getServerSideProps = async (context) => {
  const { type, genre, id } = context.params;
  const url = `/${type}/${genre}/${id}`;
  const slug = Buffer.from(url).toString("base64");
  var info;

  const response = await axios.post(`https://api.dyadka.gq/film`, {
    data: slug,
  });
  info = response.data;

  /*const { data } = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?part=id,snippet&maxResults=1&key=AIzaSyCsT5C4pBFWpzyP4hEOen2ZBhn26AhMCkM&q=${encodeURIComponent(
      info.title + " трейлер кинопоиск"
    )}`
  );*/

  const trailer = null;

  //const trailer = "data.items[0].id.videoId";

  return {
    props: {
      info,
      trailer,
    },
  };
};

export default Film;
