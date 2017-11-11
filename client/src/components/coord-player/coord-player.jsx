import React from 'react';
import PropTypes from 'prop-types';

import styles from './coord-player.css';
import Player from './player/player';
import TimelineContainer from './timeline/timeline.container';

class CoordPlayer extends React.Component {
  render() {
    return (
      <div className={styles.coordPlayer}>
        <h2 className={styles.header}>{this.props.coord.title}</h2>
        <Player />
        <div className={styles.timelineCont}>
          <TimelineContainer />
        </div>
      </div>
    );
  }
}

CoordPlayer.propTypes = {
  coord: PropTypes.shape({
    title: PropTypes.string
  }).isRequired
};

export default CoordPlayer;
