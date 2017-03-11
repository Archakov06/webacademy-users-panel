import { combineReducers } from 'redux';
import currentStore from './current';
import studentStore from './student';

export default combineReducers({
  currentStore,
  studentStore
})
