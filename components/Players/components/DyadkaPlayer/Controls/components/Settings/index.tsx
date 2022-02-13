import {FC, useState, useEffect, useRef} from 'react';
import style from './styles/Settings.module.scss';
import Icons from '../../../../../../../images/Icons';
import {$urls} from '@models/Video';
import {useStore} from 'effector-react';
import {$player, setSpeed} from '@models/Player';

const Settings: FC = () => {
  const [svisible, setsVisible] = useState(false);
  const [qvisible, setqVisible] = useState(false);
  const [isVisible, setVisible] = useState(false);

  const settingsModal = useRef(null);
  const {speed} = useStore($player);
  const urls = useStore($urls)


  useEffect(() => {
    const onClick = (e) =>
      settingsModal.current?.contains(e.target) ||
      (setVisible(false), setsVisible(false), setqVisible(false));
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
      {!isVisible && (
        <Icons
          icon="SettingsIcon"
          className={style.settings_icon}
          onClick={(e) => {
            e.stopPropagation();
            setVisible(true);
          }}
        />
      )}
      {isVisible && (
        <span className={style.settings_icon_active}>
          <Icons
            icon="SettingsIcon"
            className={style.settings_icon}
            onClick={(e) => {
              e.stopPropagation();
              setVisible(false);
            }}
          />
        </span>
      )}
      {isVisible && (
        <div className={style.popup} ref={settingsModal}>
          <div className={style.settings_list}>
            {/*{!svisible && !qvisible && (*/}
            {/*  <div*/}
            {/*    className={style.settings_item}*/}
            {/*    onClick={(e) => {*/}
            {/*      e.stopPropagation();*/}
            {/*      setqVisible(true);*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    {!qvisible && (*/}
            {/*      <span className={style.settings_preview}>*/}
            {/*        <span className={style.option_name}>Качество:</span>*/}
            {/*        <span className={style.preview_clickable}>*/}
            {/*          <span className={style.preview_value}>*/}
            {/*            {urls[qualityId]?.quality || '...'}*/}
            {/*          </span>*/}
            {/*          <span className={style.settings_chevron}>*/}
            {/*            <Icons icon="ChevronRightIcon" />*/}
            {/*          </span>*/}
            {/*        </span>*/}
            {/*      </span>*/}
            {/*    )}*/}
            {/*  </div>*/}
            {/*)}*/}
            {!svisible && !qvisible && (
              <div
                className={style.settings_item}
                onClick={(e) => {
                  e.stopPropagation();
                  setsVisible(true);
                }}
              >
                {!svisible && (
                  <span className={style.settings_preview}>
                    <span className={style.option_name}>Скорость:</span>
                    <span className={style.preview_clickable}>
                      <span className={style.preview_value}>
                        {speed}
                      </span>
                      <span className={style.settings_chevron}>
                        <Icons icon="ChevronRightIcon" />
                      </span>
                    </span>
                  </span>
                )}
              </div>
            )}
            {/*{qvisible && (*/}
            {/*  <div className={style.settings_options}>*/}
            {/*    <div*/}
            {/*      className={style.options_title}*/}
            {/*      onClick={(e) => {*/}
            {/*        e.stopPropagation();*/}
            {/*        setqVisible(false);*/}
            {/*      }}*/}
            {/*    >*/}
            {/*      <span className={style.left_chevron}>*/}
            {/*        <Icons icon="ChevronLeftIcon" />*/}
            {/*      </span>*/}
            {/*      <span className={style.option_name}>Качество</span>*/}
            {/*    </div>*/}
            {/*    <div className={style.choice_list}>*/}
            {/*      {urls.map((item, key) => (*/}
            {/*        <span*/}
            {/*          key={key}*/}
            {/*          className={style.settings_choice}*/}
            {/*          onClick={() => setQualityId(key)}*/}
            {/*        >*/}
            {/*          {item.quality}*/}
            {/*        </span>*/}
            {/*      ))}*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*)}*/}
            {svisible && (
              <div className={style.settings_options}>
                <div
                  className={style.options_title}
                  onClick={(e) => {
                    e.stopPropagation();
                    setsVisible(false);
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
                        setSpeed(rate);
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
};

export default Settings;
