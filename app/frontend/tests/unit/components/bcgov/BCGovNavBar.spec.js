import { createLocalVue, shallowMount } from '@vue/test-utils';

import BCGovNavBar from '@/components/bcgov/BCGovNavBar.vue';
import getRouter from '@/router';

const localVue = createLocalVue();
localVue.use(getRouter());

describe('BCGovNavBar.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(BCGovNavBar, { localVue, stubs: ['router-link'] });

    expect(wrapper.text()).toContain('Home');
  });
});
