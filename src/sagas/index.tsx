import {fork} from 'redux-saga/effects';
import {watchAlertShow} from './app';
import {
  watchInitReLogin,
  watchLogin,
  watchAddDevice,
  watchProfile,
} from './auth';
import {watchSplash} from './splash';

export default function* rootSaga(): any {
  yield [
    yield fork(watchAlertShow),
    yield fork(watchInitReLogin),
    yield fork(watchLogin),
    yield fork(watchAddDevice),
    yield fork(watchProfile),
    yield fork(watchSplash),
  ];
}
