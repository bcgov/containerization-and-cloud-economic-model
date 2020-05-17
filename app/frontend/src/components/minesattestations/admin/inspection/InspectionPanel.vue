<template>
  <v-card outlined class="mx-auto inspection-panel">
    <v-progress-linear indeterminate v-if="loading" color="primary" class="mb-2" />
    <v-alert v-if="error" type="error" tile dense>{{ error }}</v-alert>

    <h2 class="inspection-heading">Inspection Status</h2>
    <div v-if="!loading">
      <p>
        <strong>Current Status:</strong>
        {{ currentStatus.status }}
        <span v-if="currentStatus.grade">
          <v-chip
            class="ma-2"
            :color="currentStatus.grade.toUpperCase() === 'PASS' ? 'green' : 'red'"
            text-color="white"
          >{{ currentStatus.grade }}</v-chip>
        </span>
        <br />
        <strong>Assigned To:</strong>
        {{ currentStatus.inspectorName ? currentStatus.inspectorName : 'N/A' }}
        <span
          v-if="currentStatus.inspectorEmail"
        >({{ currentStatus.inspectorEmail }})</span>
        <br />
        <strong>Inspection Date:</strong>
        {{ inspectionDateDisplay }}
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
              item-text="label"
              item-value="statusVal"
              v-model="statusToSet"
              :rules="[v => !!v || 'Status is required']"
              @change="statusFields = true"
            />

            <div v-show="statusFields">
              <div v-if="showGrade">
                <label>Grade (Optional)</label>
                <v-select
                  block
                  dense
                  flat
                  outlined
                  solo
                  single-line
                  clearable
                  label="Select grade"
                  :items="grades"
                  v-model="grade"
                />
              </div>

              <div v-if="showInspectionDate">
                <label>Inspection Date</label>
                <v-menu
                  v-model="inspectionDateMenu"
                  :close-on-content-click="true"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="inspectionDate"
                      :rules="[v => !!v || 'Date is required']"
                      placeholder="yyyy-mm-dd"
                      append-icon="event"
                      v-on:click:append="inspectionDateMenu=true"
                      readonly
                      v-on="on"
                      dense
                      flat
                      outlined
                      solo
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="inspectionDate" @input="inspectionDateMenu = false"></v-date-picker>
                </v-menu>
              </div>

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

                <label>Inspector Email (Optional)</label>
                <v-text-field v-model="inspectorEmail" dense flat outlined solo />

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
                :rules="v => v.length <= 4000 || 'Max 4000 characters'"
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

                <StatusTable :ipcPlanId="ipcPlanId" class="my-4" />

                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="historyDialog = false">CLOSE</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>

          <v-col cols="12" sm="6" xl="4" order="first" order-sm="last">
            <v-btn block color="primary" v-on="on" @click="updateStatus">UPDATE</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </v-card>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';

import minesAttestationsService from '@/services/minesAttestations/minesAttestationsService';
import StatusTable from '@/components/minesattestations/admin/StatusTable.vue';
import { Statuses } from '@/utils/constants';

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
      historyDialog: false,
      inspectionDateMenu: false,
      loading: true,
      statusHistory: {},
      statuses: Statuses,
      statusFields: false,
      statusToSet: '',
      valid: false,

      // Fields
      inspectorName: this.currentStatus ? this.currentStatus.inspectorName : '',
      inspectorEmail: this.currentStatus ? this.currentStatus.inspectorEmail : '',
      inspectionDate: '',
      grade: '',
      grades: ['Pass', 'Fail'],
      note: ''
    };
  },
  computed: {
    ...mapGetters('auth', ['email', 'fullName']),
    currentStatus() {
      if (this.statusHistory && this.statusHistory[0]) {
        // Statuses are returned in date precedence, the 0th item in the array is the current status
        return this.statusHistory[0];
      } else {
        return {};
      }
    },

    // State machine
    items() {
      switch(this.currentStatus.status) {
        case this.statuses.SUBMITTED:
          return [{
            label: 'Assign',
            statusVal: this.statuses.ASSIGNED
          }];
        case this.statuses.ASSIGNED:
          return [{
            label: 'Schedule',
            statusVal: this.statuses.SCHEDULED
          },
          {
            label: 'Re-Assign',
            statusVal: this.statuses.ASSIGNED
          }];
        case this.statuses.SCHEDULED:
          return [{
            label: 'Complete',
            statusVal: this.statuses.COMPLETED
          },
          {
            label: 'Follow-up',
            statusVal: this.statuses.FOLLOWUP
          },
          {
            label: 'Re-schedule',
            statusVal: this.statuses.SCHEDULED
          },
          {
            label: 'Cancel',
            statusVal: this.statuses.CANCELLED
          }];
        case this.statuses.COMPLETED:
          return [{
            label: 'Re-open',
            statusVal: this.statuses.ASSIGNED
          }];
        case this.statuses.CANCELLED:
          return [{
            label: 'Re-open',
            statusVal: this.statuses.ASSIGNED
          }];
        case this.statuses.FOLLOWUP:
          return [{
            label: 'Complete',
            statusVal: this.statuses.COMPLETED
          },
          {
            label: 'Follow-up again',
            statusVal: this.statuses.FOLLOWUP
          },
          {
            label: 'Re-schedule',
            statusVal: this.statuses.SCHEDULED
          },
          {
            label: 'Cancel',
            statusVal: this.statuses.CANCELLED
          }];
        default:
          return [];
      }
    },
    showInspector() { return [this.statuses.ASSIGNED, this.statuses.SCHEDULED, this.statuses.FOLLOWUP].includes(this.statusToSet); },
    showInspectionDate() { return [this.statuses.SCHEDULED, this.statuses.FOLLOWUP].includes(this.statusToSet); },
    inspectionDateDisplay() { return this.currentStatus.inspectionDate ? moment(this.currentStatus.inspectionDatmomente).format('MMMM D YYYY') : 'N/A'; },
    showGrade() { return [this.statuses.COMPLETED, this.statuses.FOLLOWUP].includes(this.statusToSet); }
  },
  methods: {
    getInspectionData() {
      this.loading = true;
      minesAttestationsService
        .getSubmissionStatuses(this.submissionId)
        .then(response => {
          this.statusHistory = response.data;
          if (!this.statusHistory.length) {
            this.error = 'No inspection statuses found';
          }
        })
        .catch(error => {
          this.error = error.message;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    assignToCurrentUser() {
      this.inspectorName = this.fullName;
      this.inspectorEmail = this.email;
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
            status: this.statusToSet
          };
          if(this.showInspector) {
            if(this.inspectorName) {
              statusBody.inspectorName = this.inspectorName;
            }
            if(this.inspectorEmail) {
              statusBody.inspectorEmail = this.inspectorEmail;
            }
          }
          if(this.inspectionDate && this.showInspectionDate) {
            statusBody.inspectionDate = this.inspectionDate;
          }
          if(this.grade && this.showGrade) {
            statusBody.grade = this.grade;
          }
          if(this.note) {
            statusBody.note = this.note;
          }
          const response = await minesAttestationsService.sendIPCInspectionStatuses(this.ipcPlanId, statusBody);
          if (!response.data) {
            throw new Error('No response data from API while submitting form');
          }
          if(this.note) {
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
