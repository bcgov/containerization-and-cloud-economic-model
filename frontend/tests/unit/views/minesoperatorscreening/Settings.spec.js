import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

import Settings from '@/views/minesoperatorscreening/Settings.vue';

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('Settings.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(Settings, { localVue, stubs: ['BaseSecure', 'SettingsPanel'] });

    expect(wrapper.text()).toContain('Settings');
  });
});
