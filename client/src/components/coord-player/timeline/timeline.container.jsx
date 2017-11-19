import React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Timeline from './timeline';
import * as coordSelectors from './../../../store/coord/reducer';
import * as playerSelectors from './../../../store/player/reducer';
import * as playerActions from './../../../store/player/actions';

class TimelineContainer extends React.Component {
  constructor(props) {
    super(props);

    this.timer = null;

    this.state = {
      playerTime: 0
    };
  }

  componentWillMount() {
    // TODO change this to a jump which is the default coord start location
    // get first coordinate and play
    const firstCoordinate = _.find(this.props.coordinates, c =>
      c.xCoord === this.props.timelineInfo.tStart);
    this.props.playerActions.changeVideo(firstCoordinate.id, firstCoordinate.ytId, 0);
  }

  componentDidMount() {
    const timerFunc = () => {
      if (this.props.currentPlayer.state === 'paused') {
        // player is paused, stop the progression of time
        return;
      }

      // increase player's current time
      this.setState({
        ...this.state,
        playerTime: (this.state.playerTime + 1)
      });

      // get jumps before playerTime
      const pastJumps = _.filter(this.props.tJumps, j => j.tXCoord < this.state.playerTime);
      const lastJump = _.last(pastJumps);

      if (lastJump && lastJump.coordinateId !== this.props.currentPlayer.curCoordinateId) {
        const newCoordinate = _.find(this.props.coordinates, c => c.id === lastJump.coordinateId);

        // coordinate has changed, update player
        this.props.playerActions.changeVideo(
          newCoordinate.id,
          newCoordinate.ytId,
          lastJump.xCoordRel
        );
      }
    };

    this.timer = window.setInterval(timerFunc.bind(this), 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  render() {
    return (
      <Timeline coordinateIds={this.props.coordinateIds} playerTime={this.state.playerTime} />
    );
  }
}

TimelineContainer.propTypes = {
  coordinateIds: PropTypes.arrayOf(PropTypes.number),
  tJumps: PropTypes.arrayOf(PropTypes.shape({
    xCoordRel: PropTypes.number,
    coordinateId: PropTypes.number,
    tXCoord: PropTypes.number
  })),
  coordinates: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    ytId: PropTypes.string
  })),
  timelineInfo: PropTypes.shape({
    tStart: PropTypes.number
  }),
  currentPlayer: PropTypes.shape({
    curCoordinateId: PropTypes.number,
    state: PropTypes.string
  }),
  playerActions: PropTypes.shape({
    changeVideo: PropTypes.func
  })
};

TimelineContainer.defaultProps = {
  coordinateIds: [],
  tJumps: [],
  coordinates: [],
  timelineInfo: null,
  currentPlayer: {},
  playerActions: {}
};

function mapStateToProps(state) {
  return {
    coordinateIds: coordSelectors.getCoord(state).coordinates,
    tJumps: _.sortBy(coordSelectors.getTJumps(state), 'tXCoord'),
    coordinates: coordSelectors.getCoordinates(state),
    timelineInfo: coordSelectors.getTimelineInfo(state),
    currentPlayer: playerSelectors.getCurrentPlayer(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    playerActions: bindActionCreators(playerActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineContainer);
