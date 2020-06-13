import { combineReducers } from 'redux';
 import gnomesReducer from './gnomes';
import filtersReducer from './filters';

export default combineReducers({
  gnomesReducer,
  filtersReducer,
});
