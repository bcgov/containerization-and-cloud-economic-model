<template>
  <div>
    <!-- search input -->
    <div class="ipc-search mt-6 mt-sm-0">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        class="pb-5"
      ></v-text-field>
    </div>
    <!-- table alert -->
    <v-alert v-if="showAlert" :type="alertType" tile dense>{{alertMessage}}</v-alert>
    <!-- table header -->
    <v-data-table
      class="ipc-table"
      :custom-sort="customSort"
      :headers="headers"
      :items="submissions"
      :items-per-page="10"
      :search="search"
      :loading="loading"
      loading-text="Loading... Please wait"
      item-key="confirmationId"
      sortBy="created"
      update: sort-desc
    >
      <template v-slot:item.download="{ item }">
        <GeneratePdfButton :submissionId="item.submissionId">
          <v-btn text small color="textLink"><v-icon class="mr-1">picture_as_pdf</v-icon> PDF</v-btn>
        </GeneratePdfButton>
      </template>
      <template v-slot:item.details="{ item }">
        <router-link :to="{ name: 'MinesOperatorScreeningSubmission', params: { submissionId: item.submissionId } }">
          <v-btn text small color="textLink"><v-icon class="mr-1">remove_red_eye</v-icon> VIEW</v-btn>
        </router-link>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import GeneratePdfButton from '@/components/common/GeneratePdfButton.vue';
import minesOperatorScreeningService from '@/services/minesOperatorScreeningService';

export default {
  name: 'MinesSubmissionsTable',
  components: {
    GeneratePdfButton
  },
  computed: {
    responsiveCell () {
      return (this.$vuetify.breakpoint.name == 'xs') ? 'v-data-table__mobile-table-row' : '';
    }
  },
  data() {
    return {
      // vuetify data table
      search: '',
      headers: [
        { text: 'Submitted', value: 'created' },
        { text: 'Status', align: 'start', value: 'inspectionStatus' },
        { text: 'Business Name', align: 'start', value: 'name' },
        { text: 'Confirmation ID', align: 'start', value: 'confirmationId' },
        { text: 'Download', value: 'download', sortable: false },
        { text: 'Details', value: 'details', sortable: false }
      ],
      submissions: [],
      loading: true,
      showAlert: false,
      alertType: null,
      alertMessage: ''
    };
  },
  methods: {
    customSort(items, index, sortDesc) {
      return items.sort((a, b) => {
        if (index[0] === 'created') {
          // Treat created field as date instead of string
          if (sortDesc[0]) {
            return new Date(b.created) - new Date(a.created);
          } else {
            return new Date(a.created) - new Date(b.created);
          }
        } else {
          // Retain ordering functionality of other columns
          if (sortDesc[0]) {
            return b[index] < a[index] ? -1 : 1;
          } else {
            return a[index] < b[index] ? -1 : 1;
          }
        }
      });
    },
    formatDate(date){
      return (date) ? new Date(date).toLocaleString() : 'N/A';
    },
    // get table data from frontend service layer
    getData() {
      minesOperatorScreeningService
        .getAllSubmissionMetaData()
        .then(response => {
          const data = response.data;

          const submissions = Object.keys(data).map(k => {
            let submission = data[k];
            return {
              submissionId: submission.submissionId,
              name: submission.businessName,
              created: this.formatDate(submission.createdAt),
              confirmationId: submission.confirmationId,
              inspectionStatus: submission.status,
            };
          });
          if (!submissions.length) {
            this.showTableAlert('info', 'No Submissions found');
          }
          this.submissions = submissions;
        })
        .catch((error) => {
          console.error(`Error getting submissions: ${error}`); // eslint-disable-line no-console
          this.showTableAlert('error', 'No response from server');
        });
    },
    showTableAlert(typ, msg) {
      this.showAlert = true;
      this.alertType = typ;
      this.alertMessage = msg;
      this.loading = false;
    },
  },
  mounted() {
    this.getData();
  },
  watch: {
    // hide data table progress bar when submissions have been returned from backend
    submissions() {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.ipc-search {
  width: 100%;
}
@media (min-width: 600px) {
  .ipc-search {
    max-width: 20em;
    float: right;
  }
}
@media (max-width: 599px) {
  .ipc-search {
    padding-left: 16px;
    padding-right: 16px;
  }
}

.ipc-table {
  clear: both;
}
/* Want to use scss but the world hates me */
.ipc-table >>> tbody tr:nth-of-type(odd) {
  background-color: #f5f5f5;
}
.ipc-table >>> thead tr th {
  font-weight: normal;
  color: #003366 !important;
  font-size: 1.1em;
}
</style>
