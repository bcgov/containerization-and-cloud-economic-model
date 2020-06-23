import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

import SubmissionConfirmation from '@/components/common/attestation/SubmissionConfirmation.vue';
import { FormNames } from '@/utils/constants';

const localVue = createLocalVue();
localVue.use(Vuetify);


describe('SubmissionConfirmation.vue', () => {
  const { location } = window;
  const mockReload = jest.fn();

  const formName = FormNames.AGRISEAFOODOPSCREENING;
  const completedSubmission = {
    confirmationId: '3A9E24B9',
    contacts: [{ email: 'test@test.com' }],
    submissionId: '3A9E24B9-000-000-0000'
  };

  beforeAll(() => {
    delete window.location;
    window.location = {
      reload: mockReload
    };
  });

  beforeEach(() => {
    mockReload.mockReset();
  });

  afterAll(() => {
    window.location = location;
  });

  it('mounts and renders correctly', () => {
    const wrapper = shallowMount(SubmissionConfirmation, {
      localVue,
      propsData: {
        formName: formName,
        completedSubmission: completedSubmission
      }
    });

    expect(wrapper.html()).toContain('Your form has submitted successfully');
    expect(wrapper.html()).toContain(completedSubmission.confirmationId);
  });

  it('does not show health auth notification for a form without it', () => {
    const wrapper = shallowMount(SubmissionConfirmation, {
      localVue,
      propsData: {
        formName: formName,
        completedSubmission: completedSubmission
      }
    });

    expect(wrapper.html()).not.toContain('Download and Notify');
  });

  it('does shows health auth notification for a form with it', () => {
    const wrapper = shallowMount(SubmissionConfirmation, {
      localVue,
      propsData: {
        formName: FormNames.FORESTRYSECTOROPSCREENING,
        completedSubmission: completedSubmission
      }
    });

    expect(wrapper.html()).toContain('Download and Notify');
    expect(wrapper.html()).toContain('Health Authority Contacts for Industrial Camps');
  });

  it('can refresh the page', () => {
    const wrapper = shallowMount(SubmissionConfirmation, {
      localVue,
      propsData: {
        formName: formName,
        completedSubmission: completedSubmission
      }
    });
    wrapper.vm.refresh();

    expect(mockReload).toHaveBeenCalledTimes(1);
  });
});
