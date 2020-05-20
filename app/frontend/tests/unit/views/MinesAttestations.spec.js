import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';

import getRouter from '@/router';
import MinesAttestations from '@/views/MinesAttestations.vue';

const localVue = createLocalVue();
localVue.use(getRouter());
localVue.use(Vuetify);
localVue.use(Vuex);

describe('MinesAttestations.vue', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store();
  });

  it('renders', () => {
    const wrapper = shallowMount(MinesAttestations, { localVue, store });

    expect(wrapper.html()).toMatch('router-view');
  });
});
