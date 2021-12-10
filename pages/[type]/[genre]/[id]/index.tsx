import React, { FC, useEffect, useState } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import Staff from "../../../../Components/Staff";
import Episodes from "../../../../Components/Episodes";
import FilmInfo from "../../../../Components/Film/Components/FilmInfo";
import Similar from "../../../../Components/Similar";
import Info from "../../../../Store/Info";
import Video from "../../../../Store/Video";
import Layout from "../../../../Store/Layout";
import Playlist from "../../../../Store/Playlist";
import style from "../../../../styles/Film.module.sass";
import ErrorPage from "next/error";
import Head from "next/head";
import axios from "axios";
import Player from "../../../../Components/Player";
import { IMediaData } from "../../../../Interfaces/IMediaData";
import { observer } from "mobx-react-lite";

interface FilmProps {
  data: IMediaData;
  trailer: string | null;
}

const Film: FC<FilmProps> = ({ data, trailer }) => {
  useEffect(() => {
    const Fetch = async () => {
      Info.videoCDN(null);
      Info.setInfo(null);
      Info.setDetails(null);
      Info.setToken(data.token);
      Playlist.setSeason(1);
      Playlist.setEpisode(1);
      const buffer = Buffer.from(data.slug).toString("base64");
      Info.setSource(buffer);

      if (data.media) {
        Video.setUrl(data.media[0].urls[0]);
        Playlist.setQuality(data.media[0].quality);
        Video.setUrls(data.media);
      } else {
        Video.setUrl(null);
        Playlist.setQuality(null);
        Video.setUrls(null);
      }
      Info.setInfo(data);
      Playlist.setTranslations(data.translations.list);
      /*Layout.watch === "favs"
        ? setTimeout(() => Layout.setWatch(true), 2000)
        : Layout.setWatch(false);*/
    };
    Fetch();
  }, [data.id]);

  if (data) {
    return (
      <section>
        <Head>
          <title>
            {data.title} — смотреть у Дядьки онлайн без регистрации и СМС
          </title>
        </Head>
        {!Layout.watch ? (
          <FilmInfo data={data} trailer={trailer} />
        ) : (
          <div className={style.film_player}>
            <Player data={data} />
          </div>
        )}
        <div className={style.film_container}>
          {data.series && <Episodes data={data.seasons} />}
          <Staff kp={data.kp_id} />
          <Similar kp={data.kp_id} />
        </div>
      </section>
    );
  } else {
    return <ErrorPage statusCode={404} />;
  }
};

export const getServerSideProps = async (context) => {
  const { type, genre, id } = context.params;
  const url = `/${type}/${genre}/${id}`;
  const slug = Buffer.from(url).toString("base64");

  const { data } = await axios.post(`https://api.dyadka.gq/film`, {
    data: slug,
  });

  /*const { data } = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?part=id,snippet&maxResults=1&key=AIzaSyCsT5C4pBFWpzyP4hEOen2ZBhn26AhMCkM&q=${encodeURIComponent(
      data.title + " трейлер кинопоиск"
    )}`
  );*/

  const trailer = null;

  //const trailer = "data.items[0].id.videoId";

  return {
    props: {
      data,
      trailer,
    },
  };
};

export default observer(Film);
