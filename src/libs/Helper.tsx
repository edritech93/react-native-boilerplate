import {STORAGE} from '../actions/types';
import {strings} from '../constants/localize';
import messaging from '@react-native-firebase/messaging';
import ObjStorage from './ObjStorage';
import moment from 'moment';

export const Helper = {
  setToken: async (token: string) => {
    await ObjStorage.set(STORAGE.TOKEN, token);
  },
  getToken: async (): Promise<string> => {
    const token = await ObjStorage.get(STORAGE.TOKEN);
    return token || '';
  },
  setRefreshToken: async (token: string) => {
    await ObjStorage.set(STORAGE.REFRESH_TOKEN, token);
  },
  getRefreshToken: async (): Promise<string> => {
    const token = await ObjStorage.get(STORAGE.REFRESH_TOKEN);
    return token || '';
  },
  removeToken: async () => {
    await ObjStorage.remove(STORAGE.TOKEN);
  },
  removeRefreshToken: async () => {
    await ObjStorage.remove(STORAGE.REFRESH_TOKEN);
  },
  nowDate: (): string => {
    return moment().format('YYYY-MM-DD').toString();
  },
  nowTime: (): string => {
    return moment().format('HH:mm:ss').toString();
  },
  dateTimeFormat12: (date: string): string => {
    return moment(date).format('DD MMM YYYY HH:mm A');
  },
  formatJS: (date: string): string => {
    return moment(date).format('YYYY-MM-DDTHH:mm:ss').toString();
  },
  getDateSlash: (date: string): string => {
    return moment(date).format('DD/MM/YY');
  },
  getDateDash: (date: string): string => {
    return moment(date).format('YYYY-MM-DD');
  },
  getTokenFcm: (): Promise<string | null> => {
    return new Promise(function (resolve, reject) {
      messaging()
        .hasPermission()
        .then(enabled => {
          if (enabled) {
            messaging()
              .getToken()
              .then(token => resolve(token))
              .catch(() => reject(null));
          } else {
            messaging()
              .requestPermission()
              .then(() => {
                messaging()
                  .getToken()
                  .then(token => resolve(token))
                  .catch(() => reject(null));
              })
              .catch(() => reject(null));
          }
        })
        .catch(() => reject(null));
    });
  },
  setLanguage: async (value: string) => {
    await ObjStorage.set(STORAGE.LANGUAGE, value);
    strings?.setLanguage(value);
  },
  getLanguage: async (): Promise<string> => {
    return await ObjStorage.get(STORAGE.LANGUAGE).catch(() => 'en');
  },
  getFileQuality: (size: number): number => {
    if (size > 0 && size < 1000000) {
      return 90;
    } else if (size > 1000000 && size < 2000000) {
      return 80;
    } else if (size > 2000000 && size < 3000000) {
      return 70;
    } else if (size > 3000000 && size < 4000000) {
      return 60;
    } else {
      return 50;
    }
  },
};
