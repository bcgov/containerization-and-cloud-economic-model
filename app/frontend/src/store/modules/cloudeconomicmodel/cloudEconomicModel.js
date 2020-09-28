import commonFormService from '@/services/commonFormService';
import { FormNames } from '@/utils/constants';
import { SampleData } from './sampleData.js';

// Change the supplied state to the exact format required by the API endpoint
// Any data guards/sanitation can go in here
function transformToPost(state) {
  // TODO: unit test this!
  const copy = JSON.parse(JSON.stringify(state));

  const body = {
    cost: copy.cost,
    value: copy.value,
    contact: copy.contact,
    attestation: copy.attestation
  };

  return body;
}

// Change the results of the API fetch to the store state format
function transformToState(data) {
  // TODO: unit test this!
  const copy = JSON.parse(JSON.stringify(data));

  return {
    cost: copy.cost,
    value: copy.value,
    contact: copy.contact,
    attestation: copy.attestation
  };
}

export default {
  namespaced: true,
  state: {
    getFormError: '',
    gettingForm: false,
    submitting: false,
    step: 1,
    submissionComplete: false,
    submissionDetails: null,
    submissionError: '',

    // Form schema
    cost: {
      numberOfTeams: '',
      employeesVsContractors: '',
      migrationExperience: '',
      shadowAppDependencies: ''
    },
    value: {
      avgBreachCost: '',
      avgUsersPerApp: '',
      avgLegacyOutageHourlyValue: '',
      disruptionHourlyValue: '',
      avgYearlyFeatureHours: ''
    },
    contact: {
      sendEmail: ''
    },
    attestation: {
      certifyAccurateInformation: false
    }
  },
  getters: {
    getFormError: state => state.getFormError,
    gettingForm: state => state.gettingForm,
    step: state => state.step,
    submitting: state => state.submitting,
    submissionComplete: state => state.submissionComplete,
    submissionDetails: state => state.submissionDetails,
    submissionError: state => state.submissionError,

    // Form objects
    cost: state => state.cost,
    value: state => state.value,
    contact: state => state.contact,
    attestation: state => state.attestation
  },
  mutations: {
    setGetFormError(state, errorMessage) {
      state.getFormError = errorMessage;
    },
    setGettingForm(state, isGetting) {
      state.gettingForm = isGetting;
    },
    setSubmitting(state, isSubmitting) {
      state.submitting = isSubmitting;
    },
    setStep: (state, step) => {
      window.scrollTo(0, 0);
      state.step = step;
    },
    setSubmissionComplete(state) {
      state.submissionComplete = true;
      window.scrollTo(0, 0);
    },
    setSubmissionDetails(state, responseData) {
      state.submissionDetails = responseData;
    },
    setSubmissionError(state, errorMessage) {
      state.submissionError = errorMessage;
    },

    // Form updates
    updateCost: (state, obj) => {
      Object.assign(state.cost, obj);
    },
    updateValue: (state, obj) => {
      Object.assign(state.value, obj);
    },
    updateContact: (state, obj) => {
      Object.assign(state.contact, obj);
    },
    updateAttestation: (state, obj) => {
      Object.assign(state.attestation, obj);
    }
  },
  actions: {
    async getForm({ commit }, id) {
      commit('setGettingForm', true);
      commit('setGetFormError', '');
      try {
        const response = await commonFormService.getSubmission(FormNames.CLOUDECONOMICMODEL, id);
        if (!response.data) {
          throw new Error(`Failed to GET for ${id}`);
        }
        const transformed = transformToState(response.data);

        commit('updateCost', transformed.cost);
        commit('updateValue', transformed.value);
        commit('updateContact', transformed.contact);
        commit('updateAttestation', transformed.attestation);
        commit('setSubmissionComplete');
      } catch (error) {
        console.error(`Error getting form: ${error}`); // eslint-disable-line no-console
        commit('setGetFormError', 'An error occurred while attempting to fetch details. Please refresh and try again.');
      } finally {
        commit('setGettingForm', false);
      }
    },
    async submitForm({ commit, state }) {
      commit('setSubmitting', true);
      commit('setSubmissionError', '');
      try {
        const body = transformToPost(state);

        const response = await commonFormService.sendSubmission(FormNames.CLOUDECONOMICMODEL, body);
        if (!response.data) {
          throw new Error('No response data from API while submitting form');
        }
        commit('setSubmissionDetails', response.data);
        commit('setSubmissionComplete');
      } catch (error) {
        console.error(`Error submitting form: ${error} - ${error.message}`); // eslint-disable-line no-console
        commit('setSubmissionError', 'An error occurred while attempting to submit the form. Please try again.');
      } finally {
        commit('setSubmitting', false);
      }
    },
    async sampleData({ commit }) {
      commit('updateCost', SampleData.cost);
      commit('updateValue', SampleData.value);
      commit('updateContact', SampleData.contact);
    }
  }
};
