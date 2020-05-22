import NProgress from 'nprogress';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

let isFirstTransition = true;

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
      {
        path: '/',
        redirect: { name: 'Home' }
      },
      {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
        meta: {
          hasLogin: true
        }
      },
      {
        path: '/minesoperatorscreening',
        component: () => import(/* webpackChunkName: "minesoperatorscreening" */ '@/views/MinesOperatorScreening.vue'),
        children: [
          {
            path: '',
            name: 'MinesOperatorScreeningForm',
            component: () => import(/* webpackChunkName: "minesoperatorscreening-form" */ '@/views/minesoperatorscreening/Root.vue'),
            meta: {
              title: 'Industrial Camps'
            }
          },
          {
            path: 'admin',
            name: 'MinesOperatorScreeningAdmin',
            component: () => import(/* webpackChunkName: "minesoperatorscreening-admin" */ '@/views/minesoperatorscreening/Admin.vue'),
            meta: {
              hasLogin: true,
              requiresAuth: true,
              title: 'Industrial Camps Admin'
            }
          },
          {
            path: 'admin/dashboard',
            name: 'MinesOperatorScreeningDashboards',
            component: () => import(/* webpackChunkName: "minesoperatorscreening-dashboard" */ '@/views/minesoperatorscreening/Dashboards.vue'),
            meta: {
              hasLogin: true,
              requiresAuth: true,
              title: 'Industrial Camps Admin'
            }
          },
          {
            path: 'review/:submissionId',
            name: 'MinesOperatorScreeningReview',
            component: () => import(/* webpackChunkName: "minesoperatorscreening-review" */ '@/views/minesoperatorscreening/Review.vue'),
            props: true,
            meta: {
              title: 'Industrial Camps Submission Review'
            }
          },
          {
            path: 'admin/settings',
            name: 'MinesOperatorScreeningSettings',
            component: () => import(/* webpackChunkName: "minesoperatorscreening-settings" */ '@/views/minesoperatorscreening/Settings.vue'),
            meta: {
              hasLogin: true,
              requiresAuth: true,
              title: 'Industrial Camps Settings'
            }
          },
          {
            path: 'admin/submission/:submissionId',
            name: 'MinesOperatorScreeningSubmission',
            component: () => import(/* webpackChunkName: "minesoperatorscreening-submission" */ '@/views/minesoperatorscreening/Submission.vue'),
            props: true,
            meta: {
              hasLogin: true,
              requiresAuth: true,
              title: 'Industrial Camps Submission'
            }
          }
        ]
      },
      {
        path: '/404',
        alias: '*',
        name: 'NotFound',
        component: () => import(/* webpackChunkName: "not-found" */ '@/views/NotFound.vue'),
        meta: {
          hasLogin: true
        }
      }
    ]
  });

  router.beforeEach((to, _from, next) => {
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
      document.title = to.meta.title ? to.meta.title : process.env.VUE_APP_TITLE;
      if (to.query.r && isFirstTransition) {
        router.replace({ path: to.query.r.replace(basePath, '') });
      }
      next();
    }
  });

  router.afterEach(() => {
    isFirstTransition = false;
    NProgress.done();
  });

  return router;
}
