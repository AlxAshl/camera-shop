import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { BACKEND_URL, REQUEST_TIMEOUT } from '../const';
import { store } from '../store/store';
import { errorMessageCompiler, messageToggler } from '../store/utils-process/utils-process';


export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response) {
        store.dispatch(errorMessageCompiler({
          status: 'error',
          title: 'Error!',
          message: error.message
        }));
        store.dispatch(messageToggler());
      }
      throw error;
    }
  );

  return api;
};
