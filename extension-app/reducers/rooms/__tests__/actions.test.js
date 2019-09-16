import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Api from 'services/api';
import {
  GET_ROOMS,
  GET_ROOMS_SUCCESS,
  GET_ROOMS_FAILURE,
} from '../types';
import {
  getBackendRooms,
} from '../actions';

let store;
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('services/api', () => ({
  get: jest.fn(),
}));

beforeEach(() => {
  store = mockStore({});
});

const mockRooms = [
  { thread_id: '123123', name: 'Room 1' },
  { thread_id: '123456', name: 'Room 2' },
];

describe('Room actions', () => {
  it('Get notifications should fire success on successful API', (done) => {
    Api.get.mockImplementation(() => new Promise(res => res({ data: mockRooms })));
    store.dispatch(getBackendRooms()).then(() => {
      const expectedActions = store.getActions();

      expect(expectedActions.length).toBe(2);
      expect(expectedActions[0].type).toEqual(GET_ROOMS);
      expect(expectedActions[1].type).toEqual(GET_ROOMS_SUCCESS);
      expect(expectedActions[1].payload).toEqual(mockRooms);
      done();
    })
      .catch(e => done.fail(e));
  });

  it('Get notifications should return error if API fails', (done) => {
    Api.get.mockImplementation(() => new Promise((res, rej) => rej(new Error())));
    store.dispatch(getBackendRooms()).then(() => {
      const expectedActions = store.getActions();

      expect(expectedActions.length).toBe(2);
      expect(expectedActions[0].type).toEqual(GET_ROOMS);
      expect(expectedActions[1].type).toEqual(GET_ROOMS_FAILURE);
      done();
    })
      .catch(e => done.fail(e));
  });
});
