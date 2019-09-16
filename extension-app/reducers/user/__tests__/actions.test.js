import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { HTTP_OK, HTTP_BAD_REQUEST } from 'utils/system/system-constants';
import { setupURL } from 'utils/system/setup-url';
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
import {
  getJWTFromSymphony,
  getAllUserRooms,
  getAllowedUserRooms,
  getBotRooms,
} from '../actions';

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

let store;
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const axiosMock = new MockAdapter(axios);
const mockJWT = 'jwt';
const URL = `${setupURL()}/v1/rooms`;
const LOG_URL = `${setupURL()}/v1/logs`;

beforeEach(() => {
  store = mockStore({});
});

describe('User Actions', () => {
  axiosMock.onPost(LOG_URL).reply(HTTP_OK);

  describe('Get JWT From Symphony', () => {
    const jwtServiceMockResolvedValue = {
      getJwt: () => Promise.resolve(mockJWT),
    };

    const jwtMockServiceRejectedValue = {
      getJwt: () => Promise.reject(),
    };

    it('Returns a "No JWT" value when service is null', () => {
      store.dispatch(getJWTFromSymphony(null));

      const expectedActions = store.getActions();
      expect(expectedActions.length).toBe(1);
      expect(expectedActions[0].type).toEqual(JWT_AUTH_SUCCESS);
      expect(expectedActions[0].payload).toEqual('No JWT');
    });

    it('Returns a successful JWT string when service is passed', (done) => {
      store.dispatch(getJWTFromSymphony(jwtServiceMockResolvedValue))
        .then(() => {
          const expectedActions = store.getActions();
          expect(expectedActions.length).toBe(1);
          expect(expectedActions[0].type).toEqual(JWT_AUTH_SUCCESS);
          expect(expectedActions[0].payload).toEqual(mockJWT);
          done();
        })
        .catch(e => done.fail(e));
    });

    it('Returns undefined when there is a JWT service failure', (done) => {
      store.dispatch(getJWTFromSymphony(jwtMockServiceRejectedValue))
        .then(() => {
          const expectedActions = store.getActions();
          expect(expectedActions.length).toBe(1);
          expect(expectedActions[0].type).toEqual(JWT_AUTH_FAILURE);
          expect(expectedActions[0].payload).toEqual(undefined);
          done();
        })
        .catch(e => done.fail(e));
    });
  });

  describe('User Rooms actions', () => {
    it('Fires GET_ALL_USER_ROOMS_SUCCESS upon successful fetch of all user rooms', (done) => {
      global.SYMPHONY = {
        services: {
          subscribe: jest.fn(() => ({
            getRooms: jest.fn(() => new Promise(req => req(rawRooms))),
          })),
          unsubscribe: jest.fn(),
        },
      };

      store.dispatch(getAllUserRooms())
        .then(() => {
          const expectedActions = store.getActions();
          expect(expectedActions.length).toBe(1);
          expect(expectedActions[0].type).toEqual(GET_ALL_USER_ROOMS_SUCCESS);
          expect(expectedActions[0].payload).toEqual(rawRooms);
          done();
        })
        .catch(e => done.fail(e));
    });

    it('Fires GET_ALL_USER_ROOMS_FAILURE upon unsuccessful fetch of all user rooms', (done) => {
      global.SYMPHONY = {
        services: {
          subscribe: jest.fn(() => ({
            getRooms: jest.fn(() => new Promise((req, rej) => rej())),
          })),
          unsubscribe: jest.fn(),
        },
      };

      store.dispatch(getAllUserRooms())
        .then(() => {
          const expectedActions = store.getActions();
          expect(expectedActions.length).toBe(1);
          expect(expectedActions[0].type).toEqual(GET_ALL_USER_ROOMS_FAILURE);
          expect(expectedActions[0].payload).toEqual(new Error('No response from Symphony UI extended-user-Service in getting rooms'));
          done();
        })
        .catch(e => done.fail(e));
    });

    it('Should fires GET_ALLOWED_USER_ROOMS_SUCCESS upon successful fetch of allowed user rooms', (done) => {
      global.SYMPHONY = {
        services: {
          subscribe: jest.fn(() => ({
            getRooms: jest.fn(() => new Promise(req => req(rawRooms))),
          })),
          unsubscribe: jest.fn(),
        },
      };

      const expectedPayload = [
        {
          id: '0',
          name: 'Room A',
          threadId: 'abc/def//ghi+jkl==',
          memberAddUserEnabled: true,
          userIsOwner: true,
          publicRoom: false,
        },
      ];

      store.dispatch(getAllowedUserRooms())
        .then(() => {
          const expectedActions = store.getActions();
          expect(expectedActions.length).toBe(1);
          expect(expectedActions[0].type).toEqual(GET_ALLOWED_USER_ROOMS_SUCCESS);
          expect(expectedActions[0].payload).toEqual(expectedPayload);
          done();
        })
        .catch(e => done.fail(e));
    });

    it('Should fires GET_ALLOWED_USER_ROOMS_FAILURE upon successful fetch of allowed user rooms', (done) => {
      global.SYMPHONY = {
        services: {
          subscribe: jest.fn(() => ({
            getRooms: jest.fn(() => new Promise((req, rej) => rej())),
          })),
          unsubscribe: jest.fn(),
        },
      };

      store.dispatch(getAllowedUserRooms())
        .then(() => {
          const expectedActions = store.getActions();
          expect(expectedActions.length).toBe(1);
          expect(expectedActions[0].type).toEqual(GET_ALLOWED_USER_ROOMS_FAILURE);
          expect(expectedActions[0].payload).toEqual(new Error('No response from Symphony UI extended-user-Service in getting rooms'));
          done();
        })
        .catch(e => done.fail(e));
    });
  });

  it('Should handle success of getting bot rooms', (done) => {
    const responseData = { name: 'Room A', stream_id: 'abc' };

    axiosMock.onGet(URL).reply(HTTP_OK, responseData);

    store.dispatch(getBotRooms())
      .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(2);
        expect(expectedActions[0].type).toEqual(GET_BOT_ROOMS);
        expect(expectedActions[1].type).toEqual(GET_BOT_ROOMS_SUCCESS);
        expect(expectedActions[1].payload).toEqual(responseData);
        done();
      })
      .catch(e => done.fail(e));
  });

  it('Should handle failure of getting bot rooms', (done) => {
    axiosMock.onGet(URL).reply(HTTP_BAD_REQUEST);

    store.dispatch(getBotRooms())
      .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(2);
        expect(expectedActions[0].type).toEqual(GET_BOT_ROOMS);
        expect(expectedActions[1].type).toEqual(GET_BOT_ROOMS_FAILURE);
        done();
      })
      .catch(e => done.fail(e));
  });
});
