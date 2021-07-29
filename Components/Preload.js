/*useEffect(() => {
        const Preload = async () => {
            var arr;
            setState({ ...state, newurl: null });
            if (Info?.videocdn?.content_type === 'tv_series' && Info?.kp?.data?.seasons !== undefined) {
                arr = toJS(Info?.kp?.data?.seasons);
                const search = arr?.filter((res) => {
                    if (res?.number === Playlist?.season) {
                        return res
                    }
                })
                var season;
                var episode;

                if (Playlist?.episode < search[0]?.episodes.length) {
                    season = Playlist?.season;
                    episode = (Number(Playlist?.episode) + 1);
                }

                while (true) {
                    try {
                        setState({ ...state, preload: 'pending' });
                        //const url = `/film?type=tv_series&id=${Info?.videocdn?.id}&season=${season}&episode=${episode}&translation=${Playlist?.translation?.id}&source=vcdn`;
                        var url;
                        /*if (Playlist?.translation?.id !== null) {
                            url = Info?.videocdn?.content_type === 'tv_series' ? `/api/film?type=tv_series&kp=${Info?.info?.kp}&season=${season}&episode=${episode}&translation=${Playlist?.translation?.id}&source=rezka` : `/api/film?kp=${Info?.info?.kp}&translation=${Playlist?.translation?.id}&source=rezka`;
                        } else {
                            url = Info?.videocdn?.content_type === 'tv_series' ? `/api/film?type=tv_series&kp=${Info?.info?.kp}&season=${season}&episode=${episode}&source=rezka` : `/api/film?kp=${Info?.info?.kp}&source=rezka`;
                        }
                        const response = await fetch(url);
                        const result = await response.json();
                        setState({ ...state, newurl: result?.url });
                        if (Playlist?.translation?.id !== null && Playlist?.translation?.id !== undefined) {
                            url = Info?.info.serial ? `/api/geturl?kp=${Info?.info?.kp}&season=${Playlist?.season}&episode=${Playlist?.episode}&id=${Info.info.hdrezka_id}&translation=${Playlist?.translation?.id}&source=rezka` : `/api/geturl?kp=${Info?.info?.kp}&id=${Info.info.hdrezka_id}&translation=${Playlist?.translation?.id}&source=rezka`;
                            const response = await fetch(url);
                            const result = await response.json();
                            Playlist.setUrl(result?.urls[0].urls[0]);
                            Playlist.setUrls(result.urls);
                        }

                        if (Playlist?.translation?.id === null || Playlist?.translation?.id === undefined) {
                            const response1 = await fetch(`/api/translations?id=${Info.info.hdrezka_id}`);
                            const translations = await response1.json();
                            Playlist?.translation?.name === null && Playlist.setTranslation(translations?.translations[0]?.id, translations?.translations[0]?.name);
                            Playlist.setTranslations(translations?.translations);
                            const response2 = await fetch(Info?.info.serial ? `/api/geturl?kp=${Info?.info?.kp}&season=${Playlist?.season}&episode=${Playlist?.episode}&id=${Info.info.hdrezka_id}&translation=${translations?.translations[0]?.id}&source=rezka` : `/api/geturl?kp=${Info?.info?.kp}&id=${Info.info.hdrezka_id}&translation=${translations?.translations[0]?.id}&source=rezka`);
                            const urls = await response2.json();
                            Playlist.setUrl(urls?.urls[0].urls[0]);
                            Playlist.setUrls(urls.urls);
                        }
                        break;
                    } catch (err) {
                    }
                }
            } else {
                console.log(Info?.videocdn?.content_type)
                try {
                    setState({ ...state, preload: 'pending' });
                    if (Playlist?.translation?.id !== null && Playlist?.translation?.id !== undefined) {
                        url = Info?.info.serial ? `/api/geturl?kp=${Info?.info?.kp}&season=${Playlist?.season}&episode=${Playlist?.episode}&id=${Info.info.hdrezka_id}&translation=${Playlist?.translation?.id}&source=rezka` : `/api/geturl?kp=${Info?.info?.kp}&id=${Info.info.hdrezka_id}&translation=${Playlist?.translation?.id}&source=rezka`;
                        const response = await fetch(url);
                        const result = await response.json();
                        Playlist.setUrl(result?.urls[0].urls[0]);
                        Playlist.setUrls(result.urls);
                    }

                    if (Playlist?.translation?.id === null || Playlist?.translation?.id === undefined) {
                        const response1 = await fetch(`/api/translations?id=${Info.info.hdrezka_id}`);
                        const translations = await response1.json();
                        Playlist?.translation?.name === null && Playlist.setTranslation(translations?.translations[0]?.id, translations?.translations[0]?.name);
                        Playlist.setTranslations(translations?.translations);
                        const response2 = await fetch(Info?.info.serial ? `/api/geturl?kp=${Info?.info?.kp}&season=${Playlist?.season}&episode=${Playlist?.episode}&id=${Info.info.hdrezka_id}&translation=${translations?.translations[0]?.id}&source=rezka` : `/api/geturl?kp=${Info?.info?.kp}&id=${Info.info.hdrezka_id}&translation=${translations?.translations[0]?.id}&source=rezka`);
                        const urls = await response2.json();
                        Playlist.setUrl(urls?.urls[0].urls[0]);
                        Playlist.setUrls(urls.urls);
                    }
                } catch (err) {
                }
            }
        }

        Preload();
    }, [Playlist?.season, Playlist?.episode, Playlist?.translation?.id])*/