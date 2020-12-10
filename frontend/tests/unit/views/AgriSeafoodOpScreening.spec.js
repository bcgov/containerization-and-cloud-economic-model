import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';

import getRouter from '@/router';
import AgriSeafoodOpScreening from '@/views/AgriSeafoodOpScreening.vue';

const localVue = createLocalVue();
localVue.use(getRouter());
localVue.use(Vuetify);
localVue.use(Vuex);

describe('AgriSeafoodOpScreening.vue', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store();
  });

  it('renders', () => {
    store.registerModule('agriSeafoodOpScreeningForm', { namespaced: true });

    const wrapper = shallowMount(AgriSeafoodOpScreening, { localVue, store });

    expect(wrapper.html()).toMatch('router-view');
  });
});
