import {persistReducer} from 'redux-persist';
import {SPLASH} from '../actions/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type InitialStateType = {
  loadingSlash: boolean;
};

const initialState: InitialStateType = {
  loadingSlash: false,
};

function splash(
  state: InitialStateType = initialState,
  action: any = {},
): InitialStateType {
  switch (action.type) {
    case SPLASH.REQUEST:
      return {...state, loadingSlash: true};

    case SPLASH.SUCCESS:
    case SPLASH.FAILURE:
      return {...state, loadingSlash: false};

    default:
      return state;
  }
}

const authPersistConfig = {
  key: 'splash',
  storage: AsyncStorage,
  blacklist: ['loadingAuth'],
};

export default persistReducer(authPersistConfig, splash);
