import { shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

import Secure from '@/App.vue';

describe('Secure.vue', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('renders', () => {
    const wrapper = shallowMount(Secure, {
      vuetify,
      stubs: ['BaseSecure', 'BCGovFooter', 'BCGovHeader', 'router-view']
    });

    expect(wrapper.html()).toMatch('v-main');
  });
});
