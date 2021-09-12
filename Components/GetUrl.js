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
      body: Info.info.series
        ? JSON.stringify({
            source: Info.source,
            translation: Video.translation.id,
            season: Playlist.season,
            episode: Playlist.episode,
            token: Info.info.token,
          })
        : JSON.stringify({
            source: Info.source,
            hash: Video.translation.params,
            translation: Video.translation.id,
            token: Info.info.token,
          }),
    });
    const { media } = await response.json();
    Video.setUrls(media);
    if (Playlist.quality.name) {
      media.filter((item) => {
        if (item.quality === Playlist.quality.name) {
          Video.setUrl(item.urls[0]);
          Playlist.setQuality(item.quality, null);
        }
      });
    } else {
      Playlist.setQuality(media[0].quality, null);
      Video.setUrl(media[0].urls[0]);
    }
    PlayerOptions.setError(false);
    PlayerControls.setPlaying(true);
  } catch (err) {
    console.log(err);
    PlayerOptions.setError(true);
  }
};
