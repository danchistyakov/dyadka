import {FC} from 'react';
import dynamic from 'next/dynamic';
import Staff from '../../../components/Staff';
import Episodes from '../../../components/Episodes';
import FilmInfo from '../../../components/Film/components/FilmInfo';
import Similar from '../../../components/Similar';
import Layout from '../../../store/Layout';
import style from '../../../styles/Film.module.sass';
import ErrorPage from 'next/error';
import Head from 'next/head';
import {IMediaData} from '../../../interfaces/IMediaData';
import {$data} from '../../../api/IndexApi';

interface FilmProps {
  data: IMediaData;
  trailer: string | null;
}

const Film: FC<FilmProps> = ({data, trailer}) => {
  const Player = dynamic(() => import('../../../components/Players'));

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
          {data.isSeries && <Episodes data={data.playlist} />}
          <Staff data={data.staff} />
          <Similar data={data.similar} />
        </div>
      </section>
    );
  } else {
    return <ErrorPage statusCode={404} />;
  }
};

export const getServerSideProps = async (context) => {
  const {kpId} = context.params;

  const {data} = await $data.post(`/film`, {
    kpId,
  });

  const trailer = null;

  return {
    props: {
      data,
      trailer,
    },
  };
};

export default Film;
