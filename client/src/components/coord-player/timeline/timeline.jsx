import React from 'react';
import PropTypes from 'prop-types';
import styles from './timeline.css';
import AngleContainer from './angle/angle.container';
import ProgressBarContainer from './progress-bar/progress-bar.container';

class Timeline extends React.Component {
  render() {
    const angles = this.props.angles.map(angle => (
      <AngleContainer key={angle} angleId={angle} />
    ));

    return (
      <div className={styles.timeline}>
        <ProgressBarContainer playerTime={this.props.playerTime} />
        <div className={styles.angles}>
          {angles}
        </div>
      </div>
    );
  }
}

Timeline.propTypes = {
  angles: PropTypes.arrayOf(PropTypes.number).isRequired,
  playerTime: PropTypes.number.isRequired
};

export default Timeline;
