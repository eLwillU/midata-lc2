<template>
  <!-- Verwendung der GreetingCard Komponente mit dynamischem Text -->
  <greetings-card :name="user.name" :message="todaysMessage" />



  <q-table
  title="Wochenplan"
  :rows="rows"
  :columns="columns"
  row-key="time">
</q-table>


</template>

<script setup>
import { ref } from 'vue';
import GreetingsCard from 'src/components/GreetingsCard.vue';

const user = ref({
  name: 'Max Mustermann',
});

const columns=ref( [
  {
    name: 'time',
    label: 'Zeit',
    field: row => row.time,
  },
  {
    name: 'monday',
    label: 'Montag',
    field: row => row.monday,
  },
  {
    name: 'tuesday',
    label: 'Dienstag',
    field: row => row.tuesday,
  },
  {
    name: 'wednesday',
    label: 'Mittwoch',
    field: row => row.wednesday,
  },
  {
    name: 'thursday',
    label: 'Donnerstag',
    field: row => row.thursday,
  },
  {
    name: 'friday',
    label: 'Freitag',
    field: row => row.friday,
  },
])

const rows = ref([
{
    name: 'Tag 1',
    time: '08:00 - 09:00',
    monday: 'Mathe',
    tuesday: 'Englisch',
    wednesday: 'Biologie',
    thursday: 'Chemie',
    friday: 'Sport'
  },
  {
    name: 'Tag 2',
    time: '09:00 - 10:00',
    monday: 'Deutsch',
    tuesday: 'Physik',
    wednesday: 'Kunst',
    thursday: 'Musik',
    friday: 'Geschichte'
  },

    {
    name: 'Tag 2',
    time: '09:00 - 10:00',
    monday: 'Deutsch',
    tuesday: 'Physik',
    wednesday: '',
    thursday: 'Musik',
    friday: 'Geschichte'
  },

]
)


const todaysMessage = ref('diese Woche steht folgendes an');
</script>
