<template>
  <div>Wochenplan</div>

  <q-dialog v-model="showPopup" v-if="dontShowAgain">
    <q-card>
      <q-card-section class="row items-center no-wrap">
        <q-icon size="sm" color="red" name="info" class="q-pr-sm"></q-icon>
        <span
          >Für mehr Informationen bitte auf den jeweiligen Termin klicken.</span
        >
      </q-card-section>
      <q-card-section class="row items-center">
        <q-checkbox
          v-model="dontShowAgainCheckbox"
          label="Nicht mehr anzeigen."
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Schliessen" color="primary" @click="closeDialog" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-markup-table separator="cell" class="no-wrap">
    <thead>
      <th>Zeit</th>
      <th v-for="d in weekDays" :key="d">
        <div>{{ d }}</div>
      </th>
    </thead>
    <tbody>
      <template v-for="r in rows" :key="r">
        <tr v-if="r.weekly">
          <td>
            {{ r.timeSlot }}
          </td>
          <td colspan="5" class="bg-blue-1 content">
            <q-btn
              no-caps
              flat
              class="text-caption"
              align="left"
              :class="{ [singleLineWeekly]: true, qButtonClasses: true }"
              @click="openDialog(r.description, r.timeSlot)"
            >
              <div>{{ r.description }}</div>
            </q-btn>
          </td>
        </tr>

        <tr v-if="!r.weekly">
          <td>
            {{ r.timeSlot }}
          </td>
          <td
            v-for="d in r.day"
            :key="d"
            :rowspan="d.numRows"
            :class="['content', d.bgColor]"
          >
            <q-btn
              flat
              no-caps
              class="text-caption"
              @click="openDialog(d.description, r.timeSlot, d.location)"
              :class="{
                [quadLine]: d.numRows === 4,
                [trippleLine]: d.numRows === 3,
                [doubleLine]: d.numRows === 2,
                [singleLine]: d.numRows === 1,
                qButtonClasses,
              }"
            >
              <div>{{ d.description }}</div>
            </q-btn>
          </td>
        </tr>
      </template>
    </tbody>
  </q-markup-table>

  <q-dialog v-model="dialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ dialogContent.title }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none" horizontal="">
        <q-card-section>
          <span class="text-subtitle1 text-weight-bold">Zeit: </span><br />
          <span>{{ dialogContent.time }}</span>
        </q-card-section>
        <q-card-section>
          <span class="text-subtitle1 text-weight-bold">Ort: </span><br />
          <q-icon name="location_on" /> {{ dialogContent.location }}
        </q-card-section>
      </q-card-section>
      <q-card-section>
        <span class="text-subtitle1 text-weight-bold">Beschreibung: </span>
        <div>Hier finden Sie weitere Informationen zur Sitzung...</div>
      </q-card-section>
      <q-card-actions>
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useUserStore } from 'stores/user';
import { ref } from 'vue';
const store = useUserStore();

const showPopup = ref(true);
const dontShowAgain = ref(store.showPopup);
const dontShowAgainCheckbox = ref(false);

const dialog = ref(false);
const dialogContent = ref({
  title: '',
  time: '',
  location: '',
});

function closeDialog() {
  showPopup.value = false;
  if (dontShowAgainCheckbox.value) {
    store.setShowPopup(false);
  }
}

function openDialog(contentDescription, contentTime, contentLocation) {
  dialog.value = true;
  dialogContent.value = {
    title: contentDescription,
    time: contentTime,
    location: contentLocation ? contentLocation : 'Treffpunkt',
  };
  console.log(contentTime);
}

const qButtonClasses = 'q-py-none q-px-sm';
const doubleLine = 'q-btn-double-line';
const singleLine = 'q-btn-single-line';
const singleLineWeekly = 'q-btn-single-line-weekly';
const trippleLine = 'q-btn-tripple-line';
const quadLine = 'q-btn-quad-line';
const rows = [
  {
    timeSlot: '07:00 - 08:00',
    description: 'Gemeinsames Frühstück Haus 14 Entwöhnung',
    person: null,
    location: null,
    numRows: null,
    dayNum: null,
    weekly: true,
  },
  {
    timeSlot: '08:15 - 08:45',

    description: 'Gemeinsamer Morgen Spaziergang ALLE',
    person: null,
    location: null,
    numRows: null,
    dayNum: null,
    weekly: true,
  },
  {
    timeSlot: '08:45 - 09:15',

    description: 'Morgenrunde Haus 18 Entzug',
    person: null,
    location: null,
    numRows: null,
    dayNum: null,
    weekly: true,
  },
  {
    timeSlot: '09:15 - 10:00',
    weekly: false,
    day: [
      {
        fullDescription:
          'Ärztliche Gruppen-therapie (ARZT)  RAUM 203 / Haus 18',
        description: 'Ärztliche Gruppentherapie',
        person: 'Arzt',
        location: 'Raum 203 / Haus 18',
        numRows: 2,
        dayNum: 0,
        bgColor: '',
        type: 'group',
      },
      {
        fullDescription:
          'PE Trauma geschlossene Gruppe (PDD Eva / Lara) Raum 109 / Haus 18',
        description: 'PE Trauma geschlossene Gruppe',
        person: 'PDD Eva / Lara',
        location: 'Raum 109 / Haus 18',
        numRows: 2,
        dayNum: 1,
        bgColor: '',
        type: 'group',
      },
      {
        fullDescription:
          'Soziale Kompetenzen (PDD Tobias / Prakt) Raum 109 / Haus 18',
        description: 'Soziale Kompetenzen',
        person: 'PDD Tobias / Prakt',
        location: 'Raum 109 / Haus 18',
        numRows: 2,
        dayNum: 2,
        bgColor: '',
        type: 'group',
      },
      { numRows: 1 },
      {
        fullDescription: 'Kognitives Training (PDD Prakt) Raum U49 / Haus 14',
        description: 'Kognitives Training',
        person: '(PDD Prakt)',
        location: 'Raum U49 / Haus 14',
        numRows: 2,
        dayNum: 4,
        bgColor: '',
        type: 'group',
      },
    ],
  },
  {
    timeSlot: '10:00 - 10:45',
    weekly: false,
    day: [
      {
        fullDescription: 'Visite Haus 14 (M. Safavi)',
        description: 'Visite Haus 14',
        person: 'M. Safavi',
        location: null,
        numRows: 2,
        dayNum: 3,
        bgColor: '',
        type: 'physician',
      },
    ],
  },
  {
    timeSlot: '11:00 - 12:00',
    weekly: false,
    day: [
      {
        fullDescription: 'Einzeltermine / Peergespräche',
        description: 'Einzeltermine / Peergespräche',
        person: null,
        location: null,
        numRows: 1,
        dayNum: null,
        bgColor: '',
        type: 'appointment',
      },
      {
        fullDescription: 'Einzeltermine / Peergespräche',
        description: 'Einzeltermine / Peergespräche',
        person: null,
        location: null,
        numRows: 1,
        dayNum: null,
        bgColor: '',
        type: 'appointment',
      },
      {
        fullDescription: 'Einzeltermine / Peergespräche',
        description: 'Einzeltermine / Peergespräche',
        person: null,
        location: null,
        numRows: 1,
        dayNum: null,
        bgColor: '',
        type: 'appointment',
      },
      {
        fullDescription: 'Einzeltermine / Peergespräche',
        description: 'Einzeltermine / Peergespräche',
        person: null,
        location: null,
        numRows: 1,
        dayNum: null,
        bgColor: '',
        type: 'appointment',
      },
    ],
  },
  { timeSlot: '12:00 - 13:00', weekly: true, description: 'Mittagessen' },
  {
    timeSlot: '13:30 - 14:00',
    weekly: false,
    day: [
      {
        fullDescription: 'Info & Milieusitzung Haus 14',
        description: 'Info & Milieusitzung',
        person: null,
        location: null,
        numRows: 1,
        type: 'care',
      },
      { numRows: 1 },
      {
        fullDescription: 'Skills DBT  (Pflege)  Raum 203 Haus 18',
        description: 'Skills DBT',
        person: 'Pflege',
        location: 'Raum 203 Haus 18',
        numRows: 2,
        type: 'care',
      },
      {
        fullDescription: 'Bildungs-workshop (Job Coach) Raum U45 / Haus 14',
        description: 'Bildungsworkshop',
        person: 'Job Coach',
        location: 'Raum U45 / Haus 14',
        numRows: 2,
        type: 'work',
      },
      {
        fullDescription: 'Arbeit / (Agogik)',
        description: ' Arbeit / (Agogik)',
        person: 'Agogik',
        location: null,
        numRows: 2,
        type: 'work',
      },
    ],
  },
  {
    timeSlot: '14:15 - 15:00',
    weekly: false,
    day: [
      {
        fullDescription: 'Ämtli Haus 14',
        description: 'Ämtli Haus 14',
        person: null,
        location: null,
        numRows: 1,
        multiLine: false,
        type: 'work',
      },
      {
        fullDescription:
          'Deliktpräventionsgruppe (PDD Gunnar/ Tobias) Raum U45 / Haus 14',
        description: 'Deliktpräventionsgruppe',
        person: 'PDD Gunnar/ Tobias',
        location: 'Raum U45 / Haus 14',
        numRows: 2,
        type: 'group',
      },
    ],
  },
  {
    timeSlot: '15:00 - 16:00',
    weekly: false,
    day: [
      {
        fullDescription: 'Gruppensport in der Halle (Pflege)',
        description: 'Gruppensport',
        person: 'Pflege',
        location: 'Halle',
        numRows: 2,
        type: 'sport',
        bgColor: '',
      },
      {
        fullDescription: 'Einzeltermine / Peergespräche',
        description: 'Einzeltermine / Peergespräche',
        person: null,
        location: null,
        numRows: 1,
        dayNum: null,
        type: 'appointment',
      },
      {
        fullDescription: 'Einzeltermine / Peergespräche',
        description: 'Einzeltermine / Peergespräche',
        person: null,
        location: null,
        numRows: 1,
        dayNum: null,
        type: 'appointment',
      },
      {
        fullDescription: 'Einzeltermine / Peergespräche',
        description: 'Einzeltermine / Peergespräche',
        person: null,
        location: null,
        numRows: 1,
        dayNum: null,
        type: 'appointment',
      },
    ],
  },
  {
    timeSlot: '16:00 - 17:00',
    weekly: false,
    day: [
      {
        fullDescription: 'Freie Zeit und Abendessen',
        description: 'Freie Zeit und Abendessen',
        person: null,
        location: null,
        numRows: 4,
      },

      {
        fullDescription: 'Freie Zeit und Abendessen',
        description: 'Freie Zeit und Abendessen & gemeinsames Kochen',
        person: null,
        location: null,
        numRows: 4,
      },
      {
        fullDescription: 'Freie Zeit und Abendessen',
        description: 'Freie Zeit und Abendessen',
        person: null,
        location: null,
        numRows: 4,
      },
      {
        fullDescription: 'Ämtli Haus 14',
        description: 'Ämtli Haus 14',
        person: null,
        location: null,
        numRows: 1,
        type: 'work',
      },
    ],
  },
  {
    timeSlot: '17:00 - 18:00',
    weekly: false,
    day: [
      {
        fullDescription: 'Freie Zeit und Abendessen',
        description: 'Freie Zeit und Abendessen',
        person: null,
        location: null,
        numRows: 3,
      },
      {
        fullDescription: 'Freie Zeit und Abendessen',
        description: 'Freie Zeit und Abendessen',
        person: null,
        location: null,
        numRows: 3,
      },
    ],
  },
  { timeSlot: '18:00 - 19:00' },
  { timeSlot: '19:00 - 20:00' },
  {
    timeSlot: '20:00 - 21:00',
    weekly: true,
    description: 'Abendlicher Spaziergang und anschliessend NADA',
  },
];
setColors();

function setColors() {
  rows.forEach((row) => {
    if (row.weekly) {
      row.bgColor = 'bg-blue-1';
    }
    if (row.day) {
      row.day.forEach((day) => {
        if (day.type === 'group') {
          day.bgColor = 'bg-green-4';
        }
        if (day.type === 'physician') {
          day.bgColor = 'bg-green-1';
        }
        if (day.type === 'care') {
          day.bgColor = 'bg-red-2';
        }
        if (day.type === 'work') {
          day.bgColor = 'bg-orange-1';
        }
        if (day.type === 'sport') {
          day.bgColor = 'bg-blue-4';
        }
        if (day.type === 'appointment') {
          day.bgColor = 'bg-grey-5';
        }
      });
    }
  });
}

const weekDays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
</script>
<style scoped>
.q-btn-single-line {
  white-space: normal;
  width: 12em;
  height: 4em;
}
.q-btn-single-line-weekly {
  white-space: normal;
  width: 100%;
  height: 4em;
}
.q-btn-double-line {
  white-space: normal;
  width: 12em;
  height: 8em;
}
.q-btn-tripple-line {
  white-space: normal;
  width: 12em;
  height: 12em;
}
.q-btn-quad-line {
  white-space: normal;
  width: 12em;
  min-height: 16em;
}
.content {
  padding: 0;
}
</style>
