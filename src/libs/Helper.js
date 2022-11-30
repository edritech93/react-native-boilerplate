import {STORAGE} from '../actions/types';
import messaging from '@react-native-firebase/messaging';
import ObjStorage from './ObjStorage';
import moment from 'moment';

export const Helper = {
  setToken: async token => {
    await ObjStorage.set(STORAGE.TOKEN, token);
  },
  getToken: async () => {
    const token = await ObjStorage.get(STORAGE.TOKEN);
    if (token) {
      return token;
    } else {
      return null;
    }
  },
  setRefreshToken: async token => {
    await ObjStorage.set(STORAGE.REFRESH_TOKEN, token);
  },
  getRefreshToken: async () => {
    const token = await ObjStorage.get(STORAGE.REFRESH_TOKEN);
    if (token) {
      return token;
    } else {
      return null;
    }
  },
  removeToken: async () => {
    await ObjStorage.remove(STORAGE.TOKEN);
  },
  removeRefreshToken: async () => {
    await ObjStorage.remove(STORAGE.REFRESH_TOKEN);
  },
  getTokenFcm: () => {
    return new Promise(function (resolve, reject) {
      messaging()
        .hasPermission()
        .then(enabled => {
          if (enabled) {
            messaging()
              .getToken()
              .then(token => resolve(token))
              .catch(error => reject(error));
          } else {
            messaging()
              .requestPermission()
              .then(() => {
                messaging()
                  .getToken()
                  .then(token => resolve(token))
                  .catch(error => reject(error));
              })
              .catch(error => reject(error));
          }
        })
        .catch(error => reject(error));
    });
  },
  getFileQuality: fileSize => {
    if (fileSize > 0 && fileSize < 1000000) {
      return 90;
    } else if (fileSize > 1000000 && fileSize < 2000000) {
      return 80;
    } else if (fileSize > 2000000 && fileSize < 3000000) {
      return 70;
    } else if (fileSize > 3000000 && fileSize < 4000000) {
      return 60;
    } else {
      return 50;
    }
  },
  nowDate: () => {
    return moment().format('YYYY-MM-DD').toString();
  },
  nowTime: () => {
    return moment().format('HH:mm:ss').toString();
  },
  dateTimeFormat12: date => {
    return moment(date).format('DD MMM YYYY HH:mm A');
  },
  formatJS: date => {
    return moment(date).format('YYYY-MM-DDTHH:mm:ss').toString();
  },
};
