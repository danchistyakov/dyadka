import {forward, sample} from 'effector';
import {
    $controls, $currentTime, $duration,
    $isFullscreen,
    $playerContainer, $progress, $seekValue, $speed,
    controlsGate,
    playerContainerGate, setProgress,
    toggleFullscreen,
} from '@models/Player';
import {onToggleFullscreen} from '@components/Players/DyadkaPlayer/utils/PlayerUtils';

forward({from: playerContainerGate.state, to: $playerContainer});
forward({from: controlsGate.state, to: $controls});

sample({
    clock: toggleFullscreen,
    source: {isFullscreen: $isFullscreen, fullscreenRef: $playerContainer},
    fn: (sourceData) => onToggleFullscreen(sourceData),
});

sample({
    clock: $currentTime,
    source: {currentTime: $currentTime, duration: $duration},
    fn: ({currentTime, duration}) => currentTime / duration,
    target: $progress,
})

sample({
    clock: setProgress,
    source: {currentTime: $currentTime, duration: $duration},
    fn: ({currentTime, duration}, e) => {
        const percentage = e.clientX / e.currentTarget.scrollWidth;
        return Math.round(duration * percentage * 100) / 100;
    },
    target: $seekValue,
})