import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Player from './player';
import * as cpSelectors from './../../../store/coordPlayer/selectors';
import * as cpActions from './../../../store/coordPlayer/actions';

class PlayerContainer extends React.Component {
  constructor() {
    super();
    this.autoPlay = false;
  }

  render() {
    if (!this.props.currentPlayingCoordinate || !this.props.currentPlayingCoordinate.ytId) {
      return (null);
    }

    const onPause = () => {
      this.props.coordPlayerActions.updatePlayerState('paused');
      // disable autoplay when user pauses player (prevents playing on user seek)
      this.autoPlay = false;
    };

    const onPlay = () => {
      this.props.coordPlayerActions.updatePlayerState('playing');
      // autplay is enabled when the player begins playing
      this.autoPlay = true;
    };

    return (
      <Player
        ytId={this.props.currentPlayingCoordinate.ytId}
        ytStart={this.props.currentPlayingCoordinate.ytStart}
        autoPlay={this.autoPlay}
        onPause={onPause}
        onPlay={onPlay}
      />
    );
  }
}

PlayerContainer.propTypes = {
  currentPlayingCoordinate: PropTypes.shape({
    ytId: PropTypes.string,
    ytStart: PropTypes.number
  }),
  coordPlayerActions: PropTypes.shape({
    updatePlayerState: PropTypes.func
  })
};

PlayerContainer.defaultProps = {
  currentPlayingCoordinate: {},
  coordPlayerActions: {}
};

function mapStateToProps(state) {
  return {
    currentPlayingCoordinate: cpSelectors.getCurrentPlayingCoordinate(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    coordPlayerActions: bindActionCreators(cpActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerContainer);
