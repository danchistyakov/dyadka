import React, { useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import Link from 'next/link';

const Navigation = (props) => {
    const [index, setIndex] = useState(null);
    const amount = props?.number > 10 ? Array.from(Array(10), (_, i) => i) : Array.from(Array(props?.number), (_, i) => i);

    return (
        <div className='pages'>
            {props?.number > 1 && (<Link href={`${Number(props?.number) - 1}`}><span className='pages_slider'>&lt;</span></Link>)}
            <ScrollContainer className='pages_nav'>
                {amount?.map((res, key) => (
                    {/*<NavLink to={`${res + 1}`} key={key} className='pages_a' activeClassName='pages_a_active' onClick={() => setIndex(res + 1)}>{res + 1}</NavLink>*/ }
                ))}<Link href={`${res + 1}`} key={key} className='pages_a' activeClassName='pages_a_active' onClick={() => setIndex(res + 1)}>{res + 1}</Link>
            </ScrollContainer>

            {index < props?.number && (<Link href={`${Number(props?.number) + 1}`}><span className='pages_slider'>&gt;</span></Link>)}
        </div>
    )
}

export default Navigation
