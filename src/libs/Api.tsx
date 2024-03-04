import axios, {
  AxiosBasicCredentials,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';
import {ShowAlertType} from '../types/ShowAlertType';
import {strings} from '../constants/localize';
import {CACHE_TIME} from '../constants';
import {Helper} from './Helper';
import ENV from 'react-native-config';

type ApiRequest = {
  baseUrl?: string;
  url: string;
  method: Method;
  timeout?: number;
  data?: {};
  params?: {};
  force?: boolean;
  contentType?: 'form-data';
  auth?: AxiosBasicCredentials;
  cacheTime?: CACHE_TIME;
};

export class Api {
  async _request(request: ApiRequest) {
    let options: AxiosRequestConfig = {
      url: request.url,
      method: request?.method ?? 'GET',
      baseURL: __DEV__ ? ENV.BASE_URL_DEV : ENV.BASE_URL_LIVE,
      timeout: request.timeout === 0 ? request.timeout : 1000 * 90, // default is `0` (no timeout)
    };
    let optHeader = {};
    const token = await Helper.getToken();
    if (token) {
      optHeader = {Authorization: `Bearer ${token}`};
    }
    if (request.contentType && request.contentType === 'form-data') {
      optHeader = {
        ...optHeader,
        'Content-Type': 'multipart/form-data',
      };
    }
    options.headers = optHeader;
    if (request.auth) {
      options.auth = request.auth;
    }
    if (request.params) {
      options.params = request.params;
    }
    if (request.data) {
      options.data = request.data;
    }
    if (__DEV__) {
      console.log(
        `${Helper.nowTime()} REQUEST => `,
        `${options.baseURL}${options.url}`,
      );
    }
    return axios.request(options);
  }

  singleRequest(request: any): Promise<any> {
    return new Promise(function (resolve, reject) {
      request
        .then((response: AxiosResponse) => {
          if (__DEV__) {
            // console.log(`${Helper.getTimeNow()} RESPONSE => `, response);
          }
          resolve(response);
        })
        .catch((error: AxiosError) => reject(getError(error)));
    });
  }

  multipleRequest(requests: Promise<any>[]): any {
    return new Promise(function (resolve, reject) {
      axios
        .all(requests)
        .then((response: AxiosResponse[]) => {
          if (__DEV__) {
            // console.log(`${Helper.getTimeNow()} RESPONSE => `, response);
          }
          resolve(response);
        })
        .catch((error: AxiosError) => reject(getError(error)));
    });
  }

  async getVersionCheck(_: any) {
    return this._request({
      url: '/posts',
      method: 'POST',
    });
  }

  async login(_: any) {
    return this._request({
      url: '/posts',
      method: 'POST',
    });
  }

  async getProfile() {
    return this._request({
      url: '/posts/1',
      method: 'GET',
    });
  }

  async deviceAdd(args: any) {
    return this._request({
      url: '/posts',
      method: 'POST',
      data: args,
    });
  }

  async deviceDelete(args: any) {
    return this._request({
      url: '/posts',
      method: 'POST',
      data: args,
    });
  }
}

function getError(error: any): ShowAlertType {
  if (__DEV__) {
    console.log(`${Helper.nowTime()} ERROR => `, error?.response ?? error);
  }
  const status = error?.response?.status ?? null;
  const data = error?.response?.data ?? null;
  let message = null;
  if (data) {
    message = data.message || data.Message || data.error;
  } else if (status === 401) {
    message = '401';
  } else if (status === 404) {
    message = strings.MSG_404;
  } else if (status >= 500 || !message) {
    message = strings.MSG_ERROR_API;
  }
  return {
    message: message,
    status: status,
    data: data,
  };
}

const API = new Api();

export {API};
