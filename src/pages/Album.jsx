import React, { useReducer, useRef, useState } from 'react';
import albumData from '../data/albums';
import PlayerBar from '../components/PlayerBar';
import { find } from 'lodash';
import { useParams } from 'react-router';
import SongRow from '../components/Album/SongRow';

function playerReducer( state, action ) {
  let firstSong;
  switch ( action.type ) {
    case 'INIT':
      firstSong = action.album.songs[0];
      return {
        ...state,
        album: action.album,
        currentSong: {
          song: firstSong,
          duration: firstSong.duration,
          remainingTime: firstSong.duration,
          isPlaying: false,
        },
        currentTime: 0,
        currentVolume:.8,
        isMuted: false,
      };
    case 'SET_CURRENT_SONG':
      return {
        ...state,
        currentSong: {
          ...state.currentSong,
          song: action.currentSong,
        },
        currentTime: 0
      };
    case 'DURATION_UPDATE':
      return {
        ...state,
        currentSong: {
          ...state.currentSong,
          duration: action.duration,
        }
      };
    case 'SET_CURRENT_TIME':
      return {
        ...state,
        currentTime: action.currentTime
      };
    case 'PLAY_SONG':
      return {
        ...state,
        currentSong: {
          ...state.currentSong,
          isPlaying: true
        }
      };
    case 'TOGGLE_PLAY_PAUSE':
      return {
        ...state,
        currentSong: {
          ...state.currentSong,
          isPlaying: !state.currentSong.isPlaying
        }
      };
    case 'TIME_UPDATE':
      return {
        ...state,
        currentTime: action.currentTime
      };
    case 'UPDATE_CURRENT_VOLUME':
      return {
        ...state,
        currentVolume: action.currentVolume
      };
    case 'TOGGLE_VOLUME_MUTE':
      return {
        ...state,
        isMuted:!state.isMuted
      };
    default:
      return state;
  }
}

const Album = () => {
  const playerRef = useRef(null);
  const [playerState, playerDispatch] = useReducer(playerReducer, {});
  const [isLoading, setIsLoading ] = useState(true);
  const { slug } = useParams();
  // const [ currentSong, setCurrentSong ] = useState( album.songs[ 0 ] );
  // const [ currentTime, setCurrentTime ] = useState( 0 );
  // const [ duration, setDuration ] = useState( album.songs[ 0 ].duration );
  // const [ currentVolume, setCurrentVolume ] = useState( .8 );
  // const [ isPlaying, setIsPlaying ] = useState( false );
  // const [ isHovered, setIsHovered ] = useState( false );
  // constructor( props ) {
  //   super( props );

  //   const album = albumData.find( album => {
  //     return album.slug === props.match.params.slug;
  //   } );

  //   state = {
  //     album: album,
  //     currentSong: album.songs[ 0 ],
  //     currentTime: 0,
  //     duration: album.songs[ 0 ].duration,
  //     currentVolume: .8,
  //     isPlaying: false,
  //     isHovered: null
  //   };

  // }
  // audioElement = document.createElement( 'audio' );
  // audioElement.src = album.songs[ 0 ].audioSrc;

  React.useEffect(() => {
    const album = find(albumData, (album) => {
      return album.slug === slug;
    });
    playerDispatch({ type: 'INIT',  album });

    setIsLoading(false);
  }, [slug]);

  React.useEffect(() => {
    if (!isLoading && playerRef.current && playerState.album && playerState.album.songs.length > 0) {
      playerRef.current.src = playerState.album.songs[0].audioSrc;
    }
  }, [isLoading, playerState.album]);



  function play() {
    playerRef.current.play();
    playerDispatch({ type: 'TOGGLE_PLAY_PAUSE' });
  }

  function pause() {
    playerRef.current.pause();
    playerDispatch({ type: 'TOGGLE_PLAY_PAUSE' });
  }

  function changeSong( song ) {
    playerRef.current.src = song.audioSrc;
    playerDispatch({ type: 'SET_CURRENT_SONG', currentSong: song } );
  }

  function handlePlayPauseClick() {
    if (playerState.currentSong.isPlaying) {
      pause();
    } else {
      play();
    }
  }

  function handleSongClick( song ) {
    const isSameSong = playerState.currentSong.song.title === song.title;
    if ( playerState.currentSong.isPlaying && isSameSong ) {
      pause();
    } 

    if ( !isSameSong ) {
      changeSong( song );
      play();
    }
  }

  function handlePrevClick() {
    const { album, currentSong } = playerState;
    const currentIndex = album.songs.indexOf(currentSong);
    // check if song is found or it's the first song
    if ( currentIndex === -1 || currentIndex === 0 ) {
      return;
    }
      
    const newSong = album.songs[currentIndex - 1];
    changeSong(newSong);
    play();
  }

  function handleNextClick() {
    const { album, currentSong } = playerState;
    const currentIndex = album.songs.indexOf(currentSong);
    // check if song is found or it's the last song
    if ( currentIndex === -1 || currentIndex === album.songs.length - 1 ) {
      return;
    }
    const newSong = album.songs[currentIndex + 1];
    changeSong(newSong);
    play();
  }

  function handleTimeChange( e ) {
    const newTime = playerState.duration * e.target.value;
    playerRef.current.currentTime = newTime;
    playerDispatch({ type: 'SET_CURRENT_TIME', currentTime: newTime } );
  }

  function handleVolumeChange( e ) {
    const newVol = e.target.value;
    playerRef.current.volume = newVol;
    playerDispatch({ type: 'UPDATE_CURRENT_VOLUME', currentVolume: newVol });
  }

  function formatTime( time ) {
    const floorTime = Math.floor( time );
    const minutes = Math.floor( floorTime / 60 );
    const seconds = ( floorTime % 60 );

    if ( isNaN( time ) ) { return '-:--'; }

    if ( seconds < 10 ) {
      return minutes + ':0' + seconds;
    } else
      return minutes + ':' + seconds;

  }

  if ( isLoading ) {
    return <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <div className={'album'}>
        <div className={'album-info'}>
          <img
            id={'album-cover-art'}
            src={ playerState.album.albumCover }
            alt={ playerState.album.title }
            width={272}
            height={272}
          />
          <div className={'album-details'}>
            <h1 id={'album-title'}>{ playerState.album.title }</h1>
            <h2 className={'artist'}>{ playerState.album.artist }</h2>
            <div id={'release-info'}>{ playerState.album.releaseInfo }</div>
            <table className={'song-list'}>
              <colgroup>
                <col className={'song-number-column'} />
                <col className={'song-title-column'} />
                <col className={'song-duration-column'} />
              </colgroup>
  
              <tbody>
                {
                  playerState.album.songs.map(( song, index ) =>
                    <SongRow 
                      key={index}
                      currentSong={ playerState.currentSong }
                      song={ song }
                      songNumber={ index + 1 }
                      formatTime={ formatTime }
                      handleSongClick={ handleSongClick }
                    />
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
        <audio
          ref={ playerRef }
          // src={ playerState.currentSong.song.audioSrc }
          onTimeUpdate={(e) => playerDispatch({type: 'TIME_UPDATE', currentTime: e.currentTarget.currentTime})}
          onDurationChange={(e) => playerDispatch({type: 'DURATION_UPDATE', duration: e.currentTarget.duration})}
          onVolumeChange={(e) => playerDispatch({type: 'UPDATE_CURRENT_VOLUME', currentVolume: e.currentTarget.volume})}
        ></audio>
      </div>
      <PlayerBar
        isPlaying={ playerState.currentSong.isPlaying }
        currentSong={ playerState.currentSong }
        currentTime={ playerState.currentTime }
        duration={ playerState.currentSong.duration }
        currentVolume={ playerState.currentVolume }
        handlePlayClick={ handlePlayPauseClick }
        handlePrevClick={ () => handlePrevClick() }
        handleNextClick={ () => handleNextClick() }
        formatTime={ ( e ) => formatTime( e ) }
        handleTimeChange={ ( e ) => handleTimeChange( e ) }
        handleVolumeChange={ ( e ) => handleVolumeChange( e ) }
      />
    </React.Fragment>
  );
};

export default Album;
