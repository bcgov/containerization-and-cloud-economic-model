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
              :rules="dropDownRules"
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
              :rules="dropDownRules"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <label>Experience of Teams with BC Gov Migrations</label>
            <v-select
              :items="teamMigrationExperienceItems"
              dense
              flat
              outlined
              solo
              label="Select"
              v-model="teamMigrationExperience"
              data-test="text-form-teamMigrationExperience"
              :rules="dropDownRules"
            />
          </v-col>
          <v-col cols="12" sm="6" lg="5">
            <label>Likelihood of Shadow App Dependencies</label>
            <v-select
              :items="shadowAppDepsChanceItems"
              dense
              flat
              outlined
              solo
              label="Select"
              v-model="shadowAppDepsChance"
              data-test="text-form-shadowAppDepsChance"
              :rules="dropDownRules"
            />
          </v-col>
        </v-row>

        <hr />

        <h4>Value</h4>
        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <label>Average Cost of Gov Data Breach</label>
            <v-select
              :items="avgCostGovDataBreachItems"
              dense
              flat
              outlined
              solo
              label="Select"
              v-model="avgCostGovDataBreach"
              data-test="text-form-avgCostGovDataBreach"
              :rules="dropDownRules"
            />
          </v-col>
          <v-col cols="12" sm="6" lg="5">
            <label>
              Average Currrently Online Public Users per Application
            </label>
            <v-select
              :items="avgOnlineUsersPerAppItems"
              dense
              flat
              outlined
              solo
              label="Select"
              v-model="avgOnlineUsersPerApp"
              data-test="text-form-avgOnlineUsersPerApp"
              :rules="dropDownRules"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <label>Average Legacy System Outage Length</label>
            <v-select
              :items="avgLegacyOutageLengthItems"
              dense
              flat
              outlined
              solo
              label="Select"
              v-model="avgLegacyOutageLength"
              data-test="text-form-avgLegacyOutageLength"
              :rules="dropDownRules"
            />
          </v-col>
          <v-col cols="12" sm="6" lg="5">
            <label>Public User Service Disruption Hourly Value</label>
            <v-select
              :items="avgDistruptionHourlyValueItems"
              dense
              flat
              outlined
              solo
              label="Select"
              v-model="avgDistruptionHourlyValue"
              data-test="text-form-avgDistruptionHourlyValue"
              :rules="dropDownRules"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <label>Average Yearly Project Hours on New Features</label>
            <v-select
              :items="avgYearlyNewFeatureHoursItems"
              dense
              flat
              outlined
              solo
              label="Select"
              v-model="avgYearlyNewFeatureHours"
              data-test="text-form-avgYearlyNewFeatureHours"
              :rules="dropDownRules"
            />
          </v-col>
        </v-row>

        <hr />

        <h4>Delivery</h4>
        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <label>Email address</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              placeholder="example@gov.bc.ca"
              :rules="emailRules"
              prepend-inner-icon="email"
              v-model="sendEmail"
              data-test="text-form-email"
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
import validator from 'validator';
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'CloudEconomicModelStep2',
  props: {
    reviewMode: Boolean,
  },
  components: {},
  data() {
    return {
      step2Valid: false,
      validationFailed: false,
      startDateMenu: false,
      endDateMenu: false,
      showTestDataButton: process.env.NODE_ENV === 'development' ? true : false,

      // Todo: constants file
      numberOfTeamsItems: ['Low', 'Medium', 'High'],
      employeesVsContractorsItems: ['10:90', '50:50', '90:10'],
      teamMigrationExperienceItems: [
        'Figured it out from scratch',
        'Followed best practice documents',
        'Learned on previous teams',
      ],
      shadowAppDepsChanceItems: ['Low', 'Medium', 'High'],
      avgCostGovDataBreachItems: ['Low', 'Medium', 'High'],
      avgOnlineUsersPerAppItems: ['5', '20', '100'],
      avgLegacyOutageLengthItems: ['3 hours', '10 hours', '100 hours'],
      avgDistruptionHourlyValueItems: ['$10 CAD', '$20 CAD', '$30 CAD'],
      avgYearlyNewFeatureHoursItems: [
        'Low (3000)',
        'Medium (7500)',
        'High (12000)',
      ],

      // Rules
      dropDownRules: [(v) => !!v || 'Required'],
      emailRules: [
        (v) => !!v || 'Required',
        (v) =>
          validator.isEmail(v, { allow_display_name: true }) ||
          'invalid e-mail format',
        (v) =>
          (v && v.length <= 255) || 'E-mail must be 255 characters or less',
      ],
    };
  },
  computed: {
    ...mapGetters('form', ['cost', 'value', 'contact']),

    // Gets and sets
    numberOfTeams: {
      get() {
        return this.cost.numberOfTeams;
      },
      set(value) {
        this.updateCost({ ['numberOfTeams']: value });
      },
    },
    employeesVsContractors: {
      get() {
        return this.cost.employeesVsContractors;
      },
      set(value) {
        this.updateCost({ ['employeesVsContractors']: value });
      },
    },
    teamMigrationExperience: {
      get() {
        return this.cost.teamMigrationExperience;
      },
      set(value) {
        this.updateCost({ ['teamMigrationExperience']: value });
      },
    },
    shadowAppDepsChance: {
      get() {
        return this.cost.shadowAppDepsChance;
      },
      set(value) {
        this.updateCost({ ['shadowAppDepsChance']: value });
      },
    },
    avgCostGovDataBreach: {
      get() {
        return this.value.avgCostGovDataBreach;
      },
      set(value) {
        this.updateValue({ ['avgCostGovDataBreach']: value });
      },
    },
    avgOnlineUsersPerApp: {
      get() {
        return this.value.avgOnlineUsersPerApp;
      },
      set(value) {
        this.updateValue({ ['avgOnlineUsersPerApp']: value });
      },
    },
    avgLegacyOutageLength: {
      get() {
        return this.value.avgLegacyOutageLength;
      },
      set(value) {
        this.updateValue({ ['avgLegacyOutageLength']: value });
      },
    },
    avgDistruptionHourlyValue: {
      get() {
        return this.value.avgDistruptionHourlyValue;
      },
      set(value) {
        this.updateValue({ ['avgDistruptionHourlyValue']: value });
      },
    },
    avgYearlyNewFeatureHours: {
      get() {
        return this.value.avgYearlyNewFeatureHours;
      },
      set(value) {
        this.updateValue({ ['avgYearlyNewFeatureHours']: value });
      },
    },
    sendEmail: {
      get() {
        return this.contact.sendEmail;
      },
      set(value) {
        this.updateContact({ ['sendEmail']: value });
      },
    },
  },
  methods: {
    ...mapActions('form', ['sampleData']),
    ...mapMutations('form', [
      'setStep',
      'updateCost',
      'updateValue',
      'updateContact',
    ]),
    async submit() {
      if (this.$refs.form.validate()) {
        this.setStep(3);
      } else {
        await new Promise((r) => setTimeout(r, 200)); //ugh
        const el = document.querySelector(
          '.v-messages.error--text:first-of-type'
        );
        el.scrollIntoView(true);
        window.scrollBy(0, -60); // ugh again
      }
    },
  },
  mounted() {
    if (!this.reviewMode) {
      // Once they've gotten to the form start (step 2) enable the typical "leave site" native browser warning
      // This gets disabled after form submit in step 6
      window.onbeforeunload = () => true;
    }
  },
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
