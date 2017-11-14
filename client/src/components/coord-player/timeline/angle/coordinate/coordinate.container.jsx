import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Coordinate from './coordinate';
import * as coordSelectors from './../../../../../store/coord/reducer';

class CoordinateContainer extends React.Component {
  render() {
    return (
      <Coordinate
        coordinate={this.props.coordinate}
        jumps={this.props.jumps}
        timelineInfo={this.props.timelineInfo}
      />
    );
  }
}

/* eslint-disable */
CoordinateContainer.propTypes = {
  coordinateId: PropTypes.number.isRequired,
  coordinate: PropTypes.shape({}),
  jumps: PropTypes.arrayOf(PropTypes.shape({})),
  timelineInfo: PropTypes.shape({})
};

CoordinateContainer.defaultProps = {
  coordinate: null,
  jumps: [],
  timelineInfo: null
};

function mapStateToProps(state, props) {
  return {
    coordinate: coordSelectors.getCoordinate(state, props.coordinateId),
    jumps: coordSelectors.getJumpsByIds(state,
      coordSelectors.getCoordinate(state, props.coordinateId).jumps),
    timelineInfo: coordSelectors.getTimelineInfo(state)
  };
}

export default connect(mapStateToProps)(CoordinateContainer);
