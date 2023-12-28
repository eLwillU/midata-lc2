<template>
  <div v-if="loaded">
    <template v-for="item in selectedQuestionnaire.item" :key="item.linkId">
      <QuestionItem :question="item" v-model="item.selected"></QuestionItem>
    </template>
    <button @click="evaluateSelectedValues">Evaluate Selected Values</button>
  </div>
</template>

<script setup>
import { onMounted, ref, toRaw } from 'vue';
import { midata } from 'src/boot/plugins';
import QuestionItem from 'src/components/QuestionItem.vue';

const selectedQuestionnaire = ref(null);
const loaded = ref(false);

async function load() {
  try {
    const questionnaires = await midata.loadQuestionnaireByTitle('Zupaz V4');
    selectedQuestionnaire.value = toRaw(questionnaires);
    loaded.value = true;
  } catch (error) {
    console.error('Error loading questionnaires:', error);
  }
}

onMounted(() => {
  load();
});

function evaluateSelectedValues() {
  const selectedValues = selectedQuestionnaire.value.item.map(
    (item) => item.selected,
  );
  console.log('Selected values:', selectedValues);
  // Perform further evaluation or processing with the selected values
}
</script>

<style scoped>
/* Add your styles here */
</style>
