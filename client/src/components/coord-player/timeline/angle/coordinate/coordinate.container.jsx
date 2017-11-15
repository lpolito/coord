import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Coordinate from './coordinate';
import * as coordSelectors from './../../../../../store/coord/reducer';
import * as playerSelectors from './../../../../../store/player/reducer';

class CoordinateContainer extends React.Component {
  render() {
    return (
      <Coordinate
        coordinate={this.props.coordinate}
        jumps={this.props.jumps}
        timelineInfo={this.props.timelineInfo}
        nowPlaying={this.props.currentPlayer.curCoordinateId === this.props.coordinateId}
      />
    );
  }
}

CoordinateContainer.propTypes = {
  coordinateId: PropTypes.number.isRequired, // eslint-disable-line react/no-unused-prop-types
  coordinate: PropTypes.shape({}),
  jumps: PropTypes.arrayOf(PropTypes.shape({})),
  timelineInfo: PropTypes.shape({}),
  currentPlayer: PropTypes.shape({
    curCoordinateId: PropTypes.number
  })
};

CoordinateContainer.defaultProps = {
  coordinate: null,
  jumps: [],
  timelineInfo: null,
  currentPlayer: {}
};

function mapStateToProps(state, props) {
  return {
    coordinate: coordSelectors.getCoordinate(state, props.coordinateId),
    jumps: coordSelectors.getJumpsByIds(
      state,
      coordSelectors.getCoordinate(state, props.coordinateId).jumps
    ),
    timelineInfo: coordSelectors.getTimelineInfo(state),
    currentPlayer: playerSelectors.getCurrentPlayer(state)
  };
}

export default connect(mapStateToProps)(CoordinateContainer);
