import {
  ActionTypes as calendarEventActionTypes,
  getAllCalendarEvents,
  getCalendarEvent,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
} from './calendarEvent';
import {
  ActionTypes as userActionTypes,
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  signInUser,
  signUpUser,
  signInFromStorage,
} from './user';

// Combine all action types
const ActionTypes = {
  ...calendarEventActionTypes,
  ...userActionTypes,
};

// Export all action types and actions in one object
export {
  ActionTypes,
  getAllCalendarEvents,
  getCalendarEvent,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  signInUser,
  signUpUser,
  signInFromStorage,
};
