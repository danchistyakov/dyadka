import Playlist from "../Store/Playlist";
import PlayerOptions from "../Store/PlayerOptions";
import Info from "../Store/Info";
import PlayerControls from "../Store/PlayerControls";
import Video from "../Store/Video";

export const GetUrl = async () => {
  try {
    Video.setUrl(null);
    PlayerOptions.setBuffering(true);
    PlayerControls.setPlaying(true);
    const response = await fetch("https://api.dyadka.gq/geturl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: Info.info.serial
        ? JSON.stringify({
            id: Info.info.id,
            translation: Video.translation.id,
            season: Playlist.season,
            episode: Playlist.episode,
          })
        : JSON.stringify({
            id: Info.info.id,
            translation: Video.translation.id,
          }),
    });
    const result = await response.json();
    Video.setUrls(result.media);
    Playlist.setQuality(result.media[0].quality);
    if (Playlist.quality) {
      result.media.filter((item) => {
        if (item.quality === Playlist.quality) {
          Video.setUrl(item.urls[0]);
        }
      });
    } else {
      Video.setUrl(result.media[0].urls[0]);
    }
    PlayerOptions.setError(false);
    PlayerControls.setPlaying(true);
  } catch (err) {
    console.log(err);
    PlayerOptions.setError(true);
  }
};
