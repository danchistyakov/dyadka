import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import Info from '../Store/Info';
import Playlist from '../Store/Playlist';
import { get, set } from 'idb-keyval';
import PlayerControls from '../Store/PlayerControls';
import style from '../styles/TopControls.module.sass';
import Icons from '../Images/Icons';
import Video from '../Store/Video';

const TopControls = observer(({ setPirate }) => {
    const [translations, setTranslations] = useState(null);
    const [continueTime, setContinueTime] = useState(false);
    const translateModal = useRef(null);

    useEffect(() => {
        const onClick = e => translateModal.current?.contains(e.target) || setTranslations(false);
        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, []);

    useEffect(() => {
        const BookMarks = async () => {
            if (Info?.info?.kp !== undefined && await get('Длительность') !== undefined) {
                const info = await get('Длительность');
                const search = info?.findIndex(item => item?.kinopoisk_id === Info?.info?.kp);
                search !== -1 && info[search]?.season === Playlist?.season && info[search]?.episode === Playlist?.episode && info[search]?.currentTime !== undefined && setContinueTime(true);
            }
        }
        BookMarks();
    }, [Info?.info?.kp]);

    const handleContinue = async () => {
        const info = await get('Длительность');
        const search = info?.findIndex(item => item?.kinopoisk_id === Info?.info?.kp);
        const time = info[search]?.currentTime;
        Playlist.setLast(time);
        setContinueTime(false);
    }

    const handleTranslation = async (id, name) => {
        setTranslations(!translations);
        Video.setTranslation(id, name);
        PlayerControls.setPlaying(true);
        var info = await get('Длительность') !== undefined ? await get('Длительность') : [];
        if (Info?.info?.kp !== undefined) {
            var search = info?.findIndex(item => item?.kinopoisk_id === Info?.info?.kp);
            search = (search !== -1) ? search : info.length
            info[search] = { kinopoisk_id: Info?.info?.kp, season: Playlist?.season, episode: Playlist?.episode, currentTime: PlayerControls?.currentTime, translationId: id, translationName: name };
            set('Длительность', info);
        }
    }

    return (
        <div className={style.top_controls}>
            <div className={style.top_left}>
                {Info?.info?.serial && (<p className={style.episode_info}>{Info?.info?.title}. Сезон {Playlist?.season}. Серия {Playlist?.episode}</p>)}
                {!Info?.info?.serial && (<p className={style.episode_info}>{Info?.info?.title}</p>)}
                {continueTime !== false && (<button onClick={handleContinue} className={style.button_continue}>Продолжить</button>)}
            </div>
            <div className={style.top_right} key={translations}>
                <div className={style.translation_preview} onClick={(e) => { e.stopPropagation(); Playlist?.translations?.length > 1 && setTranslations(!translations) }}>{Video?.translation?.name} {Playlist?.translations?.length > 1 && (translations ? <Icons icon='ExpandLessIcon' className={style.translations_icon} /> : <Icons icon='ExpandMoreIcon' className={style.translations_icon} />)}</div>
                {translations && Playlist?.translations?.length > 1 && (<div className={style.translations_list} ref={translateModal}>
                    {Playlist?.translations?.map((res, key) => (
                        <span className={style.translation_item} onClick={() => handleTranslation(res?.id, res?.name)} key={key}>{res?.name}</span>
                    ))}
                </div>)}
                <button className={style.button_pirate} onClick={() => { setPirate(true) }}> Внешний плеер</button>
            </div>
        </div>
    )
}
)

export default TopControls