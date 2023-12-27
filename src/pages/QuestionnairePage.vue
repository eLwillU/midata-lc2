<template>
  <div v-if="loaded">
    <template v-for="item in selectedQuestionnaire.item" :key="item.linkId">
      <div class="text-h6">{{ item.text }}</div>
      <template v-for="option in item.answerOption" :key="option.valueString">
        <q-radio
          :label="option.valueString || option.valueCoding.display"
          :val="option.valueString || option.valueCoding.display"
          v-model="selected"
          class="text-subtitle2"
          checked-icon="task_alt"
          unchecked-icon="panorama_fish_eye"
        ></q-radio>
      </template>
    </template>
  </div>
</template>

<script setup>
import { onMounted, ref, toRaw } from 'vue';
import { midata } from 'src/boot/plugins';

const selected = ref(null);
const questionnaires = ref([]);
var selectedQuestionnaire = null;
const loaded = ref(false);

async function load() {
  try {
    questionnaires.value = await midata.loadQuestionnaire();
    selectedQuestionnaire = toRaw(questionnaires.value[1]);
    // "zupaz"
    console.log('Selected Q ', selectedQuestionnaire);
    loaded.value = true;
  } catch (error) {
    console.error('Error loading questionnaires:', error);
  }
}

// Filter Funktion anpassen => nicht über Index zugreifen.
// TODO: Fragebogen als Radio Buttons Rendern. => For Loop über answerOption
// TODO: Komponente für Fragebogen-Items erstellen. => Thema Props...

onMounted(() => {
  load();
});

const templateQuestionnaire = {
  resourceType: 'Questionnaire',
  id: '658c29a50b298b61a8ba85c0',
  meta: {
    extension: [
      {
        url: 'http://midata.coop/extensions/metadata',
        extension: [
          {
            url: 'app',
            valueCoding: {
              system: 'http://midata.coop/codesystems/app',
              code: 'mindschedule',
              display: 'MindSchedule',
            },
          },
          {
            url: 'creator',
            valueReference: {
              reference: 'Patient/5359c5adc453253332830f3f',
              display: 'TestPersonVorname TestPersonNachname',
            },
          },
        ],
      },
    ],
    versionId: '0',
    lastUpdated: '2023-12-27T14:41:57.000+01:00',
  },
  url: 'https://test.midata.coop/fhir/Questionnaire/658c29a50b298b61a8ba85c0',
  title: 'Züpaz V1',
  status: 'active',
  item: [
    {
      linkId: 'Alter',
      text: 'Welcher Altersgruppe gehören Sie an?',
      type: 'choice',
      answerOption: [
        {
          valueString: '10 - 19 Jahre',
        },
        {
          valueString: '20 - 29 Jahre',
        },
        {
          valueString: '30 - 39 Jahre',
        },
        {
          valueString: '40 - 49 Jahre',
        },
        {
          valueString: '50 - 59 Jahre',
        },
        {
          valueString: '60 - 69 Jahre',
        },
        {
          valueString: '70 - 79 Jahre',
        },
        {
          valueString: '80 - 89 Jahre',
        },
        {
          valueString: '90 Jahre und älter',
        },
      ],
    },
    {
      linkId: 'Geschlecht',
      text: 'Welches Geschlecht haben Sie?',
      type: 'choice',
      answerOption: [
        {
          valueString: 'Weiblich',
        },
        {
          valueString: 'Männlich',
        },
      ],
    },
    {
      linkId: 'Versicherung',
      text: 'Wie sind Sie versichert?',
      type: 'choice',
      answerOption: [
        {
          valueString: 'Allgemein',
        },
        {
          valueString: 'Halbprivat',
        },
        {
          valueString: 'Privat',
        },
      ],
    },
    {
      linkId: 'Eintrittsgrund',
      text: 'Wie sind Sie eingetreten?',
      type: 'choice',
      answerOption: [
        {
          valueString: 'Mit meiner Zustimmung',
        },
        {
          valueString: 'Gegen meinen Willen',
        },
      ],
    },
    {
      linkId: '1',
      text: 'Wurden Sie beim Eintritt über alles Wichtige informiert?',
      type: 'choice',
      answerOption: [
        {
          valueCoding: {
            code: '4',
            display: 'Voll und ganz',
          },
        },
        {
          valueCoding: {
            code: '3',
            display: 'Einigermassen',
          },
        },
        {
          valueCoding: {
            code: '2',
            display: 'Eher nicht',
          },
        },
        {
          valueCoding: {
            code: '1',
            display: 'Gar nicht',
          },
        },
      ],
    },
  ],
};

const items = [
  {
    linkId: 'Alter',
    text: 'Welcher Altersgruppe gehören Sie an?',
    type: 'choice',
    answerOption: [
      { valueString: '10 - 19 Jahre' },
      { valueString: '20 - 29 Jahre' },
      { valueString: '30 - 39 Jahre' },
    ],
  },
  {
    linkId: 'Geschlecht',
    text: 'Welchem Geschlecht gehören Sie an?',
    type: 'choice',
    answerOption: [
      { valueString: 'männlich' },
      { valueString: 'weiblich' },
      { valueString: 'divers' },
    ],
  },
  {
    linkId: 'Hobby',
    text: 'Was ist Ihr Lieblingshobby?',
    type: 'choice',
    answerOption: [
      { valueString: 'Sport' },
      { valueString: 'Musik' },
      { valueString: 'Lesen' },
      { valueString: 'Kochen' },
    ],
  },
  {
    linkId: 'Stadt',
    text: 'In welcher Stadt leben Sie?',
    type: 'choice',
    answerOption: [
      { valueString: 'Berlin' },
      { valueString: 'München' },
      { valueString: 'Hamburg' },
      { valueString: 'Köln' },
      { valueString: 'Frankfurt' },
    ],
  },
];

console.log(items, templateQuestionnaire);
</script>
