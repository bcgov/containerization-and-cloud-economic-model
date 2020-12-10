import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

import Admin from '@/views/cloudeconomicmodel/Admin.vue';

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('Admin.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(Admin, { localVue, stubs: ['BaseSecure'] });

    expect(wrapper.html()).toContain('<h1>Submissions</h1>');
  });
});
