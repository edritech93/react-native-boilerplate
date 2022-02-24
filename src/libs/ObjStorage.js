import AsyncStorage from '@react-native-async-storage/async-storage';

const ObjStorage = {
  set: (key, value) => {
    return new Promise(function (resolve, reject) {
      AsyncStorage.setItem(key, JSON.stringify(value))
        .then(() => resolve())
        .catch(() => reject());
    });
  },

  get: key => {
    return new Promise(function (resolve, reject) {
      AsyncStorage.getItem(key)
        .then(data => resolve(JSON.parse(data)))
        .catch(() => reject());
    });
  },

  remove: async key => {
    return await AsyncStorage.removeItem(key);
  },

  multiRemove: async keys => {
    return await AsyncStorage.multiRemove(keys);
  },
};

export default ObjStorage;
