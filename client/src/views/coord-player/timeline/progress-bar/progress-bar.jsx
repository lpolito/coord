import React from 'react';
import styles from './progress-bar.css';

class ProgressBar extends React.Component {
  render() {
    return (
      <div className={styles.progressBar}>
        <div className={styles.slider}>
          <div className={styles.indicator} />
        </div>
      </div>
    );
  }
}

export default ProgressBar;
