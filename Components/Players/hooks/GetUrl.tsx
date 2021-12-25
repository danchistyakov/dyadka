import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Playlist from "../../../Store/Playlist";
import PlayerOptions from "../../../Store/PlayerOptions";
import Video from "../../../Store/Video";
import axios from "axios";
import { IMediaData, ITranslation } from "../../../interfaces/IMediaData";

const GetUrl = async (
  info: IMediaData,
  season: number | null,
  episode: number | null,
  translation: number,
  translationData: ITranslation
) => {
  const { isSeries, slug, token } = info;
  const source = Buffer.from(slug).toString("base64");
  const Body = (hash: string) => {
    if (isSeries) {
      return {
        source,
        translation,
        season,
        episode,
        token,
      };
    } else {
      return { source, hash, translation, token };
    }
  };
  const str = JSON.stringify(translationData.params) || "";
  console.log(str);
  const hash = Buffer.from(str).toString("base64");
  try {
    const body = Body(hash);
    const { data } = await axios.post("https://api.dyadka.gq/geturl", {
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
