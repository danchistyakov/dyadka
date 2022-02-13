import PlayerOptions from '../../../store/PlayerOptions';

const GetUrl = async (
  kpId: number,
  isSeries: boolean,
  season: any,
  episode: any,
  translation: number
) => {
  // const Body = () => {
  //   if (isSeries) {
  //     return {
  //       kpId,
  //       isSeries,
  //       translation,
  //       season,
  //       episode,
  //     };
  //   } else {
  //     return {kpId, translation};
  //   }
  // };
  //
  // try {
  //   const {data} = await $data.post('/geturl', {
  //     ...Body(),
  //   });
  //   const {urls} = data;
  //   //setUrls(urls);
  //   PlayerOptions.setError(false);
  //   return urls;
  // } catch (err) {
  //   PlayerOptions.setError(true);
  // }
};

export default GetUrl;
