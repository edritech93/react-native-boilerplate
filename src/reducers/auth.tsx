import {PROFILE, LOGIN} from '../actions/types';
import {ProfileType} from '../types/ProfileType';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

type InitialStateType = {
  profile: ProfileType | null;
  loadingAuth: boolean;
};

const initialState: InitialStateType = {
  profile: null,
  loadingAuth: false,
};

function auth(state: any = initialState, action: any = {}) {
  switch (action.type) {
    case PROFILE.SUCCESS:
      return {...state, profile: action.payload};

    case LOGIN.REQUEST:
      return {...state, loadingAuth: true};

    case LOGIN.SUCCESS:
    case LOGIN.FAILURE:
      return {...state, loadingAuth: false};

    default:
      return state;
  }
}

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  blacklist: ['loadingAuth'],
};

export default persistReducer(authPersistConfig, auth);
