/**
 * Forestry Sector Operator Screening Form Routes
 */
import { FormNames } from '@/utils/constants';

const baseName = 'ForestrySectorOpScreening';
const baseTitle = 'Forestry Sector Operator Screening';

export default [
  {
    path: `/${FormNames.FORESTRYSECTOROPSCREENING}`,
    component: () => import(/* webpackChunkName: "forestrysectoropscreening" */ '@/views/ForestrySectorOpScreening.vue'),
    children: [
      {
        path: '',
        name: `${baseName}Form`,
        component: () => import(/* webpackChunkName: "forestrysectoropscreening-form" */ '@/views/forestrysectoropscreening/Root.vue'),
        meta: {
          title: baseTitle
        }
      },
      {
        path: 'admin',
        name: `${baseName}Admin`,
        component: () => import(/* webpackChunkName: "forestrysectoropscreening-admin" */ '@/views/forestrysectoropscreening/Admin.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: `${baseTitle} Admin`
        }
      },
      {
        path: 'admin/dashboard',
        name: `${baseName}Dashboards`,
        component: () => import(/* webpackChunkName: "forestrysectoropscreening-dashboard" */ '@/views/forestrysectoropscreening/Dashboards.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: `${baseTitle} Admin`
        }
      },
      {
        path: 'admin/settings',
        name: `${baseName}Settings`,
        component: () => import(/* webpackChunkName: "forestrysectoropscreening-settings" */ '@/views/forestrysectoropscreening/Settings.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: `${baseTitle} Settings`
        }
      },
      {
        path: 'admin/submission/:submissionId',
        name: `${baseName}Submission`,
        component: () => import(/* webpackChunkName: "forestrysectoropscreening-submission" */ '@/views/forestrysectoropscreening/Submission.vue'),
        props: true,
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: `${baseTitle} Submission`
        }
      },
      {
        path: 'admin/team',
        name: `${baseName}Team`,
        component: () => import(/* webpackChunkName: "forestrysectoropscreening-team" */ '@/views/forestrysectoropscreening/Team.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: `${baseTitle} Team Management`
        }
      },
      {
        path: 'review/:submissionId',
        name: `${baseName}Review`,
        component: () => import(/* webpackChunkName: "forestrysectoropscreening-review" */ '@/views/forestrysectoropscreening/Review.vue'),
        props: true,
        meta: {
          title: `${baseTitle} Submission Review`
        }
      },
    ]
  }
];
