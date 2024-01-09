<template>
  <div>Wochenplan</div>

  <q-markup-table separator="cell">
    <thead>
      <th>Zeit</th>
      <th v-for="d in weekDays" :key="d">
        {{ d }}
      </th>
    </thead>
    <tbody>
      <tr v-for="e in events" :key="e">
        <td>{{ e.time }}</td>
        <td
          colspan="5"
          style="text-align: left"
          class="bg-blue-2"
          v-if="e.weekly"
        >
          <q-card style="height: 10em" flat class="bg-blue-2">
            {{ e.description }}</q-card
          >
        </td>
        <td v-if="!e.weekly" rowspan="2">
          <q-card style="height: 10em" flat> {{ e.description }}</q-card>
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script setup>
const weekDays = ['Montag'];
const events = [
  {
    description: 'Gemeinsames Frühstück Haus 14 Entwöhnung',
    time: '07:00 - 08:00',
    weekly: true,
  },
  {
    description: 'Gemeinsamer Morgen Spaziergang ALLE',
    time: '08:15 - 08:45',
    weekly: true,
  },
  {
    description: 'Morgenrunde Haus 18 Entzug',
    time: '08:45 - 09:15',
    weekly: true,
  },
  {
    description: 'Morgenrunde Haus 18 Entzug',
    time: '08:45 - 09:15',
    weekly: true,
  },
  {
    description: 'Morgenrunde Haus 18 Entzug',
    time: '08:45 - 09:15',
    weekly: false,
  },
];

console.log(events, weekDays);
</script>
<style></style>
