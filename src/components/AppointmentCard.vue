<template>
  <q-table
    flat
    bordered
    grid
    title="Wochenplan"
    :rows="rows"
    :columns="columns"
    row-key="time"
    :separator="separator"
    :rows-per-page-options="[1, 3, 5, 7, 10, 15, 20, 25, 50, 0]"
  >
    <template v-slot:body-cell-monday="props">
      <q-td :props="props" :style="getCellStyle(props)">
        {{ props.row.monday }}
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { ref } from 'vue';

const columns = ref([
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
]);

const rows = ref([
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
    friday: 'Geschichte',
    color: 'red',
  },

  {
    name: 'Tag 2',
    time: '09:00 - 10:00',
    monday: 'Deutsch',
    tuesday: 'Physik',
    wednesday: '',
    thursday: 'Musik',
    friday: 'Geschichte',
    color: 'green',
  },
]);
</script>
