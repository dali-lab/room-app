import { combineReducers } from 'redux';
import request from './request';
import calendarEvent from './calendarEvent';
import user from './user';

const rootReducer = combineReducers({
  request,
  calendarEvent,
  user,
});

export default rootReducer;
