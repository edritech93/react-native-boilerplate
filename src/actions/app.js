import {CONNECTION_STATUS, ALERT} from './types';

export const connectionChange = args => {
  return {type: CONNECTION_STATUS.CHANGE, args};
};

export const showAlert = args => {
  return {type: ALERT.SHOW, args};
};
