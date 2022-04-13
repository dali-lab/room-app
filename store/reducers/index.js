import { combineReducers } from 'redux';
import calendarEvent from './calendarEvent';
import user from './user';

const rootReducer = combineReducers({
  calendarEvent,
  user,
});

export default rootReducer;
