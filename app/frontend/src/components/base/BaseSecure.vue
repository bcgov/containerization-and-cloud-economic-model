<template>
  <div v-if="authenticated">
    <div v-if="authorized()">
      <slot />
    </div>
    <div v-else class="text-center">
      <h1 class="my-8">You are not authorized to use this feature.</h1>
      <router-link :to="{ name: 'Home' }">
        <v-btn color="primary" class="about-btn" large>
          <v-icon class="mr-1">mdi-home</v-icon>
          <span>Return</span>
        </v-btn>
      </router-link>
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
import { AppClients, AppRoles } from '@/utils/constants';

export default {
  name: 'BaseSecure',
  computed: {
    ...mapGetters('auth', [
      'authenticated',
      'createLoginUrl',
      'hasResourceRoles',
      'keycloakReady'
    ])
  },
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
