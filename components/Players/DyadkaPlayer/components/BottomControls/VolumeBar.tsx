import React from 'react';
import styles from './styles/VolumeBar.module.scss';

const VolumeBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.bar}></div>
      {/* <div className={styles.played} style={{ width: `${progress.played * 100}%` }}>
        <div className={styles.thumb}></div>
      </div> */}
    </div>
  );
};

export default VolumeBar;
