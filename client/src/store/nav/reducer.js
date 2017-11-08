import Immutable from 'seamless-immutable';
import { TOGGLE_NAV } from './actionTypes';

const initialState = Immutable({
  navOpen: false
});

export default function nav(state = initialState.navOpen, action) {
  switch (action.type) {
    case TOGGLE_NAV:
      return !state;
    default:
      return state;
  }
}
