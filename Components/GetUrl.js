import Playlist from '../Store/Playlist';
import PlayerOptions from '../Store/PlayerOptions';
import Info from '../Store/Info';
import PlayerControls from '../Store/PlayerControls';
import Video from '../Store/Video';
import { toJS } from 'mobx';

export const GetUrl = async () => {
    try {
        var url;
        PlayerOptions.setBuffering(true)
        if (Video?.translation?.id !== null && Video?.translation?.id !== undefined) {
            url = Info?.info.serial ? `/api/geturl?kp=${Info?.info?.kp}&season=${Playlist?.season}&episode=${Playlist?.episode}&id=${Info.info.hdrezka_id}&translation=${Video?.translation?.id}&source=rezka` : `/api/geturl?kp=${Info?.videocdn?.kinopoisk_id}&id=${Info.info.hdrezka_id}&translation=${Video?.translation?.id}&source=rezka`;
            const response = await fetch(url);
            const result = await response.json();
            Video.setUrl(result?.urls[0].urls[0]);
            Video.setUrls(result.urls);
        }

        if (Playlist?.translation?.id === null || Playlist?.translation?.id === undefined) {
            const response1 = await fetch(`/api/translations?id=${Info.info.hdrezka_id}`);
            const translations = await response1.json();
            Video.setTranslation(translations?.translations[0]);
            Playlist.setTranslations(translations?.translations);
            const response2 = await fetch(Info?.info.serial ? `/api/geturl?kp=${Info?.info?.kp}&season=${Playlist?.season}&episode=${Playlist?.episode}&id=${Info.info.hdrezka_id}&translation=${translations?.translations[0]?.id}&source=rezka` : `/api/geturl?kp=${Info?.videocdn?.kinopoisk_id}&id=${Info.info.hdrezka_id}&translation=${translations?.translations[0]?.id}&source=rezka`);
            const urls = await response2.json();
            console.log(Playlist?.quality)
            if (Playlist?.quality !== undefined) {
                urls?.urls.filter((quality) => {
                    if (quality?.quality === Playlist?.quality) {
                        console.log(quality?.urls[0])
                        Video.setUrl(quality?.urls[0]);
                    }
                })
            } else {
                Video.setUrl(urls?.urls[0].urls[0]);
            }
            Video.setUrls(urls.urls);
        }
        PlayerOptions.setBuffering(false)
        PlayerOptions.setError(false);
    } catch (err) {
        console.log(err)
        PlayerOptions.setError(true)
    }
}