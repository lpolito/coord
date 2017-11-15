import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Player from './player';
import * as playerSelectors from './../../../store/player/reducer';

class PlayerContainer extends React.Component {
  render() {
    const getYtUrl = (ytId, ytStart) => `https://www.youtube-nocookie.com/embed/${ytId}?rel=0&amp;controls=0&amp;showinfo=0&autoplay=1${ytStart ? `&start=${ytStart}` : ''}`;
    return (
      <Player ytUrl={getYtUrl(this.props.currentPlayer.ytId, this.props.currentPlayer.ytStart)} />
    );
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
