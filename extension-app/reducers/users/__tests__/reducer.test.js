import { filterAllowedRooms, simplifyRooms } from 'utils/helpers/help-functions.js';
import { rawRooms as mockedRooms } from 'reducers/users/__mocks__/users';
import {
  JWT_AUTH_SUCCESS,
  JWT_AUTH_FAILURE,
  GET_ALL_USER_ROOMS_SUCCESS,
  GET_ALL_USER_ROOMS_FAILURE,
  GET_ALLOWED_USER_ROOMS_SUCCESS,
  GET_ALLOWED_USER_ROOMS_FAILURE,
} from '../types';
import Reducer from '../index';

const initialState = {
  allUserRooms: null,
  allowedUserRooms: null,
  jwt: 'loading',
};

let rooms;

beforeEach(() => {
  rooms = mockedRooms.map(room => ({ ...room }));
});

describe('The reducer of user rooms', () => {
  it('Should pick up default initial state if no state is passed', () => {
    expect(Reducer(undefined, {})).toEqual(initialState);
  });

  it('Should return the initial state', () => {
    expect(Reducer(initialState, {})).toEqual(initialState);
  });

  it('Should handle JWT_AUTH_SUCCESS', () => {
    const action = {
      type: JWT_AUTH_SUCCESS,
      payload: 'abcdefgh',
    };

    const state = {
      ...initialState,
      jwt: 'abcdefgh',
    };

    expect(Reducer(initialState, action)).toEqual(state);
  });

  it('Should handle JWT_AUTH_FAILURE', () => {
    const action = {
      type: JWT_AUTH_FAILURE,
      payload: null,
    };

    const state = {
      ...initialState,
      jwt: undefined,
    };

    expect(Reducer(initialState, action)).toEqual(state);
  });

  it('Should handle GET_ALL_USER_ROOMS_SUCCESS', () => {
    const action = {
      type: GET_ALL_USER_ROOMS_SUCCESS,
      payload: rooms,
    };

    const state = {
      ...initialState,
      allUserRooms: simplifyRooms(action.payload),
    };

    expect(Reducer(initialState, action)).toEqual(state);
  });

  it('Should handle GET_ALL_USER_ROOMS_FAILURE', () => {
    const action = {
      type: GET_ALL_USER_ROOMS_FAILURE,
      payload: rooms,
    };

    expect(Reducer(initialState, action)).toEqual(initialState);
  });

  it('Should handle GET_ALLOWED_USER_ROOMS_SUCCESS', () => {
    const action = {
      type: GET_ALLOWED_USER_ROOMS_SUCCESS,
      payload: filterAllowedRooms(rooms),
    };

    const state = {
      ...initialState,
      allowedUserRooms: simplifyRooms(action.payload),
    };

    expect(Reducer(initialState, action)).toEqual(state);
  });

  it('Should handle GET_ALLOWED_USER_ROOMS_FAILURE', () => {
    const action = {
      type: GET_ALLOWED_USER_ROOMS_FAILURE,
      payload: filterAllowedRooms(rooms),
    };

    expect(Reducer(initialState, action)).toEqual(initialState);
  });
});
