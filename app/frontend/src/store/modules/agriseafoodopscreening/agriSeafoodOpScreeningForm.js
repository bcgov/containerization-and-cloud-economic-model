import moment from 'moment';

import minesOperatorScreeningService from '@/services/minesOperatorScreeningService';
import { SampleData, RandomCities } from './sampleData.js';

// Change the supplied state to the exact format required by the API endpoint
// Any data guards/sanitation can go in here
function transformToPost(state) {
  // TODO: unit test this!
  const copy = JSON.parse(JSON.stringify(state));

  // Recursive remove all '' fields from body to post
  // https://stackoverflow.com/questions/286141/remove-blank-attributes-from-an-object-in-javascript
  // const cleanEmpty = copy => Object.entries(copy)
  //   .map(([k, v]) => [k, v && typeof v === 'object' ? cleanEmpty(v) : v])
  //   .reduce((a, [k, v]) => (v === '' ? a : { ...a, [k]: v }), {});

  // Sanitize the optional fields in case they get checked, filled out, unchecked
  if(!copy.location.accTents) {
    delete copy.location.tentDetails;
  }
  if(!copy.location.accMotel) {
    delete copy.location.motelName;
    delete copy.location.motelAddressLine1;
    delete copy.location.motelAddressLine2;
    delete copy.location.motelCity;
    delete copy.location.motelProvince;
    delete copy.location.motelPostalCode;
  }

  const contacts = [copy.primaryContact, copy.covidContact];
  copy.location.numberOfWorkers = Number.parseInt(copy.location.numberOfWorkers, 10);
  const body = {
    type: copy.type,
    business: copy.business,
    contacts: contacts,
    attestation: copy.attestation,
    location: copy.location
  };

  return body;
}

// Change the results of the API fetch to the store state format
function transformToState(data) {
  // TODO: unit test this!
  const copy = JSON.parse(JSON.stringify(data));

  const primary = copy.contacts ? copy.contacts.find(({ contactType }) => contactType === 'PRIMARY') : {};
  const covid = copy.contacts ? copy.contacts.find(({ contactType }) => contactType === 'COVID_COORDINATOR') : {};
  copy.location.startDate = moment(copy.location.startDate).format('YYYY-MM-DD');
  copy.location.endDate = moment(copy.location.endDate).format('YYYY-MM-DD');
  return {
    business: copy.business,
    primaryContact: primary,
    covidContact: covid,
    attestation: copy.attestation,
    location: copy.location
  };
}

export default {
  namespaced: true,
  state: {
    getFormError: '',
    gettingForm: false,
    submitting: false,
    step: 0,
    submissionComplete: false,
    submissionDetails: null,
    submissionError: '',

    // Form schema
    type: '',
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
      licencees: '',
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
      transportationSingleOccupant: false,
      transportationBusesVans: false,
      transportationHelicopter: false,
      transportationTrucksCars: false,
      transportationTravelPod: false,
      transportationCleaningDistancing: false,
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
    operationType: state => state.type,
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
    setOperationType(state, type) {
      state.type = type;
    },
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
        const response = await minesOperatorScreeningService.getSubmission(id);
        if (!response.data) {
          throw new Error(`Failed to GET for ${id}`);
        }
        const transformed = transformToState(response.data);

        commit('updateAttestation', transformed.attestation);
        commit('updateBusiness', transformed.business);
        commit('updatePrimaryContact', transformed.primaryContact);
        commit('updateCovidContact', transformed.covidContact);
        commit('updateLocation', transformed.location);
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
        alert('TBD' + body);

        // const response = await minesOperatorScreeningService.sendSubmission(body);
        // if (!response.data) {
        //   throw new Error('No response data from API while submitting form');
        // }
        // commit('setSubmissionDetails', response.data);
        // commit('setSubmissionComplete');
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
