import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Playlist from "../../../Store/Playlist";
import PlayerOptions from "../../../Store/PlayerOptions";
import Video from "../../../Store/Video";
import axios from "axios";
import { IMediaData, ITranslation } from "../../../interfaces/IMediaData";
import { $data } from "../../../api/IndexApi";

const GetUrl = async (
  info: IMediaData,
  season: number | null,
  episode: number | null,
  translation: number
) => {
  const { isSeries } = info;
  const Body = () => {
    if (isSeries) {
      return {
        translation,
        season,
        episode,
      };
    } else {
      return { translation };
    }
  };

  try {
    const body = Body();
    const { data } = await $data.post("/geturl", {
      ...body,
    });
    const { media } = data;
    Video.setUrls(media);
    PlayerOptions.setError(false);
    return media[0].urls[0];
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
