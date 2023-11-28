<template>
  <!-- Verwendung der GreetingCard Komponente mit dynamischem Text -->
  <greetings-card :name="user.name" :message="todaysMessage" />



  <q-table
  flat bordered
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
  flat bordered
  grid
  title="Wochenplan"
  :rows="rows"
  :columns="columns"
  row-key="time"
  :separator="separator"
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
    monday: 'Einzeltherapie',
    tuesday: 'Gruppentherapie',
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
const separator = ref('cell')
const handleClick = (row, col) => {
console.log(row.name, col.name)
}

function getCellStyle(props) {
  if (props.row.monday === 'Einzeltherapie') {
    return { backgroundColor: 'lightblue' };
  }
  return {};
}


const todaysMessage = ref('diese Woche steht folgendes an');
</script>
