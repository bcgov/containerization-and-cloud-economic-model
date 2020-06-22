import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';

import InspectionPanel from '@/components/common/admin/inspection/InspectionPanel.vue';
import commonFormService from '@/services/commonFormService';
import { FormNames } from '@/utils/constants';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);

describe('InspectionPanel.vue', () => {
  const date = new Date();
  const formName = FormNames.MINESOPERATORSCREENING;
  const zeroUuid = '00000000-0000-0000-0000-000000000000';

  const mockConsoleError = jest.spyOn(console, 'error');
  const getSubmissionStatusesSpy = jest.spyOn(commonFormService, 'getSubmissionStatuses');
  const getStatusCodesSpy = jest.spyOn(commonFormService, 'getStatusCodes');
  const sendSubmissionStatusesSpy = jest.spyOn(commonFormService, 'sendSubmissionStatuses');
  const addNoteToStatusSpy = jest.spyOn(commonFormService, 'addNoteToStatus');

  let store;

  beforeEach(() => {
    mockConsoleError.mockReset();
    getSubmissionStatusesSpy.mockReset();
    getStatusCodesSpy.mockReset();
    store = new Vuex.Store();
  });

  afterAll(() => {
    mockConsoleError.mockRestore();
  });

  it('renders without reviewer privileges', () => {
    getSubmissionStatusesSpy.mockResolvedValue({ data: [{}] });
    getStatusCodesSpy.mockResolvedValue({ data: [{}] });
    store.registerModule('auth', {
      namespaced: true,
      getters: {
        fullName: () => 'fullName',
        email: () => 'test@example.com',
        hasResourceRoles: () => () => false,
        token: () => 'testToken'
      }
    });

    const wrapper = shallowMount(InspectionPanel, {
      localVue,
      propsData: {
        formName: formName,
        submissionId: zeroUuid
      },
      store
    });

    expect(wrapper.text()).toMatch('Status');
  });

  it('renders with reviewer privileges', () => {
    getSubmissionStatusesSpy.mockResolvedValue({ data: [{}] });
    getStatusCodesSpy.mockResolvedValue({ data: [{}] });
    store.registerModule('auth', {
      namespaced: true,
      getters: {
        fullName: () => 'fullName',
        email: () => 'test@example.com',
        hasResourceRoles: () => () => true,
        token: () => 'testToken'
      }
    });

    const wrapper = shallowMount(InspectionPanel, {
      localVue,
      propsData: {
        formName: formName,
        submissionId: zeroUuid
      },
      store
    });

    expect(wrapper.text()).toMatch('Status');
  });

  it('renders with error message', () => {
    getSubmissionStatusesSpy.mockRejectedValue('testError');
    getStatusCodesSpy.mockResolvedValue({ data: [{}] });
    store.registerModule('auth', {
      namespaced: true,
      getters: {
        fullName: () => 'fullName',
        email: () => 'test@example.com',
        hasResourceRoles: () => () => true,
        token: () => 'testToken'
      }
    });

    const wrapper = shallowMount(InspectionPanel, {
      localVue,
      propsData: {
        formName: formName,
        submissionId: zeroUuid
      },
      store
    });

    expect(wrapper.text()).toMatch('Status');
  });

  it('assignToCurrentUser assigns correct values', () => {
    getSubmissionStatusesSpy.mockResolvedValue({ data: [{}] });
    getStatusCodesSpy.mockResolvedValue({ data: [{}] });
    store.registerModule('auth', {
      namespaced: true,
      getters: {
        fullName: () => 'fullName',
        email: () => 'test@example.com',
        hasResourceRoles: () => () => true,
        token: () => 'testToken'
      }
    });

    const wrapper = shallowMount(InspectionPanel, {
      localVue,
      propsData: {
        formName: formName,
        submissionId: zeroUuid
      },
      store
    });
    wrapper.vm.assignToCurrentUser();

    expect(wrapper.text()).toMatch('Status');
    expect(wrapper.vm.assignedTo).toMatch('fullName');
    expect(wrapper.vm.assignedToEmail).toMatch('test@example.com');
  });

  it('resetForm resets values correctly', () => {
    getSubmissionStatusesSpy.mockResolvedValue({ data: [{}] });
    getStatusCodesSpy.mockResolvedValue({ data: [{}] });
    store.registerModule('auth', {
      namespaced: true,
      getters: {
        fullName: () => 'fullName',
        email: () => 'test@example.com',
        hasResourceRoles: () => () => true,
        token: () => 'testToken'
      }
    });

    const wrapper = shallowMount(InspectionPanel, {
      localVue,
      propsData: {
        formName: formName,
        submissionId: zeroUuid
      },
      store
    });
    wrapper.vm.$refs.form = { resetValidation: () => {} };
    wrapper.vm.resetForm();

    expect(wrapper.text()).toMatch('Status');
    expect(wrapper.vm.statusFields).toBeFalsy();
    expect(wrapper.vm.statusToSet).toBeNull();
    expect(wrapper.vm.statusFields).toBeFalsy();
    expect(wrapper.vm.note).toBeFalsy();
  });

  it('updateStatus does nothing when form is not valid', async () => {
    getSubmissionStatusesSpy.mockResolvedValue({ data: [{}] });
    getStatusCodesSpy.mockResolvedValue({ data: [{}] });
    store.registerModule('auth', {
      namespaced: true,
      getters: {
        fullName: () => 'fullName',
        email: () => 'test@example.com',
        hasResourceRoles: () => () => true,
        token: () => 'testToken'
      }
    });

    const wrapper = shallowMount(InspectionPanel, {
      localVue,
      propsData: {
        formName: formName,
        submissionId: zeroUuid
      },
      store
    });
    wrapper.vm.$refs.form = { validate: () => false };
    await wrapper.vm.updateStatus();

    expect(wrapper.text()).toMatch('Status');
    expect(wrapper.vm.error).toBeFalsy();
  });

  it('updateStatus throws if statusToSet is undefined', async () => {
    getSubmissionStatusesSpy.mockResolvedValue({ data: [{}] });
    getStatusCodesSpy.mockResolvedValue({ data: [{}] });
    sendSubmissionStatusesSpy.mockResolvedValue({ data: [{}] });
    addNoteToStatusSpy.mockResolvedValue({ data: [{}] });
    store.registerModule('auth', {
      namespaced: true,
      getters: {
        fullName: () => 'fullName',
        email: () => 'test@example.com',
        hasResourceRoles: () => () => true,
        token: () => 'testToken'
      }
    });

    const wrapper = shallowMount(InspectionPanel, {
      localVue,
      propsData: {
        formName: formName,
        submissionId: zeroUuid
      },
      store
    });
    wrapper.vm.$refs.form = { validate: () => true };
    await wrapper.vm.updateStatus();

    expect(wrapper.text()).toMatch('Status');
    expect(wrapper.vm.error).toMatch('An error occured while trying to update the status');
  });

  it('updateStatus can update statuses without notes', async () => {
    getSubmissionStatusesSpy.mockResolvedValue({ data: [{}] });
    getStatusCodesSpy.mockResolvedValue({ data: [{}] });
    sendSubmissionStatusesSpy.mockResolvedValue({ data: [{}] });
    store.registerModule('auth', {
      namespaced: true,
      getters: {
        fullName: () => 'fullName',
        email: () => 'test@example.com',
        hasResourceRoles: () => () => true,
        token: () => 'testToken'
      }
    });

    const wrapper = shallowMount(InspectionPanel, {
      localVue,
      propsData: {
        formName: formName,
        submissionId: zeroUuid
      },
      store
    });
    wrapper.vm.$refs.form = {
      resetValidation: () => { },
      validate: () => true
    };
    wrapper.setData({
      actionDate: date,
      assignedTo: 'test',
      assignedToEmail: 'test@example.com',
      statusToSet: 'ASSIGNED'
    });
    await wrapper.vm.updateStatus();

    expect(wrapper.text()).toMatch('Status');
  });

  it('updateStatus can throw on statuses without notes', async () => {
    getSubmissionStatusesSpy.mockResolvedValue({ data: [{}] });
    getStatusCodesSpy.mockResolvedValue({ data: [{}] });
    sendSubmissionStatusesSpy.mockResolvedValue({});
    store.registerModule('auth', {
      namespaced: true,
      getters: {
        fullName: () => 'fullName',
        email: () => 'test@example.com',
        hasResourceRoles: () => () => true,
        token: () => 'testToken'
      }
    });

    const wrapper = shallowMount(InspectionPanel, {
      localVue,
      propsData: {
        formName: formName,
        submissionId: zeroUuid
      },
      store
    });
    wrapper.vm.$refs.form = { validate: () => true };
    wrapper.setData({
      actionDate: date,
      assignedTo: 'test',
      assignedToEmail: 'test@example.com',
      statusToSet: 'ASSIGNED'
    });
    await wrapper.vm.updateStatus();

    expect(wrapper.text()).toMatch('Status');
    expect(wrapper.vm.error).toMatch('An error occured while trying to update the status');
  });

  it('updateStatus can update statuses with notes', async () => {
    getSubmissionStatusesSpy.mockResolvedValue({ data: [{}] });
    getStatusCodesSpy.mockResolvedValue({ data: [{}] });
    sendSubmissionStatusesSpy.mockResolvedValue({ data: [{}] });
    addNoteToStatusSpy.mockResolvedValue({ data: [{}] });
    store.registerModule('auth', {
      namespaced: true,
      getters: {
        fullName: () => 'fullName',
        email: () => 'test@example.com',
        hasResourceRoles: () => () => true,
        token: () => 'testToken'
      }
    });

    const wrapper = shallowMount(InspectionPanel, {
      localVue,
      propsData: {
        formName: formName,
        submissionId: zeroUuid
      },
      store
    });
    wrapper.vm.$refs.form = {
      resetValidation: () => { },
      validate: () => true
    };
    wrapper.setData({
      actionDate: date,
      assignedTo: 'test',
      assignedToEmail: 'test@example.com',
      note: 'testNote',
      statusToSet: 'ASSIGNED'
    });
    await wrapper.vm.updateStatus();

    expect(wrapper.text()).toMatch('Status');
  });

  it('updateStatus can throw on statuses with notes', async () => {
    getSubmissionStatusesSpy.mockResolvedValue({ data: [{}] });
    getStatusCodesSpy.mockResolvedValue({ data: [{}] });
    sendSubmissionStatusesSpy.mockResolvedValue({ data: [{}] });
    addNoteToStatusSpy.mockResolvedValue({});
    store.registerModule('auth', {
      namespaced: true,
      getters: {
        fullName: () => 'fullName',
        email: () => 'test@example.com',
        hasResourceRoles: () => () => true,
        token: () => 'testToken'
      }
    });

    const wrapper = shallowMount(InspectionPanel, {
      localVue,
      propsData: {
        formName: formName,
        submissionId: zeroUuid
      },
      store
    });
    wrapper.vm.$refs.form = { validate: () => true };
    wrapper.setData({
      actionDate: date,
      assignedTo: 'test',
      assignedToEmail: 'test@example.com',
      note: 'testNote',
      statusToSet: 'ASSIGNED'
    });
    await wrapper.vm.updateStatus();

    expect(wrapper.text()).toMatch('Status');
    expect(wrapper.vm.error).toMatch('An error occured while trying to update the status');
  });
});
