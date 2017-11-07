import * as _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './coord-player.css';
import Player from './player/player';
import Timeline from './timeline/timeline';

class CoordPlayer extends React.Component {
  render() {
    // timelineLength = end of last coord - start of first coord
    let tEnd = 0;
    let tStart = 0;
    _.forEach(this.props.coord.angles, (angle) => {
      _.forEach(angle.coordinates, (coordinate) => {
        const coordEnd = coordinate.xCoord + coordinate.ytLength;
        // get latest ending point
        if (coordEnd > tEnd) {
          tEnd = coordEnd;
        }
        // get earliest starting point
        if (coordinate.xCoord < tStart) {
          tStart = coordinate.xCoord;
        }
      });
    });
    const tLength = tEnd - tStart;

    return (
      <div className={styles.coordPlayer}>
        <h2 className={styles.header}>{this.props.coord.title}</h2>
        <Player />
        <div className={styles.timelineCont}>
          <Timeline
            length={tLength}
            tStartDiff={Math.abs(tStart)}
            angles={this.props.coord.angles}
          />
        </div>
      </div>
    );
  }
}

CoordPlayer.propTypes = {
  coord: PropTypes.shape({
    title: PropTypes.string,
    angles: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired
};

export default CoordPlayer;
