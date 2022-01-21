import {ChangeEvent} from 'react';
import {FullScreenHandle} from 'react-full-screen';
import {IMedia, IMediaData} from '../../../interfaces/IMediaData';

export interface PlayerProps {
  data: IMediaData;
  fullScreenHandle: FullScreenHandle;
  isBuffering: boolean;
  isMuted: boolean;
  isPirate: boolean;
  isPlaying: boolean;
  handleBuffering: (value: boolean) => void;
  handleMute: (value: boolean) => void;
  handlePirate: (value: boolean) => void;
  handlePlaying: (value: boolean) => void;
  handleQuality: (id: number) => void;
  handleVolume: (e: ChangeEvent<HTMLInputElement>) => void;
  prevEpisode: (season: number, episode: number) => void;
  nextEpisode: (season: number, episode: number) => void;
  qualityId: number;
  url: string;
  urls: IMedia[];
  volume: number;
}
