import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

import TeamTable from '@/components/common/TeamTable.vue';
import commonFormService from '@/services/commonFormService';

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('TeamTable.vue', () => {
  const formName = 'testform';
  const getTeamRolesSpy = jest.spyOn(commonFormService, 'getTeamRoles');
  const getTeamUsersSpy = jest.spyOn(commonFormService, 'getTeamUsers');
  const updateTeamUserRoleSpy = jest.spyOn(commonFormService, 'updateTeamUserRole');

  beforeEach(() => {
    getTeamRolesSpy.mockReset();
    getTeamUsersSpy.mockReset();
    updateTeamUserRoleSpy.mockReset();
  });

  it('mounts and renders correctly', () => {
    getTeamRolesSpy.mockResolvedValue({ data: [] });
    getTeamUsersSpy.mockResolvedValue({ data: [] });

    const wrapper = shallowMount(TeamTable, {
      localVue,
      propsData: { formName: formName }
    });

    expect(wrapper.html()).toContain('v-data-table');
    expect(getTeamRolesSpy).toHaveBeenCalledTimes(1);
    expect(getTeamUsersSpy).toHaveBeenCalledTimes(1);
    expect(updateTeamUserRoleSpy).toHaveBeenCalledTimes(0);
  });
});
