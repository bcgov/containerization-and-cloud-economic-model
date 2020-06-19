<template functional>
  <div>
    <p>
      <strong>Last Updated:</strong>
      {{ $options.updatedAtDisplay(props.item.updatedAt, props.item.updatedBy) }}
      <br />
      <strong>Enabled:</strong>
      {{ props.item.enabled }}
    </p>
    <strong>Config:</strong>
    <pre>{{ JSON.stringify(props.item.config, null, 2) }}</pre>
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
  updatedAtDisplay(updatedAt, updatedBy) {
    return `${moment(updatedAt).format('MMMM D YYYY, h:mm:ss a')}${updatedBy ? ' - ' + updatedBy : ''}`;
  }
};
</script>
