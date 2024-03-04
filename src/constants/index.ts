import {AndroidImportance} from '@notifee/react-native';
import {Colors} from '../themes';

export const BASE_URL: any = {
  DEV: 'https://jsonplaceholder.typicode.com/',
  LIVE: 'https://jsonplaceholder.typicode.com/',
};

export const BASIC_AUTH: any = {
  username: 'app.client',
  password: 'secret',
};

export const FETCH_STATUS: any = {
  REQUEST: 'REQUEST',
  RELOAD: 'RELOAD',
  LOAD_MORE: 'LOAD_MORE',
  UPDATE_FILTER: 'UPDATE_FILTER',
};

export const CHANNEL_TRANSACTION = {
  id: 'BOILERPLATE_TRANSACTION',
  name: 'Boilerplate Notification',
  description: 'Notification for Transaction',
  importance: AndroidImportance.HIGH,
  smallIcon: 'ic_notification',
  color: Colors.primary,
  sound: 'default',
  vibration: true,
  vibrationPattern: [300, 500],
};

export const DEF_AVATAR = require('../assets/images/profile_placeholder-100.png');

export enum CACHE_TIME {
  ONE_HOUR = 60,
  ONE_DAY = 1440,
  ONE_WEEK = 10080,
}
