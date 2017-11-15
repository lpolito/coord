import React from 'react';
import PropTypes from 'prop-types';
import styles from './player.css';

class Player extends React.Component {
  render() {
    const getYtUrl = (ytId, ytStart) => `https://www.youtube-nocookie.com/embed/${ytId}?rel=0&amp;controls=0&amp;showinfo=0&autoplay=1${ytStart ? `&start=${ytStart}` : ''}`;
    return (
      <div className={styles.player}>
        <iframe
          className={styles.ytPlayer}
          src={getYtUrl(this.props.currentPlayer.ytId, this.props.currentPlayer.ytStart)}
          allowFullScreen
          title="blah"
        />
      </div>
    );
  }
}

Player.propTypes = {
  currentPlayer: PropTypes.shape({
    ytId: PropTypes.string,
    ytStart: PropTypes.number
  })
};

Player.defaultProps = {
  currentPlayer: {}
};

export default Player;
