import * as _ from 'lodash';
import React from 'react';
import styles from './coord-player.css';
import Player from './player/player';
import Timeline from './timeline/timeline';

class CoordPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coord: {
        title: 'First attempt at coordinations',
        angles: [
          {
            id: 1,
            author: 'YouTube Star 1',
            coordinates: [{
              id: 1,
              ytId: '',
              ytLength: 120,
              ytStart: 0,
              xCoord: 0,
              selected: true
            },
            {
              id: 2,
              ytId: '',
              ytLength: 40,
              ytStart: 0,
              xCoord: 125,
              selected: true
            },
            {
              id: 3,
              ytId: '',
              ytLength: 45,
              ytStart: 0,
              xCoord: 170,
              selected: true
            }]
          },
          {
            id: 2,
            author: 'Some Guy',
            coordinates: [{
              id: 4,
              ytId: '',
              ytLength: 120,
              ytStart: 0,
              xCoord: 20,
              selected: true
            }]
          },
          {
            id: 3,
            author: 'Different guy',
            coordinates: [{
              id: 5,
              ytId: '',
              ytLength: 600,
              ytStart: 0,
              xCoord: 600,
              selected: true
            }]
          },
          {
            id: 4,
            author: 'Guy who added vid to beginning',
            coordinates: [{
              id: 6,
              ytId: '',
              ytLength: 400,
              ytStart: 0,
              xCoord: -50,
              selected: true
            }]
          }
        ]
      }
    };
  }

  render() {
    // timelineLength = end of last coord - start of first coord
    let tEnd = 0;
    let tStart = 0;
    _.forEach(this.state.coord.angles, (angle) => {
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
        <h2 className={styles.header}>{this.state.coord.title}</h2>
        <Player />
        <div className={styles.timelineCont}>
          <Timeline
            length={tLength}
            tStartDiff={Math.abs(tStart)}
            angles={this.state.coord.angles}
          />
        </div>
      </div>
    );
  }
}

export default CoordPlayer;
