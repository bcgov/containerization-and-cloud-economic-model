<template>
  <div>
    <p>
      <strong>Last Updated:</strong>
      {{ updatedAtDisplay }}
      <br />
      <strong>Enabled:</strong>
      {{ item.enabled }}
    </p>
    <strong>Config:</strong>
    <pre>{{ JSON.stringify(item.config, null, 2) }}</pre>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'SettingItem',
  props: {
    item: {
      required: true,
      type: Object,
    }
  },
  computed: {
    updatedAtDisplay() {
      return `${moment(this.item.updatedAt).format('MMMM D YYYY, h:mm:ss a')}${this.item.updatedBy ? ' - ' + this.item.updatedBy : ''}`;
    }
  }
};
</script>
