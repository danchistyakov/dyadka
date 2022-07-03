import React, {memo} from "react";
import styles from "./ProgressBar.module.scss";
import {useEvent, useStore} from "effector-react/ssr";
import {$progress, setProgress} from "@models/Player";

const ProgressBar = () => {
    const progress = useStore($progress);
    const setProgressFn = useEvent(setProgress);

    return (
        <div className={styles.container} onClick={setProgressFn}>
            <div className={styles.bar} />
            <div className={styles.played} style={{width: `${progress * 100}%`}}>
                <div className={styles.thumb} />
            </div>
        </div>
    );
};

export default memo(ProgressBar);
