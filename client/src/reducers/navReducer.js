import initialState from './initialState';
import { TOGGLE_NAV } from '../actions/actionTypes';

export default function nav(state = initialState.navOpen, action) {
  switch (action.type) {
    case TOGGLE_NAV:
      return !state;
    default:
      return state;
  }
}
