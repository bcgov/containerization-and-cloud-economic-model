<template>
  <div>
    <v-sheet class="comfort-landing-title" tile>
      <v-container>
        <v-row>
          <v-col cols="12" xl="8" offset-xl="2">
            <h2>Protecting Farm Workers and Temporary Foreign Workers During the COVID-19 Pandemic</h2>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <v-container>
      <v-row>
        <v-col cols="12" xl="8" offset-xl="2">
          <div class="hide-on-review">
            <p
              class="mt-3"
            >The Province of British Columbia has initiated emergency measures to slow the spread of COVID-19. Industrial Camp Operators must ensure a safe workplace for their workers and demonstrate proof of an Infection Prevention Control protocol (IPCP).</p>

            <BaseImportantCard class="mt-6 mb-9">
              <span>Important: This attestation form must be completed once for each accommodation location.</span>
            </BaseImportantCard>

            <BaseHeaderSection :text="'Before you start'" />

            <BaseInfoCard class="my-8 hide-on-review">
              If you employ
              <a
                href="https://www2.gov.bc.ca/gov/content/industry/agriculture-seafood/covid-19-response/temporary-foreign-farmworkers#inspections"
                target="_blank"
                data-test="btn-form-complete-site-inspection"
              >
                Temporary Foreign Workers and have already completed a site inspection,
                <v-icon color="primary">open_in_new</v-icon>
              </a> you do not require a second inspection unless
              you are planning to use new accommodation sites that have never had an inspection.
            </BaseInfoCard>
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
                    href="https://www2.gov.bc.ca/assets/gov/health/about-bc-s-health-care-system/office-of-the-provincial-health-officer/covid-19/covid-19-pho-guidance-farms-farm-workers.pdf"
                    target="_blank"
                    data-test="btn-form-health-pdf-link-1"
                  >
                    Download PDF
                    <v-icon small color="primary">open_in_new</v-icon>
                  </a>
                </p>
                <h4 class="mb-4">
                  <strong>
                    Read
                    <em>COVID-19 pandemic PHO Order Industrial Camps: What does it mean for B.C.'s agriculture and seafood industry?</em>
                  </strong>
                </h4>
                <p>
                  <a
                    href="https://www2.gov.bc.ca/assets/gov/farming-natural-resources-and-industry/agriculture-and-seafood/covid-19/agri_qa_pho_order_industrial_camps.pdf"
                    target="_blank"
                    data-test="btn-form-health-pdf-link-2"
                  >
                    Download PDF
                    <v-icon small color="primary">open_in_new</v-icon>
                  </a>
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
                        <strong>Complete a COVID-19 risk assessment to comply with the Industrial Camp Health Order by following the directions in the guidance document.</strong>
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

                        <p class="mt-5">
                          Have you worked through all the sections in
                          <em>{{ docShortTitle }}</em> to identify the risks at your camps?
                        </p>
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
            <div class="my-12">
              <BaseInfoCard>
                <h4>The following contacts are available if you need assistance completing these risk assessment or infection prevention tasks:</h4>
                <v-container class="pl-0 pb-0">
                  <v-row>
                    <v-col cols="12" sm="6" lg="4">
                      <h4>Agriculture Operators contact</h4>
                      <p class="mb-0 pb-0">
                        AgSafeBC
                        <br />Toll-free: 1-877-533-1789
                        <br />Email:
                        <a
                          href="mailto:Contact@AgSafeBC.ca"
                          data-test="btn-form-contact-email-1"
                        >Contact@AgSafeBC.ca</a>
                      </p>
                    </v-col>
                    <v-col cols="12" sm="6" lg="4">
                      <h4>Seafood Operators contact</h4>
                      <p class="mb-0 pb-0">
                        WorksSafeBC
                        <br />Toll-free: 1-888-621-7233 (1-888-621-SAFE)
                        <br />Email WorksafeBC:
                        <a
                          target="_blank"
                          href="https://gems.online.worksafebc.com/emailus?_ga=2.36658272.1710059602.1591993589-423167262.1587748063"
                          data-test="btn-form-contact-email-2"
                        >Contact Us Form <v-icon small color="primary">open_in_new</v-icon></a>
                      </p>
                    </v-col>
                  </v-row>
                </v-container>
              </BaseInfoCard>
            </div>

            <BaseHeaderSection
              :text="'By submitting this form, you are subject to a site inspection'"
            />

            <p
              class="my-8"
            >The Province of BC will use the information you provide through this online form for the site inspection that determines your compliance with the COVID-19 Industrial Camps Provincial Health Order.</p>

            <BaseWarningCardNew
              class="mb-10"
            >If you fail to comply with these requirements, the Provincial Health Officer order enables the authority to take enforcement action against you under Part 4, Division 6 of the Public Health Act.</BaseWarningCardNew>

            <v-form ref="form" v-model="landingValid">
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  class="text-sm-right pt-sm-5 pb-0"
                >Please select your Operation Type:</v-col>
                <v-col cols="12" sm="6" lg="3">
                  <v-select
                    :items="operationTypes"
                    item-text="display"
                    item-value="type"
                    v-model="opType"
                    data-test="select-form-opType"
                    :rules="[v => !!v || 'Type is required']"
                    dense
                    flat
                    outlined
                    solo
                    single-line
                  />
                </v-col>
              </v-row>
              <div class="text-center my-6">
                <v-btn class="px-12" color="primary" @click="startForm">
                  <span>Start</span>
                </v-btn>
              </div>
            </v-form>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'AgriSeaLanding',
  data() {
    return {
      docTitle:
        'Protecting Farm Workers and Temporary Foreign Workers During the COVID-19 Pandemic',
      docShortTitle: 'COVID-19 guidance for farms and farm workers',
      landingValid: false,

      // TODO: fetch this from API
      operationTypes: [
        { type: 'AGRICULTURE', display: 'Agriculture', enabled: true },
        { type: 'SEAFOOD', display: 'Seafood', enabled: true }
      ]
    };
  },
  computed: {
    ...mapGetters('agriSeafoodOpScreeningForm', ['operationType']),
    opType: {
      get() {
        return this.operationType;
      },
      set(value) {
        this.setOperationType(value);
      }
    }
  },
  methods: {
    ...mapMutations('agriSeafoodOpScreeningForm', [
      'setStep',
      'setOperationType'
    ]),
    startForm() {
      if (this.$refs.form.validate()) {
        this.setStep(1);
      }
    }
  }
};
</script>

