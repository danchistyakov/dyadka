import {FC} from 'react';
import {ControlsProps} from './interfaces/IControls';
import TopControls from './components/TopControls';
import BottomControls from './components/BottomControls';
import useTopControls from './hooks/useTopControls';
import useBottomControls from './hooks/useBottomControls';

const Controls: FC<ControlsProps> = ({data, handleSeekChange}) => {
  return (
    <>
      <TopControls {...useTopControls(data)} />
      <BottomControls
        data={data}
        handleSeekChange={handleSeekChange}
      />
    </>
  );
};

export default Controls;
