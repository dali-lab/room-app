/* eslint-disable default-param-last */
import { ActionTypes } from '../actions';

// initial state
const initialState = {
  allRequests: null,
  request: null,
};

// reducer
const RequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_REQUESTS:
      return { ...state, allRequests: action.payload };
    case ActionTypes.SET_REQUEST:
      return { ...state, request: action.payload };
    // case ActionTypes.LOGOUT:
    //   return { ...initialState };
    default:
      return state;
  }
};

export default RequestReducer;
