import { combineReducers } from 'redux';
import currentStore from './current';
import studentStore from './student';
import taskStore from './task';

export default combineReducers({
  currentStore,
  studentStore,
  taskStore
})
