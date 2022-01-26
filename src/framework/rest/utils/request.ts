import axios from 'axios';
import Cookies from 'js-cookie';
import { getToken } from './get-token';
import Router from 'next/router';
import { AUTH_TOKEN } from '@lib/constants';
const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT, // TODO: take this api URL from env
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Change request data/error here
request.interceptors.request.use(
  (config) => {
    const token = getToken();
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token ? token : ''}`,
    };
    return config;
  }
  // (error) => {
  //   return Promise.reject(error);
  // }
);
// Change response data/error here
request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response && error.response.status === 401) ||
      (error.response && error.response.status === 403) ||
      (error.response &&
        error.response.data.message === 'PICKBAZAR_ERROR.NOT_AUTHORIZED')
    ) {
      Cookies.remove(AUTH_TOKEN);
      Router.reload();
    }
    return Promise.reject(error);
  }
);
export default request;
