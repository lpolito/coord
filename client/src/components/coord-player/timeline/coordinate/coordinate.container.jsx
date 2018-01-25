import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Coordinate from './coordinate';
import * as cpSelectors from './../../../../store/coordPlayer/selectors';
import * as cpActions from './../../../../store/coordPlayer/actions';

class CoordinateContainer extends React.Component {
  render() {
    // determine if current coordinate is now playing
    const nowPlaying = this.props.currentCoordinate.id === this.props.coordinateId;

    // determine whether the current coordinate can play given the current playerTime
    // playerTime must fall within length of coordinate
    const canPlay = this.props.playerTime >= this.props.coordinate.xCoord &&
      this.props.playerTime <= (this.props.coordinate.xCoord + this.props.coordinate.yt.length);

    // change coordinate on click
    const onClick = (event) => {
      event.preventDefault();
      // if coordinate can't play or is currently playing, ignore click
      if (!canPlay || nowPlaying) {
        return;
      }

      // user clicked on a coordinate
      // get ytTime from playerTime and starting position of coordinate
      const ytTime = this.props.playerTime - this.props.coordinate.xCoord;

      // change coordinate
      this.props.cpActions.changeCoordinate(
        this.props.coordinate,
        ytTime
      );
    };

    return (
      <Coordinate
        coordinate={this.props.coordinate}
        isDefault={this.props.coordinate.id === this.props.defaultCoordinate.id}
        timelineInfo={this.props.timelineInfo}
        nowPlaying={nowPlaying}
        canPlay={canPlay}
        onClick={onClick}
      />
    );
  }
}

CoordinateContainer.propTypes = {
  cpActions: PropTypes.shape({
    changeCoordinate: PropTypes.func
  }),
  coordinateId: PropTypes.number.isRequired, // eslint-disable-line react/no-unused-prop-types
  coordinate: PropTypes.shape({
    id: PropTypes.number,
    ytId: PropTypes.string,
    yt: PropTypes.shape({
      length: PropTypes.number
    }),
    xCoord: PropTypes.number
  }),
  timelineInfo: PropTypes.shape({}),
  currentCoordinate: PropTypes.shape({
    id: PropTypes.number
  }),
  defaultCoordinate: PropTypes.shape({
    id: PropTypes.number
  }),
  playerTime: PropTypes.number
};

CoordinateContainer.defaultProps = {
  cpActions: {},
  coordinate: null,
  timelineInfo: null,
  currentCoordinate: {},
  defaultCoordinate: {},
  playerTime: null
};

function mapStateToProps(state, props) {
  return {
    coordinate: cpSelectors.getCoordinate(state, props.coordinateId),
    timelineInfo: cpSelectors.getTimelineInfo(state),
    currentCoordinate: cpSelectors.getCurrentCoordinate(state),
    defaultCoordinate: cpSelectors.getDefaultCoordinate(state),
    playerTime: cpSelectors.getCurrentPlayerTime(state)
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
)(CoordinateContainer);
