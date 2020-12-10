import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

import getRouter from '@/router';
import BCGovHeader from '@/components/bcgov/BCGovHeader.vue';

const localVue = createLocalVue();
localVue.use(getRouter());
localVue.use(Vuetify);

describe('BCGovHeader.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(BCGovHeader, {
      localVue,
      stubs: ['BaseAuthButton']
    });

    expect(wrapper.html()).toMatch('');
  });
});
