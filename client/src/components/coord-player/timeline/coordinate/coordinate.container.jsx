import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Coordinate from './coordinate';
import * as coordPlayerSelectors from './../../../../store/coordPlayer/selectors';

class CoordinateContainer extends React.Component {
  render() {
    return (
      <Coordinate
        coordinate={this.props.coordinate}
        jumps={this.props.jumps}
        timelineInfo={this.props.timelineInfo}
        nowPlaying={this.props.currentPlayingCoordinate.id === this.props.coordinateId}
      />
    );
  }
}

CoordinateContainer.propTypes = {
  coordinateId: PropTypes.number.isRequired, // eslint-disable-line react/no-unused-prop-types
  coordinate: PropTypes.shape({}),
  jumps: PropTypes.arrayOf(PropTypes.shape({})),
  timelineInfo: PropTypes.shape({}),
  currentPlayingCoordinate: PropTypes.shape({
    id: PropTypes.number
  })
};

CoordinateContainer.defaultProps = {
  coordinate: null,
  jumps: [],
  timelineInfo: null,
  currentPlayingCoordinate: {}
};

function mapStateToProps(state, props) {
  return {
    coordinate: coordPlayerSelectors.getCoordinate(state, props.coordinateId),
    jumps: coordPlayerSelectors.getJumpsByIds(
      state,
      coordPlayerSelectors.getCoordinate(state, props.coordinateId).jumps
    ),
    timelineInfo: coordPlayerSelectors.getTimelineInfo(state),
    currentPlayingCoordinate: coordPlayerSelectors.getCurrentPlayingCoordinate(state)
  };
}

export default connect(mapStateToProps)(CoordinateContainer);
