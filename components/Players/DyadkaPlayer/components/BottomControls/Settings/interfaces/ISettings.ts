import { QualityData, SpeedData } from '@interfaces/IPlayerOptions';

export interface SettingsProps {
  onClose: () => void;
}

export interface SettingsPreviewProps {
  onClick: () => void;
  title: string;
  value: number | string;
}

export interface SettingsItemProps {
  data: QualityData[] | SpeedData[];
  onChoose: (data: number) => number;
  onClose: () => void;
  title: string;
}
