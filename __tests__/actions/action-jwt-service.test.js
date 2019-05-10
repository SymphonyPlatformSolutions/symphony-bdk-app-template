import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { JWT_AUTH_SUCCESS, JWT_AUTH_FAILURE } from '../../src/actions/action-types';
import getJWTFromSymphony from '../../src/actions/action-jwt-service';

let store;
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mockJwt = 'abcdefg';
const jwtServiceMockResolvedValue = {
  getJwt: () => Promise.resolve(mockJwt),
};
const jwtMockServiceRejectedValue = {
  getJwt: () => Promise.reject(),
};

beforeEach(() => {
  store = mockStore({});
});

describe('Get JWT From Symphony', () => {
  it('Returns a "No JWT" value when service is null', () => {
    store.dispatch(getJWTFromSymphony(null));

    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(1);
    expect(expectedActions[0].type).toEqual(JWT_AUTH_SUCCESS);
    expect(expectedActions[0].jwt).toEqual('No JWT');
  });

  it('Returns a successful JWT string when service is passed', () => store.dispatch(getJWTFromSymphony(jwtServiceMockResolvedValue))
    .then(() => {
      const expectedActions = store.getActions();
      expect(expectedActions.length).toBe(1);
      expect(expectedActions[0].type).toEqual(JWT_AUTH_SUCCESS);
      expect(expectedActions[0].jwt).toEqual(mockJwt);
    }));

  it('Returns undefined when there is a JWT service failure', () => store.dispatch(getJWTFromSymphony(jwtMockServiceRejectedValue))
    .then(() => {
      const expectedActions = store.getActions();
      expect(expectedActions.length).toBe(1);
      expect(expectedActions[0].type).toEqual(JWT_AUTH_FAILURE);
      expect(expectedActions[0].jwt).toEqual(undefined);
    }));
});
