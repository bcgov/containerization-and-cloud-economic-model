const Problem = require('api-problem');

const submissionSearch = require('../../../../src/forms/attestations/middleware/searchParameters').submissionSearch;


describe('Test Agriculture/Seafood Submission Search Parameter validation', () => {
  const models = require('../../../../src/forms/attestations/agriseafoodopscreening/models').models;
  const middleware = submissionSearch(models);

  it('should go to next with default parameter values', async () => {
    const req = {};
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await middleware(req, res, next.handler);
    expect(next.problem).toBeUndefined();
    expect(req.searchParameters).toBeDefined();
    expect(req.searchParameters.version).toBe(undefined);
    expect(req.searchParameters.confirmationId).toBe(undefined);
    expect(req.searchParameters.business).toBe(undefined);
    expect(req.searchParameters.city).toBe(undefined);
    expect(req.searchParameters.type).toBe(undefined);
    expect(req.searchParameters.deleted).toBe(false);
    expect(req.searchParameters.tiny).toBe(true);
  });

  it('should go to next with valid parameter types', async () => {
    const req = {
      query: {
        version: '1',
        confirmationId: 'confirmation',
        business: 'business',
        city: 'city',
        type: 'type',
        deleted: true,
        tiny: 'false'
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await middleware(req, res, next.handler);
    expect(next.problem).toBeUndefined();
    expect(req.searchParameters).toBeDefined();
    expect(req.searchParameters.version).toBe(parseInt(req.query.version));
    expect(req.searchParameters.confirmationId).toBe(req.query.confirmationId);
    expect(req.searchParameters.business).toBe(req.query.business);
    expect(req.searchParameters.city).toBe(req.query.city);
    expect(req.searchParameters.type).toBe(req.query.type);
    expect(req.searchParameters.deleted).toBe(true);
    expect(req.searchParameters.tiny).toBe(false);
  });

  it('should ignore extraneous query parameters', async () => {
    const req = {
      query: {
        version: '1',
        confirmationId: 'confirmation',
        business: 'business',
        city: 'city',
        type: 'type',
        deleted: true,
        tiny: 'false',
        extraField: 'extraValue'
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await middleware(req, res, next.handler);
    expect(next.problem).toBeUndefined();
    expect(req.searchParameters).toBeDefined();
    expect(req.searchParameters.version).toBe(parseInt(req.query.version));
    expect(req.searchParameters.confirmationId).toBe(req.query.confirmationId);
    expect(req.searchParameters.business).toBe(req.query.business);
    expect(req.searchParameters.city).toBe(req.query.city);
    expect(req.searchParameters.type).toBe(req.query.type);
    expect(req.searchParameters.deleted).toBe(true);
    expect(req.searchParameters.tiny).toBe(false);
    expect(req.searchParameters.extraField).toBeUndefined();
  });

  it('should go to next with error with invalid version parameter type', async () => {
    const req = {
      query: {
        version: 'not an int',
        confirmationId: 'confirmation',
        business: 'business',
        city: 'city',
        type: 'type',
        deleted: 'true',
        tiny: false
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await middleware(req, res, next.handler);
    expect(next.problem).toBeInstanceOf(Problem);
    expect(next.problem.errors).toHaveLength(1);
    expect(next.problem.errors[0]).toBe('version parameter must be an integer');
    expect(req.searchParameters).toBeDefined();
  });

  it('should go to next with error with invalid confirmationId parameter type', async () => {
    const req = {
      query: {
        version: '1',
        confirmationId: 12345,
        business: 'business',
        city: 'city',
        type: 'type',
        deleted: 'true',
        tiny: 'false'
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await middleware(req, res, next.handler);
    expect(next.problem).toBeInstanceOf(Problem);
    expect(next.problem.errors).toHaveLength(1);
    expect(next.problem.errors[0]).toBe('confirmationId parameter must be a string');
    expect(req.searchParameters).toBeDefined();
  });

  it('should go to next with error with invalid business parameter type', async () => {
    const req = {
      query: {
        version: '1',
        confirmationId: 'confirmation',
        business: ['business'],
        city: 'city',
        type: 'type',
        deleted: 'true',
        tiny: false
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await middleware(req, res, next.handler);
    expect(next.problem).toBeInstanceOf(Problem);
    expect(next.problem.errors).toHaveLength(1);
    expect(next.problem.errors[0]).toBe('business parameter must be a string');
    expect(req.searchParameters).toBeDefined();
  });

  it('should go to next with error with invalid city parameter type', async () => {
    const req = {
      query: {
        version: '1',
        confirmationId: 'confirmation',
        business: 'business',
        city: () => {
        },
        type: 'type',
        deleted: 'true',
        tiny: 'false'
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await middleware(req, res, next.handler);
    expect(next.problem).toBeInstanceOf(Problem);
    expect(next.problem.errors).toHaveLength(1);
    expect(next.problem.errors[0]).toBe('city parameter must be a string');
    expect(req.searchParameters).toBeDefined();
  });

  it('should go to next with error with invalid type parameter type', async () => {
    const req = {
      query: {
        version: '1',
        confirmationId: 'confirmation',
        business: 'business',
        city: 'city',
        type: {value: 'type'},
        deleted: 'true',
        tiny: 'false'
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await middleware(req, res, next.handler);
    expect(next.problem).toBeInstanceOf(Problem);
    expect(next.problem.errors).toHaveLength(1);
    expect(next.problem.errors[0]).toBe('type parameter must be a string');
    expect(req.searchParameters).toBeDefined();
  });

  it('should go to next with error with invalid delete parameter type', async () => {
    const req = {
      query: {
        version: '1',
        confirmationId: 'confirmation',
        business: 'business',
        city: 'city',
        type: 'type',
        deleted: 'not a boolean',
        tiny: false
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await middleware(req, res, next.handler);
    expect(next.problem).toBeInstanceOf(Problem);
    expect(next.problem.errors).toHaveLength(1);
    expect(next.problem.errors[0]).toBe('deleted parameter must be a boolean');
    expect(req.searchParameters).toBeDefined();
  });

  it('should go to next with error with invalid tiny parameter type', async () => {
    const req = {
      query: {
        version: '1',
        confirmationId: 'confirmation',
        business: 'business',
        city: 'city',
        type: 'type',
        deleted: 'true',
        tiny: 12345
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await middleware(req, res, next.handler);
    expect(next.problem).toBeInstanceOf(Problem);
    expect(next.problem.errors).toHaveLength(1);
    expect(next.problem.errors[0]).toBe('tiny parameter must be a boolean');
    expect(req.searchParameters).toBeDefined();
  });


});

describe('Test Forestry Sector Submission Search Parameter validation', () => {
  const models = require('../../../../src/forms/attestations/forestrysectoroperatorscreening/models').models;
  const middleware = submissionSearch(models);

  it('should go to next with default parameter values', async () => {
    const req = {};
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await middleware(req, res, next.handler);
    expect(next.problem).toBeUndefined();
    expect(req.searchParameters).toBeDefined();
    expect(req.searchParameters.version).toBe(undefined);
    expect(req.searchParameters.confirmationId).toBe(undefined);
    expect(req.searchParameters.business).toBe(undefined);
    expect(req.searchParameters.city).toBe(undefined);
    expect(req.searchParameters.type).toBe(undefined);
    expect(req.searchParameters.deleted).toBe(false);
    expect(req.searchParameters.tiny).toBe(true);
  });

  it('should go to next with valid parameter types', async () => {
    const req = {
      query: {
        version: '1',
        confirmationId: 'confirmation',
        business: 'business',
        city: 'city',
        type: 'type',
        deleted: true,
        tiny: 'false'
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await middleware(req, res, next.handler);
    expect(next.problem).toBeUndefined();
    expect(req.searchParameters).toBeDefined();
    expect(req.searchParameters.version).toBe(parseInt(req.query.version));
    expect(req.searchParameters.confirmationId).toBe(req.query.confirmationId);
    expect(req.searchParameters.business).toBe(req.query.business);
    expect(req.searchParameters.city).toBe(req.query.city);
    expect(req.searchParameters.type).toBe(req.query.type);
    expect(req.searchParameters.deleted).toBe(true);
    expect(req.searchParameters.tiny).toBe(false);
  });

  it('should ignore extraneous query parameters', async () => {
    const req = {
      query: {
        version: '1',
        confirmationId: 'confirmation',
        business: 'business',
        city: 'city',
        type: 'type',
        deleted: true,
        tiny: 'false',
        extraField: 'extraValue'
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await middleware(req, res, next.handler);
    expect(next.problem).toBeUndefined();
    expect(req.searchParameters).toBeDefined();
    expect(req.searchParameters.version).toBe(parseInt(req.query.version));
    expect(req.searchParameters.confirmationId).toBe(req.query.confirmationId);
    expect(req.searchParameters.business).toBe(req.query.business);
    expect(req.searchParameters.city).toBe(req.query.city);
    expect(req.searchParameters.type).toBe(req.query.type);
    expect(req.searchParameters.deleted).toBe(true);
    expect(req.searchParameters.tiny).toBe(false);
    expect(req.searchParameters.extraField).toBeUndefined();
  });

  it('should go to next with error with invalid version parameter type', async () => {
    const req = {
      query: {
        version: 'not an int',
        confirmationId: 'confirmation',
        business: 'business',
        city: 'city',
        type: 'type',
        deleted: 'true',
        tiny: false
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await middleware(req, res, next.handler);
    expect(next.problem).toBeInstanceOf(Problem);
    expect(next.problem.errors).toHaveLength(1);
    expect(next.problem.errors[0]).toBe('version parameter must be an integer');
    expect(req.searchParameters).toBeDefined();
  });

  it('should go to next with error with invalid confirmationId parameter type', async () => {
    const req = {
      query: {
        version: '1',
        confirmationId: 12345,
        business: 'business',
        city: 'city',
        type: 'type',
        deleted: 'true',
        tiny: 'false'
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await middleware(req, res, next.handler);
    expect(next.problem).toBeInstanceOf(Problem);
    expect(next.problem.errors).toHaveLength(1);
    expect(next.problem.errors[0]).toBe('confirmationId parameter must be a string');
    expect(req.searchParameters).toBeDefined();
  });

  it('should go to next with error with invalid business parameter type', async () => {
    const req = {
      query: {
        version: '1',
        confirmationId: 'confirmation',
        business: ['business'],
        city: 'city',
        type: 'type',
        deleted: 'true',
        tiny: false
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await middleware(req, res, next.handler);
    expect(next.problem).toBeInstanceOf(Problem);
    expect(next.problem.errors).toHaveLength(1);
    expect(next.problem.errors[0]).toBe('business parameter must be a string');
    expect(req.searchParameters).toBeDefined();
  });

  it('should go to next with error with invalid city parameter type', async () => {
    const req = {
      query: {
        version: '1',
        confirmationId: 'confirmation',
        business: 'business',
        city: () => {
        },
        type: 'type',
        deleted: 'true',
        tiny: 'false'
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await middleware(req, res, next.handler);
    expect(next.problem).toBeInstanceOf(Problem);
    expect(next.problem.errors).toHaveLength(1);
    expect(next.problem.errors[0]).toBe('city parameter must be a string');
    expect(req.searchParameters).toBeDefined();
  });

  it('should go to next with error with invalid type parameter type', async () => {
    const req = {
      query: {
        version: '1',
        confirmationId: 'confirmation',
        business: 'business',
        city: 'city',
        type: {value: 'type'},
        deleted: 'true',
        tiny: 'false'
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await middleware(req, res, next.handler);
    expect(next.problem).toBeInstanceOf(Problem);
    expect(next.problem.errors).toHaveLength(1);
    expect(next.problem.errors[0]).toBe('type parameter must be a string');
    expect(req.searchParameters).toBeDefined();
  });

  it('should go to next with error with invalid delete parameter type', async () => {
    const req = {
      query: {
        version: '1',
        confirmationId: 'confirmation',
        business: 'business',
        city: 'city',
        type: 'type',
        deleted: 'not a boolean',
        tiny: false
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await middleware(req, res, next.handler);
    expect(next.problem).toBeInstanceOf(Problem);
    expect(next.problem.errors).toHaveLength(1);
    expect(next.problem.errors[0]).toBe('deleted parameter must be a boolean');
    expect(req.searchParameters).toBeDefined();
  });

  it('should go to next with error with invalid tiny parameter type', async () => {
    const req = {
      query: {
        version: '1',
        confirmationId: 'confirmation',
        business: 'business',
        city: 'city',
        type: 'type',
        deleted: 'true',
        tiny: 12345
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await middleware(req, res, next.handler);
    expect(next.problem).toBeInstanceOf(Problem);
    expect(next.problem.errors).toHaveLength(1);
    expect(next.problem.errors[0]).toBe('tiny parameter must be a boolean');
    expect(req.searchParameters).toBeDefined();
  });


});

describe('Test Mines Operator Submission Search Parameter validation', () => {
  const models = require('../../../../src/forms/attestations/minesoperatorscreening/models').models;
  const middleware = submissionSearch(models);

  it('should go to next with default parameter values', async () => {
    const req = {};
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await middleware(req, res, next.handler);
    expect(next.problem).toBeUndefined();
    expect(req.searchParameters).toBeDefined();
    expect(req.searchParameters.version).toBe(undefined);
    expect(req.searchParameters.confirmationId).toBe(undefined);
    expect(req.searchParameters.business).toBe(undefined);
    expect(req.searchParameters.city).toBe(undefined);
    expect(req.searchParameters.deleted).toBe(false);
    expect(req.searchParameters.tiny).toBe(true);
  });

  it('should go to next with valid parameter types', async () => {
    const req = {
      query: {
        version: '1',
        confirmationId: 'confirmation',
        business: 'business',
        city: 'city',
        deleted: true,
        tiny: 'false'
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await middleware(req, res, next.handler);
    expect(next.problem).toBeUndefined();
    expect(req.searchParameters).toBeDefined();
    expect(req.searchParameters.version).toBe(parseInt(req.query.version));
    expect(req.searchParameters.confirmationId).toBe(req.query.confirmationId);
    expect(req.searchParameters.business).toBe(req.query.business);
    expect(req.searchParameters.city).toBe(req.query.city);
    expect(req.searchParameters.deleted).toBe(true);
    expect(req.searchParameters.tiny).toBe(false);
  });

  it('should ignore extraneous query parameters', async () => {
    const req = {
      query: {
        version: '1',
        confirmationId: 'confirmation',
        business: 'business',
        city: 'city',
        deleted: true,
        tiny: 'false',
        extraField: 'extraValue'
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await middleware(req, res, next.handler);
    expect(next.problem).toBeUndefined();
    expect(req.searchParameters).toBeDefined();
    expect(req.searchParameters.version).toBe(parseInt(req.query.version));
    expect(req.searchParameters.confirmationId).toBe(req.query.confirmationId);
    expect(req.searchParameters.business).toBe(req.query.business);
    expect(req.searchParameters.city).toBe(req.query.city);
    expect(req.searchParameters.deleted).toBe(true);
    expect(req.searchParameters.tiny).toBe(false);
    expect(req.searchParameters.extraField).toBeUndefined();
  });

  it('should go to next with error with invalid version parameter type', async () => {
    const req = {
      query: {
        version: 'not an int',
        confirmationId: 'confirmation',
        business: 'business',
        city: 'city',
        deleted: 'true',
        tiny: false
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await middleware(req, res, next.handler);
    expect(next.problem).toBeInstanceOf(Problem);
    expect(next.problem.errors).toHaveLength(1);
    expect(next.problem.errors[0]).toBe('version parameter must be an integer');
    expect(req.searchParameters).toBeDefined();
  });

  it('should go to next with error with invalid confirmationId parameter type', async () => {
    const req = {
      query: {
        version: '1',
        confirmationId: 12345,
        business: 'business',
        city: 'city',
        deleted: 'true',
        tiny: 'false'
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await middleware(req, res, next.handler);
    expect(next.problem).toBeInstanceOf(Problem);
    expect(next.problem.errors).toHaveLength(1);
    expect(next.problem.errors[0]).toBe('confirmationId parameter must be a string');
    expect(req.searchParameters).toBeDefined();
  });

  it('should go to next with error with invalid business parameter type', async () => {
    const req = {
      query: {
        version: '1',
        confirmationId: 'confirmation',
        business: ['business'],
        city: 'city',
        deleted: 'true',
        tiny: false
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await middleware(req, res, next.handler);
    expect(next.problem).toBeInstanceOf(Problem);
    expect(next.problem.errors).toHaveLength(1);
    expect(next.problem.errors[0]).toBe('business parameter must be a string');
    expect(req.searchParameters).toBeDefined();
  });

  it('should go to next with error with invalid city parameter type', async () => {
    const req = {
      query: {
        version: '1',
        confirmationId: 'confirmation',
        business: 'business',
        city: () => {
        },
        deleted: 'true',
        tiny: 'false'
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await middleware(req, res, next.handler);
    expect(next.problem).toBeInstanceOf(Problem);
    expect(next.problem.errors).toHaveLength(1);
    expect(next.problem.errors[0]).toBe('city parameter must be a string');
    expect(req.searchParameters).toBeDefined();
  });

  it('should go to next with error with invalid delete parameter type', async () => {
    const req = {
      query: {
        version: '1',
        confirmationId: 'confirmation',
        business: 'business',
        city: 'city',
        type: 'type',
        deleted: 'not a boolean',
        tiny: false
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await middleware(req, res, next.handler);
    expect(next.problem).toBeInstanceOf(Problem);
    expect(next.problem.errors).toHaveLength(1);
    expect(next.problem.errors[0]).toBe('deleted parameter must be a boolean');
    expect(req.searchParameters).toBeDefined();
  });

  it('should go to next with error with invalid tiny parameter type', async () => {
    const req = {
      query: {
        version: '1',
        confirmationId: 'confirmation',
        business: 'business',
        city: 'city',
        type: 'type',
        deleted: 'true',
        tiny: 12345
      }
    };
    const res = jest.fn();
    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };
    await middleware(req, res, next.handler);
    expect(next.problem).toBeInstanceOf(Problem);
    expect(next.problem.errors).toHaveLength(1);
    expect(next.problem.errors[0]).toBe('tiny parameter must be a boolean');
    expect(req.searchParameters).toBeDefined();
  });


});
