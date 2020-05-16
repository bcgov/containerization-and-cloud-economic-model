import { createLocalVue, shallowMount } from './node_modules/@vue/test-utils';
import Vuetify from './node_modules/vuetify';

import Root from './node_modules/@/views/minesAttestations/Root.vue';

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('Root.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(Root, { localVue, stubs: ['Form']});

    expect(wrapper.html()).toContain('form-stub');
  });
});
