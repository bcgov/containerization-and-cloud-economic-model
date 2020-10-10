import axios from 'axios';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

import CityLookup from '@/components/common/CityLookup.vue';

const localVue = createLocalVue();
localVue.use(Vuetify);

jest.mock('axios');

const features = [{
  geometry: { coordinates: [-116.9647222, 51.2977778] },
  properties: { fullAddress: 'Golden, BC' }
}];

describe('CityLookup.vue', () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  it('renders', () => {
    const wrapper = shallowMount(CityLookup, { localVue });
    wrapper.setData({ features: features });

    expect(wrapper.html()).toMatch('City Lookup');
    expect(wrapper.html()).toMatch('Start typing to search for cities in BC');
  });

  it('apiURL returns the geocoder endpoint', () => {
    const endpoint = 'test';

    const wrapper = shallowMount(CityLookup, {
      localVue,
      mocks: {
        $config: {
          geocoder: { endpoint: endpoint }
        }
      }
    });

    expect(wrapper.vm.apiURL()).toBe(endpoint);
  });

  it('apiURL throws an exception when config is missing', () => {
    const wrapper = shallowMount(CityLookup, { localVue });

    expect(() => wrapper.vm.apiURL()).toThrow('Settings object is missing.');
  });

  it('change emits the intended events', () => {
    const value = {
      text: 'text',
      cityLatitude: 51.2977778,
      cityLongitude: -116.9647222
    };

    const wrapper = shallowMount(CityLookup, { localVue });
    wrapper.vm.change(value);

    expect(wrapper.emitted()['update:field-model'][0][0]).toBe(value.text);
    expect(wrapper.emitted()['update:latitude'][0][0]).toBe(value.cityLatitude);
    expect(wrapper.emitted()['update:longitude'][0][0]).toBe(value.cityLongitude);
  });

  it('calls geocoder when search value changes', async () => {
    const data = { features: features };
    axios.get.mockResolvedValue({ data: data });

    const wrapper = shallowMount(CityLookup, {
      localVue,
      mocks: {
        $config: {
          geocoder: { endpoint: 'test' }
        }
      }
    });
    wrapper.vm.search = 'test';
    await wrapper.vm.$nextTick;

    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it('does not call geocoder when config is missing', async () => {
    const mockConsoleLog = jest.spyOn(console, 'log');
    mockConsoleLog.mockImplementation(() => {});

    const wrapper = shallowMount(CityLookup, { localVue });
    wrapper.vm.search = 'test';
    await wrapper.vm.$nextTick;

    expect(axios.get).toHaveBeenCalledTimes(0);
    mockConsoleLog.mockRestore();
  });
});
