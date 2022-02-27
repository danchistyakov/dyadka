import { FC } from 'react';
import styles from '../styles/SettingsItem.module.scss';
import Icons from '@images/Icons';
import { SettingsItemProps } from '../interfaces/ISettings';

const SettingsItem: FC<SettingsItemProps> = ({ data, onChoose, onClose, title }) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.header}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <span>
          <Icons className={styles.icon} icon='ChevronLeftIcon' />
        </span>
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.list}>
        {data.map(({ id, value }) => (
          <span
            key={id}
            className={styles.item}
            onClick={() => {
              onChoose(id);
              onClose();
            }}
          >
            {value}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SettingsItem;
