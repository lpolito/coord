import * as types from './actionTypes';

export default function changeVideo(coordinateId, ytId, ytStart) {
  return {
    type: types.CHANGE_VIDEO,
    coordinateId,
    ytId,
    ytStart
  };
}
