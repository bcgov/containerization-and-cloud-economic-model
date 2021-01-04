import { SampleData } from './sampleData.js';

export default {
  namespaced: true,
  state: {
    getFormError: '',
    gettingForm: false,
    submitting: false,
    step: 1,
    submissionComplete: false,
    submissionDetails: null,

    // Form schema
    cost: {
      numberOfTeams: '',
      employeesVsContractors: '',
      teamMigrationExperience: '',
      shadowAppDepsChance: '',
    },
    value: {
      avgCostGovDataBreach: '',
      avgOnlineUsersPerApp: '',
      avgLegacyOutageLength: '',
      avgDistruptionHourlyValue: '',
      avgYearlyNewFeatureHours: '',
    },
    contact: {
      sendEmail: '',
    },
    attestation: {
      certifyAccurateInformation: false,
    },
  },
  getters: {
    getFormError: (state) => state.getFormError,
    gettingForm: (state) => state.gettingForm,
    step: (state) => state.step,
    submitting: (state) => state.submitting,
    submissionComplete: (state) => state.submissionComplete,
    submissionDetails: (state) => state.submissionDetails,

    // Form objects
    cost: (state) => state.cost,
    value: (state) => state.value,
    contact: (state) => state.contact,
    attestation: (state) => state.attestation,
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
    },
  },
  actions: {
    async getForm({ commit }) {
      commit('setGettingForm', true);
      commit('setGetFormError', '');
      try {
        commit('setSubmissionComplete');
      } catch (error) {
        console.error(`Error getting form: ${error}`); // eslint-disable-line no-console
        commit(
          'setGetFormError',
          'An error occurred while attempting to fetch details. Please refresh and try again.'
        );
      } finally {
        commit('setGettingForm', false);
      }
    },
    async submitForm({ commit }) {
      commit('setSubmitting', true);
      try {
        commit('setSubmissionComplete');
      } catch (error) {
        console.error(`Error submitting form: ${error} - ${error.message}`); // eslint-disable-line no-console
      } finally {
        commit('setSubmitting', false);
      }
    },
    async sampleData({ commit }) {
      commit('updateCost', SampleData.cost);
      commit('updateValue', SampleData.value);
      commit('updateContact', SampleData.contact);
    },
  },
};
