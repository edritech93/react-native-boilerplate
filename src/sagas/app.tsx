import {Alert} from 'react-native';
import {put, takeEvery} from 'redux-saga/effects';
import {initReLoginRequest} from '../actions/auth';
import {strings} from '../constants/localize';
import {ALERT} from '../actions/types';

export function* handleShowAlert(action: any) {
  const {args} = action;
  if (args) {
    const {title = strings.APP_NAME, message, status} = args;
    if (message && status !== 401) {
      const dataMessage =
        typeof message === 'object' ? JSON.stringify(message) : message;
      setTimeout(() => {
        Alert.alert(title, dataMessage, [
          {
            text: 'OK',
            onPress: () => {},
          },
        ]);
      }, 500);
    } else if (status === 401) {
      yield put(initReLoginRequest(false));
    }
  }
}

export function* watchAlertShow() {
  yield takeEvery(ALERT.SHOW, handleShowAlert);
}
