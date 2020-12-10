import moment from 'moment';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';

import Review from '@/views/minesoperatorscreening/Review.vue';

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(Vuex);

describe('Review.vue', () => {
  const date = new Date();
  const zeroUuid = '00000000-0000-0000-0000-000000000000';

  let store;

  beforeEach(() => {
    store = new Vuex.Store();
    store.registerModule('form', {
      namespaced: true,
      getters: {
        attestation: () => ({ createdAt: date }),
        business: () => { },
        gettingForm: () => { },
        getFormError: () => { },
        location: () => { }
      },
      mutations: {
        setGettingForm: () => () => { }
      },
      actions: {
        getForm: () => () => { }
      }
    });
  });

  it('renders', () => {
    const wrapper = shallowMount(Review, {
      localVue,
      propsData: {
        submissionId: zeroUuid
      },
      store,
      stubs: ['AdminReviewSubmission', 'GeneratePdfButton']
    });

    expect(wrapper.text()).toContain('Generate PDF of Submission');
  });

  it('createdAtDisplay returns formatted date', () => {
    const wrapper = shallowMount(Review, {
      localVue,
      propsData: {
        submissionId: zeroUuid
      },
      store,
      stubs: ['AdminReviewSubmission', 'GeneratePdfButton']
    });

    expect(wrapper.text()).toContain('Generate PDF of Submission');
    expect(wrapper.vm.createdAtDisplay).toContain(moment(date).format('MMMM D YYYY, h:mm:ss a'));
  });

  it('locationDateDisplay returns formatted date', () => {
    const wrapper = shallowMount(Review, {
      localVue,
      propsData: {
        submissionId: zeroUuid
      },
      store,
      stubs: ['AdminReviewSubmission', 'GeneratePdfButton']
    });
    const result = wrapper.vm.locationDateDisplay(date);

    expect(wrapper.text()).toContain('Generate PDF of Submission');
    expect(result).toMatch(moment(date).format('MMMM D YYYY'));
  });
});
