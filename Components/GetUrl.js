import Playlist from '../Store/Playlist';
import PlayerOptions from '../Store/PlayerOptions';
import Info from '../Store/Info';
import PlayerControls from '../Store/PlayerControls';
import Video from '../Store/Video';
import { toJS } from 'mobx';

export const GetUrl = async () => {
    try {
        Video.setUrl(null);
        var url;
        PlayerOptions.setBuffering(true)
        if (Video?.translation?.id !== null && Video?.translation?.id !== undefined) {
            url = Info?.info.serial ? `/api/geturl?kp=${Info?.info?.kp}&season=${Playlist?.season}&episode=${Playlist?.episode}&id=${Info.info.hdrezka_id}&translation=${Video?.translation?.id}&source=rezka` : `/api/geturl?kp=${Info?.videocdn?.kinopoisk_id}&id=${Info.info.hdrezka_id}&translation=${Video?.translation?.id}&source=rezka`;
            const response = await fetch(url);
            const result = await response.json();
            Video.setUrl(result?.urls[0].urls[0]);
            Video.setUrls(result.urls);
        } else {
            const urlresponse = await fetch(Info?.info.serial ? `/api/geturl?kp=${Info?.info?.kp}&season=${Playlist?.season}&episode=${Playlist?.episode}&id=${Info.info.hdrezka_id}&source=rezka` : `/api/geturl?kp=${Info?.videocdn?.kinopoisk_id}&id=${Info.info.hdrezka_id}&source=rezka`);
            const urls = await urlresponse.json();
            if (Playlist?.quality !== undefined) {
                urls?.urls.filter((quality) => {
                    if (quality?.quality === Playlist?.quality) {
                        Video.setUrl(quality?.urls[0]);
                    }
                })
            } else {
                Video.setUrl(urls?.urls[0].urls[0]);
            }
            Video.setUrls(urls.urls);
            const transresponse = await fetch(`/api/translations?id=${Info.info.hdrezka_id}`);
            const translations = await transresponse.json();
            Playlist.setTranslations(translations?.translations);
            if (Video?.translation?.id === undefined || Video?.translation?.id === null) {
                Video.setTranslation(Video?.translation?.id, translations?.translations[0]?.name);
            }
        }
        //PlayerOptions.setBuffering(false)
        PlayerOptions.setError(false);
    } catch (err) {
        PlayerOptions.setError(true)
    }
}