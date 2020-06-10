<template>
  <v-container>
    <v-alert v-if="showAlert" :type="alertType" tile dense>{{alertMessage}}</v-alert>

    <v-data-table
      disable-pagination
      :hide-default-footer="true"
      :headers="headers"
      :items="statuses"
      :loading="loading"
      loading-text="Loading... Please wait"
      item-key="inspectionStatusId"
      class="status-table"
    >
      <template v-slot:item.createdAt="{ item }">
        <v-tooltip bottom :disabled="item.code.toUpperCase() === 'SUBMITTED'">
          <template v-slot:activator="{ on }">
            <span v-on="on">{{ formatDateTime(item.createdAt) }}</span>
          </template>
          <span>Status updated by {{ item.createdBy }}</span>
        </v-tooltip>
      </template>

      <template v-slot:item.actionDate="{ item }">{{ formatDate(item.actionDate) }}</template>
    </v-data-table>
  </v-container>
</template>

<script>
import moment from 'moment';

import commonFormService from '@/services/commonFormService';

export default {
  name: 'StatusTable',
  props:{
    formName: {
      type: String,
      required: true
    },
    submissionId: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      headers: [
        { text: 'Status', value: 'code' },
        { text: 'Date Status Changed', align: 'start', value: 'createdAt' },
        { text: 'Assignee', value: 'assignedTo' },
        { text: 'Effective Date', value: 'actionDate' },
      ],
      statuses: [],
      loading: true,
      showAlert: false,
      alertType: null,
      alertMessage: ''
    };
  },
  methods: {
    formatDateTime(date) {
      return date ? new Date(date).toLocaleString() : '';
    },
    formatDate(date) {
      return date ? moment(date).format('MMMM D YYYY'): '';
    },
    getData() {
      commonFormService
        .getSubmissionStatuses(this.formName, this.submissionId)
        .then(response => {
          this.statuses = response.data;
          if (!this.statuses.length) {
            this.showTableAlert('warning', 'No statuses found');
          }
        })
        .catch(error => {
          this.showTableAlert('error', error.message);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    showTableAlert(typ, msg) {
      this.showAlert = true;
      this.alertType = typ;
      this.alertMessage = msg;
      this.loading = false;
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scoped>
.status-table >>> tbody tr:nth-of-type(odd) {
  background-color: #f5f5f5;
}
.status-table >>> thead tr th {
  font-weight: normal;
  color: #003366 !important;
  font-size: 1.1em;
}
</style>
