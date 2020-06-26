import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router'

import commonFormService from '@/services/commonFormService';
import DeleteButton from '@/components/common/admin/inspection/DeleteButton.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);
localVue.use(VueRouter);

describe('DeleteButton.vue', () => {
  const apiPath = 'apiPath';
  const basePath = 'basePath';
  const formName = 'testform';
  const zeroUuid = '00000000-0000-0000-0000-000000000000';

  const removeSubmissionSpy = jest.spyOn(commonFormService, 'removeSubmission');

  let store;
  let router;

  const setupWrapper = store => {
    return shallowMount(DeleteButton, {
      localVue,
      mocks: {
        $config: {
          apiPath: apiPath,
          basePath: basePath
        }
      },
      propsData: {
        formName: formName,
        submissionId: zeroUuid
      },
      store,
      stubs: ['BaseDialog'],
      router
    });
  };

  beforeEach(() => {
    removeSubmissionSpy.mockReset();
    store = new Vuex.Store();
    router = new VueRouter();

  });

  it('renders with editor privileges', () => {
    store.registerModule('auth', {
      namespaced: true,
      getters: { hasResourceRoles: () => () => true }
    });

    const wrapper = setupWrapper(store);

    expect(wrapper.text()).toMatch('DELETE SUBMISSION');
    expect(wrapper.html()).not.toContain('disabled');
  });

  it('renders without editor privileges, and disabled', () => {
    store.registerModule('auth', {
      namespaced: true,
      getters: { hasResourceRoles: () => () => false }
    });

    const wrapper = setupWrapper(store);

    expect(wrapper.text()).toMatch('DELETE SUBMISSION');
    expect(wrapper.html()).toContain('disabled');
  });

  it('sets the dialogShow when the method is called', () => {
    store.registerModule('auth', {
      namespaced: true,
      getters: { hasResourceRoles: () => () => true }
    });

    const wrapper = setupWrapper(store);

    expect(wrapper.vm.showDialog).toBe(false);
    wrapper.vm.displayDialog();
    expect(wrapper.vm.showDialog).toBe(true);
  });

  it('calls the removeSubmission method', async () => {
    removeSubmissionSpy.mockResolvedValue();
    store.registerModule('auth', {
      namespaced: true,
      getters: { hasResourceRoles: () => () => true }
    });

    const wrapper = setupWrapper(store);

    await wrapper.vm.deleteSubmission();

    expect(removeSubmissionSpy).toHaveBeenCalledTimes(1);
    expect(removeSubmissionSpy).toHaveBeenCalledWith(formName, zeroUuid);
    expect(wrapper.vm.deleteError).toBe('');
    expect(wrapper.vm.showDialog).toBe(false);
  });

  it('shows an error if removeSubmission fails', async () => {
    removeSubmissionSpy.mockImplementation(() => {
      throw new Error();
    });
    store.registerModule('auth', {
      namespaced: true,
      getters: { hasResourceRoles: () => () => true }
    });

    const wrapper = setupWrapper(store);

    await wrapper.vm.deleteSubmission();

    expect(removeSubmissionSpy).toHaveBeenCalledTimes(1);
    expect(removeSubmissionSpy).toHaveBeenCalledWith(formName, zeroUuid);
    expect(wrapper.vm.deleteError).toBe('An error occured while trying to delete the submission.');
  });
});
