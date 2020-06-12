<template>
  <div>
    <Landing v-if="step < 1" />
    <v-stepper v-else v-model="step" alt-labels class="form-stepper elevation-0" @change="setStep">
      <v-container v-if="!submissionComplete" fluid class="pa-0">
        <v-row class="header-row" no-gutters>
          <v-col cols="12" xl="8" offset-xl="2">
            <v-stepper-header class="elevation-0 hidden-xs-only">
              <v-stepper-step
                :complete="step > 1"
                data-test="btn-stepper-one"
                edit-icon="check"
                :editable="step > 1"
                step="1"
              >Contact Information</v-stepper-step>

              <v-divider />

              <v-stepper-step
                :complete="step > 2"
                data-test="btn-stepper-two"
                edit-icon="check"
                :editable="step > 2"
                step="2"
              >Before Operations Begin</v-stepper-step>

              <v-divider />

              <v-stepper-step
                :complete="step > 3"
                data-test="btn-stepper-three"
                edit-icon="check"
                :editable="step > 3"
                step="3"
              >After Workers Arrive</v-stepper-step>

              <v-divider />

              <v-stepper-step
                :complete="step > 4"
                data-test="btn-stepper-four"
                edit-icon="check"
                :editable="step > 4"
                step="4"
              >If Workers Become Ill</v-stepper-step>

              <v-divider />

              <v-stepper-step step="5" data-test="btn-stepper-five">Review</v-stepper-step>
            </v-stepper-header>
          </v-col>
        </v-row>
      </v-container>

      <v-container>
        <v-row no-gutters>
          <v-col cols="12" xl="8" offset-xl="2">
            <v-stepper-items>
              <v-stepper-content step="1">
                <Step1 />
              </v-stepper-content>

              <v-stepper-content step="2">
                <Step2 />
              </v-stepper-content>

              <v-stepper-content step="3">
                <Step3 />
              </v-stepper-content>

              <v-stepper-content step="4">
                <Step4 />
              </v-stepper-content>

              <v-stepper-content step="5">
                <Step5 />
              </v-stepper-content>
            </v-stepper-items>
          </v-col>
        </v-row>
      </v-container>
    </v-stepper>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Landing from '@/components/agriseafoodopscreening/Landing.vue';
import Step1 from '@/components/agriseafoodopscreening/Step1.vue';
import Step2 from '@/components/agriseafoodopscreening/Step2.vue';
import Step3 from '@/components/agriseafoodopscreening/Step3.vue';
import Step4 from '@/components/agriseafoodopscreening/Step4.vue';
import Step5 from '@/components/agriseafoodopscreening/Step5.vue';

export default {
  name: 'AgricultureSeafoodAttestationForm',
  components: {
    Landing,
    Step1,
    Step2,
    Step3,
    Step4,
    Step5
  },
  data () {
    return {
    };
  },
  computed: {
    ...mapGetters('agriSeafoodOpScreeningForm', ['step', 'submissionComplete']),
  },
  methods: {
    ...mapMutations('agriSeafoodOpScreeningForm', ['setStep']),
  }
};
</script>
