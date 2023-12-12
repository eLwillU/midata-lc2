<template>
  <div class="q-pa-md">
    <!-- Verwendung der DateDisplayCard Komponente -->
    <!-- Verwendung der GreetingCard Komponente mit dynamischem Text -->
    <greetings-card :name="user.name" :message="todaysMessage" />
    <date-display-card :current-date="currentDate" class="q-mb-lg" />
    <appointment-card></appointment-card>
  </div>
</template>

<script>
import { ref } from 'vue';
import DateDisplayCard from 'src/components/DateDisplayCard.vue';
import GreetingsCard from 'src/components/GreetingsCard.vue';
import AppointmentCard from 'src/components/AppointmentCard';

export default {
  components: {
    GreetingsCard, // Komponente registrieren
    DateDisplayCard,
    AppointmentCard,
  },
  setup() {
    const currentDate = ref(new Date());
    const user = ref({
      name: 'Max Mustermann',
    });
    const todaysMessage = ref('heute');

    // Stellen Sie alle reaktiven Referenzen und Methoden zur Verfügung, die im Template verwendet werden
    return { currentDate, user, todaysMessage };
  },
};
</script>

<style>
.my-card {
  border-radius: 8px;
}
</style>
