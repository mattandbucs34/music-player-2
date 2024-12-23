import React from 'react';

const PlayerBar = ({ currentTime, currentVolume, duration, isPlaying, formatTime, handleNextClick, handlePrevClick, handleTimeChange, handleVolumeChange, handlePlayClick }) => {
  return (
    <div className={'player-bar'}>
      <div className={'controls-wrapper'}>
        <div className={'time-control'}>
          <input type={'range'} className={'seek-bar'} value={(currentTime / duration) || 0} max={'1'} min={'0'} step={'0.01'} onChange={handleTimeChange} />
          <div className={'time-container'}>
            <div className={'current-time'}>
              {formatTime(duration - currentTime)}
            </div>
            <div className={'total-time'}>
              {formatTime(duration)}
            </div>
          </div>
        </div>
        <div className={'player-controls'}>
          <button
            id={'previous'}
            className={'control-button'}
            onClick={handlePrevClick}
          >
            <span className={'ion-md-skip-backward'}></span>
          </button>
          <button
            id={'play-pause'}
            className={'control-button'}
            onClick={() => handlePlayClick() }
          >
            <span
              className={isPlaying ? 'ion-md-pause' : 'ion-md-play'}
            ></span>
          </button>
          <button
            id={'next'}
            className={'control-button'}
            onClick={handleNextClick}
          >
            <span className={'ion-md-skip-forward'}></span>
          </button>
        </div>

      </div>
      
      <div className={'volume-control'}>
        <input type={'range'} className={'seek-bar'} value={(currentVolume) || 0} max={'1'} min={'0'} step={'0.01'} onChange={handleVolumeChange} />
        <div className={'ion-md-volume-low'}></div>
        <div className={'ion-md-volume-high'}></div>
      </div>
    </div>
  );
};

export default PlayerBar;
