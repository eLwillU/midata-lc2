<template>
  <div>
    <q-table
      title="Wochenplan"
      :columns="columns"
      :rows="rows"
      :row-key="name"
    ></q-table>

    <q-calendar></q-calendar>
    <!-- Your component's template code here -->
  </div>
</template>

<script setup>
// import { ref } from 'vue'

const columns = [
  {
    name: 'time',
    label: 'Zeit',
    field: (row) => row.time,
  },
  {
    name: 'monday',
    label: 'Montag',
    field: (row) => row.monday,
  },
  {
    name: 'tuesday',
    label: 'Dienstag',
    field: (row) => row.tuesday,
  },
  {
    name: 'wednesday',
    label: 'Mittwoch',
    field: (row) => row.wednesday,
  },
  {
    name: 'thursday',
    label: 'Donnerstag',
    field: (row) => row.thursday,
  },
  {
    name: 'friday',
    label: 'Freitag',
    field: (row) => row.friday,
  },
];

const rows = [
  {
    name: 'Tag 1',
    time: '08:00 - 09:00',
    monday: 'Einzeltherapie',
    tuesday: 'Gruppentherapie',
    wednesday: 'Biologie',
    thursday: 'Chemie',
    friday: 'Sport',
    color: 'blue',
  },
  {
    name: 'Tag 2',
    time: '09:00 - 10:00',
    monday: 'Deutsch',
    tuesday: 'Physik',
    wednesday: 'Kunst',
    thursday: 'Musik',
    friday: 'Englisch',
    color: 'red',
  },
  {
    name: 'Tag 3',
    time: '10:00 - 11:00',
    monday: 'Mathe',
    tuesday: 'Geschichte',
    wednesday: 'Religion',
    thursday: 'Sport',
    friday: 'Deutsch',
    color: 'green',
  },
  {
    name: 'Tag 4',
    time: '11:00 - 12:00',
    monday: 'Englisch',
    tuesday: 'Deutsch',
    wednesday: 'Mathe',
    thursday: 'Geschichte',
    friday: 'Religion',
    color: 'yellow',
  },
  {
    name: 'Tag 5',
    time: '12:00 - 13:00',
    monday: 'Physik',
    tuesday: 'Biologie',
    wednesday: 'Musik',
    thursday: 'Kunst',
    friday: 'Chemie',
    color: 'purple',
  },
];

// Your component's script code here
</script>

<style scoped>
/* Your component's style code here */
</style>
