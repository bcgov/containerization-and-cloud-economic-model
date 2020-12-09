import axios from 'axios';
import Vue from 'vue';

/**
 * @function appAxios
 * Returns an Axios instance with auth header and preconfiguration
 * @param {integer} [timeout=10000] Number of milliseconds before timing out the request
 * @returns {object} An axios instance
 */
export function appAxios(timeout = 10000) {
  const axiosOptions = { timeout: timeout };
  if (Vue.prototype.$config) {
    const config = Vue.prototype.$config;
    axiosOptions.baseURL = `${config.basePath}/${config.apiPath}`;
  }

  const instance = axios.create(axiosOptions);

  instance.interceptors.request.use(cfg => {
    return Promise.resolve(cfg);
  }, error => {
    return Promise.reject(error);
  });

  return instance;
}
