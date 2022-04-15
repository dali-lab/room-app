/* eslint-disable default-param-last */
import { ActionTypes } from '../actions';

// initial state
const initialState = {
  allCalendarEvents: null,
  calendarEvent: null,
};

// reducer
const CalendarEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_CALENDAR_EVENTS:
      return { ...state, allCalendarEvents: action.payload };
    case ActionTypes.SET_CALENDAR_EVENT:
      return { ...state, calendarEvent: action.payload };
    case ActionTypes.LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
};

export default CalendarEventReducer;
