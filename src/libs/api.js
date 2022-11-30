'use strict';
import {BASE_URL, BASIC_AUTH} from '../constants';
import {Helper} from './Helper';
import axios from 'axios';

const CancelToken = axios.CancelToken;

const CONTENT_TYPE = {
  FORM_DATA: {'Content-Type': 'multipart/form-data'},
  URLENCODED: {'Content-Type': 'application/x-www-form-urlencoded'},
};

const SERVER = {
  API_CLIENT: 0,
  IDENTITY_CLIENT: 1,
  OTHER: 2,
};

export class Api {
  async _request(request, serverId = SERVER.API_CLIENT) {
    let baseUrl = BASE_URL.LIVE;
    switch (serverId) {
      case SERVER.API_CLIENT:
        baseUrl = __DEV__ ? `${BASE_URL.DEV}api/` : `${BASE_URL.LIVE}api/`;
        break;

      case SERVER.IDENTITY_CLIENT:
        baseUrl = __DEV__ ? BASE_URL.DEV : BASE_URL.LIVE;
        break;

      case SERVER.OTHER:
        baseUrl = request.baseUrl;
        break;

      default:
        break;
    }
    let options = {
      url: request.url,
      method: request?.method ?? 'get',
      baseURL: baseUrl,
      timeout: request.timeout === 0 ? request.timeout : 1000 * 90, // default is `0` (no timeout)
      cancelToken: new CancelToken(function (cancel) {}),
    };
    if (request.auth) {
      options.auth = request.auth;
    }
    let optHeader = {};
    const token = await Helper.getToken();
    if (token) {
      optHeader = {Authorization: `Bearer ${token}`};
    }
    if (request.contentType) {
      optHeader = {...optHeader, ...request.contentType};
    }
    options.headers = {...optHeader};
    if (request.params) {
      options.params = request.params;
    }
    if (request.data) {
      options.data = request.data;
    }
    const response = new axios.request(options);
    if (__DEV__) {
      console.log(`${Helper.nowTime()} REQUEST => `, options);
    }
    return response;
  }

  singleRequest(request) {
    return new Promise(function (resolve, reject) {
      request
        .then(response => {
          if (__DEV__) {
            console.log(`${Helper.nowTime()} RESPONSE => `, response);
          }
          resolve(response);
        })
        .catch(error => {
          const dataMessage = _handleError(error);
          reject(dataMessage);
        });
    });
  }

  multipleRequest(requests) {
    return new Promise(function (resolve, reject) {
      new axios.all(requests)
        .then(response => {
          if (__DEV__) {
            console.log(`${Helper.nowTime()} RESPONSE => `, response);
          }
          resolve(response);
        })
        .catch(error => {
          const dataMessage = _handleError(error);
          reject(dataMessage);
        });
    });
  }

  async getVersionCheck(args) {
    return this._request(
      {
        url: `/api/mobile-apps/${args.package}/${args.platform}/check-version`,
        method: 'post',
        data: args,
        baseUrl: 'https://license.cloudapp.id',
        forceFetch: true,
      },
      SERVER.OTHER,
    );
  }

  async login(args) {
    return this._request(
      {
        method: 'post',
        url: 'connect/token',
        data: args,
        contentType: CONTENT_TYPE.FORM_DATA,
        auth: BASIC_AUTH,
      },
      SERVER.IDENTITY_CLIENT,
    );
  }

  async register(args) {
    return this._request({
      method: 'post',
      url: 'v1/User/Register',
      data: args,
    });
  }

  async getProfile() {
    return this._request({
      method: 'get',
      url: 'v1/Me/Profile',
    });
  }

  async deviceAdd(args) {
    return this._request({
      method: 'post',
      url: 'v1/User/StoreToken',
      data: args,
    });
  }

  async deviceDelete(args) {
    return this._request({
      method: 'post',
      url: 'v1/User/ClearToken',
      data: args,
    });
  }
}

function _handleError(error) {
  if (__DEV__) {
    console.log(`${Helper.nowTime()} ERROR => `, error?.response ?? error);
  }
  const status = error?.response?.status ?? null;
  let message = null;
  if (error?.response?.data) {
    message =
      error.response.data.message ||
      error.response.data.Message ||
      error.response.data.error;
  }
  if (status === 401) {
    message = '401';
  }
  if (status === 404) {
    message = 'Server not found';
  }
  if (status >= 500 || !message) {
    message = 'Oops! Something went wrong.\nPlease try again in a few minutes.';
  }
  const dataMessage = {
    message: message,
    status: status,
    dataError: error?.response?.data ?? null,
  };
  return dataMessage;
}

const API = new Api();

export {API};
