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
  It receives an object from the action dispatch and maps it into a format
  that the Frontend will use.
  {
    name:
    id:
    isFruit:
    loading:
  }
*/
const mapElementsToLoadingFalse = arr => arr.map(el => ({ ...el, loading: false }));
const overrideLoadingById = (arr, id, newLoading) => arr.map((el) => {
  if (el.id === id) {
    return {
      ...el,
      loading: newLoading,
    };
  }
  return el;
});
const updateElementById = (arr, newContent, newLoading) => arr.map((el) => {
  if (el.id === newContent.id) {
    return {
      ...newContent,
      loading: newLoading,
    };
  }
  return el;
});

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
        content: overrideLoadingById(state.content, action.payload, true),
      };
    case GET_DEMO_FAILURE:
    case UPDATE_DEMO_FAILURE:
    case DELETE_DEMO_FAILURE:
    case POST_DEMO_FAILURE:
      return {
        ...state,
        content: mapElementsToLoadingFalse(state.content),
        error: JSON.stringify(action.payload),
      };
    case GET_DEMO_SUCCESS:
      return {
        ...state,
        loading: false,
        content: mapElementsToLoadingFalse(action.payload),
        error: null,
      };
    case UPDATE_DEMO_SUCCESS:
      return {
        ...state,
        content: updateElementById(state.content, action.payload, false),
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
