import React from 'react';
import PropTypes from 'prop-types';
import styles from './angle.css';
import CoordinateContainer from './coordinate/coordinate.container';

class Angle extends React.Component {
  render() {
    const coordinates = this.props.angle.coordinates.map(coordinate =>
      (
        <CoordinateContainer key={coordinate} coordinateId={coordinate} />
      ));

    return (
      <div className={styles.angle}>
        <div className={styles.coordinates}>
          {coordinates}
        </div>
        <span className={styles.author}>{this.props.angle.author}</span>
      </div>
    );
  }
}

Angle.propTypes = {
  angle: PropTypes.shape({
    author: PropTypes.string,
    coordinates: PropTypes.arrayOf(PropTypes.number)
  }).isRequired
};

export default Angle;
