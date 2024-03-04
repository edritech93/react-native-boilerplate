import {persistReducer} from 'redux-persist';
import {NOTIFICATION} from '../actions/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type InitialStateType = {
  badge: number;
};

const initialState: InitialStateType = {
  badge: 0,
};

function notification(
  state: InitialStateType = initialState,
  action: any = {},
): InitialStateType {
  switch (action.type) {
    case NOTIFICATION.REQUEST:
    case NOTIFICATION.FAILURE:
      return {...state, badge: 0};

    case NOTIFICATION.SUCCESS:
      return {...state, badge: action.payload};

    default:
      return state;
  }
}

const authPersistConfig = {
  key: 'notification',
  storage: AsyncStorage,
  blacklist: ['badge'],
};

export default persistReducer(authPersistConfig, notification);
