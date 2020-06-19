import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

import Landing from '@/components/common/Landing.vue';

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('Landing.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(Landing, {
      localVue,
      stubs: ['BaseContactCard', 'BaseInfoCard', 'BaseWarningCard']
    });

    expect(wrapper.html()).toMatch('Protect Industrial Camp employees, contractors, and employers, during the COVID-19 pandemic');
    expect(wrapper.html()).toMatch('The Province of British Columbia has initiated emergency measures to slow the spread of COVID-19. Industrial Camp Operators must ensure a safe workplace for their workers and demonstrate proof of an Infection Prevention Control protocol (IPCP).');
  });
});
