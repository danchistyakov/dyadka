import React, { useState, useEffect, useRef } from 'react';
import style from '../styles/Settings.module.sass';
import Playlist from '../Store/Playlist';
//import SettingsIcon from '@material-ui/icons/Settings';
/*import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';*/
import Icons from '../Images/Icons';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import Video from '../Store/Video';
import Info from '../Store/Info';
import { get, set } from 'idb-keyval';

const Settings = observer(() => {
    const [qualityOptions, setQualityOptions] = useState({
        quality: '1080p Ultra',
        qvisible: false
    });
    const [svisible, setSVisible] = useState(false);
    const { quality, qvisible } = qualityOptions;
    const [speed, setSpeed] = useState(false);
    const [visible, setVisible] = useState(false);
    const settingsModal = useRef(null);

    useEffect(() => {
        const onClick = e => settingsModal.current?.contains(e.target) || setVisible(false);
        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, []);

    const handleQuality = (item) => {
        Video.setUrl(item.urls[0]);
        setQualityOptions({ quality: item?.quality, qvisible: false });
        Playlist.setQuality(item?.quality);
    }

    useEffect(() => {
        const Last = async () => {
            if (await get('Длительность') !== undefined) {
                var info = await get('Длительность');
                var search = info.findIndex(item => item?.kinopoisk_id === Info?.info?.kp);
                info[search]?.quality !== undefined && setQualityOptions({ ...qualityOptions, quality: info[search]?.quality });
            }
        }
        Last();
    }, [Info?.info?.kp]);

    return (
        <div>
            {!visible && (
                <Icons icon='SettingsIcon' className={style.settings_icon}
                    onClick={(e) => { e.stopPropagation(); setVisible(true) }}
                />
            )
            }
            {visible && (
                <span className={style.settings_icon_active}>
                    <Icons icon='SettingsIcon' className={style.settings_icon}
                        onClick={(e) => { e.stopPropagation(); setVisible(false) }}
                    />
                </span>
            )
            }
            {visible && (<div className={style.popup} ref={settingsModal}>
                <div className={style.settings_list}>
                    {!speed && !qvisible && (<div className={style.settings_item} onClick={(e) => { e.stopPropagation(); setQualityOptions({ ...qualityOptions, qvisible: true }) }}>
                        {!qvisible && (<span className={style.settings_preview}>
                            <span className={style.option_name}>Качество:</span>
                            <span className={style.preview_clickable}>
                                <span className={style.preview_value}>{quality}</span>
                                <span className={style.settings_chevron}><Icons icon='ChevronRightIcon' /></span>
                            </span>
                        </span>)}
                    </div>)}
                    {!speed && !qvisible && (<div className={style.settings_item} onClick={(e) => { e.stopPropagation(); setSpeed(true) }}>
                        {!speed && (<span className={style.settings_preview}>
                            <span className={style.option_name}>Скорость:</span>
                            <span className={style.preview_clickable}>
                                <span className={style.preview_value}>{Playlist?.speed}</span>
                                <span className={style.settings_chevron}>
                                    <Icons icon='ChevronRightIcon' />
                                </span>
                            </span>
                        </span>)}
                    </div>)}
                    {qvisible && (<div className={style.settings_options}>
                        <div className={style.options_title} onClick={(e) => { e.stopPropagation(); setQualityOptions({ ...qualityOptions, qvisible: false }) }}>
                            <span className={style.left_chevron}>
                                <Icons icon='ChevronLeftIcon' />
                            </span>
                            <span className={style.option_name}>Качество</span>
                        </div>
                        <div className={style.choice_list}>
                            {toJS(Video?.urls)?.map((item, key) => (
                                <span key={key} className={style.settings_choice} onClick={() => handleQuality(item)}>
                                    {item?.quality}
                                </span>
                            ))}
                        </div>
                    </div>)}
                    {speed && (<div className={style.settings_options}>
                        <div className={style.options_title} onClick={(e) => { e.stopPropagation(); setSpeed(false) }}>
                            <span className={style.left_chevron}>
                                <Icons icon='ChevronLeftIcon' />
                            </span>
                            <span className={style.option_name}>Скорость</span>
                        </div>
                        <div className={style.choice_list}>
                            {[0.5, 1, 1.5, 2].map((rate, key) => (
                                <span key={key} className={style.settings_choice} onClick={() => { Playlist.setSpeed(rate); setSpeed(false) }}>
                                    {rate}
                                </span>
                            ))}
                        </div>
                    </div >)}
                </div >
            </div >)
            }
        </div >
    )
}
)

export default Settings