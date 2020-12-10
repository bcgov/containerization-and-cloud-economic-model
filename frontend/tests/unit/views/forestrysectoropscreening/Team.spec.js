import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

import getRouter from '@/router';
import Team from '@/views/forestrysectoropscreening/Team.vue';

const localVue = createLocalVue();
const router = getRouter();
localVue.use(router);
localVue.use(Vuetify);

describe('Team.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(Team, {
      localVue,
      router,
      stubs: ['BaseSecure', 'TeamTable']
    });

    expect(wrapper.text()).toContain('Team Management');
  });
});
