import { combineReducers } from 'redux';
import userReducer from './reducer-user';
import demoReducer from './reducer-demo';

const rootReducer = combineReducers({
  user: userReducer,
  demo: demoReducer,
});

export default rootReducer;
