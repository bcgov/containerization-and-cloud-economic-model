/**
 * Agriculture and Seafood Operator Screening Form Routes
 */
export default [
  {
    path: '/agriseafoodopscreening',
    component: () => import(/* webpackChunkName: "agriseafoodopscreening" */ '@/views/AgriSeafoodOpScreening.vue'),
    children: [
      {
        path: '',
        name: 'AgriSeafoodOpScreeningForm',
        component: () => import(/* webpackChunkName: "agriseafoodopscreening-form" */ '@/views/agriseafoodopscreening/Root.vue'),
        meta: {
          title: 'Agriculture and Seafood Operator Screening'
        }
      },
      {
        path: 'admin',
        name: 'AgriSeafoodOpScreeningAdmin',
        component: () => import(/* webpackChunkName: "agriseafoodopscreening-admin" */ '@/views/agriseafoodopscreening/Admin.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: 'Agriculture and Seafood Admin'
        }
      },
      {
        path: 'admin/dashboard',
        name: 'AgriSeafoodOpScreeningDashboards',
        component: () => import(/* webpackChunkName: "agriseafoodopscreening-dashboard" */ '@/views/agriseafoodopscreening/Dashboards.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: 'Agriculture and Seafood Admin'
        }
      },
      {
        path: 'admin/settings',
        name: 'AgriSeafoodOpScreeningSettings',
        component: () => import(/* webpackChunkName: "agriseafoodopscreening-settings" */ '@/views/agriseafoodopscreening/Settings.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: 'Agriculture and Seafood Settings'
        }
      },
      {
        path: 'admin/submission/:submissionId',
        name: 'AgriSeafoodOpScreeningSubmission',
        component: () => import(/* webpackChunkName: "agriseafoodopscreening-submission" */ '@/views/agriseafoodopscreening/Submission.vue'),
        props: true,
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: 'Agriculture and Seafood Submission'
        }
      },
      {
        path: 'admin/team',
        name: 'AgriSeafoodOpScreeningTeam',
        component: () => import(/* webpackChunkName: "agriseafoodopscreening-team" */ '@/views/agriseafoodopscreening/Team.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: 'Agriculture and Seafood Team Management'
        }
      },
      {
        path: 'review/:submissionId',
        name: 'AgriSeafoodOpScreeningReview',
        component: () => import(/* webpackChunkName: "agriseafoodopscreening-review" */ '@/views/agriseafoodopscreening/Review.vue'),
        props: true,
        meta: {
          title: 'Agriculture and Seafood Submission Review'
        }
      },
    ]
  },
];
