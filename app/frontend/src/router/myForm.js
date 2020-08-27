/**
 * Mines Operator Screening Form Routes
 */
import { FormNames } from '@/utils/constants';

const baseName = 'MyForm';
const baseTitle = 'My Sample Form';

export default [
  {
    path: `/${FormNames.MYFORM}`,
    component: () => import(/* webpackChunkName: "myform" */ '@/views/MyForm.vue'),
    children: [
      {
        path: '',
        name: `${baseName}Form`,
        component: () => import(/* webpackChunkName: "myform-form" */ '@/views/myform/Root.vue'),
        meta: {
          title: baseTitle
        }
      },
      {
        path: 'admin',
        name: `${baseName}Admin`,
        component: () => import(/* webpackChunkName: "myform-admin" */ '@/views/myform/Admin.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: `${baseTitle} Admin`
        }
      },
      {
        path: 'admin/dashboard',
        name: `${baseName}Dashboards`,
        component: () => import(/* webpackChunkName: "minesoperatorscreening-dashboard" */ '@/views/myform/Dashboards.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: `${baseTitle} Admin`
        }
      },
      {
        path: 'admin/settings',
        name: `${baseName}Settings`,
        component: () => import(/* webpackChunkName: "minesoperatorscreening-settings" */ '@/views/myform/Settings.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: `${baseTitle} Settings`
        }
      },
      {
        path: 'admin/submission/:submissionId',
        name: `${baseName}Submission`,
        component: () => import(/* webpackChunkName: "minesoperatorscreening-submission" */ '@/views/myform/Submission.vue'),
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
        component: () => import(/* webpackChunkName: "minesoperatorscreening-team" */ '@/views/myform/Team.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: `${baseTitle} Team Management`
        }
      },
      {
        path: 'review/:submissionId',
        name: `${baseName}Review`,
        component: () => import(/* webpackChunkName: "minesoperatorscreening-review" */ '@/views/myform/Review.vue'),
        props: true,
        meta: {
          title: `${baseTitle} Submission Review`
        }
      },
    ]
  }
];
