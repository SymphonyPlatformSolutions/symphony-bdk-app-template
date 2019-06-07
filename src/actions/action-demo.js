import Api from '../services/api/api';
import {
  GET_DEMO, GET_DEMO_SUCCESS, GET_DEMO_FAILURE,
  UPDATE_DEMO, UPDATE_DEMO_SUCCESS, UPDATE_DEMO_FAILURE,
  DELETE_DEMO, DELETE_DEMO_SUCCESS, DELETE_DEMO_FAILURE,
} from './action-types';
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
    dispatch({ type: UPDATE_DEMO });
    return Api.put(`${ENDPOINT}/${id}`, content)
      .then(() => dispatch({ type: UPDATE_DEMO_SUCCESS, payload: { ...content, id } }))
      .catch(response => dispatch({ type: UPDATE_DEMO_FAILURE, payload: response.data }));
  };
}

export function deleteDemoContent(id) {
  return (dispatch) => {
    dispatch({ type: DELETE_DEMO });
    return Api.delete(`${ENDPOINT}/${id}`)
      .then(() => dispatch({ type: DELETE_DEMO_SUCCESS, payload: id }))
      .catch(response => dispatch({ type: DELETE_DEMO_FAILURE, payload: response.data }));
  };
}
