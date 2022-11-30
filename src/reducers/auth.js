import {Record} from 'immutable';
import {PROFILE} from '../actions/types';

const objectRecord = new Record({
  profile: null,
});
const initialState = new objectRecord();

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case PROFILE.REQUEST:
    case PROFILE.FAILURE:
      return state.set('profile', null);

    case PROFILE.SUCCESS:
      return state.set('profile', action.payload);

    case PROFILE.CHANGE:
      return state.set('profile', action.args);

    default:
      return state;
  }
}
