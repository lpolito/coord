import React from 'react';
import PropTypes from 'prop-types';
import * as rpc from 'react-player-controls';
import styles from './progress-bar.css';

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);

    this.timer = null;

    this.state = {
      isSeekable: true
    };
  }

  render() {
    return (
      <div className={styles.progressContainer} >
        <rpc.ProgressBar
          className={styles.progressBar}
          childClasses={{
            elapsed: styles.elapsed,
            intent: styles.intent,
            handle: styles.handle,
            seek: styles.seek
          }}
          totalTime={this.props.timelineInfo.tLength}
          currentTime={this.props.playerTime}
          isSeekable={this.state.isSeekable}
          onSeek={time => this.setState(() => ({ currentTime: time }))}
          onSeekStart={time => this.setState(() => ({ lastSeekStart: time }))}
          onSeekEnd={time => this.setState(() => ({ lastSeekEnd: time }))}
          onIntent={time => this.setState(() => ({ lastIntent: time }))}
        />
      </div>
    );
  }
}

ProgressBar.propTypes = {
  timelineInfo: PropTypes.shape({
    tLength: PropTypes.number
  }).isRequired,
  playerTime: PropTypes.number.isRequired
};

export default ProgressBar;
