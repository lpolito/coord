import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Coordinate from './coordinate';
import * as cpSelectors from './../../../../store/coordPlayer/selectors';

class CoordinateContainer extends React.Component {
  render() {
    // determine whether the current coordinate can play given the current playerTime
    // playerTime must fall within length of coordinate
    const canPlay = this.props.playerTime >= this.props.coordinate.xCoord &&
      this.props.playerTime <= (this.props.coordinate.xCoord + this.props.coordinate.yt.length);

    return (
      <Coordinate
        coordinate={this.props.coordinate}
        jumps={this.props.jumps}
        timelineInfo={this.props.timelineInfo}
        nowPlaying={this.props.currentCoordinate.id === this.props.coordinateId}
        canPlay={canPlay}
        defaultJumpId={this.props.defaultJump.id}
      />
    );
  }
}

CoordinateContainer.propTypes = {
  coordinateId: PropTypes.number.isRequired, // eslint-disable-line react/no-unused-prop-types
  coordinate: PropTypes.shape({
    yt: PropTypes.shape({
      length: PropTypes.number
    }),
    xCoord: PropTypes.number
  }),
  jumps: PropTypes.arrayOf(PropTypes.shape({})),
  timelineInfo: PropTypes.shape({}),
  currentCoordinate: PropTypes.shape({
    id: PropTypes.number
  }),
  defaultJump: PropTypes.shape({
    id: PropTypes.number
  }),
  playerTime: PropTypes.number
};

CoordinateContainer.defaultProps = {
  coordinate: null,
  jumps: [],
  timelineInfo: null,
  currentCoordinate: {},
  defaultJump: {},
  playerTime: null
};

function mapStateToProps(state, props) {
  return {
    coordinate: cpSelectors.getCoordinate(state, props.coordinateId),
    jumps: cpSelectors.getJumpsByIds(
      state,
      cpSelectors.getCoordinate(state, props.coordinateId).jumps
    ),
    timelineInfo: cpSelectors.getTimelineInfo(state),
    currentCoordinate: cpSelectors.getCurrentCoordinate(state),
    defaultJump: cpSelectors.getDefaultJump(state),
    playerTime: cpSelectors.getCurrentPlayerTime(state)
  };
}

export default connect(mapStateToProps)(CoordinateContainer);
