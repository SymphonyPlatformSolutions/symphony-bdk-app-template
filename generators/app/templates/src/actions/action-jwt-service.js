import { JWT_AUTH_SUCCESS, JWT_AUTH_FAILURE } from './action-types';

export default function getJWTFromSymphony(jwtService) {
  if (!jwtService) {
    return (dispatch) => {
      dispatch({
        type: JWT_AUTH_SUCCESS,
        jwt: 'No JWT',
      });
    };
  }

  return dispatch => jwtService.getJwt()
    .then((jwt) => {
      dispatch({
        type: JWT_AUTH_SUCCESS,
        jwt,
      });
    })
    .catch(() => {
      dispatch({
        type: JWT_AUTH_FAILURE,
        jwt: undefined,
      });
    });
}
