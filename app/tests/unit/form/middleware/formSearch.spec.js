const Problem = require('api-problem');
const formSearch = require('../../../../src/forms/form/middleware/searchParameters').formSearch;

describe('Test Form Search Parameter validation', () => {

  it('should go to next with default parameter values', async () => {
    const req = {};
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await formSearch(req, res, next.handler);
    expect(next.problem).toBeUndefined();
    expect(req.searchParameters).toBeDefined();
    expect(req.searchParameters.name).toBe(undefined);
    expect(req.searchParameters.slug).toBe(undefined);
    expect(req.searchParameters.keyword).toBe(undefined);
    expect(req.searchParameters.public).toBe(undefined);
    expect(req.searchParameters.active).toBe(undefined);
  });

  it('should go to next with valid parameter types', async () => {
    const req = {
      query: {
        name: 'name',
        slug: 'slug',
        keyword: 'keyword',
        public: 'true',
        active: true
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await formSearch(req, res, next.handler);
    expect(next.problem).toBeUndefined();
    expect(req.searchParameters).toBeDefined();
    expect(req.searchParameters.name).toBe(req.query.name);
    expect(req.searchParameters.slug).toBe(req.query.slug);
    expect(req.searchParameters.keyword).toBe(req.query.keyword);
    expect(req.searchParameters.public).toBe(true);
    expect(req.searchParameters.active).toBe(true);
  });

  it('should ignore extraneous query parameters', async () => {
    const req = {
      query: {
        name: 'name',
        slug: 'slug',
        keyword: 'keyword',
        public: 'true',
        active: 'false',
        extraField: 'extraValue'
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await formSearch(req, res, next.handler);
    expect(next.problem).toBeUndefined();
    expect(req.searchParameters).toBeDefined();
    expect(req.searchParameters.name).toBe(req.query.name);
    expect(req.searchParameters.slug).toBe(req.query.slug);
    expect(req.searchParameters.keyword).toBe(req.query.keyword);
    expect(req.searchParameters.public).toBe(true);
    expect(req.searchParameters.active).toBe(false);
    expect(req.searchParameters.extraField).toBeUndefined();
  });

  it('should go to next with error with invalid name parameter type', async () => {
    const req = {
      query: {
        name: 12345,
        slug: 'slug',
        keyword: 'keyword',
        public: 'true',
        active: true
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await formSearch(req, res, next.handler);
    expect(next.problem).toBeInstanceOf(Problem);
    expect(next.problem.errors).toHaveLength(1);
    expect(next.problem.errors[0]).toBe('name parameter must be an string');
    expect(req.searchParameters).toBeDefined();
  });

  it('should go to next with error with invalid slug parameter type', async () => {
    const req = {
      query: {
        name: 'name',
        slug: () => {
        },
        keyword: 'keyword',
        public: 'true',
        active: true
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await formSearch(req, res, next.handler);
    expect(next.problem).toBeInstanceOf(Problem);
    expect(next.problem.errors).toHaveLength(1);
    expect(next.problem.errors[0]).toBe('slug parameter must be an string');
    expect(req.searchParameters).toBeDefined();
  });

  it('should go to next with error with invalid keyword parameter type', async () => {
    const req = {
      query: {
        name: 'name',
        slug: 'slug',
        keyword: ['keyword'],
        public: 'true',
        active: true
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await formSearch(req, res, next.handler);
    expect(next.problem).toBeInstanceOf(Problem);
    expect(next.problem.errors).toHaveLength(1);
    expect(next.problem.errors[0]).toBe('keyword parameter must be an string');
    expect(req.searchParameters).toBeDefined();
  });

  it('should go to next with error with invalid public parameter type', async () => {
    const req = {
      query: {
        name: 'name',
        slug: 'slug',
        keyword: 'keyword',
        public: 'not a boolean',
        active: true
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await formSearch(req, res, next.handler);
    expect(next.problem).toBeInstanceOf(Problem);
    expect(next.problem.errors).toHaveLength(1);
    expect(next.problem.errors[0]).toBe('public parameter must be a boolean');
    expect(req.searchParameters).toBeDefined();
  });

  it('should go to next with error with invalid active parameter type', async () => {
    const req = {
      query: {
        name: 'name',
        slug: 'slug',
        keyword: 'keyword',
        public: 'true',
        active: 12345
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await formSearch(req, res, next.handler);
    expect(next.problem).toBeInstanceOf(Problem);
    expect(next.problem.errors).toHaveLength(1);
    expect(next.problem.errors[0]).toBe('active parameter must be a boolean');
    expect(req.searchParameters).toBeDefined();
  });

});
