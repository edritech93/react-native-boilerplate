import {CONNECTION_STATUS, ALERT, THEME_APP_ID, LANGUAGE_APP_ID} from './types';

export const connectionChange = args => {
  return {type: CONNECTION_STATUS.CHANGE, args};
};

export const showAlert = args => {
  return {type: ALERT.ADD, args};
};

export const themeAppIdChange = args => {
  return {type: THEME_APP_ID.CHANGE, args};
};

export const languageAppIdChange = args => {
  return {type: LANGUAGE_APP_ID.CHANGE, args};
};
