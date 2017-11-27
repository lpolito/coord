import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import styles from './player.css';

class Player extends React.Component {
  render() {
    const opts = {
      playerVars: {
        rel: 0, // no related videos shown after playback complete
        showinfo: 0, // don't show video info before playing
        start: this.props.ytStart, // start position of video
        enablejsapi: 1, // allows to be controlled by api
        controls: 0, // hide player controls
        autoplay: this.props.autoPlay ? 1 : 0 // autoplay
      }
    };

    return (
      <div className={styles.player}>
        <YouTube
          videoId={this.props.ytId}
          className={styles.ytPlayer}
          opts={opts}
          onPause={this.props.onPause}
          onPlay={this.props.onPlay}
          onEnd={this.props.onPause}
          onError={this.props.onPause}
        />
      </div>
    );
  }
}

Player.propTypes = {
  ytId: PropTypes.string.isRequired,
  ytStart: PropTypes.number.isRequired,
  autoPlay: PropTypes.bool.isRequired,
  onPause: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired
};

export default Player;
