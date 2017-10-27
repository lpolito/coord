import React from 'react';
import PropTypes from 'prop-types';
import styles from './coordinate.css';

class Coordinate extends React.Component {
  render() {
    const getLeft = xCoord => `${xCoord}px`;
    const getWidth = ytLength => `${ytLength}px`;

    const style = {
      left: getLeft(this.props.coordinate.xCoord),
      width: getWidth(this.props.coordinate.ytLength)
    };

    return (
      <div className={styles.coordinate} style={style}>
        {this.props.coordinate.length}
      </div>
    );
  }
}

Coordinate.propTypes = {
  coordinate: PropTypes.objectOf(PropTypes.shape({})).isRequired
};

export default Coordinate;
