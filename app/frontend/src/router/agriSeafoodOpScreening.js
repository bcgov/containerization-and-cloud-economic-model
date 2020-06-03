/**
 * Agriculture and Seafood Operator Screening Form Routes
 */
import { FormNames } from '@/utils/constants';

const baseName = 'AgriSeafoodOpScreening';
const baseTitle = 'Agriculture and Seafood Operator Screening';

export default [
  {
    path: `/${FormNames.AGRISEAFOODOPSCREENING}`,
    component: () => import(/* webpackChunkName: "agriseafoodopscreening" */ '@/views/AgriSeafoodOpScreening.vue'),
    children: [
      {
        path: '',
        name: `${baseName}Form`,
        component: () => import(/* webpackChunkName: "agriseafoodopscreening-form" */ '@/views/agriseafoodopscreening/Root.vue'),
        meta: {
          title: baseTitle
        }
      },
      {
        path: 'admin',
        name: `${baseName}Admin`,
        component: () => import(/* webpackChunkName: "agriseafoodopscreening-admin" */ '@/views/agriseafoodopscreening/Admin.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: `${baseTitle} Admin`
        }
      },
      {
        path: 'admin/dashboard',
        name: `${baseName}Dashboards`,
        component: () => import(/* webpackChunkName: "agriseafoodopscreening-dashboard" */ '@/views/agriseafoodopscreening/Dashboards.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: `${baseTitle} Admin`
        }
      },
      {
        path: 'admin/settings',
        name: `${baseName}Settings`,
        component: () => import(/* webpackChunkName: "agriseafoodopscreening-settings" */ '@/views/agriseafoodopscreening/Settings.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: `${baseTitle} Settings`
        }
      },
      {
        path: 'admin/submission/:submissionId',
        name: `${baseName}Submission`,
        component: () => import(/* webpackChunkName: "agriseafoodopscreening-submission" */ '@/views/agriseafoodopscreening/Submission.vue'),
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
        component: () => import(/* webpackChunkName: "agriseafoodopscreening-team" */ '@/views/agriseafoodopscreening/Team.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: `${baseTitle} Team Management`
        }
      },
      {
        path: 'review/:submissionId',
        name: `${baseName}Review`,
        component: () => import(/* webpackChunkName: "agriseafoodopscreening-review" */ '@/views/agriseafoodopscreening/Review.vue'),
        props: true,
        meta: {
          title: `${baseTitle} Submission Review`
        }
      },
    ]
  },
];
