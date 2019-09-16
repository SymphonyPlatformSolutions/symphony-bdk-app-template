import { filterAllowedRooms, simplifyRooms } from 'utils/helpers/help-functions';
import Api from 'services/api';
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
} from '../types';
import Reducer from '../index';

jest.mock('services/api', () => ({ setJwt: jest.fn() }));

const rawRooms = [
  {
    id: '0',
    name: 'Room A',
    threadId: 'abc/def//ghi+jkl==',
    memberAddUserEnabled: true,
    userIsOwner: true,
    publicRoom: false,
  },
  {
    id: '1',
    name: 'Room B',
    threadId: 'abc/def//ghi+123==',
    memberAddUserEnabled: false,
    userIsOwner: false,
    publicRoom: false,
  },
  {
    id: '2',
    name: 'Room C',
    threadId: 'abc/def//ghi+456==',
    memberAddUserEnabled: true,
    userIsOwner: false,
    publicRoom: true,
  },
];

const initialState = {
  allUserRooms: null,
  allowedUserRooms: null,
  jwt: 'loading',
  botRooms: {
    loading: false,
    rooms: null,
  },
};

let rooms;

beforeEach(() => {
  rooms = rawRooms.map(room => ({ ...room }));
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
    expect(Api.setJwt).toHaveBeenCalledWith('abcdefgh');
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

  it('Should handle GET_BOT_ROOMS', () => {
    const action = {
      type: GET_BOT_ROOMS,
    };

    const state = {
      ...initialState,
      botRooms: {
        ...initialState.botRooms,
        rooms: [],
        loading: true,
      },
    };

    expect(Reducer(initialState, action)).toEqual(state);
  });

  it('Should handle GET_BOT_ROOMS_SUCCESS', () => {
    const action = {
      type: GET_BOT_ROOMS_SUCCESS,
      payload: [{ name: 'Room A', stream_id: 'abc' }],
    };

    const state = {
      ...initialState,
      botRooms: {
        ...initialState.botRooms,
        rooms: [{ name: 'Room A', threadId: 'abc' }],
        loading: false,
      },
    };

    expect(Reducer(initialState, action)).toEqual(state);
  });

  it('Should handle GET_BOT_ROOMS_FAILURE', () => {
    const action = {
      type: GET_BOT_ROOMS_FAILURE,
    };

    const state = {
      ...initialState,
      botRooms: {
        ...initialState.botRooms,
        rooms: [],
        loading: false,
      },
    };

    expect(Reducer(initialState, action)).toEqual(state);
  });
});
