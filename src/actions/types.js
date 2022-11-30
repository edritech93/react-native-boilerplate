import {defineAction} from 'redux-define';
import {
  USER,
  TOKEN,
  REFRESH_TOKEN,
  CONFIGURATION,
  CHANGE,
  LANGUAGE,
  LOGIN_SAVED,
  DEVICE_TOKEN,
  THEME,
  ADD,
  REQUEST,
  SUCCESS,
  FAILURE,
} from '../constants/state';
const appNamespace = defineAction('BOILERPLATE_RN');

export const STORAGE = defineAction(
  'STORAGE',
  [
    USER,
    TOKEN,
    REFRESH_TOKEN,
    CONFIGURATION,
    LANGUAGE,
    LOGIN_SAVED,
    DEVICE_TOKEN,
    THEME,
  ],
  appNamespace,
);
export const CONNECTION_STATUS = defineAction(
  'CONNECTION_STATUS',
  [CHANGE],
  appNamespace,
);
export const ALERT = defineAction('ALERT', [ADD], appNamespace);
export const THEME_APP_ID = defineAction(
  'THEME_APP_ID',
  [CHANGE],
  appNamespace,
);
export const LANGUAGE_APP_ID = defineAction(
  'LANGUAGE_APP_ID',
  [CHANGE],
  appNamespace,
);
export const PROFILE = defineAction(
  'PROFILE',
  [REQUEST, SUCCESS, FAILURE, CHANGE],
  appNamespace,
);
