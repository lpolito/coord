import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Player from './player';
import * as playerSelectors from './../../../store/player/reducer';

class PlayerContainer extends React.Component {
  render() {
    if (this.props.currentPlayer && this.props.currentPlayer.ytId) {
      return (
        <Player
          ytId={this.props.currentPlayer.ytId}
          ytStart={this.props.currentPlayer.ytStart}
        />
      );
    }
    return (null);
  }
}

PlayerContainer.propTypes = {
  currentPlayer: PropTypes.shape({
    ytId: PropTypes.string,
    ytStart: PropTypes.number
  })
};

PlayerContainer.defaultProps = {
  currentPlayer: {}
};

function mapStateToProps(state) {
  return {
    currentPlayer: playerSelectors.getCurrentPlayer(state)
  };
}

export default connect(mapStateToProps)(PlayerContainer);
