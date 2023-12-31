<template>
  <!-- q-card mit Bild und Text wird nur angezeigt, wenn display true ist -->
  <div v-if="loaded && display" class="q-mb-md">
    <q-card flat bordered>
      <img
        src="https://www.gutenachrichten.org/wp-content/uploads/schluessel-zur-zufriedenheit.jpg"
      />
      <q-card-section>
        <div class="text-h6">
          Zürcher Patientenzufriedenheits-Fragebogen für Psychiatrie
        </div>
        <div class="text-subtitle2">(Züpaz)</div>
      </q-card-section>
      <q-card-section class="q-pt-none">{{ content }}</q-card-section>
    </q-card>
  </div>
  <!-- Fortschrittsbalken -->
  <div class="q-pa-md" v-if="loaded && display">
    <q-linear-progress size="25px" :value="progressValue" color="primary">
      <div class="absolute-full flex flex-center">
        <q-badge color="white" text-color="primary" :label="progressLabel" />
      </div>
    </q-linear-progress>
  </div>
  <!-- Fragebogen-Bereich wird nur angezeigt, wenn display true ist -->
  <div v-if="loaded && display">
    <div v-for="item in displayedQuestions" :key="item.linkId" class="q-mb-sm">
      <q-card>
        <q-card-section>
          <QuestionItem :question="item" v-model="item.selected"></QuestionItem>
        </q-card-section>
      </q-card>
    </div>
    <!-- Navigationsbuttons für Weiter und Zurück -->
    <div class="row justify-between q-mt-md">
      <q-btn
        v-if="currentPage > 1"
        @click="previousPage"
        label="Zurück"
        color="primary"
      />
      <q-btn
        v-if="hasMorePages"
        @click="nextPage"
        label="Weiter"
        color="primary"
      />
      <q-btn
        v-if="isLastPage"
        @click="evaluateSelectedValues"
        label="Auswerten"
        color="primary"
      />
    </div>
  </div>
  <!-- Neue q-card mit Dankesnachricht -->
  <div v-if="showThankYouCard" class="q-mb-md">
    <q-card class="my-card">
      <img
        src="https://blog-cdn.everhour.com/blog/wp-content/uploads/2021/01/team-dynamics.jpg"
      />
      <q-card-section>
        <div class="text-h6">Der Fragebogen ist abgeschlossen!</div>
        <div class="text-subtitle2">
          Vielen Dank für Ihre Antworten, sie sind uns äusserst wertvoll. Wir bestätigen, dass sie erfolgreich übermittelt wurden.
        </div>
      </q-card-section>
      <q-card-section class="text-center">
        <q-btn label="Abchliessen" color="primary" @click="closeThankYouCard" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { onMounted, ref, toRaw, computed } from 'vue';
import { midata } from 'src/boot/plugins';
import QuestionItem from 'src/components/QuestionItem.vue';

const selectedQuestionnaire = ref(null);
const loaded = ref(false);
const display = ref(true);
const showThankYouCard = ref(false);
const currentPage = ref(1);
const questionsPerPage = 5;

const content =
  'Bitte teilen Sie uns Ihre Meinung zu Ihrem Aufenthalt in unserer Klinik mit. ' +
  'Dieser kurze Fragebogen, der etwa 10 Minuten in Anspruch nimmt, zielt darauf ab, Ihre Erfahrungen und Zufriedenheit zu erfassen. ' +
  'Kreuzen Sie bitte jeweils die Antwort an, die am ehesten auf Ihr Erleben beim Aufenthalt in der Psychiatrischen Klinik der SFK zutrifft. Ihre Antworten sind anonym und vertraulich. ' +
  'Vielen Dank für Ihre Unterstützung! - Suchtfachklinik Zürich ';

async function load() {
  try {
    const questionnaires = await midata.loadQuestionnaireByTitle('Zupaz V4');
    selectedQuestionnaire.value = toRaw(questionnaires);
    loaded.value = true;
  } catch (error) {
    console.error('Error loading questionnaires:', error);
  }
}
function closeThankYouCard() {
  showThankYouCard.value = false;
}


onMounted(() => {
  load();
});

function evaluateSelectedValues() {
  const selectedValues = selectedQuestionnaire.value.item.map(
    (item) => item.selected,
  );
  console.log('Selected values:', selectedValues);
  display.value = false;
  showThankYouCard.value = true;
}
function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}
function nextPage() {
  if (
    currentPage.value * questionsPerPage <
    selectedQuestionnaire.value.item.length
  ) {
    currentPage.value++;
  }
}
const displayedQuestions = computed(() => {
  const start = (currentPage.value - 1) * questionsPerPage;
  const end = start + questionsPerPage;
  return selectedQuestionnaire.value.item.slice(start, end);
});

const hasMorePages = computed(() => {
  return (
    currentPage.value * questionsPerPage <
    selectedQuestionnaire.value.item.length
  );
});
const isLastPage = computed(() => {
  return (
    currentPage.value * questionsPerPage >=
    selectedQuestionnaire.value.item.length
  );
});
const totalQuestions = computed(() => selectedQuestionnaire.value ? selectedQuestionnaire.value.item.length : 0);
const answeredQuestions = computed(() =>
  selectedQuestionnaire.value ? selectedQuestionnaire.value.item.filter(q => q.selected).length : 0
);

const progressValue = computed(() => answeredQuestions.value / totalQuestions.value);
const progressLabel = computed(() => (progressValue.value * 100).toFixed(2) + '%');
</script>


<style scoped>
/* Eigene Stile */

.q-card {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
</style>
