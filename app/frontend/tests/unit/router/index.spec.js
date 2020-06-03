import getRouter from '@/router';

describe('Router', () => {
  let router;

  beforeEach(() => {
    router = getRouter();
  });

  it('defaults to / path when unspecified', () => {
    expect(router.options.base).toMatch('/');
  });

  it('uses the specified path parameter', () => {
    const path = '/test';
    router = getRouter(path);
    expect(router.options.base).toMatch(path);
  });

  it('is in history mode', () => {
    expect(router.options.mode).toMatch('history');
  });

  it('has the correct number of route entries', () => {
    expect(router.options.routes).toHaveLength(18);
  });
});
