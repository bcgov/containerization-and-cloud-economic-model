<template>
  <v-container>
    <div class="hide-on-review">
      <h2 class="pb-8">If workers become ill at the operation</h2>
      <hr class="orange" />
    </div>

    <div class="question-series">
      <h3 class="question-head">1. Plan to manage individuals with suspected COVID-19 Infection</h3>
      <div class="questions">
        <p
          class="hide-on-review"
        >Industrial Camp Operators must have a plan and protocol to deal with workers demonstrating symptoms of COVID-19, including immediate self isolation of the worker and notifying the local health authority.</p>
        <p>
          If two or more workers become sick, you must notify the local
          <a
            target="_blank"
            href="https://www2.gov.bc.ca/gov/content/health/about-bc-s-health-care-system/office-of-the-provincial-health-officer/medical-health-officers"
          >
            Medical Health Officer
            <v-icon small color="primary">open_in_new</v-icon>
          </a> of the outbreak.
        </p>
        <v-checkbox
          v-model="infectionSeparation"
          data-test="cb-form-infectionSeparation"
          :readonly="reviewMode"
          label="I am prepared to promptly separate the individual from others in their own accommodation"
        ></v-checkbox>
        <v-checkbox
          v-model="infectionSymptoms"
          data-test="cb-form-infectionSymptoms"
          :readonly="reviewMode"
          label="I am prepared to provide individuals exhibiting symptoms of COVID-19 with a surgical/procedural mask or tissues to cover their mouth and nose."
        ></v-checkbox>
        <v-checkbox
          v-model="infectionHeathLinkBC"
          data-test="cb-form-infectionHeathLinkBC"
          :readonly="reviewMode"
          label="I am prepared to direct the person to call  HealthLinkBC (8-1-1)."
        ></v-checkbox>
        <v-checkbox
          v-model="infectionSanitization"
          data-test="cb-form-infectionSanitization"
          :readonly="reviewMode"
          label="I am prepared to clean and disinfect any rooms that the person has been in while symptomatic."
        ></v-checkbox>
        <v-checkbox
          v-model="infectionAccommodation"
          data-test="cb-form-infectionAccommodation"
          :readonly="reviewMode"
          label="If commercial accommodation is being used to self-isolate, then I will inform management of the situation and necessary requirements."
        ></v-checkbox>
      </div>
    </div>

    <BaseWarningCard class="mt-6 mb-12 hide-on-review">
      <h3>
        As COVID-19 recommendations are evolving daily, please keep up to date with
        <a
          target="_blank"
          href="http://www.bccdc.ca/health-info/diseases-conditions/covid-19/about-covid-19"
          data-test="btn-form-disease-control-link"
        >
          BC Centre for Disease Control
          <v-icon small color="primary">open_in_new</v-icon>
        </a> guidance.
      </h3>
    </BaseWarningCard>

    <div class="question-series">
      <h3 class="question-head">2. Providing Food for Ill Workers</h3>
      <div class="questions">
        <v-checkbox
          v-model="infectedFeeding"
          data-test="cb-form-infectedFeeding"
          :readonly="reviewMode"
          label="I am able to provide food in a safe manner to a self-isolated worker"
        ></v-checkbox>
        <BaseInfoCard class="mb-10 hide-on-review">
          <template v-slot:title>What does this mean?</template>
          <ul>
            <li>Gloves are required when delivering or picking up food trays.</li>
            <li>Proper hand hygiene must be practiced before delivering and after picking up food trays.</li>
            <li>Do NOT enter a room to deliver or pick up food trays for workers who are ill. Deliver and pick up food trays from outside their accommodation.</li>
          </ul>
        </BaseInfoCard>
      </div>
    </div>

    <div class="question-series">
      <h3 class="question-head">3. Housekeeping for Ill Workers</h3>
      <div class="questions">
        <v-checkbox
          v-model="infectedHousekeeping"
          data-test="cb-form-infectedHousekeeping"
          :readonly="reviewMode"
          label="I am able to perform adequate housekeeping for a self isolated worker"
        ></v-checkbox>
        <BaseInfoCard class="mb-10 hide-on-review">
          <template v-slot:title>What does this mean?</template>
          <ul>
            <li>Site operators must identify and record the locations of all self-isolating guests.</li>
            <li>Do NOT provide cleaning service inside rooms or tents where people are in self-isolation.</li>
            <li>Ensure staff do NOT enter self-isolation rooms or tents until authorized.</li>
            <li>Use alternate means of assisting workers in isolation, such as leaving fresh linens, toiletries and cleaning supplies outside their accommodation during the period of isolation.</li>
            <li>Once the individual(s) in self-isolation have left their accommodation, complete a thorough cleaning of all hard surfaces with an approved disinfectant, launder all removable cloth items (sheets, towels).</li>
            <li>Discard all personal soap and shampoo remnants.</li>
          </ul>
        </BaseInfoCard>
      </div>
    </div>

    <div class="question-series">
      <h3 class="question-head">4. Waste Management for Ill Workers</h3>
      <div class="questions">
        <v-checkbox
          v-model="infectedWaste"
          data-test="cb-form-infectedWaste"
          :readonly="reviewMode"
          label="I am able to perform waste management for supporting a self-isolated worker"
        ></v-checkbox>
        <BaseInfoCard class="mb-10 hide-on-review">
          <template v-slot:title>What does this mean?</template>
          <ul>
            <li>Wherever possible, waste from all self-isolation rooms or tents should be handled by a designated person or small, designated team.</li>
          </ul>
        </BaseInfoCard>
      </div>
    </div>

    <div class="hide-on-review">
      <hr class="mt-5" />

      <v-btn color="primary" @click="setStep(6)" data-test="btn-form-to-next-step">
        <span>Go to Step 6</span>
      </v-btn>
      <v-btn text @click="setStep(4)" data-test="btn-form-to-previous-step">
        <span>Back</span>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'CloudEconomicModelStep5',
  props: {
    reviewMode: Boolean
  },
  computed: {
    ...mapGetters('form', ['attestation']),

    // Safe Lodging
    //TBD??

    // Infection
    infectionSeparation: {
      get() {
        return this.attestation.infectionSeparation;
      },
      set(value) {
        this.updateAttestation({ ['infectionSeparation']: value });
      }
    },
    infectionSymptoms: {
      get() {
        return this.attestation.infectionSymptoms;
      },
      set(value) {
        this.updateAttestation({ ['infectionSymptoms']: value });
      }
    },
    infectionHeathLinkBC: {
      get() {
        return this.attestation.infectionHeathLinkBC;
      },
      set(value) {
        this.updateAttestation({ ['infectionHeathLinkBC']: value });
      }
    },
    infectionSanitization: {
      get() {
        return this.attestation.infectionSanitization;
      },
      set(value) {
        this.updateAttestation({ ['infectionSanitization']: value });
      }
    },
    infectionAccommodation: {
      get() {
        return this.attestation.infectionAccommodation;
      },
      set(value) {
        this.updateAttestation({ ['infectionAccommodation']: value });
      }
    },

    // Food
    infectedFeeding: {
      get() {
        return this.attestation.infectedFeeding;
      },
      set(value) {
        this.updateAttestation({ ['infectedFeeding']: value });
      }
    },

    // HouseKeeping
    infectedHousekeeping: {
      get() {
        return this.attestation.infectedHousekeeping;
      },
      set(value) {
        this.updateAttestation({ ['infectedHousekeeping']: value });
      }
    },

    // Waste
    infectedWaste: {
      get() {
        return this.attestation.infectedWaste;
      },
      set(value) {
        this.updateAttestation({ ['infectedWaste']: value });
      }
    }
  },
  methods: {
    ...mapMutations('form', ['setStep', 'updateAttestation'])
  }
};
</script>

