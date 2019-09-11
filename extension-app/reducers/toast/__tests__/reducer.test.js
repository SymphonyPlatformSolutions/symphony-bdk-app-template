import Reducer from '..';
import {
  REMOVE_TOAST,
  OVERRIDE_TOAST_SUCCESS,
  OVERRIDE_TOAST_ERROR,
} from '../types';

const initialState = {
  toastType: undefined, isOpen: undefined, toastText: undefined, errorData: undefined,
};

const errorData = [400, 401, 403, 404, 500];

describe('The reducer of Toast', () => {
  it('should return the initial state', () => {
    expect(Reducer(initialState, {})).toEqual(initialState);
  });

  it('Should pick up default initial state if no state is passed', () => {
    expect(Reducer(undefined, {})).toEqual(initialState);
  });

  it('Should have a REMOVE_TOAST action to Toast be removable', () => {
    const action = {
      type: REMOVE_TOAST,
    };

    const state = {
      isOpen: false,
      errorData: undefined,
      toastText: undefined,
      toastType: undefined,
    };

    expect(Reducer(initialState, action)).toEqual(state);
  });

  it('Should have a OVERRIDE_TOAST_SUCCESS action when override succeeded', () => {
    const action = {
      type: OVERRIDE_TOAST_SUCCESS,
      payload: { text: 'text' },
    };

    const state = {
      isOpen: true,
      errorData: undefined,
      toastText: 'text',
      toastType: 'success',
    };

    expect(Reducer(initialState, action)).toEqual(state);
  });

  it('Should have a OVERRIDE_TOAST_ERROR action when override failed', () => {
    const action = {
      type: OVERRIDE_TOAST_ERROR,
      payload: { text: 'text', data: 'data' },
    };

    const state = {
      isOpen: true,
      errorData: 'data',
      toastText: 'text',
      toastType: 'error',
    };

    expect(Reducer(initialState, action)).toEqual(state);
  });
});
