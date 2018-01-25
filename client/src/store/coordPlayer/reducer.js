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
      ytStart: 0
      // also will have all coordinate attributes
    },
    time: 0 // current time on timeline
  }
});

// we are using using seamless-immutable, merge the new entities into the state
export default function coord(state = initialState.coordPlayer, action) {
  switch (action.type) {
    case types.DESERIALIZE_COORD:
      return state.merge([
        normalize(action, { coord: coordSchema }),
        { isLoaded: true }
      ]);
    case types.CHANGE_COORDINATE:
      return state.merge({
        curCoordinate: {
          ...action.coordinate,
          ytStart: action.ytStart
        }
      });
    case types.CHANGE_PLAYER_STATE:
      return state.merge({
        state: action.state
      });
    case types.CHANGE_PLAYER_TIME:
      return state.merge({
        time: action.playerTime
      });
    default:
      return state;
  }
}
