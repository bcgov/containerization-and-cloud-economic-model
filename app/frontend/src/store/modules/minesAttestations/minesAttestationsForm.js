import minesAttestationsService from '@/services/minesAttestations/minesAttestationsService';
import { SampleData, RandomCities } from './sampleData.js';

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
      cityLatitude: undefined,
      cityLongitude: undefined,
      mineNumber: '',
      permitNumber: '',
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
      sleepingAreaType: 'SINGLE',
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
      agreeToInspection: false
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
    primaryContact: state => state.primaryContact,
    covidContact: state => state.covidContact,
    attestation: state => state.attestation,
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
    updatePrimaryContact: (state, obj) => {
      Object.assign(state.primaryContact, obj);
    },
    updateCovidContact: (state, obj) => {
      Object.assign(state.covidContact, obj);
    },
    updateAttestation: (state, obj) => {
      Object.assign(state.attestation, obj);
    },
    updateLocation: (state, obj) => {
      Object.assign(state.location, obj);
    }
  },
  actions: {
    async getForm({ commit }, id) {
      commit('setGettingForm', true);
      commit('setGetFormError', '');
      try {
        const response = await minesAttestationsService.getSubmission(id);
        if (!response.data) {
          throw new Error(`Failed to GET for ${id}`);
        }
        const data = response.data;

        commit('updateIpcPlan', data.ipcPlan);
        commit('updateBusiness', data.business);
        commit('updatePrimaryContact', data.primaryContact);
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

        // Transform data (move to function and unit test)
        const contacts = [state.primaryContact, state.covidContact];
        const body = {
          business: state.business,
          contacts: contacts,
          attestation: state.attestation,
          location: state.location
        };
        body.location.numberOfWorkers = Number.parseInt(body.location.numberOfWorkers, 10);
        console.log(JSON.stringify(body));
        // /transform

        const response = await minesAttestationsService.sendSubmission(body);
        if (!response.data) {
          throw new Error('No response data from API while submitting form');
        }
        commit('setSubmissionDetails', response.data);
        console.log(JSON.stringify(response.data));
        commit('setSubmissionComplete');
      } catch (error) {
        console.error(`Error submitting form: ${error} - ${error.message}`); // eslint-disable-line no-console
        commit('setSubmissionError', 'An error occurred while attempting to submit the form. Please try again.');
      } finally {
        commit('setSubmitting', false);
      }
    },
    async sampleData({ commit }) {
      commit('updateBusiness', SampleData.business);
      commit('updatePrimaryContact', SampleData.primaryContact);
      commit('updateCovidContact', SampleData.covidContact);
      const l = SampleData.location;
      l.city = RandomCities[Math.floor(Math.random() * RandomCities.length)];
      commit('updateLocation', l);
    }
  }
};
