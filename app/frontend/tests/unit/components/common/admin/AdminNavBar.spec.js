import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';

import AdminNavBar from '@/components/common/admin/AdminNavBar.vue';
import getRouter from '@/router';

const router = getRouter();
const localVue = createLocalVue();
localVue.use(Vuex);

describe('AdminNavBar.vue', () => {
  const formName = 'testForm';
  const resource = `comfort-${formName}`;
  let store;

  beforeEach(() => {
    store = new Vuex.Store();
  });

  it('renders nothing when not on admin page', async () => {
    const wrapper = shallowMount(AdminNavBar, {
      localVue,
      propsData: { formName: formName, resource: resource },
      router,
      stubs: ['router-link']
    });

    expect(wrapper.text()).toBeFalsy();
  });

  // TODO: Figure out how to properly mock $route.path to correct value
  it.skip('renders non-admin buttons when on admin page', async () => {
    store.registerModule('auth', {
      namespaced: true,
      getters: {
        hasResourceRoles: () => () => false
      }
    });

    const wrapper = shallowMount(AdminNavBar, {
      localVue,
      mocks: {
        $route: { path: '/admin' }
      },
      propsData: { formName: formName, resource: resource },
      router,
      stubs: ['router-link']
    });

    expect(wrapper.html()).toContain('Submissions');
    expect(wrapper.text()).toContain('Dashboards');
  });

  // TODO: Figure out how to properly mock $route.path to correct value
  it.skip('renders admin buttons when on admin page', () => {
    store.registerModule('auth', {
      namespaced: true,
      getters: {
        hasResourceRoles: () => () => true
      }
    });

    const wrapper = shallowMount(AdminNavBar, {
      localVue,
      mocks: {
        $route: { path: '/admin' }
      },
      propsData: { formName: formName, resource: resource },
      router,
      stubs: ['router-link']
    });

    expect(wrapper.text()).toContain('Submissions');
    expect(wrapper.text()).toContain('Dashboards');
    expect(wrapper.text()).toContain('Team');
  });
});
