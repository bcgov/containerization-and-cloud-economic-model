<template>
  <v-container>
    <div v-if="submissionComplete">
      <SubmissionConfirmation :formName="formName" :completedSubmission="submissionDetails" />
    </div>
    <div v-else>
      <h2 class="pb-8">Please review your answers</h2>
    </div>
    <hr class="orange" />

    <v-row>
      <v-col offset-lg="1" cols="12" lg="10">
        <v-card outlined class="review-form">
          <h2 class="review-heading">
            1. Before You Begin
            <v-btn
              v-if="!submissionComplete"
              color="primary"
              class="mx-5"
              data-test="btn-form-to-step-one"
              fab
              x-small
              @click="setStep(1)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </h2>
          <Step1 />
        </v-card>

        <v-card outlined class="review-form">
          <h2 class="review-heading">
            2. Contact Information
            <v-btn
              v-if="!submissionComplete"
              color="primary"
              class="mx-5"
              data-test="btn-form-to-step-two"
              fab
              x-small
              @click="setStep(2)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </h2>
          <Step2 :reviewMode="true" />
        </v-card>

        <v-card outlined class="review-form">
          <h2 class="review-heading">
            3. Before Operations Begin
            <v-btn
              v-if="!submissionComplete"
              color="primary"
              class="mx-5"
              data-test="btn-form-to-step-three"
              fab
              x-small
              @click="setStep(3)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </h2>
          <Step3 :reviewMode="true" />
        </v-card>

        <v-card outlined class="review-form">
          <h2 class="review-heading">
            4. After Workers Arrive
            <v-btn
              v-if="!submissionComplete"
              color="primary"
              class="mx-5"
              data-test="btn-form-to-step-four"
              fab
              x-small
              @click="setStep(4)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </h2>
          <Step4 :reviewMode="true" />
        </v-card>

        <v-card outlined class="review-form">
          <h2 class="review-heading">
            5. If Workers Become Ill
            <v-btn
              v-if="!submissionComplete"
              color="primary"
              class="mx-5"
              data-test="btn-form-to-step-five"
              fab
              x-small
              @click="setStep(5)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </h2>
          <Step5 :reviewMode="true" />
        </v-card>
      </v-col>
    </v-row>

    <div v-if="!submissionComplete">
      <v-form v-model="step6Valid">
        <v-checkbox
          :rules="[v => !!v || 'You must certify to continue']"
          v-model="certifyAccurateInformation"
          data-test="cb-form-certifyAccurateInformation"
          label="I certify this information to be accurate"
        ></v-checkbox>
        <v-checkbox
          :rules="[v => !!v || 'You must agree to continue']"
          v-model="agreeToInspection"
          data-test="cb-form-agreeToInspection"
          label="I agree that my Industrial Camps will be subject to a site inspection"
        ></v-checkbox>
      </v-form>
    </div>

    <div v-if="!submissionComplete">
      <v-btn color="primary" data-test="btn-form-submit" :disabled="!step6Valid" @click="submit">
        <span>Submit</span>
      </v-btn>
      <v-btn text @click="setStep(5)" data-test="btn-form-to-previous-step">
        <span>Back</span>
      </v-btn>
    </div>

    <v-dialog v-model="submitting" hide-overlay persistent width="300">
      <v-card color="#38598a" dark>
        <v-card-text class="pt-4">
          Submitting Form
          <v-progress-linear indeterminate color="white"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="submissionError" persistent max-width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2 mb-2" primary-title>
          <v-icon color="red">error</v-icon>Error
        </v-card-title>
        <v-card-text>{{ submissionError }}</v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn color="red" data-test="btn-form-error-ok" text @click="setSubmissionError('')">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

import SubmissionConfirmation from '@/components/common/attestation/SubmissionConfirmation.vue';
import Step1 from '@/components/cloudeconomicmodel/Step1.vue';
import Step2 from '@/components/cloudeconomicmodel/Step2.vue';
import Step3 from '@/components/cloudeconomicmodel/Step3.vue';
import Step4 from '@/components/cloudeconomicmodel/Step4.vue';
import Step5 from '@/components/cloudeconomicmodel/Step5.vue';
import { FormNames } from '@/utils/constants';

export default {
  name: 'CloudEconomicModelStep6',
  components: {
    SubmissionConfirmation,
    Step1,
    Step2,
    Step3,
    Step4,
    Step5
  },
  data() {
    return {
      step6Valid: false
    };
  },
  computed: {
    ...mapGetters('form', [
      'attestation',
      'submissionComplete',
      'submissionDetails',
      'submissionError',
      'submitting'
    ]),
    // Certify checkboxes
    certifyAccurateInformation: {
      get() {
        return this.attestation.certifyAccurateInformation;
      },
      set(value) {
        this.updateAttestation({ ['certifyAccurateInformation']: value });
      }
    },
    agreeToInspection: {
      get() {
        return this.attestation.agreeToInspection;
      },
      set(value) {
        this.updateAttestation({ ['agreeToInspection']: value });
      }
    },
    formName() {
      return FormNames.CLOUDECONOMICMODEL;
    }
  },
  methods: {
    ...mapMutations('form', [
      'setStep',
      'setSubmissionError',
      'updateAttestation'
    ]),
    ...mapActions('form', ['submitForm']),
    async submit() {
      await this.submitForm();
      if (this.submissionComplete) {
        // Once the form is done disable the native browser "leave site" message so they can quit without getting whined at
        window.onbeforeunload = null;
      }
    }
  },
  mounted() {
    document
      .querySelectorAll('.review-form input, .review-form .v-select')
      .forEach(q => {
        q.setAttribute('readonly', 'true');
      });
  }
};
</script>

<style scoped lang="scss">
.review-form {
  font-size: smaller;
  margin-bottom: 2em;
  padding: 1em;
  .review-heading {
    margin-left: 0.5em;
    margin-bottom: 1em;
  }
  background-color: #efefef;
  &::v-deep {
    h3,
    .v-input--checkbox {
      margin-top: 0.2em !important;
    }
    .hide-on-review {
      display: none;
    }
  }
}
</style>
