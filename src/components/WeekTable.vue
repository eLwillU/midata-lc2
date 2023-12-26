<template>
  <div>
    <q-markup-table separator="cell"
      ><thead>
        <tr>
          <th class="text-left">Zeit</th>
          <th class="text-right">Montag</th>
          <th class="text-right">Dienstag</th>
          <th class="text-right">Mittwoch</th>
          <th class="text-right">Donnerstag</th>
          <th class="text-right">Freitag</th>
          <th class="text-right">Samstag</th>
          <th class="text-right">Sonntag</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowspan="2">L1 Name</td>
          <td rowspan="2">L2 Name A</td>
          <td>L3 Name A</td>
        </tr>
        <tr>
          <td>L2 Name B</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script setup>
const events = [
  {
    name: 'Event 1',
    start: '2023-12-26T09:00:00',
    end: '2023-12-26T10:00:00',
    color: 'blue',
  },
  // other events...
];
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

console.log(columns);
console.log(rows);
console.log(events);
// Your component's script code here
</script>

<style scoped>
/* Your component's style code here */
</style>
