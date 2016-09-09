import { combineReducers } from 'redux';
import user from './user';
import status from './status';

export default combineReducers({
  status,
  user,
});

