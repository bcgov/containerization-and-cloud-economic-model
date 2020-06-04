<template>
  <v-card outlined class="silv-important-card">
    <v-card-text>
      <span class="icon">
        <v-icon>info</v-icon>
      </span>
      <span class="text">
        <slot />
      </span>
    </v-card-text>
  </v-card>
</template>

<style lang="scss">
.silv-important-card {
  // No matter WHAT, these styles would not apply if this style was scoped
  // So needed to apply a specific class and make this one global
  background-color: #d9eaf7 !important;
  .v-card__text {
    p,
    span {
      color: #1a5a96 !important;
      font-size: large;
      font-weight: bold;
    }
    .v-icon {
      color: #1a5a96 !important;
      margin-right: 0.5em;
    }
    a,
    a:hover,
    a:active {
      color: #1a5a96;
      text-decoration: underline;
    }
    .icon {
      box-sizing: border-box;
      float: left;
      height: 100%;
    }
  }
}
</style>
