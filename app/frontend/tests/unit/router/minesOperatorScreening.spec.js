import routes from '@/router/minesOperatorScreening';

describe('Routes > MinesOperatorScreening ', () => {
  it('has the correct number of routes', () => {
    expect(routes).toHaveLength(1);
    expect(routes[0].children).toHaveLength(7);
  });

  it('has the expected routes and metadata', () => {
    expect(routes[0].children).toContainEqual(expect.objectContaining({
      name: 'MinesOperatorScreeningForm',
      meta: {
        title: 'Industrial Camps'
      }
    }));
    expect(routes[0].children).toContainEqual(expect.objectContaining({
      name: 'MinesOperatorScreeningAdmin',
      meta: {
        hasLogin: true,
        requiresAuth: true,
        title: 'Industrial Camps Admin'
      }
    }));
    expect(routes[0].children).toContainEqual(expect.objectContaining({
      name: 'MinesOperatorScreeningDashboards',
      meta: {
        hasLogin: true,
        requiresAuth: true,
        title: 'Industrial Camps Admin'
      }
    }));
    expect(routes[0].children).toContainEqual(expect.objectContaining({
      name: 'MinesOperatorScreeningSettings',
      meta: {
        hasLogin: true,
        requiresAuth: true,
        title: 'Industrial Camps Settings'
      }
    }));
    expect(routes[0].children).toContainEqual(expect.objectContaining({
      name: 'MinesOperatorScreeningSubmission',
      props: true,
      meta: {
        hasLogin: true,
        requiresAuth: true,
        title: 'Industrial Camps Submission'
      }
    }));
    expect(routes[0].children).toContainEqual(expect.objectContaining({
      name: 'MinesOperatorScreeningTeam',
      meta: {
        hasLogin: true,
        requiresAuth: true,
        title: 'Industrial Camps Team Management'
      }
    }));
    expect(routes[0].children).toContainEqual(expect.objectContaining({
      name: 'MinesOperatorScreeningReview',
      props: true,
      meta: {
        title: 'Industrial Camps Submission Review'
      }
    }));
  });
});
