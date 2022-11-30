'use strict';
import {Record} from 'immutable';
import {
  CONNECTION_STATUS,
  THEME_APP_ID,
  LANGUAGE_APP_ID,
} from '../actions/types';
import {LANGUAGE_ID} from '../constants/localize';
import {THEME_ID} from '../themes/theme_app';

const objectRecord = new Record({
  isConnected: true,
  themeAppId: THEME_ID.SYSTEM,
  languageAppId: LANGUAGE_ID.ENGLISH,
});
const initialState = new objectRecord();

export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case CONNECTION_STATUS.CHANGE:
      return state.set('isConnected', action.args);

    case THEME_APP_ID.CHANGE:
      return state.set('themeAppId', action.args);

    case LANGUAGE_APP_ID.CHANGE:
      return state.set('languageAppId', action.args);

    default:
      return state;
  }
}
