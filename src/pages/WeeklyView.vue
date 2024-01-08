<template>
  <div>Wochenplan</div>

  <div>
    <q-scroll-area style="height: 100em; max-width: 300px">
      <div class="row no-wrap">
        <!-- Time Column -->
        <div
          class="column col-3 items-center justify-center"
          style="border: 1px solid black; height: 3em"
        >
          Zeit
        </div>
        <!-- Day Columns -->
        <div
          v-for="i in weekdays"
          :key="i"
          class="column col-5 items-center justify-center"
          style="border: 1px solid black; height: 3em"
        >
          {{ i }}
        </div>

        <!-- Time Column -->
      </div>

      <div class="row no-wrap" v-for="t in timeslots" :key="t">
        <div
          class="column col-3 items-center justify-center"
          style="border: 1px solid black; height: 3em"
        >
          {{ t.startHour }}:{{ t.startMin }} - {{ t.endHour }}:{{ t.endMin }}
        </div>
        <div style="border: 1px solid black; height: 3em">
          Morgenspaziergang
        </div>
      </div>

      <!-- Day Columns -->
      <div
        class="column col-5 items-center justify-center bg-blue-2"
        style="border: 1px solid black; height: 3em"
      ></div>
      <div
        class="column col-5 items-center justify-center"
        style="border: 1px solid black; height: 3em"
      ></div>
      <div
        class="column col-5 items-center justify-center"
        style="border: 1px solid black; height: 3em"
      ></div>
      <div
        class="column col-5 items-center justify-center"
        style="border: 1px solid black; height: 3em"
      ></div>
      <div
        class="column col-5 items-center justify-center"
        style="border: 1px solid black; height: 3em"
      ></div>
    </q-scroll-area>
  </div>
</template>

<script setup>
const weekdays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
const timeslots = [
  {
    startHour: '07',
    startMin: '00',
    endHour: '08',
    endMin: '00',
  },
  {
    startHour: '08',
    startMin: '15',
    endHour: '08',
    endMin: '45',
  },
  {
    startHour: '08',
    startMin: '45',
    endHour: '09',
    endMin: '15',
  },
  {
    startHour: '09',
    startMin: '15',
    endHour: '10',
    endMin: '00',
  },
  {
    startHour: '10',
    startMin: '00',
    endHour: '10',
    endMin: '45',
  },
  {
    startHour: '11',
    startMin: '00',
    endHour: '12',
    endMin: '00',
  },
  {
    startHour: '12',
    startMin: '00',
    endHour: '13',
    endMin: '00',
  },
  {
    startHour: '13',
    startMin: '30',
    endHour: '14',
    endMin: '00',
  },
  {
    startHour: '14',
    startMin: '15',
    endHour: '15',
    endMin: '00',
  },
  {
    startHour: '15',
    startMin: '00',
    endHour: '16',
    endMin: '00',
  },
  {
    startHour: '16',
    startMin: '00',
    endHour: '17',
    endMin: '00',
  },
  {
    startHour: '17',
    startMin: '00',
    endHour: '18',
    endMin: '00',
  },
  {
    startHour: '18',
    startMin: '00',
    endHour: '19',
    endMin: '00',
  },
  {
    startHour: '19',
    startMin: '00',
    endHour: '20',
    endMin: '00',
  },
  {
    startHour: '20',
    startMin: '00',
    endHour: '21',
    endMin: '00',
  },
];
</script>
