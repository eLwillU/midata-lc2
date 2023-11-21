<template>
  <!-- Verwendung der GreetingCard Komponente mit dynamischem Text -->
  <greetings-card :name="user.name" :message="todaysMessage" />
  <div style="max-width: 800px; width: 100%">
    <q-calendar
      v-model="selectedDate"
      view="week"
      hour24-format
      :start-hour="8"
      :end-hour="22"
      locale="en-us"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GreetingsCard from 'src/components/GreetingsCard.vue';

const user = ref({
  name: 'Max Mustermann',
});

const todaysMessage = ref('diese Woche steht folgendes an');
const selectedDate = ref(new Date());
</script>
