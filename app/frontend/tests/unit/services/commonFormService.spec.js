import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import commonFormService from '@/services/commonFormService';
import { AppSettings, FormNames } from '@/utils/constants';

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

    it('throws when invalid form specified', () => {
      const result = () => commonFormService.requestReceiptEmail(undefined, undefined);
      expect(result).toThrow('Invalid form specified');
      expect(mockAxios.history.get).toHaveLength(0);
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

describe('Form', () => {
  describe('getTypes', () => {
    const endpoint = `${form}/types`;

    beforeEach(() => {
      mockAxios.reset();
    });

    it('throws when invalid form specified', () => {
      const result = () => commonFormService.getTypes(undefined);
      expect(result).toThrow('Invalid form specified');
      expect(mockAxios.history.get).toHaveLength(0);
    });

    it('calls types endpoint', async () => {
      mockAxios.onGet(endpoint).reply(200);

      const result = await commonFormService.getTypes(form);
      expect(result).toBeTruthy();
      expect(mockAxios.history.get).toHaveLength(1);
    });
  });
});

describe('Notes', () => {
  describe('getNotes', () => {
    const endpoint = `${form}/submissions/${zeroUuid}/notes`;

    beforeEach(() => {
      mockAxios.reset();
    });

    it('throws when invalid form specified', () => {
      const result = () => commonFormService.getNotes(undefined, zeroUuid);
      expect(result).toThrow('Invalid form specified');
      expect(mockAxios.history.get).toHaveLength(0);
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


    it('throws when invalid form specified', () => {
      const result = () => commonFormService.addNote(undefined, zeroUuid, undefined);
      expect(result).toThrow('Invalid form specified');
      expect(mockAxios.history.post).toHaveLength(0);
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

    it('throws when invalid form specified', () => {
      const result = () => commonFormService.addNoteToStatus(undefined, zeroUuid, statusId, undefined);
      expect(result).toThrow('Invalid form specified');
      expect(mockAxios.history.post).toHaveLength(0);
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

    it('throws when invalid form specified', () => {
      const result = () => commonFormService.getSettings(undefined);
      expect(result).toThrow('Invalid form specified');
      expect(mockAxios.history.get).toHaveLength(0);
    });

    it('calls settings endpoint', async () => {
      mockAxios.onGet(endpoint).reply(200);

      const result = await commonFormService.getSettings(form);
      expect(result).toBeTruthy();
      expect(mockAxios.history.get).toHaveLength(1);
    });
  });

  describe('getNamedSetting', () => {
    const name = AppSettings.DASHBOARD;
    const endpoint = `${form}/settings/${name}`;

    beforeEach(() => {
      mockAxios.reset();
    });

    it('throws when invalid form specified', () => {
      const result = () => commonFormService.getNamedSetting(undefined, name);
      expect(result).toThrow('Invalid form specified');
      expect(mockAxios.history.get).toHaveLength(0);
    });

    it('throws when invalid name specified', () => {
      const result = () => commonFormService.getNamedSetting(form, undefined);
      expect(result).toThrow('Invalid name specified');
      expect(mockAxios.history.get).toHaveLength(0);
    });

    it('calls dashboard settings endpoint', async () => {
      mockAxios.onGet(endpoint).reply(200);

      const result = await commonFormService.getNamedSetting(form, name);
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

    it('throws when invalid form specified', () => {
      const result = () => commonFormService.getStatusCodes(undefined);
      expect(result).toThrow('Invalid form specified');
      expect(mockAxios.history.get).toHaveLength(0);
    });

    it('calls status codes endpoint', async () => {
      mockAxios.onGet(endpoint).reply(200);

      const result = await commonFormService.getStatusCodes(form);
      expect(result).toBeTruthy();
      expect(mockAxios.history.get).toHaveLength(1);
    });
  });

  describe('updateStatusCodes', () => {
    const endpoint = `${form}/current/statusCodes`;

    beforeEach(() => {
      mockAxios.reset();
    });

    it('throws when invalid form specified', () => {
      const result = () => commonFormService.updateStatusCodes(undefined, undefined);
      expect(result).toThrow('Invalid form specified');
      expect(mockAxios.history.put).toHaveLength(0);
    });

    it('calls update status codes endpoint', async () => {
      const data = { test: 'testdata' };
      mockAxios.onPut(endpoint).reply(200, data);

      const result = await commonFormService.updateStatusCodes(form, data);
      expect(result).toBeTruthy();
      expect(mockAxios.history.put).toHaveLength(1);
    });
  });

  describe('getSubmissionStatuses', () => {
    const endpoint = `${form}/submissions/${zeroUuid}/statuses`;

    beforeEach(() => {
      mockAxios.reset();
    });

    it('throws when invalid form specified', () => {
      const result = () => commonFormService.getSubmissionStatuses(undefined, zeroUuid);
      expect(result).toThrow('Invalid form specified');
      expect(mockAxios.history.get).toHaveLength(0);
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

    it('throws when invalid form specified', () => {
      const result = () => commonFormService.sendSubmissionStatuses(undefined, zeroUuid, undefined);
      expect(result).toThrow('Invalid form specified');
      expect(mockAxios.history.post).toHaveLength(0);
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

describe('Submissions', () => {
  describe('getAllSubmissionData', () => {
    const endpoint = `${form}/submissions`;

    beforeEach(() => {
      mockAxios.reset();
    });

    it('throws when invalid form specified', () => {
      const result = () => commonFormService.getAllSubmissionData(undefined);
      expect(result).toThrow('Invalid form specified');
      expect(mockAxios.history.get).toHaveLength(0);
    });

    it('calls all submission data endpoint', async () => {
      mockAxios.onGet(endpoint).reply(200);

      const result = await commonFormService.getAllSubmissionData(form);
      expect(result).toBeTruthy();
      expect(mockAxios.history.get).toHaveLength(1);
      expect(Object.keys(mockAxios.history.get[0].params)).toHaveLength(0);
    });

    it('calls all submission data endpoint with tiny set to false', async () => {
      mockAxios.onGet(endpoint).reply(200);

      const result = await commonFormService.getAllSubmissionData(form, { tiny: false });
      expect(result).toBeTruthy();
      expect(mockAxios.history.get).toHaveLength(1);
      expect(Object.keys(mockAxios.history.get[0].params)).toHaveLength(1);
      expect(mockAxios.history.get[0].params.tiny).toEqual(false);
    });
  });

  describe('getSubmission', () => {
    const endpoint = `${form}/submissions/${zeroUuid}`;

    beforeEach(() => {
      mockAxios.reset();
    });

    it('throws when invalid form specified', () => {
      const result = () => commonFormService.getSubmission(undefined, zeroUuid);
      expect(result).toThrow('Invalid form specified');
      expect(mockAxios.history.get).toHaveLength(0);
    });

    it('calls submission endpoint', async () => {
      mockAxios.onGet(endpoint).reply(200);

      const result = await commonFormService.getSubmission(form, zeroUuid);
      expect(result).toBeTruthy();
      expect(mockAxios.history.get).toHaveLength(1);
    });
  });

  describe('removeSubmission', () => {
    const endpoint = `${form}/submissions/${zeroUuid}`;

    beforeEach(() => {
      mockAxios.reset();
    });

    it('throws when invalid form specified', () => {
      const result = () => commonFormService.removeSubmission(undefined, zeroUuid);
      expect(result).toThrow('Invalid form specified');
      expect(mockAxios.history.delete).toHaveLength(0);
    });

    it('calls submission endpoint', async () => {
      mockAxios.onDelete(endpoint).reply(200);

      const result = await commonFormService.removeSubmission(form, zeroUuid);
      expect(result).toBeTruthy();
      expect(mockAxios.history.delete).toHaveLength(1);
    });
  });

  describe('sendSubmission', () => {
    const endpoint = `${form}/submissions`;

    beforeEach(() => {
      mockAxios.reset();
    });

    it('throws when invalid form specified', () => {
      const result = () => commonFormService.sendSubmission(undefined, undefined);
      expect(result).toThrow('Invalid form specified');
      expect(mockAxios.history.post).toHaveLength(0);
    });

    it('calls submit submission endpoint', async () => {
      const data = { test: 'testdata' };
      mockAxios.onPost(endpoint).reply(201);

      const result = await commonFormService.sendSubmission(form, data);
      expect(result).toBeTruthy();
      expect(mockAxios.history.post).toHaveLength(1);
    });
  });

  describe('updateSubmission', () => {
    const endpoint = `${form}/submissions/${zeroUuid}`;

    beforeEach(() => {
      mockAxios.reset();
    });

    it('throws when invalid form specified', () => {
      const result = () => commonFormService.updateSubmission(undefined, zeroUuid, undefined);
      expect(result).toThrow('Invalid form specified');
      expect(mockAxios.history.put).toHaveLength(0);
    });

    it('calls update submission endpoint', async () => {
      const data = { test: 'testdata' };
      mockAxios.onPut(endpoint).reply(201);

      const result = await commonFormService.updateSubmission(form, zeroUuid, data);
      expect(result).toBeTruthy();
      expect(mockAxios.history.put).toHaveLength(1);
    });
  });
});

describe('Team Management', () => {
  describe('getTeamRoles', () => {
    const endpoint = `${form}/team/roles`;

    beforeEach(() => {
      mockAxios.reset();
    });

    it('throws when invalid form specified', () => {
      const result = () => commonFormService.getTeamRoles(undefined);
      expect(result).toThrow('Invalid form specified');
      expect(mockAxios.history.get).toHaveLength(0);
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

    it('throws when invalid form specified', () => {
      const result = () => commonFormService.getTeamUsers(undefined);
      expect(result).toThrow('Invalid form specified');
      expect(mockAxios.history.get).toHaveLength(0);
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

    it('throws when invalid form specified', () => {
      const result = () => commonFormService.updateTeamUserRole(undefined, zeroUuid, data);
      expect(result).toThrow('Invalid form specified');
      expect(mockAxios.history.put).toHaveLength(0);
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

    it('throws when invalid form specified', () => {
      const result = () => commonFormService.requestTeamAccess(undefined);
      expect(result).toThrow('Invalid form specified');
      expect(mockAxios.history.post).toHaveLength(0);
    });

    it('calls request team access endpoint', async () => {
      mockAxios.onPost(endpoint).reply(201);

      const result = await commonFormService.requestTeamAccess(form);
      expect(result).toBeTruthy();
      expect(mockAxios.history.post).toHaveLength(1);
    });
  });
});
