import * as _ from 'lodash';
import Immutable from 'seamless-immutable';
import { CHANGE_VIDEO } from './actionTypes';

const initialState = Immutable({
  player: {
    state: 'paused',
    curCoordinateId: null,
    ytId: null,
    ytStart: 0
  }
});

export default function player(state = initialState.player, action) {
  switch (action.type) {
    case CHANGE_VIDEO:
      // we are using using seamless-immutable, merge the new entities into the state
      return state.merge({
        curCoordinateId: action.coordinateId,
        ytId: action.ytId,
        ytStart: action.ytStart
      });
    default:
      return state;
  }
}

// selectors

export function getCurrentPlayer(state) {
  return _.get(state, ['player'], null);
}
