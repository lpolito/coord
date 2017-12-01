import React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Timeline from './timeline';
import * as cpSelectors from './../../../store/coordPlayer/selectors';
import * as cpActions from './../../../store/coordPlayer/actions';

class TimelineContainer extends React.Component {
  constructor(props) {
    super(props);

    this.timer = null;

    this.state = {
      playerTime: 0
    };
  }

  componentWillMount() {
    // get default start time based on defCoordinateJump
    this.setState({
      ...this.state,
      playerTime: this.props.defaultJump.xCoordRel
    });

    // play default coordinate
    this.props.cpActions.changeCoordinate(
      this.props.defaultCoordinate.id,
      this.props.defaultCoordinate.ytId,
      this.props.defaultJump.xCoordRel
    );
  }

  componentDidMount() {
    const timerFunc = () => {
      if (this.props.currentPlayerState === 'paused') {
        // player is paused, stop the progression of time
        return;
      }

      // increase player's current time
      this.setState({
        ...this.state,
        playerTime: (this.state.playerTime + 1)
      });
      this.playerSeek();
    };

    this.timer = window.setInterval(timerFunc.bind(this), 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  playerSeek(isManualSeek = false) {
    // get jumps before playerTime
    const pastJumps = _.filter(this.props.tJumps, j => j.tXCoord <= this.state.playerTime);
    const lastJump = _.last(pastJumps);

    // update coordinate if user seeks or a jump has been passed programmatically
    if (isManualSeek ||
      (lastJump && lastJump.coordinateId !== this.props.currentPlayingCoordinate.id)) {
      const lastCoordinate = _.find(this.props.coordinates, c => c.id === lastJump.coordinateId);

      // if user is seeking, calculate new youtube player time based on
      // playerTime and starting position of last coordinate
      // otherwise get from last jump
      const ytTime = isManualSeek ?
        this.state.playerTime - lastCoordinate.xCoord :
        lastJump.xCoordRel;

      // coordinate has changed, update player
      this.props.cpActions.changeCoordinate(
        lastCoordinate.id,
        lastCoordinate.ytId,
        ytTime
      );
    }
  }

  render() {
    const onSeek = (time) => {
      // update player time
      this.setState(() => ({
        playerTime: time
      }));
      // change coordinates if necessary
      this.playerSeek(true);
    };

    return (
      <Timeline
        coordinateIds={this.props.coord.coordinates}
        playerTime={this.state.playerTime}
        onSeek={onSeek}
      />
    );
  }
}

TimelineContainer.propTypes = {
  coord: PropTypes.shape({
    coordinates: PropTypes.arrayOf(PropTypes.number)
  }),
  tJumps: PropTypes.arrayOf(PropTypes.shape({
    xCoordRel: PropTypes.number,
    coordinateId: PropTypes.number,
    tXCoord: PropTypes.number
  })),
  coordinates: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    ytId: PropTypes.string
  })),
  currentPlayerState: PropTypes.string,
  currentPlayingCoordinate: PropTypes.shape({
    id: PropTypes.number,
    ytId: PropTypes.string
  }),
  cpActions: PropTypes.shape({
    changeCoordinate: PropTypes.func,
    playDefaultCoordinate: PropTypes.func
  }),
  defaultJump: PropTypes.shape({
    xCoordRel: PropTypes.number
  }),
  defaultCoordinate: PropTypes.shape({
    id: PropTypes.number,
    ytId: PropTypes.string
  })
};

TimelineContainer.defaultProps = {
  coord: {},
  tJumps: [],
  coordinates: [],
  currentPlayerState: 'paused',
  currentPlayingCoordinate: {},
  cpActions: {},
  defaultJump: {},
  defaultCoordinate: {}
};

function mapStateToProps(state) {
  return {
    coord: cpSelectors.getCoord(state),
    tJumps: _.sortBy(cpSelectors.getTJumps(state), 'tXCoord'),
    coordinates: cpSelectors.getCoordinates(state),
    currentPlayerState: cpSelectors.getCurrentPlayerState(state),
    currentPlayingCoordinate: cpSelectors.getCurrentPlayingCoordinate(state),
    defaultJump: cpSelectors.getDefaultJump(state),
    defaultCoordinate: cpSelectors.getDefaultCoordinate(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    cpActions: bindActionCreators(cpActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineContainer);
