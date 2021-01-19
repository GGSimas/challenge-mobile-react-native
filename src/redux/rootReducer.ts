import {combineReducers} from 'redux';
import heroes from './Heroes/reducer';

export default combineReducers({
  heroes,
});
