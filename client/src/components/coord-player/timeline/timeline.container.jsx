import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timeline from './timeline';

class TimelineContainer extends React.Component {
  constructor(props) {
    super(props);

    this.timer = null;

    this.state = {
      playerTime: 0
    };
  }

  componentDidMount() {
    this.timer = window.setInterval(() => {
      this.setState({
        ...this.state,
        playerTime: (this.state.playerTime + 1)// % this.state.totalTime ???
      });
    }, 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  render() {
    return (
      <Timeline
        angles={this.props.coord.angles}
        tLength={this.props.coord.tLength}
        tStartDiff={Math.abs(this.props.coord.tStart)}
        playerTime={this.state.playerTime}
      />
    );
  }
}

TimelineContainer.propTypes = {
  coord: PropTypes.shape({
    angles: PropTypes.arrayOf(PropTypes.shape({})),
    tStart: PropTypes.number,
    tLength: PropTypes.number
  })
};

TimelineContainer.defaultProps = {
  coord: {}
};

function mapStateToProps(state) {
  return {
    // coord available right away as parent (coord-player.container)
    // doesn't load timeline until coord is loaded
    coord: state.coord
  };
}

export default connect(mapStateToProps)(TimelineContainer);
