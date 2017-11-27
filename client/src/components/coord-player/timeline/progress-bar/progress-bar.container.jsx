import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProgressBar from './progress-bar';
import * as cpSelectors from './../../../../store/coordPlayer/selectors';

class ProgressBarContainer extends React.Component {
  render() {
    return (
      <ProgressBar timelineInfo={this.props.timelineInfo} playerTime={this.props.playerTime} />
    );
  }
}

ProgressBarContainer.propTypes = {
  timelineInfo: PropTypes.shape({}),
  playerTime: PropTypes.number.isRequired
};

ProgressBarContainer.defaultProps = {
  timelineInfo: null
};

function mapStateToProps(state) {
  return {
    timelineInfo: cpSelectors.getTimelineInfo(state)
  };
}

export default connect(mapStateToProps)(ProgressBarContainer);
