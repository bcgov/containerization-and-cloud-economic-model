import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

import Dashboards from '@/views/agriseafoodopscreening/Dashboards.vue';
import commonFormService from '@/services/commonFormService';

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('Dashboards.vue', () => {
  const mockConsoleError = jest.spyOn(console, 'error');
  const getNamedSettingSpy = jest.spyOn(commonFormService, 'getNamedSetting');

  beforeEach(() => {
    mockConsoleError.mockReset();
    getNamedSettingSpy.mockReset();
  });

  afterAll(() => {
    mockConsoleError.mockRestore();
  });

  it('renders on successful API call', () => {
    getNamedSettingSpy.mockResolvedValue({ data: { config: {} } });
    const wrapper = shallowMount(Dashboards, { localVue, stubs: ['BaseSecure'] });

    expect(wrapper.html()).toContain('basesecure');
    expect(getNamedSettingSpy).toHaveBeenCalledTimes(1);
  });

  it('renders on failed API call', () => {
    getNamedSettingSpy.mockRejectedValue({});
    const wrapper = shallowMount(Dashboards, { localVue, stubs: ['BaseSecure'] });

    expect(wrapper.html()).toContain('basesecure');
    expect(getNamedSettingSpy).toHaveBeenCalledTimes(1);
  });
});
