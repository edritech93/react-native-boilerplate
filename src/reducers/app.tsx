import {CONNECTION, THEME_APP_ID, LANGUAGE_APP_ID} from '../actions/types';
import {LANGUAGE_ID} from '../constants/localize';
import {persistReducer} from 'redux-persist';
import {THEME_ID} from '../themes/ThemeApp';
import {Helper} from '../libs/Helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

type InitialStateType = {
  isConnected: boolean;
  themeAppId: number;
  languageAppId: string;
};

const initialState: InitialStateType = {
  isConnected: true,
  themeAppId: THEME_ID.SYSTEM,
  languageAppId: LANGUAGE_ID.ENGLISH,
};

function app(
  state: InitialStateType = initialState,
  action: any = {},
): InitialStateType {
  switch (action.type) {
    case CONNECTION.CHANGE:
      return {...state, isConnected: action.args};

    case LANGUAGE_APP_ID.CHANGE:
      Helper.setLanguage(action.args);
      return {...state, languageAppId: action.args};

    case THEME_APP_ID.CHANGE:
      return {...state, themeAppId: action.args};

    default:
      return state;
  }
}

const appPersistConfig = {
  key: 'app',
  storage: AsyncStorage,
  blacklist: ['isConnected'],
};

export default persistReducer(appPersistConfig, app);
