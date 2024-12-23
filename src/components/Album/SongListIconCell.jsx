import React from 'react';

const SongListIconCell = ({ currentSong, isHovered, song, songNumber }) => {
  if ( currentSong.isPlaying && currentSong.song.title === song.title ) {
    return <span className={'ion-md-pause'}></span>;
  } else if ((currentSong.song.title === song.title && !currentSong.isPlaying) || (isHovered && currentSong.title !== song.title) ) {
    return <span className={'ion-md-play-circle'}></span>;
  } else {
    return <span>{ songNumber }</span>;
  }
};

export default SongListIconCell;
