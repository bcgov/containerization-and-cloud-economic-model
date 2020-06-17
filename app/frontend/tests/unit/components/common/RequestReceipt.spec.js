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

  it('renders when clicked', () => {
    const wrapper = shallowMount(RequestReceipt, {
      localVue,
      propsData: {
        email: email,
        formName: formName,
        submissionId: zeroUuid
      }
    });
    wrapper.vm.displayDialog();

    expect(wrapper.text()).toContain('Email Receipt');
    expect(wrapper.vm.showDialog).toBeTruthy();
  });

  it('shows success result dialog', async () => {
    const to = 'to@foo.bar';
    requestReceiptEmailSpy.mockResolvedValue();
    const wrapper = shallowMount(RequestReceipt, {
      localVue,
      propsData: {
        email: email,
        formName: formName,
        submissionId: zeroUuid
      }
    });
    wrapper.setData({ to: to, valid: true });
    await wrapper.vm.requestReceipt();
    await wrapper.vm.$nextTick;

    expect(wrapper.vm.showDialog).toBeFalsy();
    expect(wrapper.vm.success).toBeTruthy();
    expect(wrapper.vm.resultDialog).toBeTruthy();
    expect(wrapper.vm.resultDialogMsg).toMatch(`An email has been sent to ${to}.`);
  });

  it('shows error result dialog', async () => {
    requestReceiptEmailSpy.mockRejectedValue();
    const wrapper = shallowMount(RequestReceipt, {
      localVue,
      propsData: {
        email: email,
        formName: formName,
        submissionId: zeroUuid
      }
    });
    wrapper.setData({ valid: true });
    await wrapper.vm.requestReceipt();
    await wrapper.vm.$nextTick;

    expect(wrapper.vm.showDialog).toBeFalsy();
    expect(wrapper.vm.success).toBeFalsy();
    expect(wrapper.vm.resultDialog).toBeTruthy();
    expect(wrapper.vm.resultDialogMsg).toMatch('An error occured while attempting to send your email.');
  });
});
