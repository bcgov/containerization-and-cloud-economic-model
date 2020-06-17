import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

import PrintScreenButton from '@/components/common/PrintScreenButton.vue';

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('PrintScreenButton.vue', () => {
  const mockPrint = jest.spyOn(window, 'print');

  beforeEach(() => {
    mockPrint.mockReset();
  });

  it('renders and invokes window print', () => {
    mockPrint.mockImplementation(() => {});
    const wrapper = shallowMount(PrintScreenButton, { localVue });

    const anchor = wrapper.find('a');
    expect(anchor.exists()).toBeTruthy();
    expect(anchor.attributes('target')).toBe('_blank');

    anchor.trigger('click');
    expect(mockPrint).toHaveBeenCalledTimes(1);
  });
});
