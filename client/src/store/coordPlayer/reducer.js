import Immutable from 'seamless-immutable';
import { normalize } from 'normalizr';
import { coordSchema } from './schemas';
import * as types from './actionTypes';

const initialState = Immutable({
  coordPlayer: {
    coordId: 4, // temp until we have url param
    isLoaded: false,
    state: 'paused',
    curCoordinate: {
      id: null,
      ytId: null,
      ytStart: 0
    }
  }
});

export default function coord(state = initialState.coordPlayer, action) {
  switch (action.type) {
    case types.DESERIALIZE_COORD:
      // we are using using seamless-immutable, merge the new entities into the state
      return state.merge([
        normalize(action, { coord: coordSchema }),
        { isLoaded: true }
      ]);
    case types.CHANGE_COORDINATE:
      // we are using using seamless-immutable, merge the new entities into the state
      return state.merge({
        curCoordinate: {
          id: action.coordinateId,
          ytId: action.ytId,
          ytStart: action.ytStart
        }
      });
    case types.CHANGE_PLAYER_STATE:
      return state.merge({
        state: action.state
      });
    default:
      return state;
  }
}
