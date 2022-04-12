import {
  ActionTypes as userActionTypes,
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from './user';

// Combine all action types
const ActionTypes = {
  ...userActionTypes,
};

// Export all action types and actions in one object
export {
  ActionTypes,
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
