import { combineReducers } from 'redux';
import coord from './coordReducer';
import navOpen from './navReducer';

const rootReducer = combineReducers({
  coord,
  navOpen
});

export default rootReducer;
