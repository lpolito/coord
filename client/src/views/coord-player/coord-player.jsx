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
              xCoord: 20,
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
          }
        ]
      }
    };
  }

  render() {
    const coordLength = 2000; // calculate actual length

    return (
      <div className={styles.coordPlayer}>
        <h2 className={styles.header}>{this.state.coord.title}</h2>
        <Player />
        <div className={styles.timelineCont}>
          <Timeline length={coordLength} angles={this.state.coord.angles} />
        </div>
      </div>
    );
  }
}

export default CoordPlayer;
