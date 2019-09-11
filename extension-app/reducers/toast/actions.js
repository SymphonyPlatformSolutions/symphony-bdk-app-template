import { REMOVE_TOAST } from './types';

export function removeToast() {
  return {
    type: REMOVE_TOAST,
  };
}

export function overrideToast(type, text, data) {
  return {
    type,
    payload: {
      data,
      text,
    },
  };
}
