import PlayerOptions from '../../../store/PlayerOptions';
import {$data} from '../../../api/IndexApi';

const GetUrl = async (
  kpId: number,
  isSeries: boolean,
  season: any,
  episode: any,
  translation: number
) => {
  const Body = () => {
    if (isSeries) {
      return {
        kpId,
        translation,
        season,
        episode,
      };
    } else {
      return {kpId, translation};
    }
  };

  try {
    const {data} = await $data.post('/geturl', {
      ...Body(),
    });
    const {urls} = data;
    PlayerOptions.setError(false);
    return urls[0].streams[0];
    /*if (Playlist.quality.name) {
          const filtered = media.find(
            (item) => item.quality === Playlist.quality.name
          );

          if (filtered) {
            Video.setUrl(filtered.urls[0]);
            Playlist.setQuality(filtered.quality, null);
          } else {
            Video.setUrl(media[0].urls[0]);
            Playlist.setQuality(media[0].quality, null);
          }
        } else {
          Playlist.setQuality(media[0].quality, null);
          setResult(media[0].urls[0]);
        }*/
  } catch (err) {
    PlayerOptions.setError(true);
  }
};

export default GetUrl;
