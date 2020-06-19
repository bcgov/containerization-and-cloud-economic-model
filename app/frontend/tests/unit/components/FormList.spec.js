import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';

import FormList from '@/components/FormList.vue';
import getRouter from '@/router';

const localVue = createLocalVue();
const router = getRouter();
localVue.use(router);
localVue.use(Vuetify);
localVue.use(Vuex);

describe('FormList.vue', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store();
  });

  it('renders', () => {
    store.registerModule('auth', {
      namespaced: true,
      getters: {
        hasResourceRoles: () => () => true
      }
    });

    const wrapper = shallowMount(FormList, { localVue, store, stubs: ['BaseActionCard'] });

    expect(wrapper.text()).toMatch('Agriculture and Seafood Operator Screening');
    // expect(wrapper.text()).toMatch('Forestry Sector Operator Screening');
    expect(wrapper.text()).toMatch('Mines Operator Screening');
    expect(wrapper.vm.forms).toHaveLength(3);
  });
});
