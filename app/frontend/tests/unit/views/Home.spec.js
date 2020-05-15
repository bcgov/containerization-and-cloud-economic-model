import { shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

import Home from '@/views/Home.vue';

describe('Home.vue', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('renders', () => {
    const wrapper = shallowMount(Home, {
      vuetify,
      stubs: ['BCGovNavBar', 'HelloWorld']
    });

    expect(wrapper.html()).toMatch('Welcome to Vuetify');
  });
});
