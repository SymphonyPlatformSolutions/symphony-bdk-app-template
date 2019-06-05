import {
  GET_DEMO, GET_DEMO_SUCCESS, GET_DEMO_FAILURE,
} from '../actions/action-types';

/*
  -- DEMO
  Demo Reducer, for the purpose of showing a full react-redux flow.
  It can - and should - be deleted when developing your own integration.
*/

const INITIAL_STATE = {
  loading: null,
  content: null,
  error: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_DEMO:
      return {
        ...state,
        loading: true,
      };
    case GET_DEMO_SUCCESS:
      return {
        ...state,
        loading: false,
        content: action.payload.content || [],
        error: null,
      };
    case GET_DEMO_FAILURE:
      return {
        ...state,
        loading: false,
        error: JSON.stringify(action.payload),
      };
    default:
      return state;
  }
}
