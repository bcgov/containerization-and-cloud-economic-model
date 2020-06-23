import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

import SubmissionsTable from '@/components/common/admin/SubmissionsTable.vue';
import commonFormService from '@/services/commonFormService';

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('SubmissionsTable.vue', () => {
  const formName = 'testform';

  const mockConsoleError = jest.spyOn(console, 'error');
  const getTeamRolesSpy = jest.spyOn(commonFormService, 'getAllSubmissionData');

  beforeEach(() => {
    mockConsoleError.mockReset();
    getTeamRolesSpy.mockReset();
  });

  afterAll(() => {
    mockConsoleError.mockRestore();
  });

  it('mounts and renders correctly with no elements', () => {
    getTeamRolesSpy.mockResolvedValue({ data: [] });

    const wrapper = shallowMount(SubmissionsTable, {
      localVue,
      propsData: { formName: formName }
    });

    expect(wrapper.html()).toContain('v-data-table');
    expect(getTeamRolesSpy).toHaveBeenCalledTimes(1);
  });

  it('mounts and renders correctly with an element', () => {
    getTeamRolesSpy.mockResolvedValue({ data: [{}] });

    const wrapper = shallowMount(SubmissionsTable, {
      localVue,
      propsData: { formName: formName }
    });

    expect(wrapper.html()).toContain('v-data-table');
    expect(getTeamRolesSpy).toHaveBeenCalledTimes(1);
  });

  it('shows failure error', () => {
    getTeamRolesSpy.mockRejectedValue('testErrorMsg');

    const wrapper = shallowMount(SubmissionsTable, {
      localVue,
      propsData: { formName: formName }
    });

    expect(wrapper.html()).toContain('v-data-table');
    expect(getTeamRolesSpy).toHaveBeenCalledTimes(1);
  });
});
