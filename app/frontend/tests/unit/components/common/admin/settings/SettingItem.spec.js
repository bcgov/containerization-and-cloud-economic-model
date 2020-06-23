import moment from 'moment';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

import SettingItem from '@/components/common/admin/settings/SettingItem.vue';

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('SettingItem.vue', () => {
  const date = new Date();
  const item = {
    enabled: true,
    config: { foo: 'bar' },
    updatedAt: date,
    updatedBy: 'test'
  };

  it('renders', () => {
    const wrapper = shallowMount(SettingItem, { localVue, propsData: { item: item } });

    expect(wrapper.text()).toMatch('Last Updated:');
    expect(wrapper.text()).toMatch(moment(date).format('MMMM D YYYY, h:mm:ss a'));
    expect(wrapper.text()).toMatch('Enabled:');
    expect(wrapper.text()).toMatch('true');
    expect(wrapper.text()).toMatch('Config:');
    expect(wrapper.text()).toMatch('"foo": "bar"');
  });
});
