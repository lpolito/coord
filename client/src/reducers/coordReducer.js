import initialState from './initialState';
import { FETCH_COORD, RECEIVE_COORD } from '../actions/actionTypes';

export default function coord(state = initialState.coord, action) {
  let newState;
  switch (action.type) {
    case FETCH_COORD:
      console.log('FETCH_COORD Action');
      return action;
    case RECEIVE_COORD:
      newState = action.coord;
      console.log('RECEIVE_COORD Action');
      return newState;
    default:
      return state;
  }
}
