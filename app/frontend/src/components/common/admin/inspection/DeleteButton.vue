<template>
  <v-btn
    :disabled="!hasEditor"
    class="pl-0"
    color="error"
    data-test="btn-form-delete-submission"
    text
    small
    @click="displayDialog"
  >
    <v-icon class="mr-1">delete</v-icon>
    <span>DELETE SUBMISSION</span>

    <BaseDialog
      :show="showDialog"
      type="CONTINUE"
      @close-dialog="showDialog = false"
      @continue-dialog="deleteSubmission"
    >
      <template v-slot:title>Confirm Deletion</template>
      <template v-slot:text>
        <span>Are you sure you wish to delete this submission? This will remove it from the administrative application and any statistics.</span>
        <v-alert v-if="deleteError" type="error" tile dense>{{ deleteError }}</v-alert>
      </template>
    </BaseDialog>
  </v-btn>
</template>

<script>
import { mapGetters } from 'vuex';

import commonFormService from '@/services/commonFormService';
import { AppRoles, getAppClient } from '@/utils/constants';

export default {
  name: 'DeleteButton',
  props: {
    formName: {
      type: String,
      required: true
    },
    submissionId: {
      required: true,
      type: String
    }
  },
  data: () => ({
    showDialog: false,
    deleteError: ''
  }),
  computed: {
    ...mapGetters('auth', ['hasResourceRoles']),
    hasEditor() {
      return this.hasResourceRoles(getAppClient(this.formName), [
        AppRoles.EDITOR
      ]);
    }
  },
  methods: {
    displayDialog() {
      this.showDialog = true;
    },
    async deleteSubmission() {
      try {
        this.deleteError = '';
        await commonFormService.removeSubmission(
          this.formName,
          this.submissionId
        );
        this.$router.push({ path: `/${this.formName}/admin` });
      } catch (error) {
        console.error(`Error deleting: ${error}`); // eslint-disable-line no-console
        this.deleteError = 'An error occured while trying to delete the submission.';
      }
    }
  }
};
</script>
