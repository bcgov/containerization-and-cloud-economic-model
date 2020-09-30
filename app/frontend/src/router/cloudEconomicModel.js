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
      {
        path: 'admin',
        name: `${baseName}Admin`,
        component: () => import(/* webpackChunkName: "cloudeconomicmodel-admin" */ '@/views/cloudeconomicmodel/Admin.vue'),
        meta: {
          hasLogin: true,
          title: `${baseTitle} Admin`
        }
      },
      {
        path: 'admin/settings',
        name: `${baseName}Settings`,
        component: () => import(/* webpackChunkName: "cloudeconomicmodel-settings" */ '@/views/cloudeconomicmodel/Settings.vue'),
        meta: {
          title: `${baseTitle} Settings`
        }
      },
      {
        path: 'admin/submission/:submissionId',
        name: `${baseName}Submission`,
        component: () => import(/* webpackChunkName: "cloudeconomicmodel-submission" */ '@/views/cloudeconomicmodel/Submission.vue'),
        props: true,
        meta: {
          title: `${baseTitle} Submission`
        }
      },
      {
        path: 'review/:submissionId',
        name: `${baseName}Review`,
        component: () => import(/* webpackChunkName: "cloudeconomicmodel-review" */ '@/views/cloudeconomicmodel/Review.vue'),
        props: true,
        meta: {
          title: `${baseTitle} Submission Review`
        }
      },
    ]
  }
];
