import React from 'react';
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
  }

  componentWillMount() {
    // get default start time based on defaultCoordinate
    this.props.cpActions.updatePlayerTime(this.props.defaultCoordinate.xCoord);

    // play default coordinate
    this.props.cpActions.changeCoordinate(
      this.props.defaultCoordinate,
      this.props.defaultCoordinate.xCoord
    );
  }

  componentDidMount() {
    const timerFunc = () => {
      if (this.props.playerState === 'paused') {
        // player is paused, stop the progression of time
        return;
      }

      // increase player's current time
      this.props.cpActions.updatePlayerTime(this.props.playerTime + 1);
    };

    this.timer = window.setInterval(timerFunc.bind(this), 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  playerSeek() {
    // user is seeking, calculate new youtube player time based on
    // playerTime and starting position of current coordinate
    const ytTime = this.props.playerTime - this.props.currentCoordinate.xCoord;

    // update player
    this.props.cpActions.changeCoordinate(
      this.props.currentCoordinate,
      ytTime
    );
  }

  render() {
    const onSeek = (time) => {
      // update player time
      this.props.cpActions.updatePlayerTime(time);
      this.playerSeek();
    };

    return (
      <Timeline
        coordinateIds={this.props.coord.coordinates}
        onSeek={onSeek}
      />
    );
  }
}

TimelineContainer.propTypes = {
  coord: PropTypes.shape({
    coordinates: PropTypes.arrayOf(PropTypes.number)
  }),
  coordinates: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    ytId: PropTypes.string
  })),
  playerState: PropTypes.string,
  playerTime: PropTypes.number,
  currentCoordinate: PropTypes.shape({
    ytId: PropTypes.string,
    xCoord: PropTypes.number
  }),
  cpActions: PropTypes.shape({
    changeCoordinate: PropTypes.func,
    playDefaultCoordinate: PropTypes.func,
    updatePlayerTime: PropTypes.func
  }),
  defaultCoordinate: PropTypes.shape({
    id: PropTypes.number,
    ytId: PropTypes.string,
    xCoord: PropTypes.number
  })
};

TimelineContainer.defaultProps = {
  coord: {},
  coordinates: [],
  playerState: 'paused',
  playerTime: 0,
  currentCoordinate: {},
  cpActions: {},
  defaultCoordinate: {}
};

function mapStateToProps(state) {
  return {
    coord: cpSelectors.getCoord(state),
    coordinates: cpSelectors.getCoordinates(state),
    playerState: cpSelectors.getCurrentPlayerState(state),
    playerTime: cpSelectors.getCurrentPlayerTime(state),
    currentCoordinate: cpSelectors.getCurrentCoordinate(state),
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
