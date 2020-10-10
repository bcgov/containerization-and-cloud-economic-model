<template>
  <v-card outlined class="silv-warning-card">
    <v-card-text>
      <span class="icon">
        <v-icon>warning</v-icon>
      </span>
      <span class="text">
        <slot />
      </span>
    </v-card-text>
  </v-card>
</template>

<style lang="scss">
.silv-warning-card {
  // No matter WHAT, these styles would not apply if this style was scoped
  // So needed to apply a specific class and make this one global
  background-color: #f9f1c6 !important;
  .v-card__text {
    p,
    span {
      color: #6c4a00 !important;
      font-size: large;
      font-weight: bold;
    }
    .v-icon {
      color: #6c4a00 !important;
      margin-right: 0.5em;
    }
    .icon {
      box-sizing: border-box;
      float: left;
      height: 100%;
    }
  }
}
</style>
