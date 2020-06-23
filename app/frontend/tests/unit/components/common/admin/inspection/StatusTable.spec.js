import moment from 'moment';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

import StatusTable from '@/components/common/admin/inspection/StatusTable.vue';
import commonFormService from '@/services/commonFormService';
import { FormNames } from '@/utils/constants';

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('StatusTable.vue', () => {
  const date = new Date();
  const formName = FormNames.MINESOPERATORSCREENING;
  const zeroUuid = '00000000-0000-0000-0000-000000000000';

  const getSubmissionStatusesSpy = jest.spyOn(commonFormService, 'getSubmissionStatuses');

  beforeEach(() => {
    getSubmissionStatusesSpy.mockReset();
  });

  it('renders the data table', () => {
    getSubmissionStatusesSpy.mockResolvedValue({ data: [{}] });

    const wrapper = shallowMount(StatusTable, {
      localVue,
      propsData: {
        formName: formName,
        submissionId: zeroUuid
      }
    });

    expect(wrapper.html()).toMatch('v-data-table');
    expect(getSubmissionStatusesSpy).toHaveBeenCalledTimes(1);
  });

  it('formatDateTime returns a formatted date string', () => {
    getSubmissionStatusesSpy.mockResolvedValue({ data: [{}] });

    const wrapper = shallowMount(StatusTable, {
      localVue,
      propsData: {
        formName: formName,
        submissionId: zeroUuid
      }
    });
    const result = wrapper.vm.formatDateTime(date);

    expect(wrapper.html()).toMatch('v-data-table');
    expect(result).toMatch(date.toLocaleString());
    expect(getSubmissionStatusesSpy).toHaveBeenCalledTimes(1);
  });

  it('formatDate returns a formatted date string', () => {
    getSubmissionStatusesSpy.mockResolvedValue({ data: [{}] });

    const wrapper = shallowMount(StatusTable, {
      localVue,
      propsData: {
        formName: formName,
        submissionId: zeroUuid
      }
    });
    const result = wrapper.vm.formatDate(date);

    expect(wrapper.html()).toMatch('v-data-table');
    expect(result).toMatch(moment(date).format('MMMM D YYYY'));
    expect(getSubmissionStatusesSpy).toHaveBeenCalledTimes(1);
  });

  it('getData warns when no statuses are found', async () => {
    getSubmissionStatusesSpy.mockResolvedValue({ data: [] });

    const wrapper = shallowMount(StatusTable, {
      localVue,
      propsData: {
        formName: formName,
        submissionId: zeroUuid
      }
    });
    await wrapper.vm.getData();

    expect(wrapper.html()).toMatch('v-data-table');
    expect(wrapper.vm.loading).toBeFalsy();
    expect(wrapper.vm.alertType).toMatch('warning');
    expect(wrapper.vm.alertMessage).toMatch('No statuses found');
    expect(wrapper.vm.showAlert).toBeTruthy();
    expect(getSubmissionStatusesSpy).toHaveBeenCalledTimes(2);
  });

  it('getData errors when API call fails', async () => {
    const testMsg = 'testErrorMsg';
    getSubmissionStatusesSpy.mockImplementation(() => {
      throw new Error(testMsg);
    });

    const wrapper = shallowMount(StatusTable, {
      localVue,
      propsData: {
        formName: formName,
        submissionId: zeroUuid
      }
    });
    await wrapper.vm.getData();

    expect(wrapper.html()).toMatch('v-data-table');
    expect(wrapper.vm.loading).toBeFalsy();
    expect(wrapper.vm.alertType).toMatch('error');
    expect(wrapper.vm.alertMessage).toMatch(testMsg);
    expect(wrapper.vm.showAlert).toBeTruthy();
    expect(getSubmissionStatusesSpy).toHaveBeenCalledTimes(2);
  });
});
