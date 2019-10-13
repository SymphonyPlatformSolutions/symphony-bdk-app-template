import {
  GET_INSTANCES_FAILURE,
} from '../instances/types';
import {
  GET_NOTIFICATIONS_FAILURE,
  POST_NOTIFICATIONS_FAILURE,
  DELETE_NOTIFICATIONS_FAILURE,
  POST_NOTIFICATIONS_SUCCESS,
  DELETE_NOTIFICATIONS_SUCCESS,
} from '../notifications/types';

const INITIAL_STATE = {
  message: null,
  type: true,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_INSTANCES_FAILURE:
      return {
        ...state,
        message: 'Error fetching instances',
        error: action.payload,
        type: 'error',
      };
    case GET_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        message: 'Error fetching notifications',
        error: action.payload,
        type: 'error',
      };
    case DELETE_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        message: 'Error deleting notification',
        error: action.payload,
        type: 'error',
      };
    case POST_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        message: 'Error creating notification',
        error: action.payload,
        type: 'error',
      };
    case POST_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        message: 'Notification created successfully',
        error: null,
        type: 'success',
      };
    case DELETE_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        message: 'Notification deleted successfully',
        error: null,
        type: 'success',
      };
    default:
      return state;
  }
}
