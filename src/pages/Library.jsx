import React from 'react';
import { Link } from 'react-router';
import albumData from '../data/albums';

const Library = () => {
  const [albums] = React.useState(albumData);

  return (
    <section className={ 'library' }>
      {
        albums.map((album, index) =>
          <Link to={ `/album/${album.slug}` } key={ index } className={'album-link'}>
            <div className={ 'album-container' }>
              <img src={ album.albumCover } alt={ album.title } width={ 96 } />
              <div>{ album.title }</div>
              <div>{ album.artist }</div>
              <div>{ `${album.songs.length} songs` }</div>
            </div>
          </Link>
        )
      }
    </section>
  );
};

export default Library;