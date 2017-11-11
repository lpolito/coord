import React from 'react';
import PropTypes from 'prop-types';
import styles from './angle.css';
import Coordinate from './coordinate/coordinate';

class Angle extends React.Component {
  shouldComponentUpdate() {
    // console.log(nextProps);
    // console.log(nextState);
    // TODO only rerender angle if it becomes currently active/inactive in player view
    return false; // no rerendering for now
  }

  render() {
    const coordinates = this.props.angle.coordinates.map(coordinate =>
      (
        <Coordinate
          key={coordinate.id}
          coordinate={coordinate}
          tStartDiff={this.props.tStartDiff}
        />
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
    coordinates: PropTypes.array
  }).isRequired,
  tStartDiff: PropTypes.number.isRequired
};

export default Angle;
