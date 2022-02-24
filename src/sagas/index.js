import {fork} from 'redux-saga/effects';
import {watchAlertShow} from './app';

export default function* rootSaga() {
  yield [yield fork(watchAlertShow)];
}
