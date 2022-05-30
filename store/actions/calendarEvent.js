import * as calendarEventService from '../../services/calendarEvent';

export const ActionTypes = {
  SET_CALENDAR_EVENTS: 'SET_CALENDAR_EVENTS',
  SET_CALENDAR_EVENT: 'SET_CALENDAR_EVENT',
  API_ERROR: 'API_ERROR',
};

export const getAllCalendarEvents = (users) => {
  return async (dispatch) => {
    try {
      const calendarEvents = await calendarEventService.getAllCalendarEvents(users);
      dispatch({ type: ActionTypes.SET_CALENDAR_EVENTS, payload: calendarEvents });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error });
    }
  };
};

export const getCalendarEvent = (id) => {
  return async (dispatch) => {
    try {
      const calendarEvent = await calendarEventService.getCalendarEvent(id);
      dispatch({ type: ActionTypes.SET_CALENDAR_EVENT, payload: calendarEvent });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error });
    }
  };
};

export const createCalendarEvent = (calendarEvent, users) => {
  return async (dispatch) => {
    try {
      console.log('create');

      await calendarEventService.createCalendarEvent(calendarEvent);
      const calendarEvents = await calendarEventService.getAllCalendarEvents(users);

      dispatch({ type: ActionTypes.SET_CALENDAR_EVENTS, payload: calendarEvents });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error });
    }
  };
};

export const updateCalendarEvent = (id, calendarEvent, users) => {
  return async (dispatch) => {
    try {
      await calendarEventService.updateCalendarEvent(id, calendarEvent);
      const calendarEvents = await calendarEventService.getAllCalendarEvents(users);
      dispatch({ type: ActionTypes.SET_CALENDAR_EVENTS, payload: calendarEvents });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error });
    }
  };
};

export const deleteCalendarEvent = (id, users) => {
  return async (dispatch) => {
    try {
      await calendarEventService.deleteCalendarEvent(id);
      const calendarEvents = await calendarEventService.getAllCalendarEvents(users);
      dispatch({ type: ActionTypes.SET_CALENDAR_EVENTS, payload: calendarEvents });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error });
    }
  };
};
