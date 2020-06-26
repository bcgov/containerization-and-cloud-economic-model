<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" md="8" xl="10" order="last" order-md="first">
        <h1>{{ business.name }}</h1>
      </v-col>
      <v-col cols="6" md="2" xl="1" class="text-right d-print-none pr-2 pr-sm-10 pr-md-0 pb-4">
        <GeneratePdfButton :formName="formName" :submissionId="submissionId">
          <v-btn class="pl-0" color="textLink" data-test="btn-form-generate-pdf" text small>
            <v-icon class="mr-1">picture_as_pdf</v-icon>
            <span>Generate PDF</span>
          </v-btn>
        </GeneratePdfButton>
      </v-col>
      <v-col cols="6" md="2" xl="1" class="d-print-none pl-2 pl-sm-10 pl-md-0">
        <DeleteButton :submissionId="submissionId" :formName="formName" />
      </v-col>
    </v-row>

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
  </v-container>
</template>

<script>
import moment from 'moment';

import DeleteButton from '@/components/common/admin/inspection/DeleteButton.vue';
import GeneratePdfButton from '@/components/common/GeneratePdfButton.vue';

export default {
  name: 'SubmissionHeader',
  components: {
    DeleteButton,
    GeneratePdfButton
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
    formName: {
      type: String,
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
    }
  },
  methods: {
    locationDateDisplay(ldate) {
      return ldate ? moment(ldate).format('MMMM D YYYY') : 'N/A';
    }
  }
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
