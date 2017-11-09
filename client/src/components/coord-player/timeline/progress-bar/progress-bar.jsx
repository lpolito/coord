import React from 'react';
import PropTypes from 'prop-types';
import Animated from 'animated/lib/targets/react-dom';
// import styles from './progress-bar.css';

// class ProgressBar extends React.Component {
//   render() {
//     const progress = {
//       transform: `translate(${50}px)`
//     };

//     return (
//       <div className={styles.progressBar}>
//         <div style={progress} className={styles.slider}>
//           <div className={styles.indicator} />
//         </div>
//       </div>
//     );
//   }
// }

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
      height,
      borderColor,
      borderWidth,
      borderRadius,
      barColor,
      fillColor
    } = this.props;

    const widthInterpolated = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
      extrapolate: 'clamp'
    });

    return (
      <div style={{
        flex: 1, flexDirection: 'row', height, position: 'relative'
      }}
      >
        <div style={{
          flex: 1, borderColor, borderWidth, borderRadius
        }}
        >
          <div
            style={{
              backgroundColor: fillColor,
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }}
          />
          <Animated.div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: widthInterpolated,
              backgroundColor: barColor
            }}
          />
        </div>
      </div>
    );
  }
}

ProgressBar.propTypes = {
  height: PropTypes.number,
  borderColor: PropTypes.string,
  borderWidth: PropTypes.number,
  borderRadius: PropTypes.number,
  barColor: PropTypes.string,
  fillColor: PropTypes.string,
  duration: PropTypes.number,
  progress: PropTypes.number
};

ProgressBar.defaultProps = {
  height: 10,
  borderColor: '#000',
  borderWidth: 2,
  borderRadius: 4,
  barColor: 'tomato',
  fillColor: 'rgba(0,0,0,.5)',
  duration: 100,
  progress: 0
};

export default ProgressBar;
