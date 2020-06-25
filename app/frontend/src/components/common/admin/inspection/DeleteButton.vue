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
      <template v-slot:title>
        Confirm Deletion
      </template>
      <template v-slot:text>
        <span>Are you sure you wish to delete this submission? This will remove it from the administrative application and any statistics.</span>
        <v-alert v-if="error" type="error" tile dense>{{ error }}</v-alert>
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
        this.error = '';
        await commonFormService.removeSubmission(
          this.formName,
          this.submissionId
        );
      } catch (error) {
        console.error(`Error deleting: ${error}`); // eslint-disable-line no-console
        this.error = 'An error occured while trying to delete the submission.';
      }
    }
  }
};
</script>
