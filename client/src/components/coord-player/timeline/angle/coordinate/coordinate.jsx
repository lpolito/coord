import React from 'react';
import PropTypes from 'prop-types';
import styles from './coordinate.css';

class Coordinate extends React.Component {
  render() {
    // given pixel width / position, figure out what percentage should be
    const calculatePercent = pixels => (pixels / this.props.tLength) * 100;

    const style = {
      left: `${calculatePercent(this.props.coordinate.xCoord + this.props.tStartDiff)}%`,
      width: `${calculatePercent(this.props.coordinate.ytLength)}%`
    };

    return (
      <div className={styles.coordinate} style={style}>
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
    xCoord: PropTypes.number
  }).isRequired,
  tLength: PropTypes.number.isRequired,
  tStartDiff: PropTypes.number.isRequired
};

export default Coordinate;
