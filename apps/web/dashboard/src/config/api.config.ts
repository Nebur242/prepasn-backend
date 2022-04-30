import axios from 'axios';
import { getIdToken, getAuth } from 'firebase/auth';
import { firebaseApp } from './firebase.config';
export const API_URL = 'http://localhost:1148/api/v1';

//API ROUTES
export const API_ROUTES = {
  //GRADES
  GRADES: `/grades`,
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
