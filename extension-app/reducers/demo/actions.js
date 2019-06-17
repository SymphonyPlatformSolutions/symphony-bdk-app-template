import Api from '../../services/api';
import {
  GET_DEMO, GET_DEMO_SUCCESS, GET_DEMO_FAILURE,
  UPDATE_DEMO, UPDATE_DEMO_SUCCESS, UPDATE_DEMO_FAILURE,
  DELETE_DEMO, DELETE_DEMO_SUCCESS, DELETE_DEMO_FAILURE,
  POST_DEMO, POST_DEMO_SUCCESS, POST_DEMO_FAILURE,
  ADD_NEW_DEMO_COMPONENT, REMOVE_NEW_DEMO_COMPONENT,
} from './types';
/*
  -- DEMO
  Demo action, showing how to dispatch information into the Redux State, using the Api
  service.
  It can - and should - be deleted when developing your own integration.
*/
const ENDPOINT = 'demoEndpoint';

export function getDemoContent() {
  return (dispatch) => {
    dispatch({ type: GET_DEMO });
    return Api.get(ENDPOINT)
      .then(response => dispatch({ type: GET_DEMO_SUCCESS, payload: response.data }))
      .catch(response => dispatch({ type: GET_DEMO_FAILURE, payload: response.data }));
  };
}

export function updateDemoContent(id, content) {
  return (dispatch) => {
    dispatch({ type: UPDATE_DEMO, payload: id });
    return Api.put(`${ENDPOINT}/${id}`, content)
      .then(() => dispatch({
        type: UPDATE_DEMO_SUCCESS,
        payload: { ...content, id },
      }))
      .catch(response => dispatch({ type: UPDATE_DEMO_FAILURE, payload: response.data }));
  };
}

export function deleteDemoContent(id) {
  return (dispatch) => {
    dispatch({ type: DELETE_DEMO, payload: id });
    return Api.delete(`${ENDPOINT}/${id}`)
      .then(() => dispatch({ type: DELETE_DEMO_SUCCESS, payload: id }))
      .catch(response => dispatch({ type: DELETE_DEMO_FAILURE, payload: response.data }));
  };
}

export function createDemoContent(content) {
  return (dispatch) => {
    dispatch({ type: POST_DEMO, payload: null });
    return Api.post(`${ENDPOINT}`, content)
      .then(response => dispatch({
        type: POST_DEMO_SUCCESS,
        payload: {
          ...content,
          id: response.body,
        },
      }))
      .catch(response => dispatch({ type: POST_DEMO_FAILURE, payload: response.data }));
  };
}

export function addNewComponent() {
  return (dispatch) => {
    dispatch({ type: ADD_NEW_DEMO_COMPONENT });
  };
}

export function cancelNewComponent() {
  return (dispatch) => {
    dispatch({ type: REMOVE_NEW_DEMO_COMPONENT });
  };
}
