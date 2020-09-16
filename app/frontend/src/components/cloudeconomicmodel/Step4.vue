<template>
  <v-container>
    <div class="hide-on-review">
      <h2 class="pb-8">After workers arrive at the Industrial Camp</h2>
      <hr class="orange" />
    </div>

    <p>Once your workers arrive at the location, you are expected to continue your work enacting an infection control plan and minimize the risk of transmission of COVID-19 through the following key activities.</p>

    <div class="question-series">
      <h3 class="question-head">1. Implement COVID-19 Employee Education</h3>
      <div class="questions">
        <p
          class="hide-on-review"
        >Industrial Camps Operators need to make workers aware of the risks of COVID-19 and be prepared if workers have questions about COVID-19</p>
        <v-checkbox
          v-model="educationSignage"
          data-test="cb-form-educationSignage"
          :readonly="reviewMode"
          label="I have signage in place in the appropriate language on how employees can protect themselves from COVID-19"
        ></v-checkbox>
        <v-checkbox
          v-model="educationContactPersonnel"
          data-test="cb-form-educationContactPersonnel"
          :readonly="reviewMode"
          label="I have someone identified that workers can go to if they have questions on COVID-19"
        ></v-checkbox>
      </div>
    </div>

    <div class="question-series">
      <h3 class="question-head">2. Train workers on COVID-19 infection control</h3>
      <div class="questions">
        <p
          class="hide-on-review"
        >Industrial Camp Operators must provide workers with training in their language about the risk of COVID-19, safe work practices, and how to report symptoms.</p>
        <v-checkbox
          v-model="trainingCovid19"
          data-test="cb-form-trainingCovid19"
          :readonly="reviewMode"
          label="I have materials ready on the risk of exposure of COVID-19 and the signs and symptoms of the disease"
        ></v-checkbox>
        <v-checkbox
          v-model="trainingEtiquette"
          data-test="cb-form-trainingEtiquette"
          :readonly="reviewMode"
          label="I have materials ready on hand washing, physical distancing, and cough/sneeze etiquette"
        ></v-checkbox>
        <v-checkbox
          v-model="trainingLocations"
          data-test="cb-form-trainingLocations"
          :readonly="reviewMode"
          label="I can provide locations of washing facilities, including dispensing stations for alcohol-based hand rubs"
        ></v-checkbox>
        <v-checkbox
          v-model="trainingFirstAid"
          data-test="cb-form-trainingFirstAid"
          :readonly="reviewMode"
          label="I have materials ready on how to seek first aid"
        ></v-checkbox>
        <v-checkbox
          v-model="trainingReporting"
          data-test="cb-form-trainingReporting"
          :readonly="reviewMode"
          label="I have materials ready on how to report an exposure to or symptoms of COVID-19"
        ></v-checkbox>
      </div>
    </div>

    <div class="question-series">
      <h3 class="question-head">3. Meals Preparation: Practice safe food handling</h3>
      <div class="questions">
        <div class="hide-on-review">
          <p>All employers and employees must practice good food handling and hygiene practices.</p>
          <p>This includes safe food practices like protecting foods from contamination, minimizing direct handling of food and preventing cross contamination of foods.</p>
        </div>
        <v-checkbox
          v-model="mealsDistancing"
          data-test="cb-form-mealsDistancing"
          :readonly="reviewMode"
          label="I have schedules in place for kitchen/eating areas to limit contact and maintain 2 metre physical distancing"
        ></v-checkbox>
        <v-checkbox
          v-model="mealsDishware"
          data-test="cb-form-mealsDishware"
          :readonly="reviewMode"
          label="Each employee has their own dishware, utensils and drinking cup"
        ></v-checkbox>
        <v-checkbox
          v-model="mealsDishwashing"
          data-test="cb-form-mealsDishwashing"
          :readonly="reviewMode"
          label="Used dishware will be washed immediately"
        ></v-checkbox>
      </div>
    </div>

    <div class="hide-on-review">
      <hr />

      <v-btn color="primary" @click="setStep(5)" data-test="btn-form-to-next-step">
        <span>Go to Step 5</span>
      </v-btn>
      <v-btn text @click="setStep(3)" data-test="btn-form-to-previous-step">
        <span>Back</span>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'CloudEconomicModelStep4',
  props: {
    reviewMode: Boolean
  },
  computed: {
    ...mapGetters('form', ['attestation']),

    // Education
    educationSignage: {
      get() {
        return this.attestation.educationSignage;
      },
      set(value) {
        this.updateAttestation({ ['educationSignage']: value });
      }
    },
    educationContactPersonnel: {
      get() {
        return this.attestation.educationContactPersonnel;
      },
      set(value) {
        this.updateAttestation({ ['educationContactPersonnel']: value });
      }
    },

    // Training
    trainingCovid19: {
      get() {
        return this.attestation.trainingCovid19;
      },
      set(value) {
        this.updateAttestation({ ['trainingCovid19']: value });
      }
    },
    trainingEtiquette: {
      get() {
        return this.attestation.trainingEtiquette;
      },
      set(value) {
        this.updateAttestation({ ['trainingEtiquette']: value });
      }
    },
    trainingLocations: {
      get() {
        return this.attestation.trainingLocations;
      },
      set(value) {
        this.updateAttestation({ ['trainingLocations']: value });
      }
    },
    trainingFirstAid: {
      get() {
        return this.attestation.trainingFirstAid;
      },
      set(value) {
        this.updateAttestation({ ['trainingFirstAid']: value });
      }
    },
    trainingReporting: {
      get() {
        return this.attestation.trainingReporting;
      },
      set(value) {
        this.updateAttestation({ ['trainingReporting']: value });
      }
    },

    // Meals
    mealsDistancing: {
      get() {
        return this.attestation.mealsDistancing;
      },
      set(value) {
        this.updateAttestation({ ['mealsDistancing']: value });
      }
    },
    mealsDishware: {
      get() {
        return this.attestation.mealsDishware;
      },
      set(value) {
        this.updateAttestation({ ['mealsDishware']: value });
      }
    },
    mealsDishwashing: {
      get() {
        return this.attestation.mealsDishwashing;
      },
      set(value) {
        this.updateAttestation({ ['mealsDishwashing']: value });
      }
    }
  },
  methods: {
    ...mapMutations('form', ['setStep', 'updateAttestation'])
  }
};
</script>

