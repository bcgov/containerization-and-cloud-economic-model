import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

import Landing from '@/components/common/attestation/Landing.vue';

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('Landing.vue', () => {
  it('renders for agri', () => {
    const wrapper = shallowMount(Landing, {
      localVue,
      stubs: ['BaseHeaderSection', 'BaseInfoCard', 'BaseImportantCard', 'BaseWarningCardNew'],
      propsData: { formName: 'agriseafoodopscreening' }
    });

    expect(wrapper.html()).toMatch('This attestation form must be completed once for each accommodation location');
  });

  it('renders for forestry', () => {
    const wrapper = shallowMount(Landing, {
      localVue,
      stubs: ['BaseHeaderSection', 'BaseInfoCard', 'BaseImportantCard', 'BaseWarningCardNew'],
      propsData: { formName: 'forestrysectoropscreening' }
    });

    expect(wrapper.html()).toMatch('This attestation form must be completed once for each accommodation location');
  });

  it('shows the beforeStartInfo section for a form with it', () => {
    const wrapper = shallowMount(Landing, {
      localVue,
      stubs: ['BaseHeaderSection', 'BaseInfoCard', 'BaseImportantCard', 'BaseWarningCardNew'],
      propsData: { formName: 'agriseafoodopscreening' }
    });

    expect(wrapper.html()).toContain('you do not require a second inspection unless you are planning to use new accommodation sites that have never had an inspection.');
  });

  it('does not show beforeStartInfo for a form without it', () => {
    const wrapper = shallowMount(Landing, {
      localVue,
      stubs: ['BaseHeaderSection', 'BaseInfoCard', 'BaseImportantCard', 'BaseWarningCardNew'],
      propsData: { formName: 'forestrysectoropscreening' }
    });

    expect(wrapper.html()).not.toContain('you do not require a second inspection unless you are planning to use new accommodation sites that have never had an inspection.');
  });
});
