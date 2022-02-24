'use strict';
import {Record} from 'immutable';
import {CONNECTION_STATUS} from '../actions/types';

const objectRecord = new Record({
  isConnected: true,
});
const initialState = new objectRecord();

const app = (state = initialState, action) => {
  switch (action.type) {
    case CONNECTION_STATUS.CHANGE:
      return state.set('isConnected', action.args);

    default:
      return state;
  }
};

export default app;
