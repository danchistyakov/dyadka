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
        isSeries,
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
    return urls;
  } catch (err) {
    PlayerOptions.setError(true);
  }
};

export default GetUrl;
