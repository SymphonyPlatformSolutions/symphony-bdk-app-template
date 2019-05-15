import getUserRooms from '../services/user-rooms-service';
import { filterAllowedRooms } from '../utils/help-functions';
import {
  JWT_AUTH_SUCCESS,
  JWT_AUTH_FAILURE,
  GET_ALL_USER_ROOMS_SUCCESS,
  GET_ALL_USER_ROOMS_FAILURE,
  GET_ALLOWED_USER_ROOMS_SUCCESS,
  GET_ALLOWED_USER_ROOMS_FAILURE,
} from './action-types';

export function getJWTFromSymphony(jwtService) {
  if (!jwtService) {
    return (dispatch) => {
      dispatch({
        type: JWT_AUTH_SUCCESS,
        payload: 'No JWT',
      });
    };
  }

  return dispatch => jwtService.getJwt()
    .then((jwt) => {
      dispatch({
        type: JWT_AUTH_SUCCESS,
        payload: jwt,
      });
    })
    .catch(() => {
      dispatch({
        type: JWT_AUTH_FAILURE,
        payload: undefined,
      });
    });
}

export function getAllUserRooms() {
  return dispatch => getUserRooms().then(rooms => dispatch({
    type: GET_ALL_USER_ROOMS_SUCCESS,
    payload: rooms,
  }))
    .catch(error => dispatch({
      type: GET_ALL_USER_ROOMS_FAILURE,
      payload: error,
    }));
}

export function getAllowedUserRooms() {
  return dispatch => getUserRooms().then(rooms => dispatch({
    type: GET_ALLOWED_USER_ROOMS_SUCCESS,
    payload: filterAllowedRooms(rooms),
  }))
    .catch(error => dispatch({
      type: GET_ALLOWED_USER_ROOMS_FAILURE,
      payload: error,
    }));
}
