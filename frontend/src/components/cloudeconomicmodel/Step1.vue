<template>
  <v-container>
    <div class="hide-on-review">
      <h2 class="mb-8">Cloud Economic Model</h2>
      <hr class="orange" />

      <br />
      <h3 class="mb-4">Before you begin:</h3>
      <v-container>
        <v-container class="mb-4">
          <v-row no-gutters>
            <v-col cols="12" sm="2" lg="1" class="hide-on-review">
              <v-avatar color="#003366" size="50">
                <span class="white--text headline">1</span>
              </v-avatar>
            </v-col>
            <v-col cols="12" sm="10" lg="11">
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header
                    data-test="btn-form-panel-camp-order"
                  >
                    <strong> Supplementary Reading</strong>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <h4 class="mb-4">
                      Read <em>{{ docTitle }}</em>
                    </h4>
                    <p>
                      <a href="https://www2.gov.bc.ca/" target="_blank">
                        Download PDF (link unassigned)</a
                      >
                    </p>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-container>

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
                  <v-expansion-panel-header
                    data-test="btn-form-panel-camp-order"
                  >
                    <strong> Required Information</strong>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <p>
                      It is recommended that team size, experience and other
                      factors be know to accurately calculate projections.
                    </p>

                    <BaseInfoCard>
                      <strong>E.g.</strong> 8 developers, no platform knowledge,
                      3000 hours/year on new features and low likelihood of
                      shadow app dependencies.
                    </BaseInfoCard>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-container>

        <v-container class="mb-4">
          <v-row no-gutters>
            <v-col cols="12" sm="2" lg="1" class="hide-on-review">
              <v-avatar color="#003366" size="50">
                <span class="white--text headline">3</span>
              </v-avatar>
            </v-col>
            <v-col cols="12" sm="10" lg="11">
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header
                    data-test="btn-form-panel-ipc-protocol"
                  >
                    <strong> No Data Retention</strong>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <p>
                      No information will retained, so accuracy is technically
                      not important.
                    </p>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </div>

    <div class="hide-on-review">
      <v-btn
        color="primary"
        @click="setStep(2)"
        data-test="btn-form-to-next-step"
      >
        <span>Go to Analysis Options</span>
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
      docTitle: 'Unassigned PDF',
    };
  },
  methods: {
    ...mapMutations('form', ['setStep']),
  },
};
</script>
