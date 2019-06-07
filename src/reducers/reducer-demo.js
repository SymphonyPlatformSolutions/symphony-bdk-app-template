import {
  GET_DEMO, GET_DEMO_SUCCESS, GET_DEMO_FAILURE,
  UPDATE_DEMO, UPDATE_DEMO_SUCCESS, UPDATE_DEMO_FAILURE,
  DELETE_DEMO, DELETE_DEMO_SUCCESS, DELETE_DEMO_FAILURE,
  POST_DEMO, POST_DEMO_SUCCESS, POST_DEMO_FAILURE,
  ADD_DEMO, REMOVE_DEMO,
} from '../actions/action-types';

/*
  -- DEMO
  Demo Reducer, for the purpose of showing a full react-redux flow.
  It can - and should - be deleted when developing your own integration.
  {
    name:
    id:
    isFruit:
    loading:
  }
*/

const INITIAL_STATE = {
  loadingList: true,
  content: null,
  error: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_DEMO:
      return {
        ...state,
        loadingList: true,
      };
    case UPDATE_DEMO:
    case DELETE_DEMO:
    case POST_DEMO:
      return {
        ...state,
        // Externalize function
        content: state.content.map((el) => {
          if (el.id === action.payload) {
            return {
              ...el,
              loading: true,
            };
          }
          return el;
        }),
      };
    case GET_DEMO_FAILURE:
    case UPDATE_DEMO_FAILURE:
    case DELETE_DEMO_FAILURE:
    case POST_DEMO_FAILURE:
      return {
        ...state,
        error: JSON.stringify(action.payload),
        content: state.content.map(el => ({ ...el, loading: false })),
      };
    case GET_DEMO_SUCCESS:
      return {
        ...state,
        loading: false,
        content: action.payload.content.map(el => ({
          ...el,
          loading: false,
        })),
        error: null,
      };
    case UPDATE_DEMO_SUCCESS:
      return {
        ...state,
        content: state.content.map((el) => {
          if (el.id === action.payload.id) {
            return {
              ...action.payload,
              loading: false,
            };
          }
          return el;
        }),
      };
    case DELETE_DEMO_SUCCESS:
      return {
        ...state,
        content: state.content.filter(el => el.id !== action.payload),
      };
    case POST_DEMO_SUCCESS:
      const newIndex = state.content.findIndex(el => el.id === null);
      const content = Array.from(state.content);
      content[newIndex] = action.payload;
      return {
        ...state,
        content,
      };
    case ADD_DEMO:
      return {
        ...state,
        content: [...state.content, {
          isFruit: true, name: null, id: null, loading: false,
        }],
      };
    case REMOVE_DEMO:
      return {
        ...state,
        content: state.content.filter(el => el.id !== null),
      };
    default:
      return state;
  }
}
