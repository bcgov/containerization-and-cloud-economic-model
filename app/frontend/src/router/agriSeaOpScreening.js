/**
 * Agriculture and Seafood Operator Screening Form Routes
 */
export default [
  {
    path: '/agriseaopscreening',
    component: () => import(/* webpackChunkName: "agriseaopscreening" */ '@/views/AgriSeaOpScreening.vue'),
    children: [
      {
        path: '',
        name: 'AgriSeaOpScreeningForm',
        component: () => import(/* webpackChunkName: "agriseaopscreening-form" */ '@/views/agriseaopscreening/Root.vue'),
        meta: {
          title: 'Agriculture and Seafood Operator Screening'
        }
      }
    ]
  },
  {
    path: 'admin',
    name: 'AgriSeaOpScreeningAdmin',
    component: () => import(/* webpackChunkName: "agriseaopscreening-admin" */ '@/views/agriseaopscreening/Admin.vue'),
    meta: {
      hasLogin: true,
      requiresAuth: true,
      title: 'Agriculture and Seafood Admin'
    }
  },
  {
    path: 'admin/dashboard',
    name: 'AgriSeaOpScreeningDashboards',
    component: () => import(/* webpackChunkName: "agriseaopscreening-dashboard" */ '@/views/agriseaopscreening/Dashboards.vue'),
    meta: {
      hasLogin: true,
      requiresAuth: true,
      title: 'Agriculture and Seafood Admin'
    }
  },
  {
    path: 'admin/settings',
    name: 'AgriSeaOpScreeningSettings',
    component: () => import(/* webpackChunkName: "agriseaopscreening-settings" */ '@/views/agriseaopscreening/Settings.vue'),
    meta: {
      hasLogin: true,
      requiresAuth: true,
      title: 'Agriculture and Seafood Settings'
    }
  },
  {
    path: 'admin/submission/:submissionId',
    name: 'AgriSeaOpScreeningSubmission',
    component: () => import(/* webpackChunkName: "agriseaopscreening-submission" */ '@/views/agriseaopscreening/Submission.vue'),
    props: true,
    meta: {
      hasLogin: true,
      requiresAuth: true,
      title: 'Agriculture and Seafood Submission'
    }
  },
  {
    path: 'admin/team',
    name: 'AgriSeaOpScreeningTeam',
    component: () => import(/* webpackChunkName: "agriseaopscreening-team" */ '@/views/agriseaopscreening/Team.vue'),
    meta: {
      hasLogin: true,
      requiresAuth: true,
      title: 'Agriculture and Seafood Team Management'
    }
  },
  {
    path: 'review/:submissionId',
    name: 'AgriSeaOpScreeningReview',
    component: () => import(/* webpackChunkName: "agriseaopscreening-review" */ '@/views/agriseaopscreening/Review.vue'),
    props: true,
    meta: {
      title: 'Agriculture and Seafood Submission Review'
    }
  },
];
