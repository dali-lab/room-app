import * as userService from '../../services/user';

export const ActionTypes = {
  SET_USERS: 'SET_USERS',
  SET_USER: 'SET_USER',
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
