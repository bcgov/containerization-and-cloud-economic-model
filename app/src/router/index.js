import NProgress from 'nprogress';
import Vue from 'vue';
import VueRouter from 'vue-router';

import cloudEconomicModel from './cloudEconomicModel';

Vue.use(VueRouter);

/**
 * Constructs and returns a Vue Router object
 * @param {string} [basePath='/'] the base server path
 * @returns {object} a Vue Router object
 */
export default function getRouter(basePath = '/') {
  const router = new VueRouter({
    base: basePath,
    mode: 'history',
    routes: [
      ...cloudEconomicModel
    ]
  });

  router.afterEach(() => {
    NProgress.done();
  });

  return router;
}
