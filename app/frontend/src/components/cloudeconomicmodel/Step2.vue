<template>
  <v-container>
    <div class="hide-on-review">
      <v-btn
        v-if="showTestDataButton"
        class="mb-5"
        outlined
        color="primary"
        @click="sampleData"
        data-test="btn-form-test-data"
      >
        <span>FOR TEST ONLY - FILL SAMPLE DATA</span>
      </v-btn>
      <h2 class="pb-8">Sensitivity Analysis Options</h2>
      <hr class="orange" />
    </div>

    <v-form ref="form" v-model="step2Valid">
      <v-container>
        <hr />

        <h4>Cost</h4>
        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <label>Number of Teams</label>
            <v-select
              :items="numberOfTeamsItems"
              dense
              flat
              outlined
              solo
              label="Select"
              v-model="numberOfTeams"
              data-test="text-form-numberOfTeams"
              :rules="numberOfTeamsRules"
            />
          </v-col>
          <v-col cols="12" sm="6" lg="5">
            <label>Ratio of Employees vs Contractors</label>
            <v-select
              :items="employeesVsContractorsItems"
              dense
              flat
              outlined
              solo
              label="Select"
              v-model="employeesVsContractors"
              data-test="text-form-employeesVsContractors"
              :rules="employeesVsContractorsRules"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <label>Experience of Teams with BC Gov Migrations</label>
            <v-select
              :items="migrationExperienceItems"
              dense
              flat
              outlined
              solo
              label="Select"
              v-model="migrationExperience"
              data-test="text-form-migrationExperience"
              :rules="migrationExperienceRules"
            />
          </v-col>
          <v-col cols="12" sm="6" lg="5">
            <label>Likelihood of Shadow App Dependencies</label>
            <v-select
              :items="shadowAppDependenciesItems"
              dense
              flat
              outlined
              solo
              label="Select"
              v-model="shadowAppDependencies"
              data-test="text-form-shadowAppDependencies"
              :rules="shadowAppDependenciesRules"
            />
          </v-col>
        </v-row>


        <hr />

        <h4>Value</h4>
        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <label>Average Cost of Gov Data Breach</label>
            <v-select
              :items="avgBreachCostItems"
              dense
              flat
              outlined
              solo
              label="Select"
              v-model="avgBreachCost"
              data-test="text-form-avgBreachCost"
              :rules="avgBreachCostRules"
            />
          </v-col>
          <v-col cols="12" sm="6" lg="5">
            <label>Average Currrently Online Public Users per Application</label>
            <v-select
              :items="avgUsersPerAppItems"
              dense
              flat
              outlined
              solo
              label="Select"
              v-model="avgUsersPerApp"
              data-test="text-form-avgUsersPerApp"
              :rules="avgUsersPerAppRules"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <label>Average Legacy System Outage Length</label>
            <v-select
              :items="avgLegacyOutageHourlyValueItems"
              dense
              flat
              outlined
              solo
              label="Select"
              v-model="avgLegacyOutageHourlyValue"
              data-test="text-form-avgLegacyOutageHourlyValue"
              :rules="avgLegacyOutageHourlyValueRules"
            />
          </v-col>
          <v-col cols="12" sm="6" lg="5">
            <label>Public User Service Disruption Hourly Value</label>
            <v-select
              :items="disruptionHourlyValueItems"
              dense
              flat
              outlined
              solo
              label="Select"
              v-model="disruptionHourlyValue"
              data-test="text-form-disruptionHourlyValue"
              :rules="disruptionHourlyValueRules"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <label>Average Yearly Project Hours on New Features</label>
            <v-select
              :items="avgYearlyFeatureHoursItems"
              dense
              flat
              outlined
              solo
              label="Select"
              v-model="avgYearlyFeatureHours"
              data-test="text-form-avgYearlyFeatureHours"
              :rules="avgYearlyFeatureHoursRules"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <div class="hide-on-review">
      <hr />

      <v-btn color="primary" @click="submit" data-test="btn-form-to-next-step">
        <span>Go to Review</span>
      </v-btn>
      <v-btn text @click="setStep(1)" data-test="btn-form-to-previous-step">
        <span>Back</span>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

import Vue from 'vue';

export default {
  name: 'CloudEconomicModelStep2',
  props: {
    reviewMode: Boolean
  },
  components: {
  },
  data() {
    return {
      step2Valid: false,
      validationFailed: false,
      startDateMenu: false,
      endDateMenu: false,
      showTestDataButton: Vue.prototype.$config
        ? Vue.prototype.$config.env !== 'prod'
        : false,

      // Todo: constants file
      numberOfTeamsItems: [
        'Low',
        'Medium',
        'High'
      ],
      employeesVsContractorsItems: [
        '10:90',
        '50:50',
        '90:10'
      ],
      migrationExperienceItems: [
        'Figured it out from scratch',
        'Followed best practice documents',
        'Learned on previous teams'
      ],
      shadowAppDependenciesItems: [
        'Low',
        'Medium',
        'High'
      ],
      avgBreachCostItems: [
        'Low',
        'Medium',
        'High'
      ],
      avgUsersPerAppItems: [
        '5',
        '20',
        '100'
      ],
      avgLegacyOutageHourlyValueItems: [
        '3 hours',
        '10 hours',
        '100 hours'
      ],
      disruptionHourlyValueItems: [
        '$10 CAD',
        '$20 CAD',
        '$30 CAD'
      ],
      avgYearlyFeatureHoursItems: [
        'Low (3000)',
        'Medium (7500)',
        'High (12000)'
      ],

      // Rules
      numberOfTeamsRules: [
        v => !!v || 'This field is required',
      ],
      employeesVsContractorsRules: [
        v => !!v || 'This field is required',
      ],
      migrationExperienceRules: [
        v => !!v || 'This field is required',
      ],
      shadowAppDependenciesRules: [
        v => !!v || 'This field is required',
      ],
      avgBreachCostRules: [
        v => !!v || 'This field is required',
      ],
      avgUsersPerAppRules: [
        v => !!v || 'This field is required',
      ],
      avgLegacyOutageHourlyValueRules: [
        v => !!v || 'This field is required',
      ],
      disruptionHourlyValueRules: [
        v => !!v || 'This field is required',
      ],
      avgYearlyFeatureHoursRules: [
        v => !!v || 'This field is required',
      ]
    };
  },
  computed: {
    ...mapGetters('form', [
      'business',
      'cost',
      'value',
      'primaryContact',
      'covidContact',
      'location'
    ]),

    // Gets and sets
    numberOfTeams: {
      get() {
        return this.cost.numberOfTeams;
      },
      set(value) {
        this.updateCost({ ['numberOfTeams']: value });
      }
    },
    employeesVsContractors: {
      get() {
        return this.cost.employeesVsContractors;
      },
      set(value) {
        this.updateCost({ ['employeesVsContractors']: value });
      }
    },
    migrationExperience: {
      get() {
        return this.cost.migrationExperience;
      },
      set(value) {
        this.updateCost({ ['migrationExperience']: value });
      }
    },
    shadowAppDependencies: {
      get() {
        return this.cost.shadowAppDependencies;
      },
      set(value) {
        this.updateCost({ ['shadowAppDependencies']: value });
      }
    },
    avgBreachCost: {
      get() {
        return this.value.avgBreachCost;
      },
      set(value) {
        this.updateValue({ ['avgBreachCost']: value });
      }
    },
    avgUsersPerApp: {
      get() {
        return this.value.avgUsersPerApp;
      },
      set(value) {
        this.updateValue({ ['avgUsersPerApp']: value });
      }
    },
    avgLegacyOutageHourlyValue: {
      get() {
        return this.value.avgLegacyOutageHourlyValue;
      },
      set(value) {
        this.updateValue({ ['avgLegacyOutageHourlyValue']: value });
      }
    },
    disruptionHourlyValue: {
      get() {
        return this.value.disruptionHourlyValue;
      },
      set(value) {
        this.updateValue({ ['disruptionHourlyValue']: value });
      }
    },
    avgYearlyFeatureHours: {
      get() {
        return this.value.avgYearlyFeatureHours;
      },
      set(value) {
        this.updateValue({ ['avgYearlyFeatureHours']: value });
      }
    },
    businessName: {
      get() {
        return this.business.name;
      },
      set(value) {
        this.updateBusiness({ ['name']: value });
      }
    },
    businessAddressLine1: {
      get() {
        return this.business.addressLine1;
      },
      set(value) {
        this.updateBusiness({ ['addressLine1']: value });
      }
    },
    businessAddressLine2: {
      get() {
        return this.business.addressLine2;
      },
      set(value) {
        this.updateBusiness({ ['addressLine2']: value });
      }
    },
    businessAddressCity: {
      get() {
        return this.business.city;
      },
      set(value) {
        this.updateBusiness({ ['city']: value });
      }
    },
    businessAddressProvince: {
      get() {
        return this.business.province;
      },
      set(value) {
        this.updateBusiness({ ['province']: value });
      }
    },
    businessAddressPostalCode: {
      get() {
        return this.business.postalCode;
      },
      set(value) {
        this.updateBusiness({ ['postalCode']: value });
      }
    },

    // Contact
    firstName: {
      get() {
        return this.primaryContact.firstName;
      },
      set(value) {
        this.updatePrimaryContact({ ['firstName']: value });
      }
    },
    lastName: {
      get() {
        return this.primaryContact.lastName;
      },
      set(value) {
        this.updatePrimaryContact({ ['lastName']: value });
      }
    },
    phone1: {
      get() {
        return this.primaryContact.phone1;
      },
      set(value) {
        this.updatePrimaryContact({ ['phone1']: value });
      }
    },
    phone2: {
      get() {
        return this.primaryContact.phone2;
      },
      set(value) {
        this.updatePrimaryContact({ ['phone2']: value });
      }
    },
    email: {
      get() {
        return this.primaryContact.email;
      },
      set(value) {
        this.updatePrimaryContact({ ['email']: value });
      }
    },

    // COVID Coordinator
    covidFirstName: {
      get() {
        return this.covidContact.firstName;
      },
      set(value) {
        this.updateCovidContact({ ['firstName']: value });
      }
    },
    covidLastName: {
      get() {
        return this.covidContact.lastName;
      },
      set(value) {
        this.updateCovidContact({ ['lastName']: value });
      }
    },
    covidPhone1: {
      get() {
        return this.covidContact.phone1;
      },
      set(value) {
        this.updateCovidContact({ ['phone1']: value });
      }
    },
    covidPhone2: {
      get() {
        return this.covidContact.phone2;
      },
      set(value) {
        this.updateCovidContact({ ['phone2']: value });
      }
    },
    covidEmail: {
      get() {
        return this.covidContact.email;
      },
      set(value) {
        this.updateCovidContact({ ['email']: value });
      }
    },

    // Location
    startDate: {
      get() {
        return this.location.startDate;
      },
      set(value) {
        this.updateLocation({ ['startDate']: value });
      }
    },
    endDate: {
      get() {
        return this.location.endDate;
      },
      set(value) {
        this.updateLocation({ ['endDate']: value });
      }
    },
    locationCity: {
      get() {
        return this.location.city;
      },
      set(value) {
        this.updateLocation({ ['city']: value });
      }
    },
    cityLatitude: {
      get() {
        return this.location.cityLatitude;
      },
      set(value) {
        this.updateLocation({ ['cityLatitude']: value });
      }
    },
    cityLongitude: {
      get() {
        return this.location.cityLongitude;
      },
      set(value) {
        this.updateLocation({ ['cityLongitude']: value });
      }
    },
    numberOfWorkers: {
      get() {
        return this.location.numberOfWorkers
          ? this.location.numberOfWorkers.toString()
          : '';
      },
      set(value) {
        this.updateLocation({
          ['numberOfWorkers']: Number.isNaN(value) ? 0 : Number.parseInt(value)
        });
      }
    },
    accTents: {
      get() {
        return this.location.accTents;
      },
      set(value) {
        this.updateLocation({ ['accTents']: value });
      }
    },
    tentDetails: {
      get() {
        return this.location.tentDetails;
      },
      set(value) {
        this.updateLocation({ ['tentDetails']: value });
      }
    },
    accMotel: {
      get() {
        return this.location.accMotel;
      },
      set(value) {
        this.updateLocation({ ['accMotel']: value });
      }
    },
    motelName: {
      get() {
        return this.location.motelName;
      },
      set(value) {
        this.updateLocation({ ['motelName']: value });
      }
    },
    motelAddressLine1: {
      get() {
        return this.location.motelAddressLine1;
      },
      set(value) {
        this.updateLocation({ ['motelAddressLine1']: value });
      }
    },
    motelAddressLine2: {
      get() {
        return this.location.motelAddressLine2;
      },
      set(value) {
        this.updateLocation({ ['motelAddressLine2']: value });
      }
    },
    motelCity: {
      get() {
        return this.location.motelCity;
      },
      set(value) {
        this.updateLocation({ ['motelCity']: value });
      }
    },
    motelProvince: {
      get() {
        return this.location.motelProvince;
      },
      set(value) {
        this.updateLocation({ ['motelProvince']: value });
      }
    },
    motelPostalCode: {
      get() {
        return this.location.motelPostalCode;
      },
      set(value) {
        this.updateLocation({ ['motelPostalCode']: value });
      }
    },
    accWorkersHome: {
      get() {
        return this.location.accWorkersHome;
      },
      set(value) {
        this.updateLocation({ ['accWorkersHome']: value });
      }
    },

    // Mine
    mineNumber: {
      get() {
        return this.location.mineNumber;
      },
      set(value) {
        this.updateLocation({ ['mineNumber']: value });
      }
    },
    permitNumber: {
      get() {
        return this.location.permitNumber;
      },
      set(value) {
        this.updateLocation({ ['permitNumber']: value });
      }
    }
  },
  methods: {
    ...mapActions('form', ['sampleData']),
    ...mapMutations('form', [
      'setStep',
      'updateBusiness',
      'updateCost',
      'updateValue',
      'updatePrimaryContact',
      'updateCovidContact',
      'updateLocation'
    ]),
    async submit() {
      if (this.$refs.form.validate()) {
        this.setStep(6);
      } else {
        await new Promise(r => setTimeout(r, 200)); //ugh
        const el = document.querySelector(
          '.v-messages.error--text:first-of-type'
        );
        el.scrollIntoView(true);
        window.scrollBy(0, -60); // ugh again
      }
    }
  },
  mounted() {
    if (!this.reviewMode) {
      // Once they've gotten to the form start (step 2) enable the typical "leave site" native browser warning
      // This gets disabled after form submit in step 6
      window.onbeforeunload = () => true;
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  h4:not(.heading-field-label) {
    padding-bottom: 1em;
  }
  hr {
    margin-bottom: 1.75em;
    margin-top: 0.5em;
  }
  .row {
    div[class^='col-'],
    div[class*=' col-'] {
      padding-bottom: 0;
      padding-top: 0;
    }
  }
}
</style>
