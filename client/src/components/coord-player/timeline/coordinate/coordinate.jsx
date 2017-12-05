import React from 'react';
import PropTypes from 'prop-types';
import styles from './coordinate.css';
import checkerboard from './../../../../images/checkerboard.svg';

class Coordinate extends React.Component {
  render() {
    // given xCoordRel of jump, figure out what left position should be
    const calcJumpLeft = pixels => (pixels / this.props.coordinate.yt.length) * 100;
    const jumps = this.props.jumps.map((jump) => {
      let jumpStyle = {
        left: `${calcJumpLeft(jump.xCoordRel)}%`
      };

      if (this.props.defaultJumpId === jump.id) {
        jumpStyle = {
          ...jumpStyle,
          backgroundImage: `url(${checkerboard})`,
          backgroundSize: '6px 6px',
          width: '9px'
        };
      }

      return (
        <div
          key={jump.id}
          className={styles.jump}
          style={jumpStyle}
        />
      );
    });

    // given pixel width / position, figure out what percentage should be
    const calcCoordinatePercents = pixels => (pixels / this.props.timelineInfo.tLength) * 100;

    const coordinateStyle = {
      left: `${calcCoordinatePercents(this.props.coordinate.xCoord + this.props.timelineInfo.tStartDiff)}%`,
      width: `${calcCoordinatePercents(this.props.coordinate.yt.length)}%`,
      backgroundColor: this.props.nowPlaying ? 'palegreen' : undefined,
      backgroundImage: `url(${this.props.coordinate.yt.thumbnailUrl})`,
      backgroundSize: 'auto 30px'
    };

    return (
      <div className={styles.coordinate} style={coordinateStyle}>
        {jumps}
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
  jumps: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    xCoordRel: PropTypes.number
  })).isRequired,
  timelineInfo: PropTypes.shape({
    tLength: PropTypes.number,
    tStartDiff: PropTypes.number
  }).isRequired,
  nowPlaying: PropTypes.bool.isRequired,
  defaultJumpId: PropTypes.number.isRequired
};

export default Coordinate;
