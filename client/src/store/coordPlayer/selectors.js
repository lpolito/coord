import * as _ from 'lodash';
import Immutable from 'seamless-immutable';

/* Coord */
export function coordLoaded(state) {
  return state && state.coordPlayer && state.coordPlayer.isLoaded;
}

export function getCoordPlayerMap(state) {
  return _.get(state, ['coordPlayer'], null);
}

export function getCoord(state) {
  const coordPlayer = getCoordPlayerMap(state);
  return _.get(coordPlayer, ['entities', 'coord', coordPlayer.coordId], null);
}

export function getCoordinates(state) {
  return _.values(_.get(getCoordPlayerMap(state), ['entities', 'coordinates']));
}

export function getCoordinate(state, coordinateId) {
  return _.get(getCoordPlayerMap(state), ['entities', 'coordinates', coordinateId], null);
}

export function getJumps(state) {
  return _.values(_.get(getCoordPlayerMap(state), ['entities', 'jumps']));
}

export function getJump(state, jumpId) {
  return _.get(getCoordPlayerMap(state), ['entities', 'jumps', jumpId], null);
}

export function getJumpsByIds(state, jumpIds) {
  return _.filter(getJumps(state), jump => jumpIds.includes(jump.id));
}

export function getTimelineInfo(state) {
  let tStart = 0; // earliest starting point of coord
  let tEnd = 0; // latest ending point of coord

  // calculate tLength
  _.forEach(getCoordinates(state), (coordinate) => {
    const coordEnd = coordinate.xCoord + coordinate.yt.length;
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

export function getDefaultJump(state) {
  return getJump(state, getCoord(state).defaultJumpId);
}

export function getDefaultCoordinate(state) {
  return getCoordinate(state, getDefaultJump(state).coordinateId);
}

/* Player */
export function getCurrentPlayerState(state) {
  return _.get(getCoordPlayerMap(state), ['state'], null);
}

export function getCurrentPlayerTime(state) {
  return _.get(getCoordPlayerMap(state), ['time']);
}

export function getCurrentCoordinate(state) {
  return _.get(getCoordPlayerMap(state), ['curCoordinate'], null);
}
