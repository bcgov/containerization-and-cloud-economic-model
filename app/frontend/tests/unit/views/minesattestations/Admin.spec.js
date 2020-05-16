import { createLocalVue, shallowMount } from './node_modules/@vue/test-utils';
import Vuetify from './node_modules/vuetify';

import Admin from './node_modules/@/views/minesattestations/Admin.vue';

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('Admin.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(Admin, { localVue, stubs: ['BaseSecure'] });

    expect(wrapper.html()).toMatch('Admin');
  });
});
