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
      console.log('reducers');
      return { ...state, allUsers: action.payload };
    case ActionTypes.SET_USER:
      return { ...state, user: action.payload };
    case ActionTypes.GET_USER:
      return { ...state, user: action.payload };
    case ActionTypes.UPDATE_USER:
      return { ...state, user: action.payload };
    case ActionTypes.CREATE_USER:
      return { ...state, user: action.payload };
    case ActionTypes.DELETE_USER:
      return { ...state, user: action.payload };
    case ActionTypes.AUTHENTICATE:
      return { ...state, authenticated: true };
    case ActionTypes.LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
};

export default UserReducer;
