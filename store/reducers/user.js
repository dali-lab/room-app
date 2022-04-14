/* eslint-disable default-param-last */
import { ActionTypes } from '../actions';

const initialState = {
  allUsers: null,
  user: null,
  authenticated: false,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USERS:
      return { ...state, allUsers: action.payload };
    case ActionTypes.SET_USER:
      return { ...state, user: action.payload };
    case ActionTypes.AUTHENTICATE:
      return { ...state, authenticated: true };
    // case ActionTypes.LOGOUT:
    //   return { ...initialState };
    default:
      return state;
  }
};

export default UserReducer;
