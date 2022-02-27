import React, { memo } from "react";
import styles from "./styles/ProgressBar.module.scss";
import { useEvent, useStore } from "effector-react/ssr";
import { $progress, setSeekValue } from "@models/Player";

const ProgressBar = () => {
  const progress = useStore($progress);
  const setSeekValueFn = useEvent(setSeekValue);

  return (
    <div className={styles.container} onClick={setSeekValueFn}>
      <div className={styles.bar}></div>
      <div className={styles.played} style={{ width: `${progress.played * 100}%` }}>
        <div className={styles.thumb}></div>
      </div>
    </div>
  );
};

export default memo(ProgressBar);
