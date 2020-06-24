const request = require('supertest');

// bring in the mock services...
require('../attestationMocks');
require('../commonMocks');
require('../teamMocks');

const helper = require('../../common/helper');
const router = require('../../../src/routes/v1');

// Simple Express Server
const basePath = '/api/v1';
const app = helper.expressHelper(basePath, router);
helper.logHelper();

describe(`GET ${basePath}`, () => {
  it('should return all available endpoints', async () => {
    const response = await request(app).get(`${basePath}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeTruthy();
    expect(Array.isArray(response.body.endpoints)).toBeTruthy();
    expect(response.body.endpoints).toContain('/docs');
  });
});

describe(`GET ${basePath}/docs`, () => {
  it('should return a redoc html page', async () => {
    const response = await request(app).get(`${basePath}/docs`);

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('<title>Common Forms Toolkit API - Documentation');
  });
});

describe(`GET ${basePath}/api-spec.yaml`, () => {
  it('should return the OpenAPI spec in yaml', async () => {
    const response = await request(app).get(`${basePath}/api-spec.yaml`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeTruthy();
    expect(response.headers['content-type']).toBeTruthy();
    expect(response.headers['content-type']).toMatch('application/yaml; charset=utf-8');
    expect(response.text).toContain('openapi: 3.0.2');
    expect(response.text).toContain('title: Common Forms Toolkit API');
  });
});

describe(`GET ${basePath}/api-spec.json`, () => {
  it('should return the OpenAPI spec in json', async () => {
    const response = await request(app).get(`${basePath}/api-spec.json`);

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toBeTruthy();
    expect(response.headers['content-type']).toMatch('application/json; charset=utf-8');
    expect(response.body).toBeTruthy();
    expect(response.body.openapi).toMatch('3.0.2');
    expect(response.body.info.title).toMatch('Common Forms Toolkit API');
  });
});

describe('Agriculture/Seafood', () => {
  const slug = require('../../../src/forms/attestations/agriseafoodopscreening/constants').SLUG;
  const formPath = `${basePath}/${slug}`;

  describe('Form routes', () => {
    it('should GET form', async () => {
      const response = await request(app).get(`${formPath}/`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({read: true});
    });

    it('should POST form', async () => {
      const response = await request(app).post(`${formPath}/`, {});
      // because the data service is saying that a form exists and there can be only one, redirect and read.
      expect(response.statusCode).toBe(302);
      expect(response.body).toStrictEqual({read: true});
    });

    it('should PUT current', async () => {
      const response = await request(app).put(`${formPath}/current`, {});

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({update: true});
    });

    it('should GET submissions (search)', async () => {
      const response = await request(app).get(`${formPath}/submissions`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({searchSubmissions: true});
    });

    it('should POST submissions', async () => {
      const response = await request(app).post(`${formPath}/submissions`, {});

      expect(response.statusCode).toBe(201);
      expect(response.body).toStrictEqual({createSubmission: true});
    });

    it('should GET submission', async () => {
      const response = await request(app).get(`${formPath}/submissions/1`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({readSubmission: true});
    });

    it('should PUT submission', async () => {
      const response = await request(app).put(`${formPath}/submissions/1`, {});

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({updateSubmission: true});
    });

    it('should DELETE submission', async () => {
      const response = await request(app).delete(`${formPath}/submissions/1`, {});

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({deleteSubmission: true});
    });

    it('should GET a submission pdf', async () => {
      const response = await request(app).get(`${formPath}/submissions/1/pdf`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeTruthy();
    });

    it('should POST a submission email', async () => {
      const response = await request(app).post(`${formPath}/submissions/email`, {});

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({sendSubmissionEmail: true});
    });

  });

  describe('Operation Type routes', () => {
    it('should GET types', async () => {
      const response = await request(app).get(`${formPath}/types`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({readTypes: true});
    });
  });

  describe('Common routes', () => {
    it('should GET current', async () => {
      const response = await request(app).get(`${formPath}/current`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({current: true});
    });

    it('should GET current status codes', async () => {
      const response = await request(app).get(`${formPath}/current/statusCodes`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({readCurrentStatusCodes: true});
    });

    it('should GET current status codes', async () => {
      const response = await request(app).get(`${formPath}/current/statusCodes`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({readCurrentStatusCodes: true});
    });

    it('should PUT current status codes', async () => {
      const response = await request(app).put(`${formPath}/current/statusCodes`, {});

      expect(response.statusCode).toBe(201);
      expect(response.body).toStrictEqual({updateCurrentStatusCodes: true});
    });

    it('should POST submission status codes', async () => {
      const response = await request(app).post(`${formPath}/submissions/1/statuses`, {});

      expect(response.statusCode).toBe(201);
      expect(response.body).toStrictEqual({createSubmissionStatus: true});
    });

    it('should GET submission status codes', async () => {
      const response = await request(app).get(`${formPath}/submissions/1/statuses`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({readSubmissionStatuses: true});
    });

    it('should POST submission status note', async () => {
      const response = await request(app).post(`${formPath}/submissions/1/statuses/1/notes`, {});

      expect(response.statusCode).toBe(201);
      expect(response.body).toStrictEqual({createSubmissionStatusNote: true});
    });

    it('should GET submission status notes', async () => {
      const response = await request(app).get(`${formPath}/submissions/1/statuses/1/notes`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({readSubmissionStatusNotes: true});
    });

    it('should POST submission note', async () => {
      const response = await request(app).post(`${formPath}/submissions/1/notes`, {});

      expect(response.statusCode).toBe(201);
      expect(response.body).toStrictEqual({createSubmissionNote: true});
    });

    it('should GET submission notes', async () => {
      const response = await request(app).get(`${formPath}/submissions/1/notes`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({readSubmissionNotes: true});
    });

    it('should POST settings', async () => {
      const response = await request(app).post(`${formPath}/settings`, {});

      expect(response.statusCode).toBe(201);
      expect(response.body).toStrictEqual({createSettings: true});
    });

    it('should GET settings', async () => {
      const response = await request(app).get(`${formPath}/settings`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({allSettings: true});
    });

    it('should PUT a setting', async () => {
      const response = await request(app).put(`${formPath}/settings/settingName`, {});

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({updateSettings: true});
    });

    it('should GET a setting', async () => {
      const response = await request(app).get(`${formPath}/settings/settingName`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({readSettings: true});
    });
  });

  describe('Team Management routes', () => {
    const teamPath = `${formPath}/team`;

    it('should POST access request', async () => {
      const response = await request(app).post(`${teamPath}/access`, {});

      expect(response.statusCode).toBe(201);
      expect(response.body).toStrictEqual({processAccessRequest: true});
    });

    it('should GET users', async () => {
      const response = await request(app).get(`${teamPath}/users`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({getUsers: true});
    });

    it('should GET a user', async () => {
      const response = await request(app).get(`${teamPath}/users/1`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({getUser: true});
    });

    it('should PUT user roles', async () => {
      const response = await request(app).put(`${teamPath}/users/1/roles`, {});

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({updateUserRoles: true});
    });

    it('should GET user roles', async () => {
      const response = await request(app).get(`${teamPath}/users/1/roles`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({getUserRoles: true});
    });

    it('should GET roles', async () => {
      const response = await request(app).get(`${teamPath}/roles`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({getRoles: true});
    });

    it('should GET a role', async () => {
      const response = await request(app).get(`${teamPath}/roles/1`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({getRole: true});
    });

    it('should PUT role users', async () => {
      const response = await request(app).put(`${teamPath}/roles/1/users`, {});

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({updateRoleUsers: true});
    });

    it('should GET role users', async () => {
      const response = await request(app).get(`${teamPath}/roles/1/users`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({getRoleUsers: true});
    });

  });
});

describe('Forestry Sector', () => {
  const slug = require('../../../src/forms/attestations/forestrysectoroperatorscreening/constants').SLUG;
  const formPath = `${basePath}/${slug}`;

  describe('Form routes', () => {
    it('should GET form', async () => {
      const response = await request(app).get(`${formPath}/`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({read: true});
    });

    it('should POST form', async () => {
      const response = await request(app).post(`${formPath}/`, {});
      // because the data service is saying that a form exists and there can be only one, redirect and read.
      expect(response.statusCode).toBe(302);
      expect(response.body).toStrictEqual({read: true});
    });

    it('should PUT current', async () => {
      const response = await request(app).put(`${formPath}/current`, {});

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({update: true});
    });

    it('should GET submissions (search)', async () => {
      const response = await request(app).get(`${formPath}/submissions`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({searchSubmissions: true});
    });

    it('should POST submissions', async () => {
      const response = await request(app).post(`${formPath}/submissions`, {});

      expect(response.statusCode).toBe(201);
      expect(response.body).toStrictEqual({createSubmission: true});
    });

    it('should GET submission', async () => {
      const response = await request(app).get(`${formPath}/submissions/1`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({readSubmission: true});
    });

    it('should PUT submission', async () => {
      const response = await request(app).put(`${formPath}/submissions/1`, {});

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({updateSubmission: true});
    });

    it('should DELETE submission', async () => {
      const response = await request(app).delete(`${formPath}/submissions/1`, {});

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({deleteSubmission: true});
    });

    it('should GET a submission pdf', async () => {
      const response = await request(app).get(`${formPath}/submissions/1/pdf`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeTruthy();
    });

    it('should POST a submission email', async () => {
      const response = await request(app).post(`${formPath}/submissions/email`, {});

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({sendSubmissionEmail: true});
    });

  });

  describe('Operation Type routes', () => {
    it('should GET types', async () => {
      const response = await request(app).get(`${formPath}/types`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({readTypes: true});
    });
  });

  describe('Common routes', () => {
    it('should GET current', async () => {
      const response = await request(app).get(`${formPath}/current`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({current: true});
    });

    it('should GET current status codes', async () => {
      const response = await request(app).get(`${formPath}/current/statusCodes`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({readCurrentStatusCodes: true});
    });

    it('should GET current status codes', async () => {
      const response = await request(app).get(`${formPath}/current/statusCodes`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({readCurrentStatusCodes: true});
    });

    it('should PUT current status codes', async () => {
      const response = await request(app).put(`${formPath}/current/statusCodes`, {});

      expect(response.statusCode).toBe(201);
      expect(response.body).toStrictEqual({updateCurrentStatusCodes: true});
    });

    it('should POST submission status codes', async () => {
      const response = await request(app).post(`${formPath}/submissions/1/statuses`, {});

      expect(response.statusCode).toBe(201);
      expect(response.body).toStrictEqual({createSubmissionStatus: true});
    });

    it('should GET submission status codes', async () => {
      const response = await request(app).get(`${formPath}/submissions/1/statuses`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({readSubmissionStatuses: true});
    });

    it('should POST submission status note', async () => {
      const response = await request(app).post(`${formPath}/submissions/1/statuses/1/notes`, {});

      expect(response.statusCode).toBe(201);
      expect(response.body).toStrictEqual({createSubmissionStatusNote: true});
    });

    it('should GET submission status notes', async () => {
      const response = await request(app).get(`${formPath}/submissions/1/statuses/1/notes`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({readSubmissionStatusNotes: true});
    });

    it('should POST submission note', async () => {
      const response = await request(app).post(`${formPath}/submissions/1/notes`, {});

      expect(response.statusCode).toBe(201);
      expect(response.body).toStrictEqual({createSubmissionNote: true});
    });

    it('should GET submission notes', async () => {
      const response = await request(app).get(`${formPath}/submissions/1/notes`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({readSubmissionNotes: true});
    });

    it('should POST settings', async () => {
      const response = await request(app).post(`${formPath}/settings`, {});

      expect(response.statusCode).toBe(201);
      expect(response.body).toStrictEqual({createSettings: true});
    });

    it('should GET settings', async () => {
      const response = await request(app).get(`${formPath}/settings`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({allSettings: true});
    });

    it('should PUT a setting', async () => {
      const response = await request(app).put(`${formPath}/settings/settingName`, {});

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({updateSettings: true});
    });

    it('should GET a setting', async () => {
      const response = await request(app).get(`${formPath}/settings/settingName`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({readSettings: true});
    });
  });

  describe('Team Management routes', () => {
    const teamPath = `${formPath}/team`;

    it('should POST access request', async () => {
      const response = await request(app).post(`${teamPath}/access`, {});

      expect(response.statusCode).toBe(201);
      expect(response.body).toStrictEqual({processAccessRequest: true});
    });

    it('should GET users', async () => {
      const response = await request(app).get(`${teamPath}/users`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({getUsers: true});
    });

    it('should GET a user', async () => {
      const response = await request(app).get(`${teamPath}/users/1`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({getUser: true});
    });

    it('should PUT user roles', async () => {
      const response = await request(app).put(`${teamPath}/users/1/roles`, {});

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({updateUserRoles: true});
    });

    it('should GET user roles', async () => {
      const response = await request(app).get(`${teamPath}/users/1/roles`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({getUserRoles: true});
    });

    it('should GET roles', async () => {
      const response = await request(app).get(`${teamPath}/roles`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({getRoles: true});
    });

    it('should GET a role', async () => {
      const response = await request(app).get(`${teamPath}/roles/1`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({getRole: true});
    });

    it('should PUT role users', async () => {
      const response = await request(app).put(`${teamPath}/roles/1/users`, {});

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({updateRoleUsers: true});
    });

    it('should GET role users', async () => {
      const response = await request(app).get(`${teamPath}/roles/1/users`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({getRoleUsers: true});
    });

  });
});

describe('Mines Operators', () => {
  const slug = require('../../../src/forms/attestations/minesoperatorscreening/constants').SLUG;
  const formPath = `${basePath}/${slug}`;

  describe('Form routes', () => {
    it('should GET form', async () => {
      const response = await request(app).get(`${formPath}/`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({read: true});
    });

    it('should POST form', async () => {
      const response = await request(app).post(`${formPath}/`, {});
      // because the data service is saying that a form exists and there can be only one, redirect and read.
      expect(response.statusCode).toBe(302);
      expect(response.body).toStrictEqual({read: true});
    });

    it('should PUT current', async () => {
      const response = await request(app).put(`${formPath}/current`, {});

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({update: true});
    });

    it('should GET submissions (search)', async () => {
      const response = await request(app).get(`${formPath}/submissions`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({searchSubmissions: true});
    });

    it('should POST submissions', async () => {
      const response = await request(app).post(`${formPath}/submissions`, {});

      expect(response.statusCode).toBe(201);
      expect(response.body).toStrictEqual({createSubmission: true});
    });

    it('should GET submission', async () => {
      const response = await request(app).get(`${formPath}/submissions/1`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({readSubmission: true});
    });

    it('should PUT submission', async () => {
      const response = await request(app).put(`${formPath}/submissions/1`, {});

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({updateSubmission: true});
    });

    it('should DELETE submission', async () => {
      const response = await request(app).delete(`${formPath}/submissions/1`, {});

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({deleteSubmission: true});
    });

    it('should GET a submission pdf', async () => {
      const response = await request(app).get(`${formPath}/submissions/1/pdf`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeTruthy();
    });

    it('should POST a submission email', async () => {
      const response = await request(app).post(`${formPath}/submissions/email`, {});

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({sendSubmissionEmail: true});
    });

  });

  describe('Operation Type routes', () => {
    it('should not support GET types', async () => {
      const response = await request(app).get(`${formPath}/types`);

      expect(response.statusCode).toBe(404);
    });
  });

  describe('Common routes', () => {
    it('should GET current', async () => {
      const response = await request(app).get(`${formPath}/current`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({current: true});
    });

    it('should GET current status codes', async () => {
      const response = await request(app).get(`${formPath}/current/statusCodes`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({readCurrentStatusCodes: true});
    });

    it('should GET current status codes', async () => {
      const response = await request(app).get(`${formPath}/current/statusCodes`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({readCurrentStatusCodes: true});
    });

    it('should PUT current status codes', async () => {
      const response = await request(app).put(`${formPath}/current/statusCodes`, {});

      expect(response.statusCode).toBe(201);
      expect(response.body).toStrictEqual({updateCurrentStatusCodes: true});
    });

    it('should POST submission status codes', async () => {
      const response = await request(app).post(`${formPath}/submissions/1/statuses`, {});

      expect(response.statusCode).toBe(201);
      expect(response.body).toStrictEqual({createSubmissionStatus: true});
    });

    it('should GET submission status codes', async () => {
      const response = await request(app).get(`${formPath}/submissions/1/statuses`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({readSubmissionStatuses: true});
    });

    it('should POST submission status note', async () => {
      const response = await request(app).post(`${formPath}/submissions/1/statuses/1/notes`, {});

      expect(response.statusCode).toBe(201);
      expect(response.body).toStrictEqual({createSubmissionStatusNote: true});
    });

    it('should GET submission status notes', async () => {
      const response = await request(app).get(`${formPath}/submissions/1/statuses/1/notes`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({readSubmissionStatusNotes: true});
    });

    it('should POST submission note', async () => {
      const response = await request(app).post(`${formPath}/submissions/1/notes`, {});

      expect(response.statusCode).toBe(201);
      expect(response.body).toStrictEqual({createSubmissionNote: true});
    });

    it('should GET submission notes', async () => {
      const response = await request(app).get(`${formPath}/submissions/1/notes`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({readSubmissionNotes: true});
    });

    it('should POST settings', async () => {
      const response = await request(app).post(`${formPath}/settings`, {});

      expect(response.statusCode).toBe(201);
      expect(response.body).toStrictEqual({createSettings: true});
    });

    it('should GET settings', async () => {
      const response = await request(app).get(`${formPath}/settings`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({allSettings: true});
    });

    it('should PUT a setting', async () => {
      const response = await request(app).put(`${formPath}/settings/settingName`, {});

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({updateSettings: true});
    });

    it('should GET a setting', async () => {
      const response = await request(app).get(`${formPath}/settings/settingName`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({readSettings: true});
    });
  });

  describe('Team Management routes', () => {
    const teamPath = `${formPath}/team`;

    it('should POST access request', async () => {
      const response = await request(app).post(`${teamPath}/access`, {});

      expect(response.statusCode).toBe(201);
      expect(response.body).toStrictEqual({processAccessRequest: true});
    });

    it('should GET users', async () => {
      const response = await request(app).get(`${teamPath}/users`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({getUsers: true});
    });

    it('should GET a user', async () => {
      const response = await request(app).get(`${teamPath}/users/1`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({getUser: true});
    });

    it('should PUT user roles', async () => {
      const response = await request(app).put(`${teamPath}/users/1/roles`, {});

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({updateUserRoles: true});
    });

    it('should GET user roles', async () => {
      const response = await request(app).get(`${teamPath}/users/1/roles`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({getUserRoles: true});
    });

    it('should GET roles', async () => {
      const response = await request(app).get(`${teamPath}/roles`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({getRoles: true});
    });

    it('should GET a role', async () => {
      const response = await request(app).get(`${teamPath}/roles/1`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({getRole: true});
    });

    it('should PUT role users', async () => {
      const response = await request(app).put(`${teamPath}/roles/1/users`, {});

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({updateRoleUsers: true});
    });

    it('should GET role users', async () => {
      const response = await request(app).get(`${teamPath}/roles/1/users`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({getRoleUsers: true});
    });

  });
});
