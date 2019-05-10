import { JWT_AUTH_SUCCESS, JWT_AUTH_FAILURE } from '../../src/actions/action-types';
import Reducer from '../../src/reducers/reducer-jwt';

const initialState = { jwt: 'loading' };

describe('The reducer of JWT', () => {
  it('should handle JWT_AUTH_SUCCESS', () => {
    const action = {
      type: JWT_AUTH_SUCCESS,
      jwt: 'abcdefgh',
    };

    const state = { jwt: 'abcdefgh' };

    expect(Reducer(initialState, action)).toEqual(state);
  });

  it('should handle JWT_AUTH_FAILURE', () => {
    const action = {
      type: JWT_AUTH_FAILURE,
      jwt: null,
    };

    const state = { jwt: undefined };

    expect(Reducer(initialState, action)).toEqual(state);
  });

  it('should return the initial state', () => {
    expect(Reducer(initialState, {})).toEqual(initialState);
  });

  it('Should pick up default initial state if no state is passed', () => {
    expect(Reducer(undefined, {})).toEqual(initialState);
  });
});
