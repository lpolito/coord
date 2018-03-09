import React from 'react';
import PropTypes from 'prop-types';
import styles from './coordinate.css';

class Coordinate extends React.Component {
  render() {
    // given pixel width / position, figure out what percentage should be in relation to timeline
    const calcCoordinatePercents = pixels => (pixels / this.props.timelineInfo.tLength) * 100;

    // given pixel position, figure out what percentage should be in relation to coordinate itself
    const calcIndicatorPercents = pixels => (pixels / this.props.coordinate.yt.length) * 100;

    // dynamic styles for coordinate
    const coordinateStyle = {
      left: `${calcCoordinatePercents(this.props.coordinate.xCoord + this.props.timelineInfo.tStartDiff)}%`,
      width: `${calcCoordinatePercents(this.props.coordinate.yt.length)}%`,
      backgroundImage: `url(${this.props.coordinate.yt.thumbnailUrl})`
    };

    // dynamic style for coordinate indicator
    let indicatorStyle = {};

    const coordinateClasses = [styles.coordinate];
    // show that the coordinate is default
    if (this.props.isDefault) {
      coordinateClasses.push(styles.isDefault);
    }
    // show that the coordinate is playing
    if (this.props.nowPlaying) {
      coordinateClasses.push(styles.nowPlaying);

      // add a vertical line indicating progress on current coordinate
      indicatorStyle = {
        display: 'block',
        left: `${calcIndicatorPercents(this.props.playerTime - (this.props.coordinate.xCoord + this.props.timelineInfo.tStartDiff))}%`
      };
    }
    // show that the coordinate can play
    if (this.props.canPlay) {
      coordinateClasses.push(styles.canPlay);
    }
    // show that the coordinate can be clicked
    if (this.props.canPlay && !this.props.nowPlaying) {
      coordinateClasses.push(styles.canClick);
    }

    // convert seconds to mm:ss or hh:mm:ss display
    const secondsToDisplayTime = (seconds) => {
      const date = new Date(null);
      date.setSeconds(seconds);
      if (seconds < 3600) {
        // seconds are less than an hour, drop hour display
        return date.toISOString().substr(14, 5);
      }
      // display hour display
      return date.toISOString().substr(11, 5);
    };

    return (
      <div
        className={coordinateClasses.join(' ')}
        style={coordinateStyle}
        onClick={this.props.onClick}
        role="button"
        tabIndex="0"
      >
        <div className={styles.indicator} style={indicatorStyle} />
        <div className={styles.details}>
          <span>{this.props.coordinate.yt.title}</span>
          <span>{secondsToDisplayTime(this.props.coordinate.yt.length)}</span>
        </div>
      </div>
    );
  }
}

Coordinate.propTypes = {
  coordinate: PropTypes.shape({
    id: PropTypes.number,
    ytId: PropTypes.string,
    yt: PropTypes.shape({
      title: PropTypes.string,
      length: PropTypes.number,
      thumbnailUrl: PropTypes.string
    }),
    xCoord: PropTypes.number,
    jumps: PropTypes.arrayOf(PropTypes.number)
  }).isRequired,
  isDefault: PropTypes.bool.isRequired,
  timelineInfo: PropTypes.shape({
    tLength: PropTypes.number,
    tStartDiff: PropTypes.number
  }).isRequired,
  playerTime: PropTypes.number.isRequired,
  nowPlaying: PropTypes.bool.isRequired,
  canPlay: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Coordinate;
