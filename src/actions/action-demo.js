import Api from '../services/api/api';
import {
  GET_DEMO, GET_DEMO_SUCCESS, GET_DEMO_FAILURE,
} from './action-types';
/*
  -- DEMO
  Demo action, showing how to dispatch information into the Redux State, using the Api
  service.
  It can - and should - be deleted when developing your own integration.
*/

const ENDPOINT = 'demoEndpoint';

export default function getDemoContent() {
  return (dispatch) => {
    dispatch({ type: GET_DEMO });
    return Api.get(ENDPOINT)
      .then(response => dispatch({ type: GET_DEMO_SUCCESS, payload: response.data }))
      .catch(response => dispatch({ type: GET_DEMO_FAILURE, payload: response.data }));
  };
}
