import routes from '@/router/comfort';

describe('Routes > Comfort ', () => {
  it('has the correct number of routes', () => {
    expect(routes).toHaveLength(3);
  });

  it('has the expected routes and metadata', () => {
    expect(routes).toContainEqual(expect.objectContaining({
      name: 'Home',
      meta: {
        hasLogin: true
      }
    }));
    expect(routes).toContainEqual(expect.objectContaining({
      name: 'NotFound',
      meta: {
        hasLogin: true
      }
    }));
  });
});
