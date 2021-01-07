import { combineReducers } from 'redux';
import reducer from './rotateReducer';
import windowAppReducer from './windowAppReducer';

export default combineReducers({ reducer, windowAppReducer });;