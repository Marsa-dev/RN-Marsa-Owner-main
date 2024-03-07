import { createStore, combineReducers } from 'redux';
import itemReducer from './../reducers';

const rootReducer = combineReducers({
  data: itemReducer,
});

const store = createStore(rootReducer);

export { store };
