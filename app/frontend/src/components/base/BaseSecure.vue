<template>
  <div v-if="authenticated">
    <div v-if="authorized()">
      <slot />
    </div>
    <div v-else class="text-center">
      <h1 class="my-8">Thank you for logging in.</h1>
      <h3 class="mb-8">You have not been granted access to this feature yet.</h3>

      <v-btn color="primary" @click="requestAccess" :disabled="success" large>
        <span v-if="success">Request Sent</span>
        <span v-else>Request Access</span>
      </v-btn>

      <BaseDialog :show="resultDialog" @close-dialog="resultDialog = false">
        <template v-slot:icon>
          <v-icon v-if="success" large color="success">check_circle_outline</v-icon>
          <v-icon v-else large color="error">cancel</v-icon>
        </template>
        <template v-slot:text>{{ resultDialogMsg }}</template>
      </BaseDialog>
    </div>
  </div>
  <div v-else class="text-center">
    <h1 class="my-8">You must be logged in to use this feature.</h1>
    <v-btn v-if="keycloakReady" color="primary" class="login-btn" @click="login" large>
      <span>Login</span>
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import commonFormService from '@/services/commonFormService';
import { AppClients, AppRoles } from '@/utils/constants';

export default {
  name: 'BaseSecure',
  computed: {
    ...mapGetters('auth', [
      'authenticated',
      'createLoginUrl',
      'hasResourceRoles',
      'keycloakReady'
    ]),
    formName() {
      return this.$route.path.split('/')[1];
    }
  },
  data: () => ({
    resultDialog: false,
    resultDialogMsg: '',
    success: false
  }),
  methods: {
    authorized() {
      const roles = [];
      if (this.admin) roles.push(AppRoles.ADMIN);
      if (this.editor) roles.push(AppRoles.EDITOR);
      if (this.reviewer) roles.push(AppRoles.REVIEWER);
      if (this.user) roles.push(AppRoles.USER);
      if (this.viewer) roles.push(AppRoles.VIEWER);
      return this.hasResourceRoles(this.resource, roles);
    },
    login() {
      if (this.keycloakReady) {
        window.location.replace(this.createLoginUrl({ idpHint: 'idir' }));
      }
    },
    requestAccess() {
      commonFormService
        .requestTeam(this.formName)
        .then(() => {
          this.success = true;
          this.resultDialogMsg =
            'Your access request has been submitted. Please check back later.';
          this.resultDialog = true;
        })
        .catch(() => {
          this.success = false;
          this.resultDialogMsg =
            'An error occured while attempting to request access.';
          this.resultDialog = true;
        });
    }
  },
  props: {
    admin: {
      default: false,
      type: Boolean
    },
    editor: {
      default: false,
      type: Boolean
    },
    resource: {
      default: AppClients.APP,
      type: String
    },
    reviewer: {
      default: false,
      type: Boolean
    },
    user: {
      default: false,
      type: Boolean
    },
    viewer: {
      default: false,
      type: Boolean
    }
  }
};
</script>
