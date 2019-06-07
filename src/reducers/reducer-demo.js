import {
  GET_DEMO, GET_DEMO_SUCCESS, GET_DEMO_FAILURE,
  UPDATE_DEMO, UPDATE_DEMO_SUCCESS, UPDATE_DEMO_FAILURE,
  DELETE_DEMO, DELETE_DEMO_SUCCESS, DELETE_DEMO_FAILURE,
} from '../actions/action-types';

/*
  -- DEMO
  Demo Reducer, for the purpose of showing a full react-redux flow.
  It can - and should - be deleted when developing your own integration.
*/

const INITIAL_STATE = {
  loading: true,
  content: null,
  error: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_DEMO:
    case UPDATE_DEMO:
    case DELETE_DEMO:
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
    case UPDATE_DEMO_FAILURE:
    case DELETE_DEMO_FAILURE:
      return {
        ...state,
        loading: false,
        error: JSON.stringify(action.payload),
      };
    case UPDATE_DEMO_SUCCESS:
      return {
        ...state,
        content: state.content.map((el) => {
          if (el.id === action.payload.id) {
            return action.payload;
          }
          return el;
        }),
        loading: false,
      };
    case DELETE_DEMO_SUCCESS:
      return {
        ...state,
        content: state.content.filter(el => el.id !== action.payload),
        loading: false,
      };
    default:
      return state;
  }
}
