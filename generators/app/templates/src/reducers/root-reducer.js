import { combineReducers } from 'redux';
import jwtReducer from './reducer-jwt';

const rootReducer = combineReducers({
  jwt: jwtReducer,
});

export default rootReducer;
