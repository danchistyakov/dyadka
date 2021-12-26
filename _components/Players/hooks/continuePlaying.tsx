import axios from "axios";
import { useEffect } from "react";

const continuePlaying = async (isAuth: boolean, email: string, id: number) => {
  /*if (isAuth && id) {
    const { data } = await axios.post(
      "http://localhost:5000/timestamp",
      {
        action: "get",
        email,
        id,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    if (data.success) {
      const { info } = data;
      const transName = toJS(Playlist.translations).find(
        (x) => x.id === data.info.translation
      ).name;
      console.log(transName);
      Video.setTranslation(data.info.translation, transName, null);
      if (Info.info.translations.default.id !== data.info.translation) {
        await GetUrl();
      }
      Playlist.setQuality(
        Video.urls[data.info.quality].quality,
        data.info.quality
      );
      playerRef.current.seekTo(data.info.time);
    } else {
      Video.setTranslation(
        data.translations.default.id,
        data.translations.default.name
      );
    }
  }*/
};

export default continuePlaying;
