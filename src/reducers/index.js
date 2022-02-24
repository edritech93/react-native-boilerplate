'use strict';
import {combineReducers} from 'redux';
import app from './app';

const appReducer = combineReducers({
  app,
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};
