/**
 * Mines Operator Screening Form Routes
 */
export default [
  {
    path: '/minesoperatorscreening',
    component: () => import(/* webpackChunkName: "minesoperatorscreening" */ '@/views/MinesOperatorScreening.vue'),
    children: [
      {
        path: '',
        name: 'MinesOperatorScreeningForm',
        component: () => import(/* webpackChunkName: "minesoperatorscreening-form" */ '@/views/minesoperatorscreening/Root.vue'),
        meta: {
          title: 'Industrial Camps'
        }
      },
      {
        path: 'admin',
        name: 'MinesOperatorScreeningAdmin',
        component: () => import(/* webpackChunkName: "minesoperatorscreening-admin" */ '@/views/minesoperatorscreening/Admin.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: 'Industrial Camps Admin'
        }
      },
      {
        path: 'admin/dashboard',
        name: 'MinesOperatorScreeningDashboards',
        component: () => import(/* webpackChunkName: "minesoperatorscreening-dashboard" */ '@/views/minesoperatorscreening/Dashboards.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: 'Industrial Camps Admin'
        }
      },
      {
        path: 'admin/settings',
        name: 'MinesOperatorScreeningSettings',
        component: () => import(/* webpackChunkName: "minesoperatorscreening-settings" */ '@/views/minesoperatorscreening/Settings.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: 'Industrial Camps Settings'
        }
      },
      {
        path: 'admin/submission/:submissionId',
        name: 'MinesOperatorScreeningSubmission',
        component: () => import(/* webpackChunkName: "minesoperatorscreening-submission" */ '@/views/minesoperatorscreening/Submission.vue'),
        props: true,
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: 'Industrial Camps Submission'
        }
      },
      {
        path: 'admin/team',
        name: 'MinesOperatorScreeningTeam',
        component: () => import(/* webpackChunkName: "minesoperatorscreening-team" */ '@/views/minesoperatorscreening/Team.vue'),
        meta: {
          hasLogin: true,
          requiresAuth: true,
          title: 'Industrial Camps Team Management'
        }
      },
      {
        path: 'review/:submissionId',
        name: 'MinesOperatorScreeningReview',
        component: () => import(/* webpackChunkName: "minesoperatorscreening-review" */ '@/views/minesoperatorscreening/Review.vue'),
        props: true,
        meta: {
          title: 'Industrial Camps Submission Review'
        }
      },
    ]
  }
];
