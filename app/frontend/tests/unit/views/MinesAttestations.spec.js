import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

import getRouter from '@/router';
import MinesAttestations from '@/views/MinesAttestations.vue';

const localVue = createLocalVue();
localVue.use(getRouter());
localVue.use(Vuetify);

describe('MinesAttestations.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(MinesAttestations, { localVue });

    expect(wrapper.html()).toMatch('router-view');
  });
});
