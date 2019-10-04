import {
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE,
  POST_NOTIFICATIONS,
  POST_NOTIFICATIONS_SUCCESS,
  POST_NOTIFICATIONS_FAILURE,
  DELETE_NOTIFICATIONS,
  DELETE_NOTIFICATIONS_SUCCESS,
  DELETE_NOTIFICATIONS_FAILURE,
} from './types';

const INITIAL_STATE = {
  notifications: null,
  loading: true,
  error: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_NOTIFICATIONS:
    case POST_NOTIFICATIONS:
    case DELETE_NOTIFICATIONS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload.map(el => ({
          name: el.name,
          id: el.id,
          isEditable: el.is_editable,
          instanceId: el.instance_id,
        })),
        loading: false,
        error: null,
      };
    case POST_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          action.payload,
        ],
        loading: false,
        error: null,
      };
    case DELETE_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: state.notifications.filter(el => el.id !== action.payload),
        loading: false,
        error: null,
      };
    case GET_NOTIFICATIONS_FAILURE:
    case POST_NOTIFICATIONS_FAILURE:
    case DELETE_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
