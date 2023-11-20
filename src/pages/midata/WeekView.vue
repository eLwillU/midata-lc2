<template>
    <!-- Verwendung der GreetingCard Komponente mit dynamischem Text -->
    <greetings-card :name="user.name" :message="todaysMessage" />
      <div style="max-width: 800px; width: 100%;">
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

<script>
import { ref } from 'vue';
import GreetingsCard from 'src/components/GreetingsCard.vue';
// import { QCalendar } from '@quasar/quasar-ui-qcalendar'; // Importiere QCalendar
// import '@quasar/quasar-ui-qcalendar/dist/index.css';

export default {
  components: {
    GreetingsCard, // Komponente registrieren

  },
  setup() {
    const user = ref({
      name: 'Max Mustermann',
    });
    const todaysMessage = ref('diese Woche steht folgendes an');
    const selectedDate = ref(new Date());

    // Stellen Sie alle reaktiven Referenzen und Methoden zur Verfügung, die im Template verwendet werden
    return { user, todaysMessage, selectedDate };
  },
};
</script>
