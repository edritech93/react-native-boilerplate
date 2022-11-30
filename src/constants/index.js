import {AndroidImportance} from '@notifee/react-native';
import {Colors} from '../themes';

export const BASE_URL = {
  DEV: 'http://157.230.38.16:8082/',
  LIVE: 'http://157.230.38.16:8080/',
};

export const BASIC_AUTH = {
  username: 'app.client',
  password: 'secret',
};

export const FETCH_STATUS = {
  REQUEST: 'REQUEST',
  RELOAD: 'RELOAD',
  LOAD_MORE: 'LOAD_MORE',
  UPDATE_FILTER: 'UPDATE_FILTER',
};

export const NOTIF_CHANNEL_TRANSACTION = {
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
