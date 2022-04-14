import AsyncStorage from '@react-native-async-storage/async-storage';
import * as userService from '../../services/user';

export const ActionTypes = {
  SET_USERS: 'SET_USERS',
  SET_USER: 'SET_USER',
  AUTHENTICATE: 'AUTHENTICATE',
  API_ERROR: 'API_ERROR',
};

export const getAllUsers = (roomcode) => {
  return async (dispatch) => {
    try {
      const users = await userService.getAllUsers(roomcode);
      dispatch({ type: ActionTypes.SET_USERS, payload: users });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error });
    }
  };
};

export const getUser = (id) => {
  return async (dispatch) => {
    try {
      const user = await userService.getUser(id);
      dispatch({ type: ActionTypes.SET_USER, payload: user });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error });
    }
  };
};

export const createUser = (user) => {
  return async (dispatch) => {
    try {
      await userService.createUser(user);
      const users = await userService.getAllUsers();
      dispatch({ type: ActionTypes.SET_USERS, payload: users });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error });
    }
  };
};

export const updateUser = (id, user) => {
  return async (dispatch) => {
    try {
      await userService.updateUser(id, user);
      const users = await userService.getAllUsers();
      dispatch({ type: ActionTypes.SET_USERS, payload: users });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error });
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      await userService.deleteUser(id);
      const users = await userService.getAllUsers();
      dispatch({ type: ActionTypes.SET_USERS, payload: users });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error });
    }
  };
};

export const signInUser = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await userService.signInUser(email, password);
      console.log(response);
      const { token, user } = await userService.signInUser(email, password);
      console.log(token, user);
      dispatch({ type: ActionTypes.SET_USER, payload: user });
      AsyncStorage.setItem('authToken', token);
      AsyncStorage.setItem('email', email);
      AsyncStorage.setItem('password', password);
      dispatch({ type: ActionTypes.AUTHENTICATE });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error });
    }
  };
};

export const signInFromStorage = () => {
  return async (dispatch) => {
    const email = AsyncStorage.getItem('email');
    const password = AsyncStorage.getItem('password');
    if (email && password) {
      dispatch(signInUser(email, password));
    }
  };
};

export const signUpUser = (email, password, firstName, lastName, roomCode) => {
  return async (dispatch) => {
    try {
      const { token, user } = await userService.signUpUser(email, password, firstName, lastName, roomCode);
      dispatch({ type: ActionTypes.SET_USER, payload: user });
      AsyncStorage.setItem('authToken', token);
      AsyncStorage.setItem('email', email);
      AsyncStorage.setItem('password', password);
      dispatch({ type: ActionTypes.AUTHENTICATE });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error });
    }
  };
};
