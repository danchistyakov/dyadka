import React, { useState, useEffect, useRef } from 'react';
import TopControls from './TopControls';
import BottomControls from './BottomControls';
import { toJS } from 'mobx';
import Playlist from '../Store/Playlist';
import Info from '../Store/Info';
import PlayerControls from '../Store/PlayerControls';
import PlayerOptions from '../Store/PlayerOptions';
import { observer } from 'mobx-react-lite';
import ReactPlayer from 'react-player';
import { get, set } from 'idb-keyval';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { GetUrl } from './GetUrl';
import Video from '../Store/Video';
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";

const Player = observer(() => {

    const [volume, setVolume] = useState(1);
    const [muted, setMute] = useState(false);
    const [remaining, setDisplayRemaining] = useState(false);
    const [count, setCount] = useState(1);
    const [last, setLast] = useState(null);
    const [parsing, setParsing] = useState(true);
    const [pirate, setPirate] = useState(false);
    const [state, setState] = useState({
        playing: true,
        continueTime: true,
        settings: false,
        translations: false,
        //buffering: true,
        newurl: null,
        preload: null,
        time: 0,
        //error: false
    })

    const { playing, continueTime, settings, translations, newurl, preload, time } = state;

    const playerContainer = useRef(null);
    const playerRef = useRef(null);
    const controlsRef = useRef(null);
    const video = useFullScreenHandle();

    PlayerControls.setCurrentTime(playerRef.current ? playerRef.current.getCurrentTime() : '00:00');
    PlayerControls.setCurrentDuration(playerRef.current ? playerRef.current.getDuration() : '00:00');

    useEffect(() => {
        const Last = async () => {
            Video.setUrl(null);
            PlayerOptions.setError(false);
            if (await get('Длительность') !== undefined) {
                var info = await get('Длительность');
                var search = info.findIndex(item => item?.kinopoisk_id === Info?.info?.kp);
                search !== -1 && setLast(info[search]?.currentTime);
                info[search]?.quality !== undefined && Playlist.setQuality(info[search]?.quality)
                //Playlist.setTranslation({ id: info[search]?.translationId, name: info[search]?.translationName })
            }
            PlayerOptions.setBuffering(true)
        }
        Last();
    }, [Info?.info?.kp]);

    useEffect(() => {
        const parsingUrl = async () => {
            if (Info.info.hdrezka_id !== undefined) {
                console.log('ID: ' + Video?.translation?.id)
                GetUrl();
            }
        }

        parsingUrl();

    }, [Info?.info?.kp, Video?.translation?.id])

    useEffect(() => {
        const Quality = async () => {
            PlayerOptions.setBuffering(true);
            if (await get('Длительность') !== undefined) {
                var info = await get('Длительность');
                var search = info.findIndex(item => item?.kinopoisk_id === Info?.info?.kp);
                search !== -1 && playerRef.current?.seekTo(info[search]?.currentTime);
            }
        }
        Quality();
    }, [Playlist?.quality])

    const handleKeys = (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            PlayerControls.setPlaying(!PlayerControls?.playing)
        }

        if (e.code === 'ArrowLeft') {
            e.preventDefault();
            playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5);
            handleRewind();
        }

        if (e.code === 'ArrowRight') {
            e.preventDefault();
            playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5);
            handleForward();
        }

        if (e.code === 'ArrowUp') {
            e.preventDefault();
            volume.toFixed(1) <= 0.9 && setVolume(Number(volume.toFixed(1)) + 0.1) && PlayerControls.setMute(true);
            volume.toFixed(1) > 0.9 && volume.toFixed(1) < 1 && setVolume(volume.toFixed(1) + (1 - volume.toFixed(1)));
        }

        if (e.code === 'ArrowDown') {
            e.preventDefault();
            volume.toFixed(1) >= 0.1 && setVolume(volume.toFixed(1) - 0.1);
            volume.toFixed(1) > 0 && volume.toFixed(1) < 0.1 && setVolume(volume.toFixed(1) - (0.1 - volume.toFixed(1)));
        }
    }

    const handleMouseMove = () => {
        controlsRef.current.style.visibility = 'visible';
        document.body.style.cursor = 'auto';
        setCount(0);
    }

    const handleRewind = () => {
        if (~['Android', 'iPhone', 'iPod', 'iPad', 'BlackBerry'].indexOf(navigator.platform)) {
            playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5);
        }
    }

    const handleForward = () => {
        if (~['Android', 'iPhone', 'iPod', 'iPad', 'BlackBerry'].indexOf(navigator.platform)) {
            playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5);
        }
    }

    const handleProgress = async (data) => {
        PlayerControls.setPlayed(parseFloat(data?.played));

        if (count > 3 && video.active) {
            controlsRef.current.style.visibility = 'hidden';
            document.body.style.cursor = 'none';
        }

        if (controlsRef.current.style.visibility === 'visible' && video.active) {
            setCount(count + 1);
        }

        if (!state.seeking) {
            setState({ ...state, ...data });
        }
    }

    useEffect(() => {
        if (!video.active) {
            document.body.style.cursor = 'auto';
        }
    }, [video.active])

    const handleSeekChange = (e, newValue) => {
        PlayerControls.setPlayed(parseFloat(newValue / 100));
        playerRef.current.seekTo(newValue / 100);
    };

    useEffect(() => {
        if (Playlist?.last !== null) {
            playerRef.current.seekTo(Playlist?.last);
            setState({ ...state, continueTime: false, playing: true });
        }
    }, [Playlist?.last])

    const prevEpisode = () => {
        Video.setUrl(null);
        const arr = toJS(Playlist?.playlist?.data?.seasons);
        const search = arr?.filter((res) => {
            if (res?.number === Playlist?.season) {
                return res
            }
        })

        if (Playlist?.episode > 1) {
            Playlist.setEpisode(Playlist?.episode - 1);
            GetUrl();
        } else {
            if (Playlist?.season > 1) {
                Playlist.setSeason(Playlist?.season - 1);
                Playlist.setEpisode(search[0]?.episodes.length);
                GetUrl();
            }
        }
    }

    const nextEpisode = () => {
        Video.setUrl(null);
        const info = toJS(Info?.videocdn);
        console.log(info);

        const search = info?.episodes?.filter((res) => {
            if (res?.season_num === Playlist?.season) {
                return res
            }
        })

        if (Playlist?.episode < search.length) {
            Playlist.setEpisode(Number(Playlist?.episode) + 1);
            GetUrl();
        } else {
            if (Playlist?.season < info?.season_count) {
                Playlist.setSeason(Number(Playlist?.season) + 1);
                Playlist.setEpisode(1);
                GetUrl();
            }
        }
    }

    const autoNext = async () => {
        const info = toJS(Info?.videocdn);
        const search = info?.episodes?.filter((res) => {
            if (res?.season_num === Playlist?.season) {
                return res
            }
        })

        if (Playlist?.episode < search.length) {
            Playlist.setEpisode(Number(Playlist?.episode) + 1);
            GetUrl();
        } else {
            if (Playlist?.season < info?.season_count) {
                Playlist.setSeason(Number(Playlist?.season) + 1);
                Playlist.setEpisode(1);
                GetUrl();
            }
        }
    }

    useEffect(() => {
        const script = document.createElement('script');
        script.src = '//yohoho.cc/yo.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, [Info?.info?.kp, pirate])

    useEffect(() => {
        Playlist.watch === true ? setState({ ...state, watch: true }) : setState({ ...state, watch: false });
    }, [Playlist?.watch])

    const handleVolumeChange = (e, newVolume) => {
        setVolume(parseFloat(newVolume / 100));
    }

    return (
        <section>
            {!pirate ? (<FullScreen handle={video} className='player' ref={playerContainer} tabIndex='0' onKeyDown={(e) => { handleKeys(e) }}>
                <div className='player_screen' tabIndex='0' onMouseMove={handleMouseMove} onKeyDown={(e) => { handleKeys(e) }} onClick={() => PlayerControls.setPlaying(!PlayerControls?.playing)}>
                    {PlayerOptions.buffering && (<div className='player_loading'>
                        <svg className="icon_loading" viewBox="25 25 50 50">
                            <circle className="icon_loading_front" cx="50" cy="50" r="20" fill="none" strokeWidth="5" strokeMiterlimit="10"></circle>
                            <circle className="icon_loading_back" cx="50" cy="50" r="20" fill="none" strokeWidth="5" strokeMiterlimit="10"></circle>
                        </svg>
                    </div>)}
                    {PlayerOptions.error && (<div className='player_error'>
                        <p className='error_text'>Пыня упаль, посылаем Пушистика за пакетами!</p>
                        <svg className="icon_loading" viewBox="25 25 50 50">
                            <circle className="icon_loading_front" cx="50" cy="50" r="20" fill="none" strokeWidth="5" strokeMiterlimit="10"></circle>
                            <circle className="icon_loading_back" cx="50" cy="50" r="20" fill="none" strokeWidth="5" strokeMiterlimit="10"></circle>
                        </svg>
                    </div>)}
                    <div className='left_rewind' onDoubleClick={handleRewind}></div>
                    <ReactPlayer
                        url={Video?.url}
                        muted={PlayerControls?.mute}
                        playing={PlayerControls?.playing}
                        width={'100%'}
                        height={'100%'}
                        style={{ margin: 'auto' }}
                        ref={playerRef}
                        volume={volume}
                        playbackRate={Playlist?.speed}
                        onProgress={handleProgress}
                        onEnded={autoNext}
                        onBuffer={() => { PlayerOptions.setBuffering(true); PlayerControls.setPlaying(true) }}
                        onBufferEnd={() => PlayerOptions.setBuffering(false)}
                    />
                    <div className='right_forward' onDoubleClick={handleForward}></div>
                </div>
                <div className='controls' ref={controlsRef}>
                    <TopControls setPirate={setPirate} />
                    <BottomControls video={video} handleSeekChange={handleSeekChange} prevEpisode={prevEpisode} nextEpisode={nextEpisode} handleVolumeChange={handleVolumeChange} />
                </div>
            </FullScreen>) :
                (<div key={Info?.info?.kp}>
                    <div id="yohoho" className='player' data-kinopoisk={Info?.info?.kp} data-resize="1" data-season={Playlist?.season} data-episode={Playlist?.episode}></div>
                    <button className='inside_player' onClick={() => setPirate(false)}>Перейти в дядькин плеер</button>
                </div>)
            }
        </section >
    )
}
)

export default Player
