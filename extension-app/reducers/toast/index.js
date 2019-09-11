import {
  REMOVE_TOAST,
  OVERRIDE_TOAST_SUCCESS,
  OVERRIDE_TOAST_ERROR,
} from './types';

const INITIAL_STATE = {
  toastType: undefined,
  isOpen: undefined,
  toastText: undefined,
  errorData: undefined,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case REMOVE_TOAST:
      return {
        ...state,
        isOpen: false,
        errorData: undefined,
        toastText: undefined,
        toastType: undefined,
      };
    case OVERRIDE_TOAST_SUCCESS:
      return {
        ...state,
        isOpen: true,
        errorData: undefined,
        toastText: action.payload.text,
        toastType: 'success',
      };
    case OVERRIDE_TOAST_ERROR:
      return {
        ...state,
        isOpen: true,
        errorData: action.payload.data,
        toastText: action.payload.text,
        toastType: 'error',
      };
    default:
      return state;
  }
}
