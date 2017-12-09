import React from 'react';
import PropTypes from 'prop-types';
import styles from './timeline.css';
import CoordinateContainer from './coordinate/coordinate.container';
import ProgressBarContainer from './progress-bar/progress-bar.container';

class Timeline extends React.Component {
  render() {
    const coordinates = this.props.coordinateIds.map(coordinateId => (
      <CoordinateContainer key={coordinateId} coordinateId={coordinateId} />
    ));

    return (
      <div className={styles.timeline}>
        <ProgressBarContainer
          onSeek={this.props.onSeek}
        />
        <div className={styles.coordinates}>
          {coordinates}
        </div>
      </div>
    );
  }
}

Timeline.propTypes = {
  coordinateIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  onSeek: PropTypes.func.isRequired
};

export default Timeline;
