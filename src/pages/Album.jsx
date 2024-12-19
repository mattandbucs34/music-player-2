import React, { Component } from 'react';
import albumData from '../data/albums';
import PlayerBar from '../components/PlayerBar';
import { get } from 'lodash';

const Album = () => {
  const album = get( albumData, `[slug='${this.props.match.params.slug}']`, null );
  const [ currentSong, setCurrentSong ] = useState( album.songs[ 0 ] );
  const [ currentTime, setCurrentTime ] = useState( 0 );
  const [ duration, setDuration ] = useState( album.songs[ 0 ].duration );
  const [ currentVolume, setCurrentVolume ] = useState( .8 );
  const [ isPlaying, setIsPlaying ] = useState( false );
  const [ isHovered, setIsHovered ] = useState( false );
  // constructor( props ) {
  //   super( props );

  //   const album = albumData.find( album => {
  //     return album.slug === this.props.match.params.slug;
  //   } );

  //   this.state = {
  //     album: album,
  //     currentSong: album.songs[ 0 ],
  //     currentTime: 0,
  //     duration: album.songs[ 0 ].duration,
  //     currentVolume: .8,
  //     isPlaying: false,
  //     isHovered: null
  //   };

  // }
  audioElement = document.createElement( 'audio' );
  audioElement.src = album.songs[ 0 ].audioSrc;

  React.useEffect( () => {
    const eventListeners = {
      timeupdate: ( e ) => {
        setCurrentTime( audioElement.currentTime );
      },
      durationchange: ( e ) => {
        setDuration( audioElement.duration );
      },
      volumechange: ( e ) => {
        setCurrentVolume( audioElement.volume );
      }
    };
    audioElement.addEventListener( 'timeupdate', eventListeners.timeupdate );
    audioElement.addEventListener( 'durationchange', eventListeners.durationchange );
    audioElement.addEventListener( 'volumechange', eventListeners.volumechange );

    return () => {
      audioElement.removeEventListener( 'timeupdate', eventListeners.timeupdate );
      audioElement.removeEventListener( 'durationchange', eventListeners.durationchange );
      audioElement.removeEventListener( 'volumechange', eventListeners.volumechange );
    };
  }, [] );

  function play() {
    this.audioElement.play();
    this.setState( { isPlaying: true } );
  }

  function pause() {
    this.audioElement.pause();
    this.setState( { isPlaying: false } );
  }

  function setSong( song ) {
    this.audioElement.src = song.audioSrc;
    this.setState( { currentSong: song } );
  }

  function handleSongClick( song ) {
    const isSameSong = this.state.currentSong === song;
    if ( this.state.isPlaying && isSameSong ) {
      this.pause();
    } else {
      if ( !isSameSong ) { this.setSong( song ); }
      this.play();
    }
  }

  function handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex( song => this.state.currentSong === song );
    const newIndex = Math.max( 0, currentIndex - 1 );
    const newSong = this.state.album.songs[ newIndex ];
    this.setSong( newSong );
    this.play();
  }

  function handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex( song => this.state.currentSong === song );
    const highestIndex = this.state.album.songs.length - 1;
    const newIndex = Math.min( currentIndex + 1, highestIndex );
    const newSong = this.state.album.songs[ newIndex ];
    console.log( highestIndex );
    this.setSong( newSong );
    this.play();
  }

  function handleTimeChange( e ) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState( { currentTime: newTime } );
  }

  function handleVolumeChange( e ) {
    const newVol = e.target.value;
    this.audioElement.volume = newVol;
    this.setState( { currentVolume: newVol } );
  }

  function formatTime( time ) {
    const floorTime = Math.floor( time );
    const minutes = Math.floor( floorTime / 60 );
    const seconds = ( floorTime % 60 );

    if ( isNaN( time ) ) { return "-:--"; }

    if ( seconds < 10 ) {
      return minutes + ":0" + seconds;
    } else
      return minutes + ":" + seconds;

  }

  function iconFunction( song, index ) {
    if ( this.state.isPlaying && this.state.currentSong === song ) {
      return <span className='ion-md-pause'></span>;
    } else if ( this.state.currentSong === song || this.state.isHovered === index + 1 ) {
      return <span className='ion-md-play-circle'></span>;
    } else {
      return <span>{ index + 1 }</span>;
    }
  }

  return (
    <section className='album'>
      <section id='album-info'>
        <img id='album-cover-art' src={ this.state.album.albumCover } alt={ this.state.album.title } />
        <div className='album-details'>
          <h1 id='album-title'>{ this.state.album.title }</h1>
          <h2 className='artist'>{ this.state.album.artist }</h2>
          <div id='release-info'>{ this.state.album.releaseInfo }</div>
        </div>
      </section>
      <table id='song-list'>
        <colgroup>
          <col id='song-number-column' />
          <col id='song-title-column' />
          <col id='song-duration-column' />
        </colgroup>

        <tbody>
          {
            this.state.album.songs.map( ( song, index ) =>
              <tr className='song' key={ index }
                onClick={ () => this.handleSongClick( song ) }
                onMouseEnter={ () => this.setState( { isHovered: index + 1 } ) }
                onMouseLeave={ () => this.setState( { isHovered: null } ) }
              >
                <td>
                  { this.iconFunction( song, index ) }
                </td>
                <td id='song-title'>{ song.title }</td>
                <td>{ this.formatTime( song.duration ) }</td>
              </tr>
            )
          }
        </tbody>
      </table>
      <PlayerBar
        isPlaying={ this.state.isPlaying }
        currentSong={ this.state.currentSong }
        currentTime={ this.audioElement.currentTime }
        duration={ this.audioElement.duration }
        currentVolume={ this.state.currentVolume }
        handleSongClick={ () => this.handleSongClick( this.state.currentSong ) }
        handlePrevClick={ () => this.handlePrevClick() }
        handleNextClick={ () => this.handleNextClick() }
        formatTime={ ( e ) => this.formatTime( e ) }
        handleTimeChange={ ( e ) => this.handleTimeChange( e ) }
        handleVolumeChange={ ( e ) => this.handleVolumeChange( e ) }
      />
    </section>
  );
};

export default Album;
