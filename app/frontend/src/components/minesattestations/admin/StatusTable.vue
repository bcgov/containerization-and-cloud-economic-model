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
      <template v-slot:item.createdAt="{ item }">{{ formatDate(item.createdAt) }}</template>

      <template v-slot:item.grade="{ item }">
        <span v-if="item.grade">
          <v-chip
            class="ma-2"
            :color="item.grade.toUpperCase() === 'PASS' ? 'green' : 'red'"
            text-color="white"
          >{{ item.grade }}</v-chip>
        </span>
      </template>

      <template v-slot:item.inspectorName="{ item }">{{ item.inspectorName }}</template>

      <template v-slot:item.inspectionDate="{ item }">{{ formatDate(item.inspectionDate) }}</template>
    </v-data-table>
  </v-container>
</template>

<script>
import minesAttestationsService from '@/services/minesAttestations/minesAttestationsService';

export default {
  name: 'StatusTable',
  props:{
    ipcPlanId: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      headers: [
        { text: 'Status', value: 'status' },
        { text: 'Date', align: 'start', value: 'createdAt' },
        { text: 'Grade', align: 'start', value: 'grade' },
        { text: 'Assigned Inspector', value: 'inspectorName' },
        { text: 'Inspection Date', value: 'inspectionDate' }
      ],
      statuses: [],
      loading: true,
      showAlert: false,
      alertType: null,
      alertMessage: ''
    };
  },
  methods: {
    formatDate(date) {
      return date ? new Date(date).toLocaleString() : '';
    },
    getData() {
      minesAttestationsService
        .getIPCInspectionStatuses(this.ipcPlanId)
        .then(response => {
          this.statuses = response.data;
          if (!this.statuses.length) {
            this.showTableAlert('warning', 'No inspection statuses found');
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
