import {Platform} from 'react-native';
import {put, call, takeEvery} from 'redux-saga/effects';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {ShowAlertType} from '../types/ShowAlertType';
import {VersionType} from '../types/VersionType';
import {ProfileType} from '../types/ProfileType';
import {profileChange} from '../actions/auth';
import {SPLASH} from '../actions/types';
import {Helper} from '../libs/Helper';
import {AxiosResponse} from 'axios';
import {API} from '../libs/Api';
import NavigationService from '../libs/NavigationService';
import DeviceInfo from 'react-native-device-info';

const packageName = DeviceInfo.getBundleId();
const appVersion = DeviceInfo.getVersion();

const getVersionCheckRequest = async (): Promise<any> => {
  const body = {
    package: packageName,
    version: `${appVersion}.0`,
    platform: Platform.OS,
  };
  return API.singleRequest(API.getVersionCheck(body))
    .then((response: AxiosResponse) => response.data)
    .catch((_: ShowAlertType) => {
      return {latestVersion: '0.0.0.0', requireForceUpdate: false};
    });
};

const getTokenAuth = async (): Promise<any> => {
  const token = await Helper.getToken();
  return token;
};

const getMessaging = async (): Promise<any> => {
  return messaging()
    .getInitialNotification()
    .then((message: FirebaseMessagingTypes.RemoteMessage | null) => message)
    .catch(() => null);
};
const getNewTokenAuth = async (): Promise<any> => {
  const token = await Helper.getRefreshToken();
  const body = new FormData();
  body.append('grant_type', 'refresh_token');
  body.append('refresh_token', token);
  return API.singleRequest(API.login(body))
    .then((response: AxiosResponse) => response.data)
    .catch((error: ShowAlertType) => {
      throw error;
    });
};

const getProfileSplash = async (): Promise<any> => {
  return API.singleRequest(API.getProfile())
    .then((response: AxiosResponse) => response.data)
    .catch((_: ShowAlertType) => null);
};

function* handleSplash(_: any): any {
  try {
    const version: VersionType = yield call(getVersionCheckRequest);
    if (version?.requireForceUpdate) {
      NavigationService.resetRoot('ForceUpdate');
    } else {
      const token: string = yield call(getTokenAuth);
      if (token) {
        const oldProfile: ProfileType | null = yield call(getProfileSplash);
        if (oldProfile) {
          yield put(profileChange(oldProfile));
        } else {
          const newToken = yield call(getNewTokenAuth);
          Helper.setToken(newToken.access_token);
          Helper.setRefreshToken(newToken.refresh_token);
          const newProfile: ProfileType = yield call(getProfileSplash);
          yield put(profileChange(newProfile));
        }
        const message: FirebaseMessagingTypes.RemoteMessage | null = yield call(
          getMessaging,
        );
        if (message?.data?.custom_notification) {
          const {Id, Screen, isApprover} = JSON.parse(
            message.data.custom_notification,
          );
          NavigationService.resetRoot('Dashboard');
          NavigationService.navigate(Screen, {
            Id: Id,
            isApprover: isApprover,
          });
        } else {
          NavigationService.resetRoot('Dashboard');
        }
      } else {
        NavigationService.resetRoot('Login');
      }
    }
    yield put({type: SPLASH.SUCCESS});
  } catch (error) {
    yield put({type: SPLASH.FAILURE, error});
    NavigationService.resetRoot('Login');
  }
}

export function* watchSplash() {
  yield takeEvery(SPLASH.REQUEST, handleSplash);
}
