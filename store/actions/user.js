import AsyncStorage from '@react-native-async-storage/async-storage';
import * as userService from '../../services/user';

export const ActionTypes = {
  SET_USERS: 'SET_USERS',
  SET_USER: 'SET_USER',
  AUTHENTICATE: 'AUTHENTICATE',
  LOGOUT: 'LOGOUT',
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

export const createUser = (user, roomcode) => {
  return async (dispatch) => {
    try {
      await userService.createUser(user);
      const users = await userService.getAllUsers(roomcode);
      dispatch({ type: ActionTypes.SET_USER, payload: users });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error });
    }
  };
};

export const updateUser = (id, user, roomcode, updateSelf = false) => {
  return async (dispatch) => {
    try {
      const newUser = await userService.updateUser(id, user);
      const users = await userService.getAllUsers(roomcode);
      if (updateSelf) {
        dispatch({ type: ActionTypes.SET_USER, payload: newUser });
      }
      dispatch({ type: ActionTypes.SET_USERS, payload: users });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error });
    }
  };
};

export const deleteUser = (id, roomcode) => {
  return async (dispatch) => {
    try {
      await userService.deleteUser(id);
      const users = await userService.getAllUsers(roomcode);
      dispatch({ type: ActionTypes.SET_USERS, payload: users });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error });
    }
  };
};

export const signInUser = (email, password) => {
  return async (dispatch) => {
    try {
      const { token, user } = await userService.signInUser(email, password);
      dispatch({ type: ActionTypes.SET_USER, payload: user });
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      dispatch({ type: ActionTypes.AUTHENTICATE });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error });
    }
  };
};

export const signInFromStorage = () => {
  return async (dispatch) => {
    const email = await AsyncStorage.getItem('email');
    const password = await AsyncStorage.getItem('password');
    if (email && password) {
      dispatch(signInUser(email, password));
    }
  };
};

export const signUpUser = (email, password, firstName, lastName, roomCode) => {
  return async (dispatch) => {
    try {
      const { token, newUser } = await userService.signUpUser(email, password, firstName, lastName, roomCode);
      dispatch({ type: ActionTypes.SET_USER, payload: newUser });
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      dispatch({ type: ActionTypes.AUTHENTICATE });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error });
    }
  };
};

export const signOutUser = () => {
  return async (dispatch) => {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('password');
      dispatch({ type: ActionTypes.LOGOUT });
    } catch (error) {
      dispatch({ type: ActionTypes.API_ERROR, payload: error });
    }
  };
};
