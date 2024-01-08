<template>
  <div>Wochenplan</div>
  <div v-for="i in timeslots" :key="i">
    <div class="row">
      <div
        class="column col-2"
        style="height: 3em; border: 1px solid black; margin-bottom: -1px"
      >
        <div class="text-caption">
          {{ i.startHour }}:{{ i.startMin }} - {{ i.endHour }}:{{ i.endMin }}
        </div>
      </div>
      <div class="column col-2">
        <q-btn outline square style="height: 3em; margin-bottom: -1px"></q-btn>
      </div>
      <div class="column col-2">
        <q-btn outline square style="height: 3em; margin-bottom: -1px"></q-btn>
      </div>
      <div class="column col-2">
        <q-btn outline square style="height: 3em; margin-bottom: -1px"></q-btn>
      </div>
      <div class="column col-2">
        <q-btn outline square style="height: 3em; margin-bottom: -1px"></q-btn>
      </div>
      <div class="column col-2">
        <q-btn outline square style="height: 3em; margin-bottom: -1px"></q-btn>
      </div>
    </div>
  </div>
  <q-btn @click="toggleOrientation">Toggle Orientation</q-btn>
</template>

<script setup>
function toggleOrientation() {
  if (screen.orientation) {
    const currentOrientation = screen.orientation.type;

    const newOrientation =
      currentOrientation === 'landscape-primary'
        ? 'portrait-primary'
        : 'landscape-primary';

    screen.orientation
      .lock(newOrientation)
      .then(() => console.log(`Orientation toggled to ${newOrientation}`))
      .catch((err) => console.error('Failed to toggle orientation:', err));
  } else {
    console.warn('Screen orientation API is not supported on this device');
  }
}

const timeslots = [
  {
    startHour: '07',
    startMin: '00',
    endHour: '08',
    endMin: '00',
    height: '3em',
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
