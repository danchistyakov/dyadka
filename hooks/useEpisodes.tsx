import React from 'react';
import {useRouter} from 'next/router';
import {IMediaData} from '@interfaces/IMediaData';


const UseEpisodes = (data: IMediaData) => {
  const router = useRouter();
  const {pathname, query} = router;

  const prevEpisode = (season: number, episode: number) => {
    if (episode > 1) {
      return router.push(
        {
          pathname,
          query: {...query, episode: episode - 1},
        },
        undefined,
        {shallow: true}
      );
    }
    if (season > 1) {
      return router.push(
        {
          pathname,
          query: {...query, season: season - 1, episode: 1},
        },
        undefined,
        {shallow: true}
      );
    }

    return;
  };

  const nextEpisode = (season: number, episode: number) => {
    const seasonsAmount = data.playlist.length;
    const seasonLength = data.playlist[season - 1].episodes.length;

    if (episode < seasonLength) {
      return router.push(
        {
          pathname,
          query: {...query, episode: episode + 1},
        },
        undefined,
        {shallow: true}
      );
    }

    if (season >= seasonsAmount) {
      return;
    }

    if (episode >= seasonLength) {
      return router.push(
        {
          pathname,
          query: {...query, season: season + 1, episode: 1},
        },
        undefined,
        {shallow: true}
      );
    }
  };

  return {prevEpisode, nextEpisode}
};

export default UseEpisodes;