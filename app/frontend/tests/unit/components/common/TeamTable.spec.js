import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

import TeamTable from '@/components/common/TeamTable.vue';
import commonFormService from '@/services/commonFormService';

const localVue = createLocalVue();
localVue.use(Vuetify);

const NOROLE = 'No Access';

describe('TeamTable.vue', () => {
  const formName = 'testform';
  const testRole = 'testRole';
  const zeroUuid = '00000000-0000-0000-0000-000000000000';

  const mockConsoleError = jest.spyOn(console, 'error');
  const getTeamRolesSpy = jest.spyOn(commonFormService, 'getTeamRoles');
  const getTeamUsersSpy = jest.spyOn(commonFormService, 'getTeamUsers');
  const updateTeamUserRoleSpy = jest.spyOn(commonFormService, 'updateTeamUserRole');

  beforeEach(() => {
    mockConsoleError.mockReset();
    getTeamRolesSpy.mockReset();
    getTeamUsersSpy.mockReset();
    updateTeamUserRoleSpy.mockReset();
  });

  afterAll(() => {
    mockConsoleError.mockRestore();
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

  it('shows failure error', () => {
    getTeamRolesSpy.mockRejectedValue('testErrorMsg');
    getTeamUsersSpy.mockRejectedValue('testErrorMsg');

    const wrapper = shallowMount(TeamTable, {
      localVue,
      propsData: { formName: formName }
    });

    expect(wrapper.html()).toContain('v-data-table');
    expect(getTeamRolesSpy).toHaveBeenCalledTimes(1);
    expect(getTeamUsersSpy).toHaveBeenCalledTimes(1);
    expect(updateTeamUserRoleSpy).toHaveBeenCalledTimes(0);
  });

  it('selectableRoleNames filters correctly', () => {
    getTeamRolesSpy.mockResolvedValue({ data: [] });
    getTeamUsersSpy.mockResolvedValue({ data: [] });

    const wrapper = shallowMount(TeamTable, {
      localVue,
      propsData: { formName: formName }
    });
    wrapper.setData({
      roles: [
        { name: testRole },
        { name: 'Request Access' },
        { name: 'otherRole' }
      ]
    });
    const result = wrapper.vm.selectableRoleNames('otherRole');

    expect(result).toHaveLength(2);
    expect(getTeamRolesSpy).toHaveBeenCalledTimes(1);
    expect(getTeamUsersSpy).toHaveBeenCalledTimes(1);
    expect(updateTeamUserRoleSpy).toHaveBeenCalledTimes(0);
  });

  it('updateUserRole calls correctly', async () => {
    getTeamRolesSpy.mockResolvedValue({ data: [] });
    getTeamUsersSpy.mockResolvedValue({ data: [] });
    updateTeamUserRoleSpy.mockResolvedValue({ data: [] });

    const wrapper = shallowMount(TeamTable, {
      localVue,
      propsData: { formName: formName }
    });
    wrapper.setData({
      roles: [
        { name: testRole },
        { name: 'Request Access' },
        { name: 'otherRole' }
      ],
      selection: {
        [zeroUuid]: testRole
      },
      users: [
        { id: zeroUuid }
      ]
    });
    wrapper.vm.updateUserRole(zeroUuid);
    await wrapper.vm.$nextTick;

    expect(getTeamRolesSpy).toHaveBeenCalledTimes(1);
    expect(getTeamUsersSpy).toHaveBeenCalledTimes(1);
    expect(updateTeamUserRoleSpy).toHaveBeenCalledTimes(1);
  });

  it('updateUserRole handles an integrity failure', async () => {
    getTeamRolesSpy.mockResolvedValue({ data: [] });
    getTeamUsersSpy.mockResolvedValue({ data: [] });
    updateTeamUserRoleSpy.mockResolvedValue({ data: [{ name: 'garbage' }] });

    const wrapper = shallowMount(TeamTable, {
      localVue,
      propsData: { formName: formName }
    });
    wrapper.setData({
      roles: [
        { name: testRole },
        { name: 'Request Access' },
        { name: 'otherRole' }
      ],
      selection: {
        [zeroUuid]: NOROLE
      },
      users: [
        { id: zeroUuid }
      ]
    });
    wrapper.vm.updateUserRole(zeroUuid);
    await wrapper.vm.$nextTick;

    expect(getTeamRolesSpy).toHaveBeenCalledTimes(1);
    expect(getTeamUsersSpy).toHaveBeenCalledTimes(1);
    expect(updateTeamUserRoleSpy).toHaveBeenCalledTimes(1);
  });
});
