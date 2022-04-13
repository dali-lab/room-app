import {
  ActionTypes as calendarEventActionTypes,
  getAllCalendarEvents,
  getCalendarEvent,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
} from './calendarEvent';

// Combine all action types
const ActionTypes = {
  ...calendarEventActionTypes,
};

// Export all action types and actions in one object
export {
  ActionTypes,
  getAllCalendarEvents,
  getCalendarEvent,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
};
