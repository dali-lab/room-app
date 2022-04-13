import { combineReducers } from 'redux';

import calendarEvent from './calendarEvent';

const rootReducer = combineReducers({
  calendarEvent,
});

export default rootReducer;
