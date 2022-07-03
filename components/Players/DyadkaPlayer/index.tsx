import {FC, useRef, KeyboardEvent, useEffect} from 'react';
import {useEvent, useGate, useStore} from 'effector-react/ssr';
import {
    $player, $playerConfig,
    negativePlaying,
    playerContainerGate,
    setBuffering,
    setDuration,
} from '@models/Player';
import styles from './styles/DyadkaPlayer.module.scss';
import PlayerOptions from '@store/PlayerOptions';
import ReactPlayer from 'react-player';
import Icons from '../../../assets/images/Icons';
import TopControls from './components/TopControls';
import BottomControls from './components/BottomControls';
import {setNextEpisode} from '@models/Playlist';
import {$url} from '@models/Video';
import {onKeyboard} from './utils/PlayerUtils';
import usePlayer from './hooks/usePlayer';
import {SpeedList} from '@shared/constants/PlayerSettings';
import useFullscreen from './hooks/useFullscreen';

let timer;

const DyadkaPlayer: FC = () => {
    const {isBuffering} = useStore($player);
    const [negativePlayingFn] = useEvent([negativePlaying]);
    const url = useStore($url);
    const playerContainerRef = useRef<HTMLInputElement | null>(null);
    useGate(playerContainerGate, playerContainerRef);
    const {handleOnTimeUpdate, onMouseMove, controlsRef, playerRef} = usePlayer();
    useFullscreen();

    const onClickHandler = (e, action) => {
        clearTimeout(timer);
        if (e.detail === 1) {
            timer = setTimeout(() => negativePlayingFn(), 200);
        } else if (e.detail === 2) {
            if (action === 'rewind') {
                playerRef.current.getCurrentTime() > 5
                    ? playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5)
                    : playerRef.current.seekTo(0);
            }
            if (action === 'forward') {
                playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5);
            }
        }
    };

    return (
        <section className={styles.container} ref={playerContainerRef}>
            <div
                className={styles.screen}
                tabIndex={0}
                onMouseMove={onMouseMove}
                onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => onKeyboard(e, playerRef)}
                onClick={(e) => onClickHandler(e, null)}
            >
                {isBuffering && (
                    <div className={styles.player_loading}>
                        <Icons icon='LoadingIcon'/>
                    </div>
                )}
                {PlayerOptions.error && (
                    <div className='player_error'>
                        <p className='error_text'>Пыня упаль, посылаем Пушистика за пакетами!</p>
                        <Icons icon='LoadingIcon'/>
                    </div>
                )}
                {/* {isMobile && (
          <div className='left_rewind' onClick={(e) => onClickHandler(e, 'rewind')}></div>
        )} */}
                <video
                    className={styles.player}
                    autoPlay={true}
                    src={url}
                    ref={playerRef}
                    onTimeUpdate={handleOnTimeUpdate}
                />
                {/*<ReactPlayer*/}
                {/*    url={url}*/}
                {/*    muted={isMuted}*/}
                {/*    playing={isPlaying}*/}
                {/*    width={'100%'}*/}
                {/*    height={'100%'}*/}
                {/*    ref={playerRef}*/}
                {/*    volume={1}*/}
                {/*    playbackRate={SpeedList[speed].value}*/}
                {/*    onDuration={(dur) => {*/}
                {/*        console.log(dur);*/}
                {/*        onDurationFn(dur)*/}
                {/*    }}*/}
                {/*    onProgress={onProgressFn}*/}
                {/*    onEnded={setNextEpisodeFn}*/}
                {/*    onBuffer={() => setBufferingFn(true)}*/}
                {/*    onBufferEnd={() => setBufferingFn(false)}*/}
                {/*/>*/}
                {/* {isMobile && (
          <div className='right_forward' onClick={(e) => onClickHandler(e, 'forward')}></div>
        )} */}
            </div>
            <div className={styles.controls} ref={controlsRef}>
                <TopControls/>
                <BottomControls/>
            </div>
        </section>
    );
};

export default DyadkaPlayer;
