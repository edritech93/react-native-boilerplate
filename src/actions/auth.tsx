import {ProfileType} from '../types/ProfileType';
import {LOGIN, INIT_RE_LOGIN, PROFILE} from './types';

export const loginRequest = (args: any) => {
  return {type: LOGIN.REQUEST, args};
};

export const initReLoginRequest = (args: boolean) => {
  return {type: INIT_RE_LOGIN.REQUEST, args};
};

export const profileChange = (args: ProfileType) => {
  return {type: PROFILE.CHANGE, args};
};
