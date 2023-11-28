<template>
  <!-- Verwendung der GreetingCard Komponente mit dynamischem Text -->
  <greetings-card :name="user.name" :message="todaysMessage" />

  <q-table
    flat
    bordered
    title="Wochenplan"
    :rows="rows"
    :columns="columns"
    row-key="time"
    :separator="separator"
    @row-click="handleClick"
  >
    <template v-slot:body-cell-monday="props">
      <q-td :props="props" :style="getCellStyle(props)">
        {{ props.row.monday }}
      </q-td>
    </template>
  </q-table>

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

  <q-table
    flat
    bordered
    grid
    title="Wochenplan"
    :rows="rows2"
    :columns="columns2"
    :separator="separator"
    :rows-per-page-options="[1, 3, 5, 7, 10, 15, 20, 25, 50, 0]"
  >
  </q-table>
</template>

<script setup>
import { ref } from 'vue';
import GreetingsCard from 'src/components/GreetingsCard.vue';

const user = ref({
  name: 'Max Mustermann',
});

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

const columns2 = [
  {
    label: 'Tag, Datum',
    field: (row) => row.name + ', ' + row.date,
  },
];

const rows2 = [
  {
    name: 'Montag',
    date: '12.10.2023',
    appointments: [
      {
        type: 'Einzeltherapie',
        fromTime: '12:00',
        toTime: '14:00',
        practitioner: 'Ändu',
        location: 'N123',
      },
      {
        type: 'Gruppentherapie',
        fromTime: '14:00',
        toTime: '18:00',
        practitioner: 'Tinu',
        location: 'ABC3',
      },
      {
        type: 'Yogastunde',
        fromTime: '08:00',
        toTime: '10:00',
        practitioner: 'Küsu',
        location: 'ADC1',
      },
    ],
  },
];

function addAppointments() {
  rows2.forEach((row) => {
    row.appointments.forEach((appointment) => {
      // For each property of the appointment, create a new column
      columns2.push({
        name: appointment.location,
        label: appointment.type,
        field: () => appointment.type,
      });
    });
  });
}

addAppointments();

const separator = ref('cell');
const handleClick = (row, col) => {
  console.log(row.name, col.name);
};

function getCellStyle(props) {
  if (props.row.monday === 'Einzeltherapie') {
    return { backgroundColor: 'lightblue' };
  }
  return {};
}

const todaysMessage = ref('diese Woche steht folgendes an');
</script>
