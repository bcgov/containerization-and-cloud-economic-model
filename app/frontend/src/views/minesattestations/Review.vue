<template>
  <v-container>
    <v-progress-linear indeterminate v-if="gettingForm" color="primary" class="mb-2" />

    <v-alert v-if="getFormError" type="error" tile dense>{{ getFormError }}</v-alert>

    <v-row v-if="!getFormError">
      <v-col cols="12" md="8" offset-md="2">
        <PrintScreenButton :ipcPlanId="submissionId">
          <v-btn text small color="textLink" class="pl-0">
            <v-icon class="mr-1">print</v-icon>Print Submission
          </v-btn>
        </PrintScreenButton>
        <AdminReviewSubmission />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment';
import { mapActions, mapGetters, mapMutations } from 'vuex';

import AdminReviewSubmission from '@/components/minesattestations/admin/AdminReviewSubmission.vue';
import PrintScreenButton from '@/components/common/PrintScreenButton.vue';

export default {
  name: 'MinesAttestationsReview',
  components: {
    AdminReviewSubmission,
    PrintScreenButton
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
