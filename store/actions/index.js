import {
  ActionTypes as requestActionTypes,
  getAllRequests,
  getRequest,
  createRequest,
  updateRequest,
  deleteRequest,
} from './request';

// Combine all action types
const ActionTypes = {
  ...requestActionTypes,
};

// Export all action types and actions in one object
export {
  ActionTypes,
  getAllRequests,
  getRequest,
  createRequest,
  updateRequest,
  deleteRequest,
};
