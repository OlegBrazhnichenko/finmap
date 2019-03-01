import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import Storage from '../reducers/Storage/reducer';
import API from '../reducers/API/reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  Storage,
  API,
});

export default rootReducer;
