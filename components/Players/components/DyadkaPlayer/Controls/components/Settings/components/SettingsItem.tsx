import React from 'react';
import styles from '../styles/Settings.module.scss';
import Icons from '@app/images/Icons';
import {setSpeed} from '@models/Player';

const SettingsItem = () => {
  return (
    <div className={styles.container}>
      <div
        className={styles.title}
        onClick={(e) => {
          e.stopPropagation();
          //setsVisible(false);
        }}
      >
                  <span className={styles.left_chevron}>
                    <Icons icon="ChevronLeftIcon" />
                  </span>
        <span className={styles.option_name}>Скорость</span>
      </div>
      <div className={styles.choice_list}>
        {[0.5, 1, 1.5, 2].map((rate, key) => (
          <span
            key={key}
            className={styles.settings_choice}
            onClick={() => {
              setSpeed(rate);
            }}
          >
                      {rate}
                    </span>
        ))}
      </div>
    </div>
  );
};

export default SettingsItem;