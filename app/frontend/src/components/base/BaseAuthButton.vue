<template>
  <div v-if="keycloakReady">
    <v-btn v-if="authenticated" data-e2e="base-auth-logout" dark outlined @click="logout">
      <span>Logout</span>
    </v-btn>
    <v-btn v-else-if="hasLogin" data-e2e="base-auth-login" dark outlined @click="login">
      <span>Login</span>
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'BaseAuthButton',
  computed: {
    ...mapGetters('auth', [
      'authenticated',
      'createLoginUrl',
      'createLogoutUrl',
      'keycloakReady'
    ]),
    hasLogin() {
      return this.$route && this.$route.meta && this.$route.meta.hasLogin;
    }
  },
  methods: {
    login() {
      if (this.keycloakReady) {
        window.location.replace(
          this.createLoginUrl({ idpHint: 'idir' })
        );
      }
    },
    logout() {
      if (this.keycloakReady) {
        window.location.replace(
          this.createLogoutUrl({
            idpHint: 'idir',
            redirectUri: `${location.origin}/${this.$config.basePath}`
          })
        );
      }
    }
  }
};
</script>
