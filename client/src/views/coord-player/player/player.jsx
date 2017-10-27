import React from 'react';
import styles from './player.css';

class Player extends React.Component {
  render() {
    return (
      <div className={styles.player}>
        <iframe className={styles.ytPlayer} src="https://www.youtube-nocookie.com/embed/BMTM0eTDYK8?rel=0&amp;showinfo=0" allowFullScreen title="blah" />
      </div>
    );
  }
}

export default Player;
