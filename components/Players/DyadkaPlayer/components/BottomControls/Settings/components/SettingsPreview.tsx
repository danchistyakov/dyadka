import Icons from '../../../../../../../assets/images/Icons';
import { FC } from 'react';
import { SettingsPreviewProps } from '../interfaces/ISettings';
import styles from '../styles/SettingsPreview.module.scss';

const SettingsPreview: FC<SettingsPreviewProps> = ({ onClick, title, value }) => {
  return (
    <span className={styles.container} onClick={onClick}>
      <p className={styles.title}>{title}:</p>
      <p className={styles.value}>{value}</p>
      <span className={styles.icon}>
        <Icons icon='ChevronRightIcon' />
      </span>
    </span>
  );
};

export default SettingsPreview;
