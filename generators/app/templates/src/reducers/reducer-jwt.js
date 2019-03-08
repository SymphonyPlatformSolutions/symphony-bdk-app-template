import { JWT_AUTH_SUCCESS, JWT_AUTH_FAILURE } from '../actions/action-types';

const INITIAL_STATE = {
  jwt: 'loading',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case JWT_AUTH_SUCCESS:
      return {
        ...state,
        jwt: action.jwt,
      };
    case JWT_AUTH_FAILURE:
      return {
        ...state,
        jwt: undefined,
      };
    default:
      return state;
  }
}
