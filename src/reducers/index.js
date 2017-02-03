import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
  form,
  loginReducer
});

export default rootReducer;
