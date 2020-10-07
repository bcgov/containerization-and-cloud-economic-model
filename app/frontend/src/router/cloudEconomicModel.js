/**
 * Cloud Economic Model Routes
 */
import { FormNames } from '@/utils/constants';

const baseName = 'CloudEconomicModel';
const baseTitle = 'Cloud Economic Model';

export default [
  {
    path: `/${FormNames.CLOUDECONOMICMODEL}`,
    component: () => import(/* webpackChunkName: "cloudeconomicmodel" */ '@/views/CloudEconomicModel.vue'),
    children: [
      {
        path: '',
        name: `${baseName}Form`,
        component: () => import(/* webpackChunkName: "cloudeconomicmodel-form" */ '@/views/cloudeconomicmodel/Root.vue'),
        meta: {
          title: baseTitle
        }
      },
    ]
  },
  {
    path: '/',
    redirect: { name: 'Home' }
  },
  {
    path: '/404',
    alias: '*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "not-found" */ '@/views/NotFound.vue')
  }
];
