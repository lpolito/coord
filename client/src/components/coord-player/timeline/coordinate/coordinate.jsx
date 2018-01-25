import React from 'react';
import PropTypes from 'prop-types';
import styles from './coordinate.css';

class Coordinate extends React.Component {
  render() {
    // given pixel width / position, figure out what percentage should be
    const calcCoordinatePercents = pixels => (pixels / this.props.timelineInfo.tLength) * 100;

    const coordinateStyle = {
      left: `${calcCoordinatePercents(this.props.coordinate.xCoord + this.props.timelineInfo.tStartDiff)}%`,
      width: `${calcCoordinatePercents(this.props.coordinate.yt.length)}%`,
      backgroundImage: `url(${this.props.coordinate.yt.thumbnailUrl})`
    };

    const coordinateClasses = [styles.coordinate];
    // show that the coordinate is default
    if (this.props.isDefault) {
      coordinateClasses.push(styles.isDefault);
    }
    // show that the coordinate is playing
    if (this.props.nowPlaying) {
      coordinateClasses.push(styles.nowPlaying);
    }
    // show that the coordinate can play
    if (this.props.canPlay) {
      coordinateClasses.push(styles.canPlay);
    }
    // show that the coordinate can be clicked
    if (this.props.canPlay && !this.props.nowPlaying) {
      coordinateClasses.push(styles.canClick);
    }

    return (
      <div
        className={coordinateClasses.join(' ')}
        style={coordinateStyle}
        onClick={this.props.onClick}
        role="button"
        tabIndex="0"
      >
        {this.props.coordinate.yt.length}
      </div>
    );
  }
}

Coordinate.propTypes = {
  coordinate: PropTypes.shape({
    id: PropTypes.number,
    ytId: PropTypes.string,
    yt: PropTypes.shape({
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
  nowPlaying: PropTypes.bool.isRequired,
  canPlay: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Coordinate;
