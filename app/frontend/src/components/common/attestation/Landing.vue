<template>
  <div>
    <v-sheet class="comfort-landing-title" tile>
      <v-container>
        <v-row>
          <v-col cols="12" xl="8" offset-xl="2">
            <h2>{{ formOptions.landing.header}}</h2>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <v-container>
      <v-row>
        <v-col cols="12" xl="8" offset-xl="2">
          <p
            class="mb-8"
          >The Province of British Columbia has initiated emergency measures to slow the spread of COVID-19. {{ formOptions.operators }} must ensure a safe workplace for their workers and demonstrate proof of an Infection Prevention Control protocol (IPCP).</p>

          <BaseImportantCard class="mt-6 mb-9">
            <span>Important: This attestation form must be completed once for each accommodation location.</span>
          </BaseImportantCard>

          <BaseHeaderSection :text="'Before you start'" />

          <div v-if="formOptions.landing.beforeStartInfo">
            <BaseInfoCard class="my-8 hide-on-review">
              <div v-html="formOptions.landing.beforeStartInfo" />
            </BaseInfoCard>
          </div>

          <v-container>
            <v-row no-gutters>
              <v-col cols="12" sm="2" lg="1">
                <v-avatar color="#003366" size="50">
                  <span class="white--text headline">1</span>
                </v-avatar>
              </v-col>
              <v-col cols="12" sm="10" lg="11">
                <div v-for="(doc, i) in formOptions.landing.pdfDocs" v-bind:key="i">
                  <h4 class="mb-4">
                    <strong>
                      Read
                      <em>{{ doc.title }}</em>
                    </strong>
                  </h4>
                  <p>
                    <a
                      :href="doc.link"
                      target="_blank"
                      :data-test="`btn-form-health-pdf-link-${i}`"
                    >
                      Download PDF
                      <v-icon small color="primary">open_in_new</v-icon>
                    </a>
                  </p>
                </div>
              </v-col>
            </v-row>
          </v-container>

          <div>
            <hr />
            <v-container class="mb-4">
              <v-row no-gutters>
                <v-col cols="12" sm="2" lg="1">
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
                          <em>{{ formOptions.landing.docShortTitle }}</em> will help you identify areas that do not sufficiently prevent or reduce the risk of COVID-19 transmission.
                        </p>

                        <BaseInfoCard>
                          <p>
                            <strong>For example,</strong> if workers need to be transported to the work site in vehicles where a 2m distance cannot be maintained, this should be identified as a risk.
                          </p>
                          <p
                            class="mb-0"
                          >Operators can take practical actions to reduce the risk of disease transmission (see section 7 of document).</p>
                        </BaseInfoCard>

                        <p class="mt-5">
                          Have you worked through all the sections in
                          <em>{{ formOptions.landing.docShortTitle }}</em> to identify the risks at your camps?
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
                <v-col cols="12" sm="2" lg="1">
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
                          <em>{{ formOptions.landing.docShortTitle }}</em>, you will be developing an Infection Prevention and Control (IPC) Protocol.
                        </p>
                        <p>For each section of the guide you identified a risk, the risk needs to be controlled. For example, if your workers ride together in a vehicle to the work site, and you follow the instructions to increase cleaning and hygiene, and increase physical distancing, this will form your IPC plan for transportation (see section 7).</p>
                        <p>
                          Have you decided what guidance in
                          <em>{{ formOptions.landing.docShortTitle }}</em> is needed in your camps to prevent or control the risk of the transmission of COVID-19?
                        </p>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>
              </v-row>
            </v-container>
          </div>

          <div>
            <div class="my-12">
              <BaseInfoCard>
                <h4 v-html="formOptions.landing.contact.head" />
                <div v-if="formOptions.landing.contact.list">
                  <v-container class="pl-0 pb-0">
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        lg="4"
                        v-for="item in formOptions.landing.contact.list"
                        v-bind:key="item"
                      >
                        <div v-html="item" />
                      </v-col>
                    </v-row>
                  </v-container>
                </div>
              </BaseInfoCard>
            </div>

            <BaseHeaderSection
              :text="'By submitting this form, you are subject to a site inspection'"
            />

            <p
              class="my-8"
            >The Province of BC will use the information you provide through this online form for the site inspection that determines your compliance with the COVID-19 Industrial Camps Provincial Health Order.</p>

            <BaseWarningCardNew>If you fail to comply with these requirements, the Provincial Health Officer order enables the authority to take enforcement action against you under Part 4, Division 6 of the Public Health Act.</BaseWarningCardNew>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { getFormOptions } from '@/utils/attestationFormOptions';

export default {
  name: 'Landing',
  props: {
    formName: {
      type: String,
      required: true
    }
  },
  computed: {
    formOptions() {
      return getFormOptions(this.formName);
    }
  },
};
</script>

