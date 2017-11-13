import React from 'react';
import PropTypes from 'prop-types';
import styles from './timeline.css';
import Angle from './angle/angle';
import ProgressBar from './progress-bar/progress-bar';

class Timeline extends React.Component {
  render() {
    const angles = this.props.angles.map(angle => (
      <Angle
        key={angle.id}
        angle={angle}
        tLength={this.props.tLength}
        tStartDiff={this.props.tStartDiff}
      />
    ));

    return (
      <div className={styles.timeline}>
        <ProgressBar tLength={this.props.tLength} playerTime={this.props.playerTime} />
        <div className={styles.angles}>
          {angles}
        </div>
      </div>
    );
  }
}

Timeline.propTypes = {
  angles: PropTypes.arrayOf(PropTypes.object).isRequired,
  tLength: PropTypes.number.isRequired,
  tStartDiff: PropTypes.number.isRequired,
  playerTime: PropTypes.number.isRequired
};

export default Timeline;
