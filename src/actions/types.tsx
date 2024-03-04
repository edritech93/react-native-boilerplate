import {
  REQUEST,
  SUCCESS,
  FAILURE,
  TOKEN,
  REFRESH_TOKEN,
  CONFIGURATION,
  CHANGE,
  LANGUAGE,
  LOGIN_SAVED,
  DEVICE_TOKEN,
  THEME,
  SHOW,
} from '../constants/state';
import {defineAction} from 'redux-define';

const appNamespace = defineAction('BOILERPLATE_RN');

export const STORAGE = defineAction(
  'STORAGE',
  [
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
export const CONNECTION = defineAction('CONNECTION', [CHANGE], appNamespace);
export const ALERT = defineAction('ALERT', [SHOW], appNamespace);
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
export const SPLASH = defineAction(
  'SPLASH',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);
export const LOGIN = defineAction(
  'LOGIN',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);
export const INIT_RE_LOGIN = defineAction(
  'INIT_RE_LOGIN',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);
export const PROFILE = defineAction(
  'PROFILE',
  [REQUEST, SUCCESS, FAILURE, CHANGE],
  appNamespace,
);
export const ADD_DEVICE = defineAction(
  'ADD_DEVICE',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);
export const NOTIFICATION = defineAction(
  'NOTIFICATION',
  [REQUEST, SUCCESS, FAILURE],
  appNamespace,
);
