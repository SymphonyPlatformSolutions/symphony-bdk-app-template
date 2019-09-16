import Api from 'services/api';
import Logger from 'sms-sdk-toolbox-ui';
import { simplifyRooms } from 'utils/helpers/help-functions';
import {
  JWT_AUTH_SUCCESS,
  JWT_AUTH_FAILURE,
  GET_ALL_USER_ROOMS_SUCCESS,
  GET_ALL_USER_ROOMS_FAILURE,
  GET_ALLOWED_USER_ROOMS_SUCCESS,
  GET_ALLOWED_USER_ROOMS_FAILURE,
  GET_BOT_ROOMS,
  GET_BOT_ROOMS_SUCCESS,
  GET_BOT_ROOMS_FAILURE,
} from './types';

const INITIAL_STATE = {
  botRooms: {
    rooms: null,
    loading: false,
  },
  allUserRooms: null,
  allowedUserRooms: null,
  jwt: 'loading',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    // JWT
    case JWT_AUTH_SUCCESS:
      Api.setJwt(action.payload);
      Logger.setJwt(action.payload);
      return {
        ...state,
        jwt: action.payload,
      };
    case JWT_AUTH_FAILURE:
      return {
        ...state,
        jwt: undefined,
      };
    // ROOMS
    case GET_ALL_USER_ROOMS_SUCCESS:
      return {
        ...state,
        allUserRooms: simplifyRooms(action.payload),
      };
    case GET_ALL_USER_ROOMS_FAILURE:
      return {
        ...state,
        allUserRooms: null,
      };
    case GET_ALLOWED_USER_ROOMS_SUCCESS:
      return {
        ...state,
        allowedUserRooms: simplifyRooms(action.payload),
      };
    case GET_ALLOWED_USER_ROOMS_FAILURE:
      return {
        ...state,
        allowedUserRooms: null,
      };
    case GET_BOT_ROOMS:
      return {
        ...state,
        botRooms: {
          ...state.botRooms,
          rooms: [],
          loading: true,
        },
      };
    case GET_BOT_ROOMS_SUCCESS:
      return {
        ...state,
        botRooms: {
          ...state.botRooms,
          rooms: action.payload.map(room => ({
            name: room.name,
            threadId: room.stream_id,
          })),
          loading: false,
        },
      };
    case GET_BOT_ROOMS_FAILURE:
      return {
        ...state,
        botRooms: {
          ...state.botRooms,
          rooms: [],
          loading: false,
        },
      };
    default:
      return state;
  }
}
