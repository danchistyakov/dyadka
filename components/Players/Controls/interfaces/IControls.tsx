import { ChangeEvent } from "react";
import { FullScreenHandle } from "react-full-screen";
import { IMediaData, ITranslation } from "../../../../interfaces/IMediaData";

export interface ControlsProps {
  data: IMediaData;
  handleSeekChange: (e: any, newValue: number) => void;
}

export interface TopControlsProps {
  isSeries: boolean;
  title: string;
  season: number;
  episode: number;
  translations: ITranslation[];
  isContinuing: boolean;
  handleContinue: () => void;
  handleList: (e: any) => void;
  handleTranslation: (id: number, name: string, params) => void;
  isListVisible: boolean;
  translationName: string;
}

export interface BottomControlsProps {
  data: IMediaData;
  handleSeekChange: (e: any, newValue: number) => void;
}
