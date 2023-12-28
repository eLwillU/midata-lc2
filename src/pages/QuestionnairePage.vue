<template>
  <div v-if="loaded">
    <template v-for="item in selectedQuestionnaire.item" :key="item.linkId">
      <div class="text-h6">{{ item.text }}</div>
      <template v-for="option in item.answerOption" :key="option">
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
    questionnaires.value = await midata.loadQuestionnaireByTitle('Zupaz V4');
    selectedQuestionnaire = toRaw(questionnaires.value);
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



</script>
