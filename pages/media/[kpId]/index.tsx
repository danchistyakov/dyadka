import {FC} from 'react';
import dynamic from 'next/dynamic';
import Staff from '@components/Staff';
import Playlist from '@components/Playlist';
import FilmInfo from '@components/Film/components/FilmInfo';
import Similar from '@components/Similar';
import Layout from '@store/Layout';
import style from '@styles/Film.module.sass';
import Head from 'next/head';
import {useStore} from 'effector-react/ssr';
import {serialize, fork, allSettled} from 'effector';
import {$data, dataFx} from '@models/FilmData';
import {root} from '@models/Root';
import {$isVisible} from '@models/Player';

const Film: FC = () => {
  const Player = dynamic(() => import('@components/Players'));
  const {isSeries, title} = useStore($data);
  const isVisible = useStore($isVisible);

  return (
    <section>
      <Head>
        <title>
          {title} — смотреть у Дядьки онлайн без регистрации и СМС
        </title>
      </Head>
      {isVisible ? (
        <div className={style.film_player}>
          <Player />
        </div>
      ) : (
        <FilmInfo />
      )}
      <div className={style.film_container}>
        {isSeries && <Playlist />}
        <Staff />
        <Similar />
      </div>
    </section>
  );
};

export const getServerSideProps = async (context) => {
  const {kpId} = context.params;
  const scope = fork(root);
  await allSettled(dataFx, {scope, params: Number(kpId)});
  return {
    props: {
      store: serialize(scope, {onlyChanges: true}),
    },
  }
};

export default Film;
