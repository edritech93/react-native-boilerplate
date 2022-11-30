import {takeEvery} from 'redux-saga/effects';
import {Alert} from 'react-native';
import {ALERT} from '../actions/types';
import {Helper} from '../libs/Helper';
import {API} from '../libs/api';
import NavigationService from '../libs/NavigationService';

export function* handleShowAlert(action) {
  const {args} = action;
  if (args) {
    const {title = 'Boilerplate', message, errorCode} = args;
    if (message && errorCode !== 401) {
      const dataMessage =
        typeof message === 'object' ? JSON.stringify(message) : message;
      setTimeout(() => {
        Alert.alert(title, dataMessage, [
          {
            text: 'Ok',
            onPress: () => {},
          },
        ]);
      }, 500);
    } else {
      if (errorCode === 401) {
        _refreshToken();
      }
    }
  }
}

let countRefresh = 0;

async function _refreshToken() {
  const token = await Helper.getRefreshToken();
  if (token && countRefresh < 3) {
    const body = new FormData();
    body.append('grant_type', 'refresh_token');
    body.append('refresh_token', token);
    API.singleRequest(API.login(body))
      .then(response => {
        const dataLogin = response.data;
        Helper.setToken(dataLogin.access_token);
        Helper.setRefreshToken(dataLogin.refresh_token);
        NavigationService.resetRoot('Splash');
        countRefresh++;
      })
      .catch(() => {
        NavigationService.resetRoot('Login');
      });
  } else {
    countRefresh = 0;
    NavigationService.resetRoot('Login');
  }
}

export function* watchAlertShow() {
  yield takeEvery(ALERT.ADD, handleShowAlert);
}
