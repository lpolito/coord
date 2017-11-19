import * as types from './actionTypes';

export function changeVideo(coordinateId, ytId, ytStart) {
  return {
    type: types.CHANGE_VIDEO,
    coordinateId,
    ytId,
    ytStart
  };
}

export function updateState(state) {
  return {
    type: types.CHANGE_STATE,
    state
  };
}
