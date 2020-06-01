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

describe('requestTeamAccess', () => {
  const endpoint = `${form}/team/access`;

  beforeEach(() => {
    mockAxios.reset();
  });

  it('calls team endpoint', async () => {
    mockAxios.onPost(endpoint).reply(201);

    const result = await commonFormService.requestTeamAccess(form);
    expect(result).toBeTruthy();
    expect(mockAxios.history.post).toHaveLength(1);
  });
});

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
