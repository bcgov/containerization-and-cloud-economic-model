import NProgress from 'nprogress';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

/**
 * Constructs and returns a Vue Router object
 * @param {string} [basePath] the base server path
 * @returns {object} a Vue Router object
 */
export default function getRouter(basePath = '/') {
  const router = new VueRouter({
    base: basePath,
    mode: 'history',
    routes: [
      {
        path: '/',
        redirect: { name: 'Home' }
      },
      {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
        meta: {
          title: 'Home'
        }
      },
      {
        path: '/secure',
        name: 'Secure',
        component: () => import(/* webpackChunkName: "secure" */ '@/views/Secure.vue'),
        meta: {
          requiresAuth: true,
          title: 'Secure'
        }
      },
      {
        path: '/404',
        alias: '*',
        name: 'NotFound',
        component: () => import(/* webpackChunkName: "not-found" */ '@/views/NotFound.vue'),
        meta: {
          title: '404'
        }
      }
    ]
  });

  router.beforeEach((to, from, next) => {
    NProgress.start();
    if (to.matched.some(route => route.meta.requiresAuth)
      && router.app.$keycloak
      && router.app.$keycloak.ready
      && !router.app.$keycloak.authenticated) {
      const redirect = location.origin + basePath + to.path;
      const loginUrl = router.app.$keycloak.createLoginUrl({
        idpHint: 'idir',
        redirectUri: redirect
      });
      window.location.replace(loginUrl);
    } else {
      document.title = `${process.env.VUE_APP_TITLE} | ${to.meta.title}`;
      if (to.query.r) next({ path: to.query.r.replace(basePath, '') });
      else next();
    }
  });

  router.afterEach(() => {
    NProgress.done();
  });

  return router;
}
