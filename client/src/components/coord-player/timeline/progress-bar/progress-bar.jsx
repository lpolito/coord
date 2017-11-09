import React from 'react';
import PropTypes from 'prop-types';
import Animated from 'animated/lib/targets/react-dom';
import styles from './progress-bar.css';

class ProgressBar extends React.Component {
  componentWillMount() {
    this.animation = new Animated.Value(this.props.progress);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.progress !== this.props.progress) {
      Animated.timing(this.animation, {
        toValue: this.props.progress,
        duration: this.props.duration
      }).start();
    }
  }

  render() {
    const {
      height
    } = this.props;

    const tPositionInterpolated = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
      extrapolate: 'clamp'
    });

    return (
      <div
        className={styles.progressContainer}
        style={{ height }}
      >
        <Animated.div
          className={styles.progressBar}
          style={{
            width: tPositionInterpolated
          }}
        />
        <Animated.div
          className={styles.slider}
          style={{
            transform: [{ translate: tPositionInterpolated }]
          }}
        >
          <div
            className={styles.indicator}
            style={{
              height: 100, // TODO base off number of angles?
              marginTop: this.props.height
            }}
          />
        </Animated.div>
      </div>
    );
  }
}

ProgressBar.propTypes = {
  height: PropTypes.number,
  duration: PropTypes.number,
  progress: PropTypes.number
};

ProgressBar.defaultProps = {
  height: 10,
  duration: 100,
  progress: 0
};

export default ProgressBar;
