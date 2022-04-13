import * as calendarEventService from '../../services/calendarEvent';

export const ActionTypes = {
  SET_CALENDAR_EVENTS: 'SET_CALENDAR_EVENTS',
  SET_CALENDAR_EVENT: 'SET_CALENDAR_EVENT',
  API_ERROR: 'API_ERROR',
};

export const getAllCalendarEvents = (roomCode) => {
  return async (dispatch) => {
    try {
      const calendarEvents = await calendarEventService.getAllCalendarEvents(roomCode);
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

export const createCalendarEvent = (calendarEvent) => {
  return async (dispatch) => {
    try {
      await calendarEventService.createCalendarEvent(calendarEvent);
      // need a roomcode for this get all?
      const calendarEvents = await calendarEventService.getAllCalendarEvents();
      dispatch({ type: ActionTypes.SET_CALENDAR_EVENTS, payload: calendarEvents });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error });
    }
  };
};

export const updateCalendarEvent = (id, calendarEvent) => {
  return async (dispatch) => {
    try {
      await calendarEventService.updateCalendarEvent(id, calendarEvent);
      // need roomcode for this getall?
      const calendarEvents = await calendarEventService.getAllCalendarEvents();
      dispatch({ type: ActionTypes.SET_CALENDAR_EVENTS, payload: calendarEvents });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error });
    }
  };
};

export const deleteCalendarEvent = (id) => {
  return async (dispatch) => {
    try {
      await calendarEventService.deleteCalendarEvent(id);
      // need roomcode?
      const calendarEvents = await calendarEventService.getAllCalendarEvents();
      dispatch({ type: ActionTypes.SET_CALENDAR_EVENTS, payload: calendarEvents });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error });
    }
  };
};
