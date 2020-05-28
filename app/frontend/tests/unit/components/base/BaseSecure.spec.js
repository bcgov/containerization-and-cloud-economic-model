import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import BaseSecure from '@/components/base/BaseSecure.vue';
import getRouter from '@/router';
import commonFormService from '@/services/commonFormService';

const localVue = createLocalVue();
const router = getRouter();
localVue.use(router);
localVue.use(Vuex);

describe('BaseSecure.vue', () => {
  const { location } = window;
  const mockReplace = jest.fn(cb => {
    cb();
  });
  const requestTeamSpy = jest.spyOn(commonFormService, 'requestTeam');
  let store;

  beforeAll(() => {
    delete window.location;
    window.location = {
      replace: mockReplace
    };
  });

  beforeEach(() => {
    mockReplace.mockReset();
    requestTeamSpy.mockReset();
    store = new Vuex.Store();
  });

  afterAll(() => {
    window.location = location;
  });

  it('renders nothing if authenticated and authorized', () => {
    store.registerModule('auth', {
      namespaced: true,
      getters: {
        authenticated: () => true,
        hasResourceRoles: () => () => true,
        keycloakReady: () => true
      }
    });

    const wrapper = shallowMount(BaseSecure, { localVue, router, store, stubs: ['BaseDialog'] });

    expect(wrapper.text()).toMatch('');
  });

  it('renders if authenticated and unauthorized', () => {
    store.registerModule('auth', {
      namespaced: true,
      getters: {
        authenticated: () => true,
        hasResourceRoles: () => () => false,
        keycloakReady: () => true
      }
    });

    const wrapper = shallowMount(BaseSecure, {
      localVue,
      propsData: {
        admin: true
      },
      store,
      stubs: ['BaseDialog']
    });

    expect(wrapper.text()).toMatch('Thank you for logging in.');
    expect(wrapper.text()).toMatch('You have not been granted access to this feature yet.');
    expect(wrapper.text()).toMatch('Request Access');
  });

  it('renders a message with login button if unauthenticated', () => {
    store.registerModule('auth', {
      namespaced: true,
      getters: {
        authenticated: () => false,
        hasResourceRoles: () => () => false,
        keycloakReady: () => true
      }
    });

    const wrapper = shallowMount(BaseSecure, { localVue, router, store, stubs: ['BaseDialog'] });

    expect(wrapper.text()).toMatch('You must be logged in to use this feature.');
    expect(wrapper.text()).toMatch('Login');
  });

  it('renders a message without login button if unauthenticated', () => {
    store.registerModule('auth', {
      namespaced: true,
      getters: {
        authenticated: () => false,
        hasResourceRoles: () => () => false,
        keycloakReady: () => false
      }
    });

    const wrapper = shallowMount(BaseSecure, { localVue, router, store, stubs: ['BaseDialog'] });

    expect(wrapper.text()).toMatch('You must be logged in to use this feature.');
  });

  it('login button redirects to login url', () => {
    store.registerModule('auth', {
      namespaced: true,
      getters: {
        authenticated: () => false,
        createLoginUrl: () => () => 'test',
        keycloakReady: () => true
      }
    });

    const wrapper = shallowMount(BaseSecure, { localVue, router, store, stubs: ['BaseDialog'] });
    wrapper.vm.login();

    expect(wrapper.text()).toMatch('Login');
    expect(mockReplace).toHaveBeenCalledTimes(1);
  });

  it('requestAccess button shows success dialog on successful call', async () => {
    requestTeamSpy.mockResolvedValue();
    store.registerModule('auth', {
      namespaced: true,
      getters: {
        authenticated: () => true,
        hasResourceRoles: () => () => false,
        keycloakReady: () => true
      }
    });

    const wrapper = shallowMount(BaseSecure, { localVue, router, store, stubs: ['BaseDialog'] });
    await wrapper.vm.requestAccess();
    await localVue.nextTick();

    expect(wrapper.vm.success).toBeTruthy();
    expect(wrapper.vm.resultDialog).toBeTruthy();
    expect(wrapper.vm.resultDialogMsg).toMatch('Your access request has been submitted. Please check back later.');
    expect(requestTeamSpy).toHaveBeenCalledTimes(1);
  });

  it('requestAccess button shows failure dialog on failed call', async () => {
    requestTeamSpy.mockRejectedValue();
    store.registerModule('auth', {
      namespaced: true,
      getters: {
        authenticated: () => true,
        hasResourceRoles: () => () => false,
        keycloakReady: () => true
      }
    });

    const wrapper = shallowMount(BaseSecure, { localVue, router, store, stubs: ['BaseDialog'] });
    await wrapper.vm.requestAccess();
    await localVue.nextTick();

    expect(wrapper.vm.success).toBeFalsy();
    expect(wrapper.vm.resultDialog).toBeTruthy();
    expect(wrapper.vm.resultDialogMsg).toMatch('An error occured while attempting to request access.');
    expect(requestTeamSpy).toHaveBeenCalledTimes(1);
  });
});
