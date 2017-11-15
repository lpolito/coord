import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Player from './player';
import * as playerSelectors from './../../../store/player/reducer';

class PlayerContainer extends React.Component {
  render() {
    return (
      <Player currentPlayer={this.props.currentPlayer} />
    );
  }
}

PlayerContainer.propTypes = {
  currentPlayer: PropTypes.shape({
    curCoordinateId: PropTypes.number,
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
