<template>
  <v-container>
    <div class="hide-on-review">
      <h2
        class="mb-8"
      >Cloud Economic Model</h2>
      <p
        class="mb-8"
      >Please complete the following to receive your customized Cloud Economic Model report.</p>

      <h2 class="mb-8 mt-12">
        <strong>Before you complete this form:</strong>
      </h2>

    </div>

    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="2" lg="1" class="hide-on-review">
          <v-avatar color="#003366" size="50">
            <span class="white--text headline">1</span>
          </v-avatar>
        </v-col>
        <v-col cols="12" sm="10" lg="11">
          <h4 class="mb-4">
            <strong>
              Read
              <em>{{ docTitle }}</em>
            </strong>
          </h4>
          <p>
            <a
              href="https://www2.gov.bc.ca/assets/gov/health/about-bc-s-health-care-system/office-of-the-provincial-health-officer/covid-19/covid-19-pho-guidance-natural-resource-sector-work-camps.pdf"
              target="_blank"
              data-test="btn-form-health-pdf-link"
            >Download PDF</a>
          </p>
        </v-col>
      </v-row>
    </v-container>

    <div class="hide-on-review">
      <hr />
      <v-container class="mb-4">
        <v-row no-gutters>
          <v-col cols="12" sm="2" lg="1" class="hide-on-review">
            <v-avatar color="#003366" size="50">
              <span class="white--text headline">2</span>
            </v-avatar>
          </v-col>
          <v-col cols="12" sm="10" lg="11">
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header data-test="btn-form-panel-camp-order">
                  <strong>Complete a COVID-19 risk assessment by following the directions in the guidance document.</strong>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <p>
                    Assessing each section in
                    <em>{{ docShortTitle }}</em> will help you identify areas that do not sufficiently prevent or reduce the risk of COVID-19 transmission.
                  </p>

                  <BaseInfoCard>
                    <p>
                      <strong>For example,</strong> if workers need to be transported to the work site in vehicles where a 2m distance cannot be maintained, this should be identified as a risk.
                    </p>
                    <p
                      class="mb-0"
                    >Industrial Camps Operators can take practical actions to reduce the risk of disease transmission (see section 7 of document).</p>
                  </BaseInfoCard>

                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-container>

      <hr />
      <v-container>
        <v-row no-gutters>
          <v-col cols="12" sm="2" lg="1" class="hide-on-review">
            <v-avatar color="#003366" size="50">
              <span class="white--text headline">3</span>
            </v-avatar>
          </v-col>
          <v-col cols="12" sm="10" lg="11">
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header data-test="btn-form-panel-ipc-protocol">
                  <strong>Create your Infection Prevention and Control protocol.</strong>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <p>
                    By following the guidance in
                    <em>{{ docShortTitle }}</em>, you will be developing an Infection Prevention and Control (IPC) Protocol.
                  </p>
                  <p>For each section of the guide you identified a risk, the risk needs to be controlled. For example, if your workers ride together in a vehicle to the work site, and you follow the instructions to increase cleaning and hygiene, and increase physical distancing, this will form your IPC plan for transportation (see section 7).</p>
                  <p>
                    Have you decided what guidance in
                    <em>{{ docShortTitle }}</em> is needed in your camps to prevent or control the risk of the transmission of COVID-19?
                  </p>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="hide-on-review">
      <v-btn color="primary" @click="setStep(2)" data-test="btn-form-to-next-step">
        <span>Go to Sensitivity Analysis Options</span>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'CloudEconomicModelStep1',
  data() {
    return {
      docTitle:
        'Protecting Workers, Contractors, and Employers Working in the Natural Resource Sector During the COVID-19 Pandemic',
      docShortTitle: 'COVID-19 Guidelines for Natural Resource Sector'
    };
  },
  methods: {
    ...mapMutations('form', ['setStep'])
  }
};
</script>

