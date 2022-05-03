import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { BaseQueryFn } from '@reduxjs/toolkit/query';

import { getIdToken, getAuth } from 'firebase/auth';
import { firebaseApp } from './firebase.config';

export const API_URL = 'http://localhost:1148/api/v1';

//API ROUTES
export const API_ROUTES = {
  //GRADES
  GRADES: `/grades`,
  DOCUMENTS: `/documents`,
};

export const AXIOS = axios.create({
  baseURL: API_URL,
});

AXIOS.interceptors.request.use(async (config) => {
  const { currentUser } = getAuth(firebaseApp);
  if (currentUser) {
    const token = await getIdToken(currentUser, true);
    if (token) {
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      };
    }
  }
  return config;
});

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data }) => {
    try {
      const result = await AXIOS({
        url: url,
        method,
        data,
      });
      return result.data;
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };
