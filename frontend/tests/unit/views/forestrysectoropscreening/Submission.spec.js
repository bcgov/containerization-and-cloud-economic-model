import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';

import Submission from '@/views/forestrysectoropscreening/Submission.vue';

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(Vuex);

describe('Submission.vue', () => {
  const zeroUuid = '00000000-0000-0000-0000-000000000000';

  let store;

  beforeEach(() => {
    store = new Vuex.Store();
    store.registerModule('forestrySectorOpScreeningForm', {
      namespaced: true,
      getters: {
        attestation: () => { },
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
    const wrapper = shallowMount(Submission, {
      localVue,
      propsData: {
        submissionId: zeroUuid
      },
      store,
      stubs: [
        'AdminReviewSubmission',
        'BaseSecure',
        'InspectionPanel',
        'NotesPanel',
        'SubmissionHeader'
      ]
    });

    expect(wrapper.html()).toContain('basesecure');
  });
});
