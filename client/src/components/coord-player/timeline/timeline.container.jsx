import React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timeline from './timeline';
import * as coordSelectors from './../../../store/coord/reducer';

class TimelineContainer extends React.Component {
  constructor(props) {
    super(props);

    this.timer = null;

    this.state = {
      playerTime: 0,
      currentCoordinateId: null
    };
  }

  componentDidMount() {
    this.timer = window.setInterval(() => {
      // increase player's current time
      this.setState({
        ...this.state,
        playerTime: (this.state.playerTime + 1)
      });

      // get jumps before playerTime
      const pastJumps = _.filter(this.props.tJumps, j => j.tXCoord < this.state.playerTime);
      const lastJump = _.last(pastJumps);

      if (lastJump && lastJump.coordinateId !== this.state.currentCoordinateId) {
        console.log(_.find(this.props.coordinates, c => c.id === lastJump.coordinateId));
        // currentCoordinateId changed, update state
        this.setState({
          ...this.state,
          currentCoordinateId: lastJump.coordinateId
        });
        console.log(`coordinateId ${lastJump.coordinateId} has been reached!`);
      }
    }, 1000);
    console.log(this.props.tJumps);
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  render() {
    return (
      <Timeline
        angles={this.props.coord.angles}
        tLength={this.props.coord.tLength}
        tStartDiff={Math.abs(this.props.coord.tStart)}
        playerTime={this.state.playerTime}
      />
    );
  }
}

TimelineContainer.propTypes = {
  coord: PropTypes.shape({
    angles: PropTypes.arrayOf(PropTypes.shape({})),
    tStart: PropTypes.number,
    tLength: PropTypes.number
  }),
  tJumps: PropTypes.arrayOf(PropTypes.shape({
    xCoordRel: PropTypes.number,
    coordinateId: PropTypes.number,
    tXCoord: PropTypes.number
  })),
  coordinates: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    ytId: PropTypes.string,
    xCoord: PropTypes.number
  }))
};

TimelineContainer.defaultProps = {
  coord: {},
  tJumps: [],
  coordinates: []
};

function mapStateToProps(state) {
  return {
    // coord available right away from parent (coord-player.container)
    coord: state.coord,
    tJumps: _.sortBy(coordSelectors.getJumps(state), 'tXCoord'),
    coordinates: coordSelectors.getCoordinates(state)
  };
}

export default connect(mapStateToProps)(TimelineContainer);
