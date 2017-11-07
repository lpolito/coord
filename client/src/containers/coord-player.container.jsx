import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as coordActions from '../actions/coordActions';

import CoordPlayer from './../components/coord-player/coord-player';

class CoordPlayerContainer extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     coord: {
  //       title: 'First attempt at coordinations',
  //       angles: [
  //         {
  //           id: 1,
  //           author: 'YouTube Star 1', // replace with ytAuthorId
  //           coordinates: [{
  //             id: 1,
  //             ytId: '', // video id
  //             ytLength: 120, // length of yt video in seconds
  //             // ytStart: 0, // place to start yt video
  //             xCoord: 0, // x position on timeline
  //             selected: true // whether or not it's going to play
  //           },
  //           {
  //             id: 2,
  //             ytId: '',
  //             ytLength: 40,
  //             // ytStart: 0,
  //             xCoord: 125,
  //             selected: false
  //           },
  //           {
  //             id: 3,
  //             ytId: '',
  //             ytLength: 45,
  //             // ytStart: 0,
  //             xCoord: 170,
  //             selected: true
  //           }]
  //         },
  //         {
  //           id: 2,
  //           author: 'Some Guy',
  //           coordinates: [{
  //             id: 4,
  //             ytId: '',
  //             ytLength: 120,
  //             // ytStart: 0,
  //             xCoord: 20,
  //             selected: false
  //           }]
  //         },
  //         {
  //           id: 3,
  //           author: 'Different guy',
  //           coordinates: [{
  //             id: 5,
  //             ytId: '',
  //             ytLength: 600,
  //             // ytStart: 0,
  //             xCoord: 600,
  //             selected: true
  //           }]
  //         },
  //         {
  //           id: 4,
  //           author: 'Guy who added vid to beginning',
  //           coordinates: [{
  //             id: 6,
  //             ytId: '',
  //             ytLength: 400,
  //             // ytStart: 0,
  //             xCoord: -50,
  //             selected: false
  //           }]
  //         }
  //       ],
  //       jumps: [ // list of places where the timeline changes coordinates
  //         {
  //           id: 1,
  //           xCoord: 0, // xCoord where the jump takes place
  //           coordinateId: 0 // id of coordinate to jump to
  //         }
  //       ]
  //     }
  //   };
  // }

  componentWillMount() {
    this.props.coordActions.fetchCoord();
  }

  renderComponents() {
    return <CoordPlayer coord={this.props.coord} />;
  }

  // renderLoadingScreen() {
  //   return ;
  // }

  render() {
    if (this.props && this.props.coord) {
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
  coord: PropTypes.shape({
    title: PropTypes.string,
    angles: PropTypes.arrayOf(PropTypes.shape({
      ytId: PropTypes.string,
      xCoord: PropTypes.number
    }))
  })
};

CoordPlayerContainer.defaultProps = {
  coordActions: {},
  coord: {}
};

function mapStateToProps(state) {
  return {
    coord: state.coord
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
