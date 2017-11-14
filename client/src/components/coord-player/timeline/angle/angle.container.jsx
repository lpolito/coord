import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Angle from './angle';
import * as coordSelectors from './../../../../store/coord/reducer';

class AngleContainer extends React.Component {
  render() {
    return (
      <Angle angle={this.props.angle} />
    );
  }
}

/* eslint-disable */
AngleContainer.propTypes = {
  angleId: PropTypes.number.isRequired,
  angle: PropTypes.shape({}),
};

AngleContainer.defaultProps = {
  angle: null
};

function mapStateToProps(state, props) {
  return {
    angle: coordSelectors.getAngle(state, props.angleId)
  };
}

export default connect(mapStateToProps)(AngleContainer);
