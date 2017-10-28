import React from 'react';
import PropTypes from 'prop-types';
import styles from './timeline.css';
import Angle from './angle/angle';
import ProgressBar from './progress-bar/progress-bar';

class Timeline extends React.Component {
  render() {
    const angles = this.props.angles.map(angle =>
      <Angle key={angle.id} angle={angle} tStartDiff={this.props.tStartDiff} />);

    const style = {
      width: `${this.props.length}px`
    };

    return (
      <div className={styles.timeline} style={style}>
        <ProgressBar />
        <div className={styles.angles}>
          {angles}
        </div>
      </div>
    );
  }
}

Timeline.propTypes = {
  angles: PropTypes.arrayOf(PropTypes.object).isRequired,
  length: PropTypes.number.isRequired,
  tStartDiff: PropTypes.number.isRequired
};

export default Timeline;
