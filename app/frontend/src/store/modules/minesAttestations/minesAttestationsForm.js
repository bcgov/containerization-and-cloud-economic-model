import ipcService from '../../services/ipcService';
import { default as sampleData } from './sampleData.js.js.js';

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
    business: {
      name: '',
      orgBookId: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      province: '',
      postalCode: ''
    },
    primaryContact: {
      //temp
      primary: true,
      contactType: 'PRIMARY',
      firstName: '',
      lastName: '',
      phone1: '',
      phone2: '',
      email: ''
    },
    covidContact: {
      contactType: 'COVID_COORDINATOR',
      firstName: '',
      lastName: '',
      phone1: '',
      phone2: '',
      email: ''
    },
    location: {
      startDate: '',
      endDate: '',
      city: '',
      cityLatitude: '',
      cityLongitude: '',
      mineNumber: '',
      minePermit: '',
      numberOfWorkers: '',
      accTents: false,
      tentDetails: '',
      accMotel: false,
      motelName: '',
      motelAddressLine1: '',
      motelAddressLine2: '',
      motelCity: '',
      motelProvince: '',
      motelPostalCode: '',
      accWorkersHome: false
    },
    attestation: {
      sleepingAreaType: 1,
      sharedSleepingPerRoom: 1,
      sharedSleepingDistancing: false,

      guidelinesRead: false,
      assessmentCompleted: false,
      developedPlan: false,
      protectionSignage: false,
      workerContactPersonnel: false,
      commonAreaDistancing: false,
      selfIsolateUnderstood: false,
      selfIsolateAccommodation: false,
      laundryServices: false,
      wasteManagementGloves: false,
      wasteManagementSchedule: false,
      wasteManagementBags: false,
      handWashingStations: false,
      handWashingSoapWater: false,
      handWashingWaterless: false,
      handWashingPaperTowels: false,
      handWashingSignage: false,
      distancingMaintained: false,
      distancingFaceShields: false,
      disinfectingSchedule: false,
      educationSignage: false,
      educationContactPersonnel: false,
      trainingCovid19: false,
      trainingEtiquette: false,
      trainingLocations: false,
      trainingFirstAid: false,
      trainingReporting: false,
      mealsDistancing: false,
      mealsDishware: false,
      mealsDishwashing: false,
      infectionSeparation: false,
      infectionSymptoms: false,
      infectionHeathLinkBC: false,
      infectionSanitization: false,
      infectedFeeding: false,
      infectedHousekeeping: false,
      infectedWaste: false,
      infectionAccommodation: false,
      certifyAccurateInformation: false,
      agreeToInspection: false,
      formVersion: ''
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
    business: state => state.business,
    contacts: state => state.contacts[0],
    covidContact: state => state.covidContact,
    ipcPlan: state => state.ipcPlan,
    location: state => state.location
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
    updateBusiness: (state, obj) => {
      Object.assign(state.business, obj);
    },
    updateContacts: (state, obj) => {
      Object.assign(state.contacts[0], obj);
    },
    updateCovidContact: (state, obj) => {
      Object.assign(state.covidContact, obj);
    },
    updateIpcPlan: (state, obj) => {
      Object.assign(state.ipcPlan, obj);
    },
    updateLocation: (state, obj) => {
      Object.assign(state.location, obj);
    }
  },
  actions: {
    async getForm({ commit }, ipcPlanId) {
      commit('setGettingForm', true);
      commit('setGetFormError', '');
      try {
        const response = await ipcService.getIPCContent(ipcPlanId);
        if (!response.data) {
          throw new Error(`Failed to GET for ${ipcPlanId}`);
        }
        const data = response.data;

        commit('updateIpcPlan', data.ipcPlan);
        commit('updateBusiness', data.business);
        commit('updateContacts', data.contacts[0]);
        commit('updateCovidContact', data.covidContact);
        commit('updateLocation', data.location);
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
        commit('updateIpcPlan', { formVersion: process.env.VUE_APP_VERSION });
        const body = {
          business: state.business,
          contacts: state.contacts,
          ipcPlan: state.ipcPlan,
          covidContact: state.covidContact,
          location: state.location
        };
        const response = await ipcService.sendIPCContent(body);
        if (!response.data) {
          throw new Error('No response data from API while submitting form');
        }
        commit('setSubmissionDetails', response.data);
        commit('setSubmissionComplete');
      } catch (error) {
        console.error(`Error submitting form: ${error}`); // eslint-disable-line no-console
        commit('setSubmissionError', 'An error occurred while attempting to submit the form. Please try again.');
      } finally {
        commit('setSubmitting', false);
      }
    },
    async sampleData({ commit }) {
      commit('updateBusiness', sampleData.business);
      commit('updateContacts', sampleData.contact);
      commit('updateCovidContact', sampleData.covidContact);
      commit('updateLocation', sampleData.location);
    }
  }
};
