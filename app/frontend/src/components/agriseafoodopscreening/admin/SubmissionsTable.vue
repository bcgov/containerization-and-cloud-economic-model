<template>
  <div>
    <!-- table alert -->
    <v-alert v-if="alertShow" :type="alertType" tile dense>{{ alertMessage }}</v-alert>

    <!-- search input -->
    <div class="ipc-search mt-6 mt-sm-0">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        class="pb-5"
      />
    </div>

    <!-- table header -->
    <v-data-table
      class="ipc-table"
      :headers="headers"
      item-key="confirmationId"
      :items="submissions"
      :search="search"
      :loading="loading"
      loading-text="Loading... Please wait"
      :options="options"
    >
      <template v-slot:item.download="{ item }">
        <GeneratePdfButton :submissionId="item.submissionId">
          <v-btn text small color="textLink">
            <v-icon class="mr-1">picture_as_pdf</v-icon>PDF
          </v-btn>
        </GeneratePdfButton>
      </template>
      <template v-slot:item.details="{ item }">
        <router-link
          :to="{ name: 'AgriSeafoodOpScreeningSubmission', params: { submissionId: item.submissionId } }"
        >
          <v-btn text small color="textLink">
            <v-icon class="mr-1">remove_red_eye</v-icon>VIEW
          </v-btn>
        </router-link>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import GeneratePdfButton from '@/components/common/GeneratePdfButton.vue';
import agriSeafoodOpScreeningService from '@/services/agriSeafoodOpScreeningService';

export default {
  name: 'MinesSubmissionsTable',
  components: {
    GeneratePdfButton
  },
  computed: {
    responsiveCell() {
      return this.$vuetify.breakpoint.name == 'xs'
        ? 'v-data-table__mobile-table-row'
        : '';
    }
  },
  data() {
    return {
      headers: [
        {
          text: 'Submitted',
          value: 'created',
          sort: (a, b) => {
            return new Date(a) - new Date(b);
          }
        },
        { text: 'Status', align: 'start', value: 'inspectionStatus' },
        { text: 'Assigned To', align: 'start', value: 'assignedTo' },
        { text: 'Business Name', align: 'start', value: 'name' },
        { text: 'Confirmation ID', align: 'start', value: 'confirmationId' },
        {
          text: 'Download',
          value: 'download',
          filterable: false,
          sortable: false
        },
        {
          text: 'Details',
          value: 'details',
          filterable: false,
          sortable: false
        }
      ],
      alertMessage: '',
      alertShow: false,
      alertType: null,
      loading: true,
      options: {},
      search: '',
      submissions: []
    };
  },
  methods: {
    formatDate(date) {
      return date ? new Date(date).toLocaleString() : 'N/A';
    },
    // get table data from frontend service layer
    getData() {
      agriSeafoodOpScreeningService
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
              assignedTo: submission.assignedTo ? submission.assignedTo : '-'
            };
          });
          if (!submissions.length) {
            this.showTableAlert('info', 'No Submissions found');
          }
          this.submissions = submissions;
        })
        .catch(error => {
          console.error(`Error getting submissions: ${error}`); // eslint-disable-line no-console
          this.showTableAlert('error', 'No response from server');
        });
    },
    showTableAlert(typ, msg) {
      this.alertShow = true;
      this.alertType = typ;
      this.alertMessage = msg;
      this.loading = false;
    }
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
@media (max-width: 1263px) {
  .ipc-table >>> th {
    vertical-align: top;
  }
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
