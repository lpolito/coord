import React from 'react';
import PropTypes from 'prop-types';
import styles from './player.css';

class Player extends React.Component {
  render() {
    return (
      <div className={styles.player}>
        <iframe
          className={styles.ytPlayer}
          src={this.props.ytUrl}
          allowFullScreen
          title="blah"
        />
      </div>
    );
  }
}

Player.propTypes = {
  ytUrl: PropTypes.string.isRequired
};

export default Player;
