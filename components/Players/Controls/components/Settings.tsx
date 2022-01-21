import {FC, useState, useEffect, useRef} from 'react';
import style from '../../../../styles/Settings.module.sass';
import Playlist from '../../../../store/Playlist';
import Icons from '../../../../Images/Icons';
import {observer} from 'mobx-react-lite';
import {toJS} from 'mobx';
import Video from '../../../../store/Video';
import PlayerOptions from '../../../../store/PlayerOptions';
import usePlayer from '@components/Players/hooks/usePlayer';
import {SettingsProps} from '@components/Players/Controls/interfaces/ISettings';

const Settings: FC<SettingsProps> = observer(({data}) => {
  const [qvisible, setqVisible] = useState(false);
  const [svisible, setsVisible] = useState(false);
  const [speed, setSpeed] = useState(false);
  const settingsModal = useRef(null);
  const {handleQuality, qualityId, urls} = usePlayer(data);

  useEffect(() => {
    const onClick = (e) =>
      settingsModal.current?.contains(e.target) ||
      (setsVisible(false), setSpeed(false), setqVisible(false));
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // const handleQuality = (item, key) => {
  //   PlayerOptions.setBuffering(true);
  //   setqVisible(false);
  //   Playlist.setQuality(item?.quality, key);
  // };

  return (
    <div>
      {!svisible && (
        <Icons
          icon="SettingsIcon"
          className={style.settings_icon}
          onClick={(e) => {
            e.stopPropagation();
            setsVisible(true);
          }}
        />
      )}
      {svisible && (
        <span className={style.settings_icon_active}>
          <Icons
            icon="SettingsIcon"
            className={style.settings_icon}
            onClick={(e) => {
              e.stopPropagation();
              setsVisible(false);
            }}
          />
        </span>
      )}
      {svisible && (
        <div className={style.popup} ref={settingsModal}>
          <div className={style.settings_list}>
            {!speed && !qvisible && (
              <div
                className={style.settings_item}
                onClick={(e) => {
                  e.stopPropagation();
                  setqVisible(true);
                }}
              >
                {!qvisible && (
                  <span className={style.settings_preview}>
                    <span className={style.option_name}>Качество:</span>
                    <span className={style.preview_clickable}>
                      <span className={style.preview_value}>
                        {urls[qualityId]?.quality || '...'}
                      </span>
                      <span className={style.settings_chevron}>
                        <Icons icon="ChevronRightIcon" />
                      </span>
                    </span>
                  </span>
                )}
              </div>
            )}
            {!speed && !qvisible && (
              <div
                className={style.settings_item}
                onClick={(e) => {
                  e.stopPropagation();
                  setSpeed(true);
                }}
              >
                {!speed && (
                  <span className={style.settings_preview}>
                    <span className={style.option_name}>Скорость:</span>
                    <span className={style.preview_clickable}>
                      <span className={style.preview_value}>
                        {Playlist?.speed}
                      </span>
                      <span className={style.settings_chevron}>
                        <Icons icon="ChevronRightIcon" />
                      </span>
                    </span>
                  </span>
                )}
              </div>
            )}
            {qvisible && (
              <div className={style.settings_options}>
                <div
                  className={style.options_title}
                  onClick={(e) => {
                    e.stopPropagation();
                    setqVisible(false);
                  }}
                >
                  <span className={style.left_chevron}>
                    <Icons icon="ChevronLeftIcon" />
                  </span>
                  <span className={style.option_name}>Качество</span>
                </div>
                <div className={style.choice_list}>
                  {urls.map((item, key) => (
                    <span
                      key={key}
                      className={style.settings_choice}
                      onClick={() => handleQuality(key)}
                    >
                      {item.quality}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {speed && (
              <div className={style.settings_options}>
                <div
                  className={style.options_title}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSpeed(false);
                  }}
                >
                  <span className={style.left_chevron}>
                    <Icons icon="ChevronLeftIcon" />
                  </span>
                  <span className={style.option_name}>Скорость</span>
                </div>
                <div className={style.choice_list}>
                  {[0.5, 1, 1.5, 2].map((rate, key) => (
                    <span
                      key={key}
                      className={style.settings_choice}
                      onClick={() => {
                        Playlist.setSpeed(rate);
                        setSpeed(false);
                      }}
                    >
                      {rate}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export default Settings;
