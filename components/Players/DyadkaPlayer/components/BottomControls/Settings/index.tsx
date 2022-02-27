import { FC, useState, useEffect, useRef } from 'react';
import styles from './styles/Settings.module.scss';
import { $quality, $urls, setQuality } from '@models/Video';
import { useStore, useEvent } from 'effector-react/ssr';
import { $speed } from '@models/Player';
import SettingsPreview from './components/SettingsPreview';
import SettingsItem from './components/SettingsItem';
import { SpeedList } from '@constants/PlayerSettings';
import { setSpeed } from '@models/Player';
import { QualityDTO } from './utils/QualityDTO';
import { SettingsProps } from './interfaces/ISettings';

const Settings: FC<SettingsProps> = ({ onClose }) => {
  const [settingsSection, setSettingsSection] = useState({ quality: false, speed: false });
  const settingsModal = useRef(null);
  const speed = useStore($speed);
  const urls = useStore($urls);
  const quality = useStore($quality);
  const [setSpeedFn, setQualityFn] = useEvent([setSpeed, setQuality]);
  const qualities = QualityDTO(urls);

  const closeSection = (e = null) => {
    e?.stopPropagation();
    setSettingsSection({ quality: false, speed: false });
  };

  useEffect(() => {
    const onClick = (e) => settingsModal.current?.contains(e.target) || (closeSection(), onClose());
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()} ref={settingsModal}>
      {!settingsSection.quality && !settingsSection.speed && (
        <>
          <SettingsPreview
            onClick={() => setSettingsSection((prev) => ({ ...prev, quality: true }))}
            title='Качество'
            value={qualities[quality].value}
          />
          <SettingsPreview
            onClick={() => setSettingsSection((prev) => ({ ...prev, speed: true }))}
            title='Скорость'
            value={SpeedList[speed].value}
          />
        </>
      )}
      {settingsSection.quality && (
        <SettingsItem
          data={qualities}
          onChoose={setQualityFn}
          onClose={closeSection}
          title={'Качество'}
        />
      )}
      {settingsSection.speed && (
        <SettingsItem
          data={SpeedList}
          onChoose={setSpeedFn}
          onClose={closeSection}
          title={'Скорость'}
        />
      )}
    </div>
  );
};

export default Settings;
