import {PROFILE} from './types';

export const profileRequest = args => {
  return {type: PROFILE.REQUEST, args};
};

export const profileChange = args => {
  return {type: PROFILE.CHANGE, args};
};
