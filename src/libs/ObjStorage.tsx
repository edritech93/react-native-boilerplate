import AsyncStorage from '@react-native-async-storage/async-storage';

const ObjStorage = {
  set: (key: string, value: any): Promise<any> => {
    return new Promise(function (resolve, reject) {
      AsyncStorage.setItem(key, JSON.stringify(value))
        .then(() => resolve(true))
        .catch(() => reject());
    });
  },
  get: (key: string): Promise<any> => {
    return new Promise(function (resolve, reject) {
      AsyncStorage.getItem(key)
        .then((data: any) => resolve(JSON.parse(data)))
        .catch(() => reject());
    });
  },
  remove: async (key: string): Promise<any> => {
    return await AsyncStorage.removeItem(key);
  },
  multiRemove: async (keys: string[]): Promise<any> => {
    return await AsyncStorage.multiRemove(keys);
  },
};

export default ObjStorage;
