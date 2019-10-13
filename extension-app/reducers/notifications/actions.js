import Api from 'services/api';
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

const ROOT_URL = 'v1/notifications';

export function getNotifications() {
  return (dispatch) => {
    dispatch({ type: GET_NOTIFICATIONS });
    return Api.get(ROOT_URL)
      .then(res => dispatch({ type: GET_NOTIFICATIONS_SUCCESS, payload: res.data }))
      .catch(error => dispatch({ type: GET_NOTIFICATIONS_FAILURE, payload: error.data }));
  };
}

export function postNotification(notification) {
  return (dispatch) => {
    dispatch({ type: POST_NOTIFICATIONS });
    return Api.post(ROOT_URL, notification)
      .then(res => dispatch({
        type: POST_NOTIFICATIONS_SUCCESS,
        payload: {
          ...notification,
          isEditable: true,
          id: res.data,
        },
      }))
      .catch(error => dispatch({ type: POST_NOTIFICATIONS_FAILURE, payload: error.data }));
  };
}

export function deleteNotification(notificationId) {
  return (dispatch) => {
    dispatch({ type: DELETE_NOTIFICATIONS });
    return Api.delete(`${ROOT_URL}/${notificationId}`)
      .then(() => dispatch({
        type: DELETE_NOTIFICATIONS_SUCCESS,
        payload: notificationId,
      }))
      .catch(error => dispatch({ type: DELETE_NOTIFICATIONS_FAILURE, payload: error.data }));
  };
}
