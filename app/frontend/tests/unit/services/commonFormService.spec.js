import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import commonFormService from '@/services/commonFormService';
import { FormNames } from '@/utils/constants';

const mockInstance = axios.create();
const mockAxios = new MockAdapter(mockInstance);

const form = FormNames.MINESOPERATORSCREENING;
const zeroUuid = '00000000-0000-0000-0000-000000000000';

jest.mock('@/services/interceptors', () => {
  return {
    appAxios: () => mockInstance
  };
});

describe('Email', () => {
  describe('requestReceiptEmail', () => {
    const endpoint = `${form}/submissions/email`;

    beforeEach(() => {
      mockAxios.reset();
    });

    it('calls email endpoint', async () => {
      const data = {
        submissionId: 'TEST',
        to: 'test@example.com'
      };
      mockAxios.onPost(endpoint).reply(201, data);

      const result = await commonFormService.requestReceiptEmail(form, data);
      expect(result).toBeTruthy();
      expect(result.data).toEqual(data);
      expect(mockAxios.history.post).toHaveLength(1);
    });
  });
});

describe('Notes', () => {
  describe('getNotes', () => {
    const endpoint = `${form}/submissions/${zeroUuid}/notes`;

    beforeEach(() => {
      mockAxios.reset();
    });

    it('calls note endpoint', async () => {
      mockAxios.onGet(endpoint).reply(200);

      const result = await commonFormService.getNotes(form, zeroUuid);
      expect(result).toBeTruthy();
      expect(mockAxios.history.get).toHaveLength(1);
    });
  });

  describe('addNote', () => {
    const endpoint = `${form}/submissions/${zeroUuid}/notes`;

    beforeEach(() => {
      mockAxios.reset();
    });

    it('calls add note endpoint', async () => {
      const data = { test: 'testdata' };
      mockAxios.onPost(endpoint).reply(200, data);

      const result = await commonFormService.addNote(form, zeroUuid, data);
      expect(result).toBeTruthy();
      expect(result.data).toEqual(data);
      expect(mockAxios.history.post).toHaveLength(1);
    });
  });

  describe('addNoteToStatus', () => {
    const statusId = 1;
    const endpoint = `${form}/submissions/${zeroUuid}/statuses/${statusId}/notes`;

    beforeEach(() => {
      mockAxios.reset();
    });

    it('calls add status note endpoint', async () => {
      const data = { test: 'testdata' };
      mockAxios.onPost(endpoint).reply(200, data);

      const result = await commonFormService.addNoteToStatus(form, zeroUuid, statusId, data);
      expect(result).toBeTruthy();
      expect(result.data).toEqual(data);
      expect(mockAxios.history.post).toHaveLength(1);
    });
  });
});

describe('Settings', () => {
  describe('getSettings', () => {
    const endpoint = `${form}/settings`;

    beforeEach(() => {
      mockAxios.reset();
    });

    it('calls settings endpoint', async () => {
      mockAxios.onGet(endpoint).reply(200);

      const result = await commonFormService.getSettings(form);
      expect(result).toBeTruthy();
      expect(mockAxios.history.get).toHaveLength(1);
    });
  });

  describe('getDashboardSettings', () => {
    const endpoint = `${form}/settings/dashboards`;

    beforeEach(() => {
      mockAxios.reset();
    });

    it('calls dashboard settings endpoint', async () => {
      mockAxios.onGet(endpoint).reply(200);

      const result = await commonFormService.getDashboardSettings(form);
      expect(result).toBeTruthy();
      expect(mockAxios.history.get).toHaveLength(1);
    });
  });
});

describe('Statuses', () => {
  describe('getStatusCodes', () => {
    const endpoint = `${form}/current/statusCodes`;

    beforeEach(() => {
      mockAxios.reset();
    });

    it('calls status codes endpoint', async () => {
      mockAxios.onGet(endpoint).reply(200);

      const result = await commonFormService.getStatusCodes(form);
      expect(result).toBeTruthy();
      expect(mockAxios.history.get).toHaveLength(1);
    });
  });

  describe('getSubmissionStatuses', () => {
    const endpoint = `${form}/submissions/${zeroUuid}/statuses`;

    beforeEach(() => {
      mockAxios.reset();
    });

    it('calls submission statuses endpoint', async () => {
      mockAxios.onGet(endpoint).reply(200);

      const result = await commonFormService.getSubmissionStatuses(form, zeroUuid);
      expect(result).toBeTruthy();
      expect(mockAxios.history.get).toHaveLength(1);
    });
  });

  describe('sendSubmissionStatuses', () => {
    const endpoint = `${form}/submissions/${zeroUuid}/statuses`;

    beforeEach(() => {
      mockAxios.reset();
    });

    it('calls send submission endpoint', async () => {
      const data = { test: 'testdata' };
      mockAxios.onPost(endpoint).reply(201, data);

      const result = await commonFormService.sendSubmissionStatuses(form, zeroUuid, data);
      expect(result).toBeTruthy();
      expect(mockAxios.history.post).toHaveLength(1);
    });
  });
});

describe('Team Management', () => {
  describe('getTeamRoles', () => {
    const endpoint = `${form}/team/roles`;

    beforeEach(() => {
      mockAxios.reset();
    });

    it('calls team roles endpoint', async () => {
      mockAxios.onGet(endpoint).reply(200);

      const result = await commonFormService.getTeamRoles(form);
      expect(result).toBeTruthy();
      expect(mockAxios.history.get).toHaveLength(1);
      expect(Object.keys(mockAxios.history.get[0].params)).toHaveLength(0);
    });

    it('calls team roles endpoint with users', async () => {
      mockAxios.onGet(endpoint).reply(200);

      const result = await commonFormService.getTeamRoles(form, true);
      expect(result).toBeTruthy();
      expect(mockAxios.history.get).toHaveLength(1);
      expect(Object.keys(mockAxios.history.get[0].params)).toHaveLength(1);
      expect(mockAxios.history.get[0].params.users).toBeTruthy();
    });
  });

  describe('getTeamUsers', () => {
    const endpoint = `${form}/team/users`;

    beforeEach(() => {
      mockAxios.reset();
    });

    it('calls team users endpoint', async () => {
      mockAxios.onGet(endpoint).reply(200);

      const result = await commonFormService.getTeamUsers(form);
      expect(result).toBeTruthy();
      expect(mockAxios.history.get).toHaveLength(1);
      expect(Object.keys(mockAxios.history.get[0].params)).toHaveLength(0);
    });

    it('calls team users endpoint with roles', async () => {
      mockAxios.onGet(endpoint).reply(200);

      const result = await commonFormService.getTeamUsers(form, true);
      expect(result).toBeTruthy();
      expect(mockAxios.history.get).toHaveLength(1);
      expect(Object.keys(mockAxios.history.get[0].params)).toHaveLength(1);
      expect(mockAxios.history.get[0].params.roles).toBeTruthy();
    });
  });

  describe('updateTeamUserRole', () => {
    const endpoint = `${form}/team/users/${zeroUuid}/roles`;
    const data = {
      id: zeroUuid,
      name: 'testRole',
      description: 'testDescription'
    };

    beforeEach(() => {
      mockAxios.reset();
    });

    it('calls team user role update endpoint', async () => {
      mockAxios.onPut(endpoint).reply(200, [data]);

      const result = await commonFormService.updateTeamUserRole(form, zeroUuid, data);
      expect(result).toBeTruthy();
      expect(result.data[0]).toEqual(data);
      expect(mockAxios.history.put).toHaveLength(1);
    });
  });

  describe('requestTeamAccess', () => {
    const endpoint = `${form}/team/access`;

    beforeEach(() => {
      mockAxios.reset();
    });

    it('calls request team access endpoint', async () => {
      mockAxios.onPost(endpoint).reply(201);

      const result = await commonFormService.requestTeamAccess(form);
      expect(result).toBeTruthy();
      expect(mockAxios.history.post).toHaveLength(1);
    });
  });
});
