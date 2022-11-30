'use strict';
import {persistReducer} from 'redux-persist';
import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import immutableTransform from 'redux-persist-transform-immutable';
import app from './app';
import auth from './auth';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [immutableTransform()],
};

const appReducer = combineReducers({
  app,
  auth,
});

export default persistReducer(rootPersistConfig, appReducer);
