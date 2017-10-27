import React from 'react';
import PropTypes from 'prop-types';
import styles from './angle.css';
import Coordinate from './coordinate/coordinate';

class Angle extends React.Component {
  render() {
    const coordinates = this.props.angle.coordinates.map(coordinate =>
      <Coordinate key={coordinate.id} coordinate={coordinate} />);

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
  angle: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Angle;
