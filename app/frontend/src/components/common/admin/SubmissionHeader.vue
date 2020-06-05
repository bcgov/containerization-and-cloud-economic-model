<template>
  <div>
    <v-row>
      <v-col cols="12" sm="8" lg="10">
        <h1>{{ business.name }}</h1>
        <h4 class="heading-detail">
          Submitted:
          <span>{{ createdAtDisplay }}</span>
        </h4>
        <h4 class="heading-detail">
          Confirmation ID:
          <span>{{ submissionId.split('-')[0].toUpperCase() }}</span>
        </h4>
        <h4 v-if="operationType" class="heading-detail">
          Operation Type:
          <span>{{ operationType }}</span>
        </h4>
        <h4 class="heading-detail">
          Operation Dates:
          <span>{{ locationDateDisplay(location.startDate) }} - {{ locationDateDisplay(location.endDate) }}</span>
        </h4>
      </v-col>
      <v-col cols="12" sm="4" lg="2" class="text-sm-right d-print-none">
        <GeneratePdfButton :submissionId="submissionId">
          <v-btn text small color="textLink" class="pl-0">
            <v-icon class="mr-1">picture_as_pdf</v-icon>Generate PDF
          </v-btn>
        </GeneratePdfButton>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import moment from 'moment';

import GeneratePdfButton from '@/components/common/GeneratePdfButton.vue';

export default {
  name: 'SubmissionHeader',
  components: {
    GeneratePdfButton,
  },
  props: {
    attestation: {
      type: Object,
      required: true
    },
    business: {
      type: Object,
      required: true
    },
    location: {
      type: Object,
      required: true
    },
    operationType: {
      type: String,
      required: false
    },
    submissionId: {
      type: String,
      required: true
    }
  },
  computed: {
    createdAtDisplay() {
      return this.attestation && this.attestation.createdAt
        ? moment(this.attestation.createdAt).format('MMMM D YYYY, h:mm:ss a')
        : 'N/A';
    },
  },
  methods: {
    locationDateDisplay(ldate) {
      return ldate ? moment(ldate).format('MMMM D YYYY') : 'N/A';
    },
  },
};
</script>

<style lang="scss" scoped>
.heading-detail {
  margin-top: 0.5em;
  span {
    font-weight: lighter;
  }
}
</style>
