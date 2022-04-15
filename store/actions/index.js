import {
  ActionTypes as requestActionTypes,
  getAllRequests,
  getRequest,
  createRequest,
  updateRequest,
  deleteRequest,
} from './request';
import {
  ActionTypes as userActionTypes,
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from './user';
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
  ...requestActionTypes,
  ...calendarEventActionTypes,
  ...userActionTypes,
};

// Export all action types and actions in one object
export {
  ActionTypes,
  getAllRequests,
  getRequest,
  createRequest,
  updateRequest,
  deleteRequest,
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
};
