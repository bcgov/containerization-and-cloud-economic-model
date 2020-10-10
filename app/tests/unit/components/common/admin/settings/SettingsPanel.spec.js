import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

import SettingsPanel from '@/components/common/admin/settings/SettingsPanel.vue';
import commonFormService from '@/services/commonFormService';

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('SettingsPanel.vue', () => {
  const formName = 'testForm';

  const mockConsoleError = jest.spyOn(console, 'error');
  const getSettingsSpy = jest.spyOn(commonFormService, 'getSettings');

  beforeEach(() => {
    mockConsoleError.mockReset();
    getSettingsSpy.mockReset();
  });

  afterAll(() => {
    mockConsoleError.mockRestore();
  });

  it('renders when resolved', () => {
    getSettingsSpy.mockResolvedValue({ data: [] });
    const wrapper = shallowMount(SettingsPanel, { localVue, propsData: { formName: formName } });

    expect(wrapper.html()).toMatch('v-progress-linear');
    expect(getSettingsSpy).toHaveBeenCalledTimes(1);
  });

  it('renders error if rejected', () => {
    getSettingsSpy.mockRejectedValue('testError');
    const wrapper = shallowMount(SettingsPanel, { localVue, propsData: { formName: formName } });

    expect(wrapper.html()).toMatch('v-progress-linear');
    expect(getSettingsSpy).toHaveBeenCalledTimes(1);
  });
});
