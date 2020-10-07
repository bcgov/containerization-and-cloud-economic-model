import moment from 'moment';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

import SubmissionHeader from '@/components/common/admin/SubmissionHeader.vue';

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('SubmissionHeader.vue', () => {
  const business = 'testBusiness';
  const date = new Date();
  const form = 'testForm';
  const zeroUuid = '00000000-0000-0000-0000-000000000000';

  it('renders', () => {
    const wrapper = shallowMount(SubmissionHeader, {
      localVue,
      propsData: {
        attestation: {
          createdAt: date
        },
        business: {
          name: business
        },
        formName: form,
        location: {
          endDate: date,
          startDate: date
        },
        submissionId: zeroUuid
      },
      stubs: ['GeneratePdfButton']
    });

    expect(wrapper.text()).toMatch('Submitted:');
    expect(wrapper.text()).toMatch(moment(date).format('MMMM D YYYY, h:mm:ss a'));
    expect(wrapper.text()).toMatch('Confirmation ID:');
    expect(wrapper.text()).toMatch(zeroUuid.split('-')[0].toUpperCase());
    expect(wrapper.text()).toMatch('Operation Dates:');
    expect(wrapper.text()).toMatch(moment(date).format('MMMM D YYYY'));
  });
});
