/**
 * Forestry Sector Operator Screening Form Routes
 */
export default [
  {
    path: '/forestrysectoropscreening',
    component: () => import(/* webpackChunkName: "forestrysectoropscreening" */ '@/views/ForestrySectorOpScreening.vue'),
    children: [
      {
        path: '',
        name: 'ForestrySectorOpScreeningForm',
        component: () => import(/* webpackChunkName: "forestrysectoropscreening-form" */ '@/views/forestrysectoropscreening/Root.vue'),
        meta: {
          title: 'Forestry Sector Operator Screening'
        }
      },
      {
        path: 'admin',
        name: 'ForestrySectorOpScreeningAdmin',
        component: () => import(/* webpackChunkName: "forestrysectoropscreening-admin" */ '@/views/forestrysectoropscreening/Admin.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: 'Forestry Sector Admin'
        }
      },
      {
        path: 'admin/dashboard',
        name: 'ForestrySectorOpScreeningDashboards',
        component: () => import(/* webpackChunkName: "forestrysectoropscreening-dashboard" */ '@/views/forestrysectoropscreening/Dashboards.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: 'Forestry Sector Admin'
        }
      },
      {
        path: 'admin/settings',
        name: 'ForestrySectorOpScreeningSettings',
        component: () => import(/* webpackChunkName: "forestrysectoropscreening-settings" */ '@/views/forestrysectoropscreening/Settings.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: 'Forestry Sector Settings'
        }
      },
      {
        path: 'admin/submission/:submissionId',
        name: 'ForestrySectorOpScreeningSubmission',
        component: () => import(/* webpackChunkName: "forestrysectoropscreening-submission" */ '@/views/forestrysectoropscreening/Submission.vue'),
        props: true,
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: 'Forestry Sector Submission'
        }
      },
      {
        path: 'admin/team',
        name: 'ForestrySectorOpScreeningTeam',
        component: () => import(/* webpackChunkName: "forestrysectoropscreening-team" */ '@/views/forestrysectoropscreening/Team.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: 'Forestry Sector Team Management'
        }
      },
      {
        path: 'review/:submissionId',
        name: 'ForestrySectorOpScreeningReview',
        component: () => import(/* webpackChunkName: "forestrysectoropscreening-review" */ '@/views/forestrysectoropscreening/Review.vue'),
        props: true,
        meta: {
          title: 'Forestry Sector Submission Review'
        }
      },
    ]
  }
];
