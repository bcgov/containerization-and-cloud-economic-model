<template>
  <v-card outlined class="silv-contact-card">
    <v-card-text>
      <v-row no-gutters>
        <v-col cols="12" sm="1">
          <h1>
            <v-icon large>phone</v-icon>
          </h1>
        </v-col>
        <v-col cols="12" sm="11">
          <slot />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style lang="scss">
.silv-contact-card {
  // No matter WHAT, these styles would not apply if this style was scoped
  // So needed to apply a specific class and make this one global
  background-color: #38598a !important;
  .v-card__text {
    h3 {
      color: white !important;
    }
    p {
      color: white !important;
    }
    .v-icon {
      color: white !important;
      margin-right: 0.5em;
    }
    a, a:hover, a:active {
      color: white;
      text-decoration: underline;
    }
  }
}
</style>
