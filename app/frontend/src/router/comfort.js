/**
 * Core Comfort Application Routes
 */
export default [
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
    path: '/404',
    alias: '*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "not-found" */ '@/views/NotFound.vue'),
    meta: {
      hasLogin: true
    }
  }
];
