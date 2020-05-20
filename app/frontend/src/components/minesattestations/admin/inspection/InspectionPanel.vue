<template>
  <v-card outlined class="mx-auto inspection-panel">
    <v-progress-linear indeterminate v-if="loading" color="primary" class="mb-2" />
    <v-alert v-if="error" type="error" tile dense>{{ error }}</v-alert>

    <h2 class="inspection-heading">Status</h2>
    <div v-if="!loading">
      <p>
        <strong>Current Status:</strong>
        {{ currentStatus.statusCodeDetail.display }}
        <br />
        <strong>Assigned To:</strong>
        {{ currentStatus.assignedTo ? currentStatus.assignedTo : 'N/A' }}
      </p>

      <v-form v-if="!error" ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" xl="8" offset-xl="2">
            <label>Update Status</label>
            <v-select
              block
              dense
              flat
              outlined
              solo
              single-line
              label="Select status to set"
              :items="items"
              item-text="display"
              item-value="code"
              v-model="statusToSet"
              :rules="[v => !!v || 'Status is required']"
              :disabled="!hasReviewer"
              @change="statusFields = true"
            />

            <div v-show="statusFields">
              <div v-if="showInspector">
                <label>Inspector Name</label>
                <v-text-field
                  v-model="inspectorName"
                  :rules="[v => !!v || 'Name is required']"
                  dense
                  flat
                  outlined
                  solo
                />

                <div class="text-right">
                  <v-btn
                    text
                    small
                    color="primary"
                    class="pl-0 my-0 text-end"
                    @click="assignToCurrentUser"
                  >
                    <v-icon class="mr-1">person</v-icon>ASSIGN TO ME
                  </v-btn>
                </div>
              </div>

              <label>Note (Optional)</label>
              <v-textarea
                v-model="note"
                :rules="[v => v.length <= 4000 || 'Max 4000 characters']"
                rows="1"
                counter
                auto-grow
                dense
                flat
                outlined
                solo
              />
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" xl="4" offset-xl="2">
            <v-dialog v-model="historyDialog" width="1200">
              <template v-slot:activator="{ on }">
                <v-btn block outlined color="textLink" v-on="on">VIEW HISTORY</v-btn>
              </template>

              <v-card v-if="historyDialog">
                <v-card-title class="headline grey lighten-3" primary-title>Status History</v-card-title>

                <StatusTable :submissionId="submissionId" class="my-4" />

                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="historyDialog = false">CLOSE</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>

          <v-col cols="12" sm="6" xl="4" order="first" order-sm="last">
            <v-btn
              block
              color="primary"
              v-on="on"
              @click="updateStatus"
              :disabled="!hasReviewer"
            >UPDATE</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

import { AppClients, AppRoles } from '@/utils/constants';
import minesAttestationsService from '@/services/minesAttestations/minesAttestationsService';
import StatusTable from '@/components/minesattestations/admin/inspection/StatusTable.vue';

export default {
  name: 'InspectionPanel',
  components: {
    StatusTable,
  },
  props: {
    submissionId: {
      required: true,
      type: String
    },
  },
  data() {
    return {
      on: false,
      error: '',
      currentStatus: {},
      historyDialog: false,
      inspectionDateMenu: false,
      loading: true,
      statusHistory: {},
      statusFields: false,
      statusToSet: '',
      valid: false,

      // Fields
      inspectorName: this.currentStatus ? this.currentStatus.inspectorName : '',
      note: ''
    };
  },
  computed: {
    ...mapGetters('auth', ['hasResourceRoles', 'email', 'fullName']),

    // State machine
    items() {
      if(this.currentStatus && this.currentStatus.statusCodeDetail && this.currentStatus.statusCodeDetail.nextCodes) {
        return this.currentStatus.statusCodeDetail.nextCodes.filter(n => n.enabled);
      } else {
        return [];
      }
    },
    showInspector() { return ['ASSIGNED'].includes(this.statusToSet); },
    hasReviewer() {
      return this.hasResourceRoles(AppClients.MINESATTESTATIONS, [
        AppRoles.REVIEWER
      ]);
    }
  },
  methods: {
    async getInspectionData() {
      this.loading = true;
      try {
        const statuses = await minesAttestationsService.getSubmissionStatuses(this.submissionId);
        this.statusHistory = statuses.data;
        if (!this.statusHistory.length || !this.statusHistory[0]) {
          this.error = 'No inspection statuses found';
        } else {
          // Statuses are returned in date precedence, the 0th item in the array is the current status
          this.currentStatus = this.statusHistory[0];
          const scRes = await minesAttestationsService.getStatusCodes();
          const statusCodes = scRes.data;
          if(!statusCodes.length) {
            throw new Error('error finding status codes');
          }
          this.currentStatus.statusCodeDetail = statusCodes.find(sc => sc.code === this.currentStatus.code);
        }
      } catch (error) {
        this.error = 'Error occured fetching status for this submission';
        console.error(`Error getting statuses: ${error.message}`); // eslint-disable-line no-console
      } finally {
        this.loading = false;
      }
    },
    assignToCurrentUser() {
      this.inspectorName = this.fullName;
    },
    resetForm() {
      this.statusFields = false;
      this.$refs.form.resetValidation();
      this.statusToSet = null;
      this.statusFields = false;
      this.note = '';
    },
    async updateStatus() {
      try {
        this.error = '';
        if(this.$refs.form.validate()) {
          if(!this.statusToSet) {
            throw new Error('No Status');
          }

          const statusBody = {
            code: this.statusToSet
          };
          if(this.showInspector) {
            if(this.inspectorName) {
              statusBody.assignedTo = this.inspectorName;
            }
          }
          const statusResponse = await minesAttestationsService.sendSubmissionStatuses(this.submissionId, statusBody);
          if (!statusResponse.data) {
            throw new Error('No response data from API while submitting status update form');
          }
          if(this.note) {
            const submissionStatusId = statusResponse.data.submissionStatusId;
            const noteBody = {
              submissionId: this.submissionId,
              submissionStatusId: submissionStatusId,
              note: this.note
            };
            const response = await minesAttestationsService.addNoteToStatus(this.submissionId, submissionStatusId, noteBody);
            if (!response.data) {
              throw new Error('No response data from API while submitting note for status update');
            }
            // Update the parent if the note was updated
            this.$emit('note-updated');
          }
          this.resetForm();
          this.getInspectionData();
        }
      } catch (error) {
        console.error(`Error updating status: ${error}`); // eslint-disable-line no-console
        this.error = 'An error occured while trying to update the status';
      }
    },
  },
  created() {
    this.getInspectionData();
  }
};
</script>

<style lang="scss" scoped>
.inspection-panel {
  background-color: #f5f5f5;
  margin-bottom: 2em;
  padding: 1em 1.5em;
  .inspection-heading {
    font-size: 1.5em;
    margin-bottom: 0.5em;
    color: #003366;
  }
}
</style>
