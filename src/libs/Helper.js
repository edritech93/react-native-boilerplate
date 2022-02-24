import {STORAGE} from '../actions/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import ObjStorage from './ObjStorage';
import moment from 'moment';

export const Helper = {
  setToken: async token => {
    await AsyncStorage.setItem(STORAGE.TOKEN, token);
  },
  getToken: async () => {
    const token = await AsyncStorage.getItem(STORAGE.TOKEN);
    if (token) {
      return token;
    } else {
      return null;
    }
  },
  setRefreshToken: async token => {
    await AsyncStorage.setItem(STORAGE.REFRESH_TOKEN, token);
  },
  getRefreshToken: async () => {
    const token = await AsyncStorage.getItem(STORAGE.REFRESH_TOKEN);
    if (token) {
      return token;
    } else {
      return null;
    }
  },
  removeToken: async () => {
    await AsyncStorage.removeItem(STORAGE.TOKEN);
  },
  removeRefreshToken: async () => {
    await AsyncStorage.removeItem(STORAGE.REFRESH_TOKEN);
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
              .catch(error => reject(null));
          } else {
            messaging()
              .requestPermission()
              .then(() => {
                messaging()
                  .getToken()
                  .then(token => resolve(token))
                  .catch(error => reject(null));
              })
              .catch(error => reject(null));
          }
        })
        .catch(error => reject(null));
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
  getDateTimeNow: () => {
    return moment().toString();
  },
  dateTimeFormat12: date => {
    return moment(date).format('DD MMM YYYY HH:mm A');
  },
  formatJS: date => {
    return moment(date).format('YYYY-MM-DDTHH:mm:ss').toString();
  },
  setLanguage: async item => {
    await ObjStorage.set(STORAGE.LANGUAGE, item);
    strings.setLanguage(item.id);
  },
  getLanguage: async () => {
    const item = await ObjStorage.get(STORAGE.LANGUAGE);
    return item;
  },
};

export const FilterDate = {
  setTodayDate: function () {
    const startDateUTC = moment(new Date()).utc().local().format();
    const endDateUTC = moment(new Date()).utc().local().format();
    const start = moment(new Date()).format('DD MMM YYYY');
    const end = moment(new Date()).format('DD MMM YYYY');
    const objData = {
      startDateUTC: startDateUTC,
      endDateUTC: endDateUTC,
      startDate: start,
      endDate: end,
    };
    return objData;
  },
  setYesterdayDate: function () {
    const startDateUTC = moment(new Date())
      .add(-1, 'days')
      .utc()
      .local()
      .format();
    const endDateUTC = moment(new Date())
      .add(-1, 'days')
      .utc()
      .local()
      .format();
    const start = moment(new Date()).add(-1, 'days').format('DD MMM YYYY');
    const end = moment(new Date()).add(-1, 'days').format('DD MMM YYYY');
    const objData = {
      startDateUTC: startDateUTC,
      endDateUTC: endDateUTC,
      startDate: start,
      endDate: end,
    };
    return objData;
  },
  setLastSevenDate: function () {
    const start = moment(new Date()).add(-7, 'days').format('DD MMM YYYY');
    const end = moment(new Date()).format('DD MMM YYYY');
    const objData = {
      startDate: start,
      endDate: end,
    };
    return objData;
  },
  setLast30Day: function () {
    const start = moment(new Date()).add(-30, 'days');
    const end = moment(new Date());
    const objData = {
      startDate: start,
      endDate: end,
    };
    return objData;
  },
  setLastThirdThreeDate: function () {
    const startDateUTC = moment(new Date())
      .add(-30, 'days')
      .utc()
      .local()
      .format();
    const endDateUTC = moment(new Date()).utc().local().format();
    const start = moment(new Date()).add(-30, 'days').format('DD MMM YYYY');
    const end = moment(new Date()).format('DD MMM YYYY');
    const objData = {
      startDateUTC: startDateUTC,
      endDateUTC: endDateUTC,
      startDate: start,
      endDate: end,
    };
    return objData;
  },
  setThisMonthDate: function () {
    const start = moment().startOf('month');
    const end = moment().endOf('month');
    const objData = {
      startDate: start,
      endDate: end,
    };
    return objData;
  },
  setLastMonthDate: function () {
    const last = moment().subtract(1, 'months').startOf('month');
    const lastEnd = moment(last).endOf('month');

    const startDateUTC = last.utc().local().format();
    const endDateUTC = lastEnd.utc().local().format();

    const start = last.format('DD MMM YYYY');
    const end = lastEnd.format('DD MMM YYYY');

    const objData = {
      startDateUTC: startDateUTC,
      endDateUTC: endDateUTC,
      startDate: start,
      endDate: end,
    };
    return objData;
  },
  setCustomRangeDate: function (pstart, pend) {
    const startDateUTC = moment(pstart).utc().local().format();
    const endDateUTC = moment(pend).utc().local().format();

    const start = moment(pstart).format('DD MMM YYYY');
    const end = moment(pend).format('DD MMM YYYY');
    const objData = {
      startDateUTC: startDateUTC,
      endDateUTC: endDateUTC,
      startDate: start,
      endDate: end,
    };
    return objData;
  },
};
