import * as _ from 'lodash';
import Immutable from 'seamless-immutable';
import { normalize } from 'normalizr';
import { coordSchema } from './schemas';
import { DESERIALIZE_COORD } from './actionTypes';

const initialState = Immutable({
  coord: {
    id: 4, // temp until we have url param
    isLoaded: false
  },
  state: 'paused',
  players: [
    {
      ytId: '',
      ytStart: 0
    }
  ]
});

export default function coord(state = initialState.coord, action) {
  switch (action.type) {
    case DESERIALIZE_COORD:
      // we are using using seamless-immutable, merge the new entities into the state
      return state.merge([normalize(action, { coord: coordSchema }), { isLoaded: true }]);
    default:
      return state;
  }
}

// selectors

export function coordLoaded(state) {
  return state && state.coord && state.coord.isLoaded;
}

export function getCoord(state) {
  return _.get(state, ['coord', 'entities', 'coord', state.coord.id], null);
}

export function getAngles(state) {
  return _.values(_.get(state, ['coord', 'entities', 'angles']));
}

export function getAngle(state, angleId) {
  return _.get(state, ['coord', 'entities', 'angles', angleId]);
}

export function getCoordinates(state) {
  return _.values(_.get(state, ['coord', 'entities', 'coordinates']));
}

export function getCoordinate(state, coordinateId) {
  return _.get(state, ['coord', 'entities', 'coordinates', coordinateId]);
}

export function getJumps(state) {
  return _.values(_.get(state, ['coord', 'entities', 'jumps']));
}

export function getJumpsByIds(state, jumpIds) {
  return _.filter(getJumps(state), jump => jumpIds.includes(jump.id));
}

export function getTimelineInfo(state) {
  let tStart = 0; // earliest starting point of coord
  let tEnd = 0; // latest ending point of coord

  // calculate tLength
  _.forEach(getCoordinates(state), (coordinate) => {
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

  // timelineLength = end of last coord - start of first coord
  const tLength = tEnd - tStart;
  return {
    tStart, // position of start of earliest coordinate
    tEnd, // position of end of latest coordinate
    tLength, // length between earliest start and latest end
    tStartDiff: Math.abs(tStart) // delta value of tStart (use for timeline positioning)
  };
}

export function getTJumps(state) {
  const jumps = Immutable.asMutable(getJumps(state), { deep: true });
  const timelineInfo = getTimelineInfo(state);
  _.forEach(jumps, (jump) => {
    const coordinate = getCoordinate(state, jump.coordinateId);
    // timeline jump xCoord (tXCoord) = jump.xCoordRel + coordinate xCoord + tStartDiff
    jump.tXCoord = jump.xCoordRel + coordinate.xCoord + timelineInfo.tStartDiff;
  });
  return jumps;
}
