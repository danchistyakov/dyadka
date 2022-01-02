import { FC, useEffect } from "react";
import dynamic from "next/dynamic";
import Staff from "../../../../components/Staff";
import Episodes from "../../../../components/Episodes";
import FilmInfo from "../../../../components/Film/components/FilmInfo";
import Similar from "../../../../components/Similar";
import Info from "../../../../Store/Info";
import Layout from "../../../../Store/Layout";
import style from "../../../../styles/Film.module.sass";
import ErrorPage from "next/error";
import Head from "next/head";
import axios from "axios";
import { IMediaData } from "../../../../interfaces/IMediaData";
import { observer } from "mobx-react-lite";

interface FilmProps {
  data: IMediaData;
  trailer: string | null;
}

const Film: FC<FilmProps> = ({ data, trailer }) => {
  const Player = dynamic(() => import("../../../../components/Players"));

  useEffect(() => {
    const Fetch = async () => {
      Info.setToken(data.token);
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
          {data.isSeries && <Episodes data={data.seasons} />}
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
