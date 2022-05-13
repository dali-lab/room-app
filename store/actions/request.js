import * as requestService from '../../services/request';

export const ActionTypes = {
  SET_REQUESTS: 'SET_REQUESTS',
  SET_REQUEST: 'SET_REQUEST',
  API_ERROR: 'API_ERROR',
};

export const getAllRequests = (userId) => {
  return async (dispatch) => {
    try {
      const requests = await requestService.getAllRequests(userId);
      dispatch({ type: ActionTypes.SET_REQUESTS, payload: requests });
    } catch (error) {
      console.log(error);
      dispatch({ type: ActionTypes.API_ERROR, payload: error });
    }
  };
};

export const getRequest = (id) => {
  return async (dispatch) => {
    try {
      const request = await requestService.getRequest(id);
      dispatch({ type: ActionTypes.SET_REQUEST, payload: request });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error });
    }
  };
};

export const createRequest = (request) => {
  return async (dispatch) => {
    try {
      await requestService.createRequest(request);
      const requests = await requestService.getAllRequests();
      dispatch({ type: ActionTypes.SET_REQUESTS, payload: requests });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error });
    }
  };
};

export const updateRequest = (id, request) => {
  return async (dispatch) => {
    try {
      await requestService.updateRequest(id, request);
      const requests = await requestService.getAllRequests();
      dispatch({ type: ActionTypes.SET_REQUESTS, payload: requests });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error });
    }
  };
};

export const deleteRequest = (id) => {
  return async (dispatch) => {
    try {
      await requestService.deleteRequest(id);
      const requests = await requestService.getAllRequests();
      dispatch({ type: ActionTypes.SET_REQUESTS, payload: requests });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error });
    }
  };
};
