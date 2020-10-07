import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

import Root from '@/views/cloudeconomicmodel/Root.vue';

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('Root.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(Root, { localVue, stubs: ['Form']});

    expect(wrapper.html()).toContain('form-stub');
  });
});
