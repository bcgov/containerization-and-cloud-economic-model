import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

import RequestReceipt from '@/components/common/RequestReceipt.vue';
import commonFormService from '@/services/commonFormService';

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('RequestReceipt.vue', () => {
  const email = 'test@example.com';
  const formName = 'testform';
  const zeroUuid = '00000000-0000-0000-0000-000000000000';
  const requestReceiptEmailSpy = jest.spyOn(commonFormService, 'requestReceiptEmail');

  beforeEach(() => {
    requestReceiptEmailSpy.mockReset();
  });

  it('renders', () => {
    const wrapper = shallowMount(RequestReceipt, {
      localVue,
      propsData: {
        email: email,
        formName: formName,
        submissionId: zeroUuid
      }
    });

    expect(wrapper.text()).toContain('Email Receipt');
  });
});
