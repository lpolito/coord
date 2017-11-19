import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Player from './player';
import * as playerSelectors from './../../../store/player/reducer';
import * as playerActions from './../../../store/player/actions';

class PlayerContainer extends React.Component {
  render() {
    if (!this.props.currentPlayer || !this.props.currentPlayer.ytId) {
      return (null);
    }

    const onPause = () => {
      this.props.playerActions.updateState('paused');
    };

    const onPlay = () => {
      this.props.playerActions.updateState('playing');
    };

    return (
      <Player
        ytId={this.props.currentPlayer.ytId}
        ytStart={this.props.currentPlayer.ytStart}
        onPause={onPause}
        onPlay={onPlay}
      />
    );
  }
}

PlayerContainer.propTypes = {
  currentPlayer: PropTypes.shape({
    ytId: PropTypes.string,
    ytStart: PropTypes.number
  }),
  playerActions: PropTypes.shape({
    updateState: PropTypes.func
  })
};

PlayerContainer.defaultProps = {
  currentPlayer: {},
  playerActions: {}
};

function mapStateToProps(state) {
  return {
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
)(PlayerContainer);
