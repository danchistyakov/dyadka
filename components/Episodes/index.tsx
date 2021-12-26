import React, { FC } from "react";
import styles from "./styles/Playlist.module.scss";
import { observer } from "mobx-react-lite";
import SwiperCore, { Navigation } from "swiper/core";
import SeasonsSlider from "./components/SeasonsSlider";
import { PlaylistProps } from "./interfaces/IPlaylist";
import useSeasons from "./hooks/useSeasons";

SwiperCore.use([Navigation]);

const Episodes: FC<PlaylistProps> = observer(({ data }) => {
  return (
    <section className={styles.nav_section}>
      <SeasonsSlider {...useSeasons(data)} />
    </section>
  );
});
export default Episodes;
