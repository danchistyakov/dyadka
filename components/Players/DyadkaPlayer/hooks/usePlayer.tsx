import {useEffect, useRef} from 'react';
import {$player, setBuffering, setCurrentTime, setDuration} from '@models/Player';
import {useEvent, useStore} from 'effector-react/ssr';
import useUpdateEffect from '@shared/hooks/useUpdateEffect';
import Hls from "hls.js";
import {$url} from "@models/Video";
import {$playlistData, setNextEpisode} from "@models/Playlist";
import {SpeedList} from "@shared/constants/PlayerSettings";

const usePlayer = () => {
        const {isFullscreen, isMuted, isPlaying, seekValue, speed} = useStore($player);
        const [setBufferingFn, setCurrentTimeFn, setDurationFn, setNextEpisodeFn] = useEvent([setBuffering, setCurrentTime, setDuration, setNextEpisode]);
        const controlsTimeoutRef = useRef(null);
        const controlsRef = useRef(null);
        const playerRef = useRef(null);
        const url = useStore($url);
        const {episode} = useStore($playlistData);

        const hideControls = () => {
            if (isFullscreen && isPlaying) {
                //controlsRef.current.style.opacity = '0';
                controlsRef.current.classList.add('hidden');
                //controlsRef.current.style.visibility = 'hidden';
                document.body.style.cursor = 'none';
            }
        };

        const showControls = () => {
            clearTimeout(controlsTimeoutRef.current);
            //controlsRef.current.style.opacity = '1';
            controlsRef.current.classList.remove('hidden');
            //controlsRef.current.style.visibility = 'visible';
            document.body.style.cursor = 'auto';
        };

        const onMouseMove = () => {
            showControls();
            if (isFullscreen && isPlaying) {
                controlsTimeoutRef.current = setTimeout(hideControls, 3000);
            }
        };

        useEffect(() => {
            if (!isPlaying || !isFullscreen) {
                showControls();
            } else {
                controlsTimeoutRef.current = setTimeout(hideControls, 3000);
            }
            return () => clearTimeout(controlsTimeoutRef.current);
        }, [isFullscreen, isPlaying]);

        useEffect(() => {
            if (playerRef.current && url) {
                let hls: Hls;
                if (hls) {
                    hls.destroy();
                }

                const newHls = new Hls();
                const video = playerRef.current;
                newHls.loadSource(url);
                newHls.attachMedia(video);
                newHls.on(Hls.Events.MEDIA_ATTACHED, () => {
                    newHls.loadSource(url);
                    newHls.on(Hls.Events.MANIFEST_PARSED, () => {
                        video.play();
                    });
                })

                hls = newHls;

                return () => {
                    if (hls) {
                        hls.destroy();
                    }
                };
            }
        }, [url])

        const handleOnTimeUpdate = () => {
            setCurrentTimeFn(playerRef.current?.currentTime ?? 0);
        };

        useUpdateEffect(() => {
            playerRef.current.currentTime = seekValue;
        }, [seekValue]);

        useEffect(() => {
            // playerRef.current.addEventListener('loadstart', event => {
            //     setBufferingFn(true);
            // });

            playerRef.current.addEventListener('waiting', event => {
                setBufferingFn(true);
            });

            playerRef.current.addEventListener('playing', event => {
                setBufferingFn(false);
            });

            playerRef.current.addEventListener('loadedmetadata', () => {
                setDurationFn(playerRef.current?.duration ?? 0);
            });

            playerRef.current.addEventListener('canplaythrough', event => {
                setBufferingFn(false);
            });

            playerRef.current.addEventListener('ended', event => {
                setNextEpisodeFn()
            });


        }, [])

        useEffect(() => {
            setTimeout(() => window.scrollTo({top: 0, behavior: 'smooth'}), 500);
        }, [episode])

        useEffect(() => {
            if (playerRef.current) {
                isPlaying ? playerRef.current.play() : playerRef.current.pause();
            }
        }, [isPlaying, playerRef]);

        useEffect(() => {
            if (playerRef.current) {
                playerRef.current.muted = isMuted;
            }
        }, [isMuted, playerRef])

        useEffect(() => {
            if (playerRef.current) {
                playerRef.current.playbackRate = SpeedList[speed].value;
            }
        }, [speed, playerRef]);

        return {
            handleOnTimeUpdate,
            onMouseMove,
            controlsRef,
            playerRef,
        };
    }
;

export default usePlayer;
