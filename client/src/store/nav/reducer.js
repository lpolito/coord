import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

const initialState = Immutable({
  navOpen: false
});

export default function nav(state = initialState.navOpen, action) {
  switch (action.type) {
    case types.TOGGLE_NAV:
      return !state;
    default:
      return state;
  }
}
