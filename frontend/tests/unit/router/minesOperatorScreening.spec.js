import routes from '@/router/minesOperatorScreening';

const baseName = 'MinesOperatorScreening';
const baseTitle = 'Industrial Camps';

describe(`Routes > ${baseName}`, () => {
  it('has the correct number of routes', () => {
    expect(routes).toHaveLength(1);
    expect(routes[0].children).toHaveLength(7);
  });

  it('has the expected routes and metadata', () => {
    expect(routes[0].children).toContainEqual(expect.objectContaining({
      name: `${baseName}Form`,
      meta: {
        title: baseTitle
      }
    }));
    expect(routes[0].children).toContainEqual(expect.objectContaining({
      name: `${baseName}Admin`,
      meta: {
        hasLogin: true,
        requiresAuth: true,
        title: `${baseTitle} Admin`
      }
    }));
    expect(routes[0].children).toContainEqual(expect.objectContaining({
      name: `${baseName}Dashboards`,
      meta: {
        hasLogin: true,
        requiresAuth: true,
        title: `${baseTitle} Admin`
      }
    }));
    expect(routes[0].children).toContainEqual(expect.objectContaining({
      name: `${baseName}Settings`,
      meta: {
        hasLogin: true,
        requiresAuth: true,
        title: `${baseTitle} Settings`
      }
    }));
    expect(routes[0].children).toContainEqual(expect.objectContaining({
      name: `${baseName}Submission`,
      props: true,
      meta: {
        hasLogin: true,
        requiresAuth: true,
        title: `${baseTitle} Submission`
      }
    }));
    expect(routes[0].children).toContainEqual(expect.objectContaining({
      name: `${baseName}Team`,
      meta: {
        hasLogin: true,
        requiresAuth: true,
        title: `${baseTitle} Team Management`
      }
    }));
    expect(routes[0].children).toContainEqual(expect.objectContaining({
      name: `${baseName}Review`,
      props: true,
      meta: {
        title: `${baseTitle} Submission Review`
      }
    }));
  });

  it('can import all lazy-loaded components', () => {
    expect(routes[0].component()).toBeTruthy();
    expect(routes[0].children.map(c => c.component())).toBeTruthy();
  });
});
