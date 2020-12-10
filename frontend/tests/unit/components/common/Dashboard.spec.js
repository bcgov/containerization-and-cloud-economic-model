import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';

import Dashboard from '@/components/common/Dashboard.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Dashboard.vue', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store();
  });

  it('renders iframe if authorized and configured', () => {
    const url = 'testUrl';
    store.registerModule('auth', {
      namespaced: true,
      getters: {
        hasResourceRoles: () => () => true
      }
    });

    const wrapper = shallowMount(Dashboard, {
      localVue,
      store,
      propsData: {
        url: url
      }
    });

    expect(wrapper.html()).toMatch(`iframe src="${url}"`);
  });

  it('renders message if authorized but not configured', () => {
    store.registerModule('auth', {
      namespaced: true,
      getters: {
        hasResourceRoles: () => () => true
      }
    });

    const wrapper = shallowMount(Dashboard, { localVue, store });

    expect(wrapper.text()).toMatch('No dashboard has been configured.');
  });

  it('renders message if unauthorized', () => {
    store.registerModule('auth', {
      namespaced: true,
      getters: {
        hasResourceRoles: () => () => false
      }
    });

    const wrapper = shallowMount(Dashboard, { localVue, store });

    expect(wrapper.text()).toMatch('You are not authorized to view this dashboard.');
  });
});
