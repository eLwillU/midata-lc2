<template>
  <div class="q-pa-md">
    <!-- Verwendung der DateDisplayCard Komponente -->
    <!-- Verwendung der GreetingCard Komponente mit dynamischem Text -->
    <greetings-card :name="user.name" :message="todaysMessage" />
    <date-display-card :current-date="currentDate" class="q-mb-lg" />

    <q-card class="my-card q-mt-md" style="background-color: #1976d2; color: white;">
      <q-card-section class="q-pa-md">
        <div class="text-h6">Einzeltherapie</div>
        <div class="text-caption">14:30–15:00</div>
      </q-card-section>
    </q-card>

    <q-card class="my-card q-mt-md" style="background-color: #5e35b1; color: white;">
      <q-card-section class="q-pa-md">
        <div class="text-h6">Abendessen bestellen</div>
        <div class="text-caption">17:00</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref } from 'vue';
import DateDisplayCard from 'src/components/DateDisplayCard.vue';
import GreetingsCard from 'src/components/GreetingsCard.vue';

export default {
  components: {
    GreetingsCard, // Komponente registrieren
    DateDisplayCard
  },
  setup() {
    const currentDate = ref(new Date());
    const user = ref({
      name: 'Max Mustermann'
    });
    const todaysMessage = ref('heute');

    // Stellen Sie alle reaktiven Referenzen und Methoden zur Verfügung, die im Template verwendet werden
    return { currentDate, user, todaysMessage };
  }
};
</script>

<style>
.my-card {
  border-radius: 8px;
}
</style>
