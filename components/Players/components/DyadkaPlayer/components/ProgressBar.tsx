import React from "react";
import styles from "../styles/ProgressSlider.module.scss";
import { useStore } from "effector-react/ssr";
import { $player } from "@models/Player";

const ProgressBar = () => {
  const { progress } = useStore($player);
  return (
    <div>
      <div className={styles.bar}></div>
      <div className={styles.played} style={{ width: `${progress.played * 100}%` }}>
        <div className={styles.thumb}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
