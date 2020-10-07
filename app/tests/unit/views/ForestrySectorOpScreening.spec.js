import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';

import getRouter from '@/router';
import ForestrySectorOpScreening from '@/views/ForestrySectorOpScreening.vue';

const localVue = createLocalVue();
localVue.use(getRouter());
localVue.use(Vuetify);
localVue.use(Vuex);

describe('ForestrySectorOpScreening.vue', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store();
  });

  it('renders', () => {
    store.registerModule('forestrySectorOpScreeningForm', { namespaced: true });

    const wrapper = shallowMount(ForestrySectorOpScreening, { localVue, store });

    expect(wrapper.html()).toMatch('router-view');
  });
});
