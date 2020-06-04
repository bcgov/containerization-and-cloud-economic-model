/**
 * Mines Operator Screening Form Routes
 */
import { FormNames } from '@/utils/constants';

const baseName = 'MinesOperatorScreening';
const baseTitle = 'Industrial Camps';

export default [
  {
    path: `/${FormNames.MINESOPERATORSCREENING}`,
    component: () => import(/* webpackChunkName: "minesoperatorscreening" */ '@/views/MinesOperatorScreening.vue'),
    children: [
      {
        path: '',
        name: `${baseName}Form`,
        component: () => import(/* webpackChunkName: "minesoperatorscreening-form" */ '@/views/minesoperatorscreening/Root.vue'),
        meta: {
          title: baseTitle
        }
      },
      {
        path: 'admin',
        name: `${baseName}Admin`,
        component: () => import(/* webpackChunkName: "minesoperatorscreening-admin" */ '@/views/minesoperatorscreening/Admin.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: `${baseTitle} Admin`
        }
      },
      {
        path: 'admin/dashboard',
        name: `${baseName}Dashboards`,
        component: () => import(/* webpackChunkName: "minesoperatorscreening-dashboard" */ '@/views/minesoperatorscreening/Dashboards.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: `${baseTitle} Admin`
        }
      },
      {
        path: 'admin/settings',
        name: `${baseName}Settings`,
        component: () => import(/* webpackChunkName: "minesoperatorscreening-settings" */ '@/views/minesoperatorscreening/Settings.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: `${baseTitle} Settings`
        }
      },
      {
        path: 'admin/submission/:submissionId',
        name: `${baseName}Submission`,
        component: () => import(/* webpackChunkName: "minesoperatorscreening-submission" */ '@/views/minesoperatorscreening/Submission.vue'),
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
        component: () => import(/* webpackChunkName: "minesoperatorscreening-team" */ '@/views/minesoperatorscreening/Team.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: `${baseTitle} Team Management`
        }
      },
      {
        path: 'review/:submissionId',
        name: `${baseName}Review`,
        component: () => import(/* webpackChunkName: "minesoperatorscreening-review" */ '@/views/minesoperatorscreening/Review.vue'),
        props: true,
        meta: {
          title: `${baseTitle} Submission Review`
        }
      },
    ]
  }
];
