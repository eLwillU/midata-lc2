<template>
  <div>
    <div class="text-h6">{{ currentDay }}</div>
    <div class="text-subtitle1">{{ currentDateString }}</div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    currentDate: Date,
  },
  setup(props) {
    const currentDay = computed(() =>
      props.currentDate
        .toLocaleString('de-DE', { weekday: 'short' })
        .toUpperCase(),
    );
    const currentDateString = computed(() => {
      return `${props.currentDate.getDate()}. ${props.currentDate.toLocaleString(
        'de-DE',
        { month: 'long' },
      )}`;
    });

    return { currentDay, currentDateString };
  },
};
</script>
