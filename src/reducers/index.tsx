import {persistReducer} from 'redux-persist';
import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import app from './app';
import auth from './auth';
import splash from './splash';
import notification from './notification';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['app', 'auth', 'splash', 'notification'],
};

const appReducer = combineReducers({
  app,
  auth,
  notification,
  splash,
});

export default persistReducer(rootPersistConfig, appReducer);
