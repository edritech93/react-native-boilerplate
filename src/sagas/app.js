import {takeEvery} from 'redux-saga/effects';
import {Alert} from 'react-native';
import {ALERT} from '../actions/types';
import {Helper} from '../libs/Helper';
import {API} from '../libs/api';
import NavigationService from '../libs/NavigationService';

export function* viewAlertShow(action) {
  try {
    const {args} = action;
    if (args.message && args.message != 401) {
      let dataMessage = args.message;
      if (typeof args.message === 'object') {
        dataMessage = JSON.stringify(args.message);
      }
      setTimeout(() => {
        Alert.alert('Boilerplate', dataMessage, [
          {
            text: 'OK',
            onPress: () => {},
          },
        ]);
      }, 500);
    } else if (args.message == 401) {
      _refreshToken();
    }
  } catch (error) {
    console.log('viewAlertShow => ', error);
  }
}

async function _refreshToken() {
  const refreshToken = await Helper.getRefreshToken();
  if (refreshToken) {
    let body = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    };

    API.singleRequest(API.login(body))
      .then(response => {
        const dataLogin = response.data;
        Helper.setToken(dataLogin.access_token);
        Helper.setRefreshToken(dataLogin.refresh_token);
        NavigationService.resetRoot('Dashboard');
      })
      .catch(error => {
        NavigationService.resetRoot('Login');
      });
  } else {
    NavigationService.resetRoot('Login');
  }
}

export function* watchAlertShow() {
  yield takeEvery(ALERT.SHOW, viewAlertShow);
}
