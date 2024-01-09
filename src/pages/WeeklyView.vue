<template>
  <div>Wochenplan</div>

  <q-markup-table separator="cell" class="no-wrap">
    <thead>
      <th>Zeit</th>
      <th v-for="d in weekDays" :key="d">
        {{ d }}
      </th>
    </thead>
    
    <tbody >
      <!--- Single item Rows --->
      <tr  v-for="e in events" :key="e" class="q-tr--no-hover">
        <td
        v-if="e.weekly">{{ e.time }}</td>
        <td
          colspan="5"
          style="text-align: left"
          class="bg-blue-2"
          v-if="e.weekly"
        >
          <q-card  flat class="bg-transparent ">
            {{ e.description }}</q-card
          >
        </td>
      </tr>
      <tr v-for="r in rows" :key="r">
        <td>
          <q-card flat class="bg-transparent" style="width: 5em;">  {{ r.timeSlot }}</q-card>
        
        </td>
        <td v-for="d in r.day" :key="d" :rowspan="d.numRows" >
          <q-card bordered flat class="bg-transparent;" style="width: 100%;">
            <q-card-section style="text-wrap: wrap;" class="text-caption">{{ d.description }} </q-card-section> </q-card>
       </td>
      </tr>
     
    </tbody>
  </q-markup-table>



</template>

<script setup>



const rows = [
  {
    timeSlot: '08:00 - 09:00',
    day: [
      {
        fullDescription: 'Einzelgespräch XY',
        numRows: 2,
        dayNum: 0
      },
      {
        fullDescription: 'Gruppentherapie',
        numRows: 1,
        dayNum: 1
      },
      {
        fullDescription: 'Bräzeli',
        numRows: 1,
        dayNum: 2
      },

    ]
  },
  {
    timeSlot: '10:00 - 11:00',
    day: [
      {
        fullDescription: 'Einzelgespräch XY',
        numRows: 1,
        dayNum: 1

      },
      {
        fullDescription: 'Gruppentherapie',
        numRows: 1,
        dayNum: 2

      },
    ]
  },
 
  { timeSlot: '07:00 - 08:00',
    
 },
  { timeSlot: '08:15 - 08:45' },
  { timeSlot: '08:45 - 09:15' },
  { timeSlot: '09:15 - 10:00',
  day: [
      {
        fullDescription: 'Ärztliche Gruppen-therapie (ARZT)  RAUM 203 / Haus 18',
        description: 'Ärztliche Gruppentherapie',
        person: 'Arzt',
        location: 'Raum 203 / Haus 18',
        numRows: 2,
        dayNum: 0,
      },
      {
        fullDescription: 'PE Trauma geschlossene Gruppe (PDD Eva / Lara) Raum 109 / Haus 18',
        description: 'PE Trauma geschlossene Gruppe',
        person: 'PDD Eva / Lara',
        location: 'Raum 109 / Haus 18',
        numRows: 2,
        dayNum: 1,
      },
      {
        fullDescription: 'Soziale Kompetenzen (PDD Tobias / Prakt) Raum 109 / Haus 18',
        description: 'Soziale Kompetenzen',
        person: 'PDD Tobias / Prakt',
        location: 'Raum 109 / Haus 18',
        numRows: 2,
        dayNum: 2,
      },
      {

      },
      {
        fullDescription: 'Kognitives Training (PDD Prakt) Raum U49 / Haus 14',
        description: 'Kognitives Training',
        person: '(PDD Prakt)',
        location: 'Raum U49 / Haus 14',
        numRows: 2,
        dayNum: 3,
      },
      
    ] },
  { timeSlot: '10:00 - 10:45' },
  { timeSlot: '11:00 - 12:00' },
  { timeSlot: '12:00 - 13:00' },
  { timeSlot: '13:30 - 14:00' },
  { timeSlot: '14:15 - 15:00' },
  { timeSlot: '15:00 - 16:00' },
  { timeSlot: '16:00 - 17:00' },
  { timeSlot: '17:00 - 18:00' },
  { timeSlot: '18:00 - 19:00' },
  { timeSlot: '19:00 - 20:00' },
  { timeSlot: '20:00 - 21:00' }
]

const weekDays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag','Freitag'];
const events = [
  {
    fullDescription: 'Gemeinsames Frühstück Haus 14 Entwöhnung',
    time: '07:00 - 08:00',
    weekly: true,
    weekday: null
  },
  {
    fullDescription: 'Gemeinsamer Morgen Spaziergang ALLE',
    time: '08:15 - 08:45',
    weekly: true,
    weekday: null
  },
  {
    fullDescription: 'Morgenrunde Haus 18 Entzug',
    time: '08:45 - 09:15',
    weekly: true,
    weekday: null
  },
  {
    fullDescription: 'Morgenrunde Haus 18 Entzug',
    time: '08:45 - 09:15',
    weekly: false,
    weekday: 0
  },
  {
    fullDescription: 'Morgenrunde Haus 18 Entzug',
    time: '08:45 - 09:15',
    weekly: false,
    weekday: 1
  },
];


console.log(events, weekDays, rows);
</script>
<style></style>
