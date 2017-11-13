import * as _ from 'lodash';
import Immutable from 'seamless-immutable';
import { FETCH_COORD, RECEIVE_COORD } from './actionTypes';

const initialState = Immutable({
  coord: {},
  state: 'paused',
  players: [
    {
      ytId: '',
      ytStart: 0
    }
  ]
});

function getTimelineInfo(angles) {
  let tStart = 0; // earliest starting point of coord
  let tEnd = 0; // latest ending point of coord

  // calculate tLength
  _.forEach(angles, (angle) => {
    _.forEach(angle.coordinates, (coordinate) => {
      const coordEnd = coordinate.xCoord + coordinate.ytLength;
      // get latest ending point
      if (coordEnd > tEnd) {
        tEnd = coordEnd;
      }
      // get earliest starting point (tStart)
      if (coordinate.xCoord < tStart) {
        tStart = coordinate.xCoord;
      }
    });
  });

  // timelineLength = end of last coord - start of first coord
  const tLength = tEnd - tStart;
  return {
    tStart,
    tEnd,
    tLength
  };
}

export default function coord(state = initialState.coord, action) {
  switch (action.type) {
    case FETCH_COORD:
      return action;
    case RECEIVE_COORD:
      return {
        ...state,
        ...getTimelineInfo(action.coord.angles),
        ...action.coord
      };
    default:
      return state;
  }
}

// selectors

// export function getCoord(state) {
//   return state.coord;
// }

// export function getCoordAngles(state) {
//   return state.coord.angles;
// }

export function getCoordinates(state) {
  const coordinates = [];
  _.forEach(state.coord.angles, (angle) => {
    coordinates.push(...angle.coordinates);
  });
  return coordinates;
}

export function getCoordinate(state, coordinateId) {
  return _.find(getCoordinates(state), c => c.id === coordinateId);
}

export function getJumps(state) {
  const unorderedTJumps = [];
  _.forEach(getCoordinates(state), (coordinate) => {
    _.forEach(coordinate.jumps, (jump) => {
      unorderedTJumps.push({
        ...jump,
        // timeline jump xCoord (tXCoord) = jump.xCoordRel + coordinate xCoord + tStartDiff
        tXCoord: jump.xCoordRel + coordinate.xCoord + Math.abs(state.coord.tStart)
      });
    });
  });
  return unorderedTJumps;
}
