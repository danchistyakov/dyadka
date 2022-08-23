import {FC} from 'react';
import dynamic from 'next/dynamic';
import Staff from '@components/Staff';
import Playlist from '@components/Playlist';
import FilmInfo from '@components/FilmInfo';
import Similar from '@components/Similar';
import styles from './_styles/Film.module.scss';
import Head from 'next/head';
import {useStore} from 'effector-react/scope';
import {serialize, fork, allSettled} from 'effector';
import {$data, $kpId, dataFx} from '@models/FilmData';
import {$isVisible} from '@models/Player';

const Film: FC = () => {
    const Players = dynamic(() => import('@components/Players'));
    const {isSeries, nameRu} = useStore($data);
    const isVisible = useStore($isVisible);

    return (
        <section>
            <Head>
                <title>{nameRu} — смотреть у Дядьки онлайн без регистрации и СМС</title>
            </Head>
            {isVisible ? <Players/> : <FilmInfo/>}
            <div className={styles.info}>
                {isSeries && <Playlist/>}
                <Staff/>
                <Similar/>
            </div>
        </section>
    );
};

export const getServerSideProps = async (context) => {
    const {kpId} = context.params;
    const scope = fork({
        values: [
            [$kpId, Number(kpId)],
            [$isVisible, false],
        ],
    });
    await allSettled(dataFx, {scope, params: Number(kpId)});
    return {
        props: {
            initialState: serialize(scope),
        },
    };
};

export default Film;
