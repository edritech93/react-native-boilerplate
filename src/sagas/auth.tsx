import {Platform} from 'react-native';
import {takeEvery, put, call, select} from 'redux-saga/effects';
import {
  ADD_DEVICE,
  INIT_RE_LOGIN,
  LOGIN,
  PROFILE,
  STORAGE,
} from '../actions/types';
import {ShowAlertType} from '../types/ShowAlertType';
import {showAlert} from '../actions/app';
import {Helper} from '../libs/Helper';
import {AxiosResponse} from 'axios';
import {API} from '../libs/Api';
import BackgroundFetch, {HeadlessEvent} from 'react-native-background-fetch';
import NavigationService from '../libs/NavigationService';
import ObjStorage from '../libs/ObjStorage';

// NOTE: Helper
const getStateApp = (state: any) => state.app;

// NOTE: Init Service Auth
const initServiceAuth = async () => {
  const objAuth = await ObjStorage.get(STORAGE.AUTH_SAVED).catch(() => null);
  let expiredInAuth = 55; // NOTE: 5 minutes before expired (if expired is 60 minutes)
  if (objAuth) {
    const expiredInMinutes = objAuth.expires_in / 60;
    expiredInAuth = expiredInMinutes - 5;
  }
  const status = await BackgroundFetch.configure(
    {minimumFetchInterval: expiredInAuth},
    onEvent,
    onTimeout,
  );
  switch (status) {
    case BackgroundFetch.STATUS_RESTRICTED:
      console.log('[BackgroundFetch Status Auth] restricted');
      break;
    case BackgroundFetch.STATUS_DENIED:
      console.log('[BackgroundFetch Status Auth] denied');
      break;
    case BackgroundFetch.STATUS_AVAILABLE:
      console.log('[BackgroundFetch Status Auth] is enabled');
      break;
  }
  // NOTE: Register your BackgroundFetch HeadlessTask
  BackgroundFetch.registerHeadlessTask(registerService);
};

function* handleInitReLogin(action: any) {
  try {
    const {args} = action;
    const {isConnected} = yield select(getStateApp);
    if (isConnected) {
      yield call(refreshAuthRequest);
      if (args) {
        yield call(initServiceAuth);
      }
    }
    yield put({type: INIT_RE_LOGIN.SUCCESS});
  } catch (error) {
    yield put({type: INIT_RE_LOGIN.FAILURE, error});
    NavigationService.resetRoot('Login');
  }
}

export function* watchInitReLogin() {
  yield takeEvery(INIT_RE_LOGIN.REQUEST, handleInitReLogin);
}

const registerService = async (event: HeadlessEvent) => {
  const {taskId} = event;
  console.log('[BackgroundFetch HeadlessTask] start: ', taskId);
  onEvent(event.taskId);
};

const onEvent = async (taskId: string) => {
  console.log('[BackgroundFetch] task: ', taskId);
  await refreshAuthRequest();
  BackgroundFetch.finish(taskId);
};

const onTimeout = async (taskId: string) => {
  console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
  BackgroundFetch.finish(taskId);
};

const refreshAuthRequest = async () => {
  return new Promise(async function (resolve, reject) {
    const token = await Helper.getRefreshToken();
    if (token) {
      const body = new FormData();
      body.append('grant_type', 'refresh_token');
      body.append('refresh_token', token);
      return API.singleRequest(API.login(body))
        .then((response: AxiosResponse) => {
          const objRes = response.data;
          Helper.setToken(objRes.access_token);
          Helper.setRefreshToken(objRes.refresh_token);
          resolve(objRes);
        })
        .catch((error: ShowAlertType) => reject(error));
    } else {
      reject(false);
    }
  });
};

// NOTE: Login
const submitLogin = async (body: any) => {
  return API.singleRequest(API.login(body))
    .then((response: any) => response.data)
    .catch((error: ShowAlertType) => {
      throw error;
    });
};

function* handleLogin(action: any): any {
  try {
    const {args} = action;
    const objRes = yield call(submitLogin, args);
    Helper.setToken(objRes.accessToken);
    Helper.setRefreshToken(objRes.refreshToken);
    yield put({type: LOGIN.SUCCESS, payload: objRes});
    yield call(profileRequest);
    const bodyDevice = yield call(getBodyDevice);
    yield call(submitDevice, bodyDevice);
    NavigationService.resetRoot('Dashboard');
  } catch (error: any) {
    yield put({type: LOGIN.FAILURE, error});
    yield put(showAlert(error));
  }
}

export function* watchLogin() {
  yield takeEvery(LOGIN.REQUEST, handleLogin);
}

// NOTE: add device token
const submitDevice = async (body: any) => {
  return API.singleRequest(API.deviceAdd(body))
    .then((response: any) => response.data)
    .catch((error: ShowAlertType) => {
      throw error;
    });
};

const getBodyDevice = async () => {
  const token = await Helper.getTokenFcm().catch(() => '');
  ObjStorage.set(STORAGE.DEVICE_TOKEN, token);
  return {
    token,
    deviceType: Platform.OS,
  };
};

function* handleAddDevice(action: any): any {
  try {
    const {args} = action;
    const objRes = yield call(submitDevice, args);
    yield put({type: ADD_DEVICE.SUCCESS, payload: objRes});
  } catch (error: any) {
    yield put({type: ADD_DEVICE.FAILURE, error});
    yield put(showAlert(error));
  }
}

export function* watchAddDevice() {
  yield takeEvery(ADD_DEVICE.REQUEST, handleAddDevice);
}

// NOTE: get profile
const profileRequest = async () => {
  return API.singleRequest(API.getProfile())
    .then((response: any) => response.data)
    .catch((error: ShowAlertType) => {
      throw error;
    });
};

function* handleProfile(): any {
  try {
    const objRes = yield call(profileRequest);
    yield put({type: PROFILE.SUCCESS, payload: objRes});
  } catch (error: any) {
    yield put({type: PROFILE.FAILURE, error});
    yield put(showAlert(error));
  }
}

export function* watchProfile() {
  yield takeEvery(PROFILE.REQUEST, handleProfile);
}
