import axios from 'axios';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

import OrgBookSearch from '@/components/common/OrgBookSearch.vue';

const localVue = createLocalVue();
localVue.use(Vuetify);

jest.mock('axios');

const results = [{
  names: [{ text: 'Test Company' }]
}];

describe('OrgBookSearch.vue', () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  it('renders', () => {
    const wrapper = shallowMount(OrgBookSearch, { localVue, stubs: ['BaseInfoCard'] });
    wrapper.setData({ entries: results });

    expect(wrapper.html()).toMatch('OrgBook Lookup');
    expect(wrapper.html()).toMatch('Start typing to search the OrgBook database');
  });

  it('apiURL returns the orgbook endpoint', () => {
    const endpoint = 'test';

    const wrapper = shallowMount(OrgBookSearch, {
      localVue,
      mocks: {
        $config: {
          orgbook: { endpoint: endpoint }
        }
      }
    });

    expect(wrapper.vm.apiURL()).toBe(endpoint);
  });

  it('apiURL throws an exception when config is missing', () => {
    const wrapper = shallowMount(OrgBookSearch, { localVue, stubs: ['BaseInfoCard'] });

    expect(() => wrapper.vm.apiURL()).toThrow('Settings object is missing.');
  });

  it('change emits the intended events', () => {
    const value = { text: 'text' };

    const wrapper = shallowMount(OrgBookSearch, { localVue, stubs: ['BaseInfoCard'] });
    wrapper.vm.change(value);

    expect(wrapper.emitted()['update:field-model'][0][0]).toBe(value.text);
  });

  it('foundInOrgBook returns true when value is found', () => {
    const value = results[0].names[0].text;

    const wrapper = shallowMount(OrgBookSearch, { localVue, stubs: ['BaseInfoCard'] });
    wrapper.setData({ entries: results });
    const result = wrapper.vm.foundInOrgBook(value);

    expect(result).toBeTruthy();
  });

  it('foundInOrgBook returns false when value is not found', () => {
    const value = results[0].names[0].text;

    const wrapper = shallowMount(OrgBookSearch, { localVue, stubs: ['BaseInfoCard'] });
    const result = wrapper.vm.foundInOrgBook(value);

    expect(result).toBeFalsy();
  });

  it('calls orgbook when search value changes', async () => {
    const data = { results: results };
    axios.get.mockResolvedValue({ data: data });

    const wrapper = shallowMount(OrgBookSearch, {
      localVue,
      mocks: {
        $config: {
          orgbook: { endpoint: 'test' }
        }
      },
      stubs: ['BaseInfoCard']
    });
    wrapper.vm.search = 'test';
    await wrapper.vm.$nextTick;

    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it('does not call orgbook when config is missing', async () => {
    const mockConsoleLog = jest.spyOn(console, 'log');
    mockConsoleLog.mockImplementation(() => {});

    const wrapper = shallowMount(OrgBookSearch, { localVue, stubs: ['BaseInfoCard'] });
    wrapper.vm.search = 'test';
    await wrapper.vm.$nextTick;

    expect(axios.get).toHaveBeenCalledTimes(0);
    mockConsoleLog.mockRestore();
  });
});
