import {
  combineReducers, createStore, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import usersReducer from './users';


const rootReducer = combineReducers({
  user: usersReducer,
});

export default function configureStore(initialState) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(thunk),
    ),
  );
}
