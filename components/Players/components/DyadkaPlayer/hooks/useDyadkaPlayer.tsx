import {useEffect} from 'react';
import fscreen from 'fscreen';
import {useStore} from 'effector-react/ssr';
import {$playerContainer, setFullscreen} from '@models/Player';

const UseDyadkaPlayer = () => {
  const playerContainerRef = useStore($playerContainer);

  useEffect(() => {
    const handleChange = () => {
      setFullscreen(fscreen.fullscreenElement === playerContainerRef.current);
    };
    fscreen.addEventListener('fullscreenchange', handleChange);
    return () =>
      fscreen.removeEventListener('fullscreenchange', handleChange);
  }, []);

};

export default UseDyadkaPlayer;