import axios from 'axios';
import store from './store/index';

class APIError extends Error{
  constructor(response) {
    super();
    this.response = response;
  }
}

const $axios = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type' : 'application/json'
  }
});

$axios.interceptors.response.use(
  response => {
    if(response.data.success) {
      return Promise.resolve({
        data: response.data.data,
        body : response.data,
        request: response
      });
    } else throw new APIError(response);
  },
  error => {
    if(error.response && error.response.status && [401, 403].includes(error.response.status)){
      // logout
      store.dispatch('user/logout');
    }
    
    return Promise.reject(error);
  }
);

$axios.interceptors.request.use(config => {
  if(store.state.isLogin) {
    config.headers = {'x-access-token' : `Bearer ${store.state.isLogin}`};
  }
  return config;
});

export default $axios;
