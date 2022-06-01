/* eslint-disable default-param-last */
import { ActionTypes } from '../actions';

// initial state
const initialState = {
  allRequests: null,
  request: null,
  isEditing: false,
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
    case ActionTypes.CHANGE_EDIT_STATE:
      return { ...state, isEditing: action.payload };
    default:
      return state;
  }
};

export default RequestReducer;
