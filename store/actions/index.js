import {
  ActionTypes as userActionTypes,
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from './user';

const ActionTypes = {
  ...userActionTypes,
};

export {
  ActionTypes,
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
