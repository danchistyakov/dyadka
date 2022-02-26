import {IMediaData, ITranslation} from '@interfaces/IMediaData';

export interface ControlsProps {
  data: IMediaData;
  handleSeekChange: (e: any, newValue: number) => void;
}

export interface TopControlsProps {
  handleContinue: () => void;
  handleList: (e: any) => void;
  handleTranslation: (id: number, name: string) => void;
  isContinuing: boolean;
  isListVisible: boolean;
  isSeries: boolean;
  season: number;
  episode: number;
  title: string;
  translation: string;
  translations: ITranslation[];
}

export interface BottomControlsProps {
  data: IMediaData;
}
