import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cpActions from './../../store/coordPlayer/actions';
import * as cpSelectors from './../../store/coordPlayer/selectors';

import CoordPlayer from './coord-player';

class CoordPlayerContainer extends React.Component {
  componentWillMount() {
    this.props.coordPlayerActions.fetchCoord();
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
  coordPlayerActions: PropTypes.shape({
    fetchCoord: PropTypes.func
  }),
  coord: PropTypes.shape({}),
  coordLoaded: PropTypes.bool
};

CoordPlayerContainer.defaultProps = {
  coordPlayerActions: {},
  coord: {},
  coordLoaded: false
};

function mapStateToProps(state) {
  return {
    coord: cpSelectors.getCoord(state),
    coordLoaded: cpSelectors.coordLoaded(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    coordPlayerActions: bindActionCreators(cpActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CoordPlayerContainer);
