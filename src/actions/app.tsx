import {CONNECTION, ALERT, THEME_APP_ID, LANGUAGE_APP_ID} from './types';
import {ShowAlertType} from '../types/ShowAlertType';

export const connectionChange = (args: boolean | null) => {
  return {type: CONNECTION.CHANGE, args};
};

export const showAlert = (args: ShowAlertType) => {
  return {type: ALERT.SHOW, args};
};

export const themeAppIdChange = (args: number) => {
  return {type: THEME_APP_ID.CHANGE, args};
};

export const languageAppIdChange = (args: string) => {
  return {type: LANGUAGE_APP_ID.CHANGE, args};
};
