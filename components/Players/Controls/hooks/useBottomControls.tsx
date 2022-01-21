import {ChangeEvent} from 'react';
import {BottomControlsProps} from '../interfaces/IControls';
import {ISeason} from '../../../../interfaces/IMediaData';
import {FullScreenHandle} from 'react-full-screen';

const useBottomControls = (
  handleSeekChange: (e: any, newValue: number) => void,
): any => {
  return {
    handleSeekChange,
  };
};

export default useBottomControls;
