<template>
  <v-container>
    <BaseSecure admin>
      <v-progress-linear indeterminate v-if="gettingForm" color="primary" class="mb-2" />

      <v-alert v-if="getFormError" type="error" tile dense>{{ getFormError }}</v-alert>

      <div v-if="!gettingForm && attestation">
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
            <h4 class="heading-detail">
              Operation Dates:
              <span>{{ locationDateDisplay(location.startDate) }} - {{ locationDateDisplay(location.endDate) }}</span>
            </h4>
          </v-col>
          <v-col cols="12" sm="4" lg="2" class="text-sm-right">
            <GeneratePdfButton :ipcPlanId="submissionId">
              <v-btn text small color="textLink" class="pl-0">
                <v-icon class="mr-1">picture_as_pdf</v-icon>Download PDF
              </v-btn>
            </GeneratePdfButton>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="8" class="pl-0 pt-0">
            <AdminReviewSubmission />
          </v-col>
          <v-col v-if="showInspection" cols="12" md="4" class="pl-0" order="first" order-md="last">
            <InspectionPanel :submissionId="submissionId" v-on:note-updated="refreshNotes" />

            <NotesPanel :submissionId="submissionId" ref="notesPanel" />
          </v-col>
        </v-row>
      </div>
    </BaseSecure>
  </v-container>
</template>

<script>
import moment from 'moment';
import { mapActions, mapGetters, mapMutations } from 'vuex';

import AdminReviewSubmission from '@/components/minesattestations/admin/AdminReviewSubmission.vue';
import GeneratePdfButton from '@/components/common/GeneratePdfButton.vue';
import InspectionPanel from '@/components/minesattestations/admin/inspection/InspectionPanel.vue';
import NotesPanel from '@/components/minesattestations/admin/inspection/NotesPanel.vue';
import { AppClients, AppRoles } from '@/utils/constants';

export default {
  name: 'Submission',
  components: {
    AdminReviewSubmission,
    GeneratePdfButton,
    InspectionPanel,
    NotesPanel
  },
  props: {
    submissionId: {
      type: String,
      required: true
    }
  },
  data: () => ({
    error: false,
    showFv: false
  }),
  computed: {
    ...mapGetters('form', [
      'business',
      'location',
      'gettingForm',
      'getFormError',
      'attestation'
    ]),
    ...mapGetters('auth', ['hasResourceRoles', 'token']),
    createdAtDisplay() {
      return this.attestation && this.attestation.createdAt
        ? moment(this.attestation.createdAt).format('MMMM D YYYY, h:mm:ss a')
        : 'N/A';
    },
    showInspection() {
      return this.hasResourceRoles(AppClients.MINESATTESTATIONS, [
        AppRoles.EDITOR
      ]);
    }
  },
  methods: {
    ...mapMutations('form', ['setGettingForm']),
    ...mapActions('form', ['getForm']),
    locationDateDisplay(ldate) {
      return ldate ? moment(ldate).format('MMMM D YYYY') : 'N/A';
    },
    refreshNotes() {
      this.$refs.notesPanel.getNotes();
    }
  },
  async created() {
    this.setGettingForm(true);
    await this.getForm(this.submissionId);
  }
};
</script>

<style scoped>
.heading-detail {
  margin-top: 0.5em;
}

.heading-detail span {
  font-weight: lighter;
}
</style>
