<template>
  <v-container>
    <v-progress-linear indeterminate v-if="gettingForm" color="primary" class="mb-2" />

    <v-alert v-if="getFormError" type="error" tile dense>{{ getFormError }}</v-alert>

    <v-row v-if="!getFormError">
      <v-col cols="12" md="8" offset-md="2">
        <GeneratePdfButton :submissionId="submissionId">
          <v-btn color="textLink" class="pl-0" data-test="btn-form-generate-pdf" text small>
            <v-icon class="mr-1">picture_as_pdf</v-icon>
            <span>Generate PDF of Submission</span>
          </v-btn>
        </GeneratePdfButton>
        <AdminReviewSubmission />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment';
import { mapActions, mapGetters, mapMutations } from 'vuex';

import AdminReviewSubmission from '@/components/minesoperatorscreening/admin/AdminReviewSubmission.vue';
import GeneratePdfButton from '@/components/common/GeneratePdfButton.vue';

export default {
  name: 'MinesOperatorScreeningReview',
  components: {
    AdminReviewSubmission,
    GeneratePdfButton
  },
  props: {
    submissionId: {
      type: String,
      required: true
    }
  },
  data: () => ({
    error: false
  }),
  computed: {
    ...mapGetters('form', [
      'business',
      'location',
      'gettingForm',
      'getFormError',
      'attestation'
    ]),
    createdAtDisplay() {
      return this.attestation && this.attestation.createdAt
        ? moment(this.attestation.createdAt).format('MMMM D YYYY, h:mm:ss a')
        : 'N/A';
    }
  },
  methods: {
    ...mapMutations('form', ['setGettingForm']),
    ...mapActions('form', ['getForm']),
    locationDateDisplay(ldate) {
      return ldate ? moment(ldate).format('MMMM D YYYY') : 'N/A';
    }
  },
  async created() {
    this.setGettingForm(true);
    await this.getForm(this.submissionId);
  }
};
</script>
