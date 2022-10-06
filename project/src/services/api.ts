import axios, { AxiosError, AxiosInstance } from 'axios';
import { BACKEND_URL, REQUEST_TIMEOUT } from '../const';
import { store } from '../store';
import { formMessage, toggleMessage } from '../store/ui-process/ui-process';


export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response) {
        store.dispatch(formMessage({
          status: 'error',
          title: 'Error!',
          message: error.message
        }));
        store.dispatch(toggleMessage());
      }

      throw error;
    }
  );

  return api;
};
