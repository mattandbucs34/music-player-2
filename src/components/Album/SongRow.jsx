import React, { useState } from 'react';
import SongListIconCell from './SongListIconCell';

const SongRow = ({currentSong, song, songNumber, formatTime, handleSongClick}) => {
  const [isHovered, setIsHovered] = useState(false);

  

  return (
    <tr className={'song-row'}
      onClick={() => handleSongClick( song )}
      onMouseEnter={ () => setIsHovered(true) }
      onMouseLeave={() => setIsHovered(false) }
    >
      <td className={'song-status-cell'}>
        <SongListIconCell
          currentSong={currentSong}
          isHovered={isHovered}
          song={song}
          songNumber={songNumber}
        />
      </td>
      <td className={'song-title'}>{ song.title }</td>
      <td>{ formatTime( song.duration ) }</td>
    </tr>
  );
};

export default SongRow;
