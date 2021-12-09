import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Playlist from "../../../Store/Playlist";
import PlayerOptions from "../../../Store/PlayerOptions";
import Video from "../../../Store/Video";
import axios from "axios";
import { IMediaData, ITranslation } from "../../../Interfaces/IMediaData";

const GetUrl = (
  info: IMediaData,
  translation: ITranslation,
  season: number,
  episode: number,
  setBuffering: Dispatch<SetStateAction<boolean>>,
  setPlaying: Dispatch<SetStateAction<boolean>>
) => {
  const [result, setResult] = useState(null);
  const source = Buffer.from(info.slug).toString("base64");
  const { token } = info;
  useEffect(() => {
    const str = translation.params?.toString() || "";
    const hash = Buffer.from(str).toString("base64");
    const Fetch = async () => {
      try {
        setResult(null);
        setBuffering(true);
        const body = info.series
          ? {
              source,
              translation: translation.id,
              season,
              episode,
              token,
            }
          : {
              source,
              hash,
              translation: translation.id,
              token,
            };
        const { data } = await axios.post("https://api.dyadka.gq/geturl", {
          ...body,
        });
        const { media } = data;
        Video.setUrls(media);
        setResult(media[0].urls[0]);
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
        PlayerOptions.setError(false);
        setPlaying(true);
      } catch (err) {
        PlayerOptions.setError(true);
      }
    };
    Fetch();
  }, [translation, season, episode]);
  return result;
};

export default GetUrl;
