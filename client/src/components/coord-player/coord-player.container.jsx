import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as coordActions from './../../store/coord/actions';
import * as coordSelectors from './../../store/coord/reducer';

import CoordPlayer from './coord-player';

class CoordPlayerContainer extends React.Component {
  componentWillMount() {
    this.props.coordActions.fetchCoord();
  }

  renderComponents() {
    return (
      <CoordPlayer coord={this.props.coord} />
    );
  }

  // renderLoadingScreen() {
  //   return ;
  // }

  render() {
    if (this.props && this.props && this.props.coordLoaded) {
      return this.renderComponents();
    }
    // return this.renderLoadingScreen();
    return <div>loading</div>;
  }
}

CoordPlayerContainer.propTypes = {
  coordActions: PropTypes.shape({
    fetchCoord: PropTypes.func
  }),
  coord: PropTypes.shape({}),
  coordLoaded: PropTypes.bool
};

CoordPlayerContainer.defaultProps = {
  coordActions: {},
  coord: {},
  coordLoaded: false
};

function mapStateToProps(state) {
  return {
    coord: coordSelectors.getCoord(state),
    coordLoaded: coordSelectors.coordLoaded(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    coordActions: bindActionCreators(coordActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CoordPlayerContainer);
