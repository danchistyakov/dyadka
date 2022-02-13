// import {useRouter} from 'next/router';
// import {ChangeEvent, useEffect, useState} from 'react';
// import {FullScreen, useFullScreenHandle} from 'react-full-screen';
// import {IMedia, IMediaData, ITranslation} from '../../../interfaces/IMediaData';
// import {PlayerProps} from '../interfaces/IPlayer';
// import GetUrl from './GetUrl';
//
const usePlayer = () => {
//   const [isBuffering, setBuffering] = useState<boolean>(true);
//   const [isMuted, setMute] = useState<boolean>(false);
//   const [isPlaying, setPlaying] = useState(true);
//   const [isPirate, setPirate] = useState<boolean>(false);
//   const [url, setUrl] = useState<string | null>(null);
//   const [urls, setUrls] = useState<IMedia[]>([]);
//   const [qualityId, setQualityId] = useState<number>(2);
//   const [volume, setVolume] = useState<number>(100);
//   const router = useRouter();
//   const {pathname, query} = router;
//   const {translationId, season, episode} = query;
//
//   const handleBuffering = (value: boolean) => {
//     setBuffering(value);
//   };
//
//   const handlePirate = (value: boolean) => {
//     setPirate(value);
//   };
//
//   const handlePlaying = (value: boolean) => {
//     setPlaying(value);
//   };
//
//   const handleQuality = (id: number) => {
//     setQualityId(id);
//   }
//
//   const handleVolume = (e: ChangeEvent<HTMLInputElement>) => {
//     setVolume(Number(e.target.value));
//   };
//
//   const handleMute = (value: boolean) => {
//     setMute(value);
//   };
//
//   const prevEpisode = (season: number, episode: number) => {
//     if (episode > 1) {
//       return router.push(
//         {
//           pathname,
//           query: {...query, episode: episode - 1},
//         },
//         undefined,
//         {shallow: true}
//       );
//     }
//     if (season > 1) {
//       return router.push(
//         {
//           pathname,
//           query: {...query, season: season - 1, episode: 1},
//         },
//         undefined,
//         {shallow: true}
//       );
//     }
//
//     return;
//   };
//
//   const nextEpisode = (season: number, episode: number) => {
//     const seasonsAmount = data.playlist.length;
//     const seasonLength = data.playlist[season - 1].episodes.length;
//
//     if (episode < seasonLength) {
//       return router.push(
//         {
//           pathname,
//           query: {...query, episode: episode + 1},
//         },
//         undefined,
//         {shallow: true}
//       );
//     }
//
//     if (season >= seasonsAmount) {
//       return;
//     }
//
//     if (episode >= seasonLength) {
//       return router.push(
//         {
//           pathname,
//           query: {...query, season: season + 1, episode: 1},
//         },
//         undefined,
//         {shallow: true}
//       );
//     }
//   };
//
//   useEffect(() => {
//     const Fetch = async () => {
//       setUrl(null);
//       setBuffering(true);
//       let translationData: ITranslation;
//       let translation: number;
//       if (translationId) {
//         translation = Number(translationId);
//         translationData = data.translations.find(
//           (item) => item.id === Number(translationId)
//         );
//       } else {
//         if (data.isSeries) {
//           translation = data.translations[0].id;
//         }
//         translation = data.translations[0].id;
//         translationData = data.translations[0];
//       }
//       const urlStrings = await GetUrl(
//         data.kpId,
//         data.isSeries,
//         season || '1',
//         episode || '1',
//         translation
//       );
//       console.log(urlStrings)
//       setUrls(urlStrings);
//       setUrl(urlStrings[qualityId].streams[0]);
//       setPlaying(true);
//     };
//     Fetch();
//   }, [data, translationId, season, episode]);
//
//   useEffect(() => {
//     const url = urls[qualityId]?.streams[0];
//     setUrl(url);
//   }, [qualityId])
//   console.log(qualityId)
//
//   useEffect(() => {
//     if (!fullScreenHandle.active) {
//       document.body.style.cursor = 'auto';
//     }
//   }, [fullScreenHandle.active]);
//
//   return {
//     data,
//     isBuffering,
//     isMuted,
//     isPirate,
//     isPlaying,
//     handleBuffering,
//     handleMute,
//     handlePirate,
//     handlePlaying,
//     handleQuality,
//     handleVolume,
//     prevEpisode,
//     nextEpisode,
//     fullScreenHandle,
//     qualityId,
//     url,
//     urls,
//     volume,
//   };
};
//
export default usePlayer;
