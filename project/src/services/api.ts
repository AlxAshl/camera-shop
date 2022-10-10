import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { APIRoute, BACKEND_URL, PAGE_LIMIT, REQUEST_TIMEOUT } from '../const';
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
  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      if(config.url === `${APIRoute.Products}`) {
        const state = store.getState();
        config.params = {
          '_limit': PAGE_LIMIT,
          '_page': state.PRODUCT.currentPage
        };
      }
      return config;
    }
  );
  return api;
};
