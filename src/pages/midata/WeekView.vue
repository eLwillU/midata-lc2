<template>
  <!-- Verwendung der GreetingCard Komponente mit dynamischem Text -->
  <greetings-card :name="user.name" :message="todaysMessage" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GreetingsCard from 'src/components/GreetingsCard.vue';

const user = ref({
  name: 'Max Mustermann',
});

const todaysMessage = ref('diese Woche steht folgendes an');
</script>
