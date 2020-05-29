import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import commonFormService from '@/services/commonFormService';

const mockInstance = axios.create();
const mockAxios = new MockAdapter(mockInstance);

const form = 'testForm';

jest.mock('@/services/interceptors', () => {
  return {
    appAxios: () => mockInstance
  };
});

describe('getTeamRoles', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('calls team roles endpoint', async () => {
    mockAxios.onGet(`${form}/team/roles`).reply(200);

    const result = await commonFormService.getTeamRoles(form);
    expect(result).toBeTruthy();
    expect(mockAxios.history.get.length).toBe(1);
  });
});

describe('requestTeamAccess', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('calls team endpoint', async () => {
    mockAxios.onPost(`${form}/team/access`).reply(201);

    const result = await commonFormService.requestTeamAccess(form);
    expect(result).toBeTruthy();
    expect(mockAxios.history.post.length).toBe(1);
  });
});

describe('requestReceiptEmail', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('calls email endpoint', async () => {
    const data = {
      submissionId: 'TEST',
      to: 'test@example.com'
    };
    mockAxios.onPost(`${form}/submissions/email`).reply(201, data);

    const result = await commonFormService.requestReceiptEmail(form, data);
    expect(result).toBeTruthy();
    expect(result.data).toEqual(data);
    expect(mockAxios.history.post.length).toBe(1);
  });
});
