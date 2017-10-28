import React from 'react';
import styles from './progress-bar.css';

class ProgressBar extends React.Component {
  render() {
    const progress = {
      transform: `translate(${50}px)`
    };

    return (
      <div className={styles.progressBar}>
        <div style={progress} className={styles.slider}>
          <div className={styles.indicator} />
        </div>
      </div>
    );
  }
}

export default ProgressBar;
