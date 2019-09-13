import {
  SEND_INVITES_SUCCESS,
  SEND_INVITES_FAILURE,
} from './types';

export function showInviteSuccess() {
  return (dispatch) => {
    dispatch({
      type: SEND_INVITES_SUCCESS,
      payload: null,
    });
  };
}

export function showInviteError() {
  return (dispatch) => {
    dispatch({
      type: SEND_INVITES_FAILURE,
      payload: null,
    });
  };
}
