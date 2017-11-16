import React from 'react';
import PropTypes from 'prop-types';
import styles from './coordinate.css';

class Coordinate extends React.Component {
  render() {
    // given xCoordRel of jump, figure out what left position should be
    const calcJumpLeft = pixels => (pixels / this.props.coordinate.ytLength) * 100;
    const jumps = this.props.jumps.map(jump =>
      (
        <div
          key={jump.id}
          className={styles.jump}
          style={{
            left: `${calcJumpLeft(jump.xCoordRel)}%`
          }}
        />
      ));

    // given pixel width / position, figure out what percentage should be
    const calcCoordinatePercents = pixels => (pixels / this.props.timelineInfo.tLength) * 100;

    const style = {
      left: `${calcCoordinatePercents(this.props.coordinate.xCoord + this.props.timelineInfo.tStartDiff)}%`,
      width: `${calcCoordinatePercents(this.props.coordinate.ytLength)}%`,
      backgroundColor: this.props.nowPlaying ? 'palegreen' : undefined
    };

    return (
      <div className={styles.coordinate} style={style}>
        {jumps}
        {this.props.coordinate.ytLength}
      </div>
    );
  }
}

Coordinate.propTypes = {
  coordinate: PropTypes.shape({
    id: PropTypes.number,
    ytId: PropTypes.string,
    ytLength: PropTypes.number,
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
  nowPlaying: PropTypes.bool.isRequired
};

export default Coordinate;