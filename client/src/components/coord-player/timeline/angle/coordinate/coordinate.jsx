import React from 'react';
import PropTypes from 'prop-types';
import styles from './coordinate.css';

class Coordinate extends React.Component {
  render() {
    const getLeft = xCoord => `${xCoord + this.props.tStartDiff}px`;
    const getWidth = ytLength => `${ytLength}px`;

    const style = {
      transform: `translate(${getLeft(this.props.coordinate.xCoord)}`,
      width: getWidth(this.props.coordinate.ytLength)
    };

    return (
      <div className={styles.coordinate} style={style}>
        {this.props.coordinate.ytLength}
      </div>
    );
  }
}

Coordinate.propTypes = {
  coordinate: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.number,
    ytId: PropTypes.string,
    ytLength: PropTypes.number,
    xCoord: PropTypes.number
  })).isRequired,
  tStartDiff: PropTypes.number.isRequired
};

export default Coordinate;
