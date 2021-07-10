import React, { useEffect, useState } from 'react'
import style from '../styles/Favorite.module.sass'
import Link from 'next/link';
import { get } from 'idb-keyval';
import Image from 'next/image';

const Favorite = () => {

    const [favorite, setFavorite] = useState([{ blank: 'Пока здесь пусто :(' }]);

    useEffect(() => {
        const Favorite = async () => {
            const favorite = await get('Избранное');
            if (favorite !== undefined) {
                if (favorite.length > 0) {
                    setFavorite(await get('Избранное'));
                }
            }
        }
        Favorite();
    }, [])

    return (
        <section className={style.favorite_section}>
            <p className={style.favorite_title}>Избранное</p>
            <div className={style.favorite}>
                {favorite?.map((res, key) => (
                    <Link href='/media/[id]' as={`/media/${res?.id}`}>
                        <a key={key}>
                            <div className={style.favorite_item} key={key}>
                                {res?.blank && (<p>{res?.blank}</p>)}
                                <Image className={style.favorite_image} alt={res?.name} src={res?.poster} />
                                <p className={style.favorite_name}>{res?.name}</p>
                            </div>
                        </a>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default Favorite