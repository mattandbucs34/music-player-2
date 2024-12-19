import React from 'react';
import { Link } from 'react-router';
import albumData from './../data/albums';

const Library = () => {
    const [ albums ] = React.useState( albumData );

    return (
        <section className='library'>
            {
                albums.map( ( album, index ) =>
                    <Link to={ `/album/${album.slug}` } key={ index }>
                        <img src={ album.albumCover } alt={ album.title } />
                        <div>{ album.title }</div>
                        <div>{ album.artist }</div>
                        <div>{ album.songs.length }</div>
                    </Link>
                )
            }
        </section>
    );
};

export default Library;