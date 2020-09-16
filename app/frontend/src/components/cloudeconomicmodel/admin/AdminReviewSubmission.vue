<template>
  <v-container>
    <v-card outlined class="review-form">
      <h2 class="review-heading">Contact Information</h2>
      <Step2 :reviewMode="true" />
    </v-card>

    <v-card outlined class="review-form">
      <h2 class="review-heading">Before Operations Begin</h2>
      <Step3 :reviewMode="true" />
    </v-card>

    <v-card outlined class="review-form">
      <h2 class="review-heading">After Workers Arrive</h2>
      <Step4 :reviewMode="true" />
    </v-card>

    <v-card outlined class="review-form">
      <h2 class="review-heading">If Workers Become Ill</h2>
      <Step5 :reviewMode="true" />
    </v-card>

    <v-card outlined class="review-form">
      <h2 class="review-heading mb-5">Certification</h2>
      <div class="pl-7">
        <v-checkbox
          readonly
          v-model="certifyAccurateInformation"
          label="I certify this information to be accurate"
        ></v-checkbox>
        <v-checkbox
          readonly
          v-model="agreeToInspection"
          label="I agree that my planting camps will be subject to a site inspection"
        ></v-checkbox>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

import Step2 from '@/components/cloudeconomicmodel/Step2.vue';
import Step3 from '@/components/cloudeconomicmodel/Step3.vue';
import Step4 from '@/components/cloudeconomicmodel/Step4.vue';
import Step5 from '@/components/cloudeconomicmodel/Step5.vue';

export default {
  name: 'ReviewSubmission',
  components: {
    Step2,
    Step3,
    Step4,
    Step5
  },
  computed: {
    ...mapGetters('form', ['gettingForm', 'attestation', 'submissionComplete']),
    // Certify checkboxes
    certifyAccurateInformation() { return this.attestation.certifyAccurateInformation; },
    agreeToInspection() { return this.attestation.agreeToInspection; }
  },
  mounted() {
    document.querySelectorAll('.review-form input, .review-form .v-select').forEach(q => {
      q.setAttribute('readonly', 'true');
      q.style.pointerEvents = 'none';
    });
  }
};
</script>

<style scoped lang="scss">
$background: #fafafa;
.review-form {
  font-size: smaller;
  margin-bottom: 2em;
  padding: 1em;
  background-color: $background;
  .review-heading {
    margin-left: 0.5em;
    margin-bottom: em;
    color: #003366;
  }
  &::v-deep {
    .hide-on-review {
      display: none;
    }

    h3 {
      margin-top: 0.2em !important;
    }
    .heading-field-label {
      font-size: normal;
    }

    .v-input__slot {
      background-color: $background !important;
      padding-left: 0 !important;
      input {
        padding-top: 0;
      }
    }
    .v-input__icon,
    .v-text-field__details {
      display: none;
    }
    fieldset {
      background-color: $background;
      border: 0;
    }
    input::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      color: $background;
    }
    input::-moz-placeholder {
      /* Firefox 19+ */
      color: $background;
    }

    .v-input--checkbox,
    .v-input--radio-group__input {
      margin-top: 0;
      padding-top: 0;
      label {
        font-size: 14px;
      }
    }

    .question-series {
      p {
        font-size: 14px;
      }
      .questions {
        .v-input__slot {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
