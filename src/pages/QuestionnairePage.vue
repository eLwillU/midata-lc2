<template>
  <!-- q-card mit Bild und Text wird nur angezeigt, wenn display true ist -->
  <div v-if="loaded && display" class="q-mb-md">
    <q-card flat bordered>
      <img :src="questionnaireDetails.imageSrc" />
      <q-card-section>
        <div class="text-h6">{{ questionnaireDetails.title }}</div>
        <div class="text-subtitle2">{{ questionnaireDetails.subtitle }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">{{
        questionnaireDetails.content
      }}</q-card-section>
    </q-card>
  </div>

  <!-- Likert-Skala nur für den BSCL-Fragebogen -->
  <div v-if="loaded && display && props.title === 'BSCL V1'" class="q-pa-md">
    <div class="flex justify-around text-center">
      <div class="q-mx-xs">
        <q-icon name="sentiment_very_dissatisfied" size="md" />
        <div>0</div>
        <div>überhaupt nicht</div>
      </div>
      <div class="q-mx-xs">
        <q-icon name="sentiment_dissatisfied" size="md" />
        <div>1</div>
        <div>ein wenig</div>
      </div>
      <div class="q-mx-xs">
        <q-icon name="sentiment_neutral" size="md" />
        <div>2</div>
        <div>ziemlich</div>
      </div>
      <div class="q-mx-xs">
        <q-icon name="sentiment_satisfied" size="md" />
        <div>3</div>
        <div>stark</div>
      </div>
      <div class="q-mx-xs">
        <q-icon name="sentiment_very_satisfied" size="md" />
        <div>4</div>
        <div>sehr stark</div>
      </div>
    </div>
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
        :disable="currentPage <= 1"
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
          Vielen Dank für Ihre Antworten, sie sind uns äusserst wertvoll. Wir
          bestätigen, dass sie erfolgreich übermittelt wurden.
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

const props = defineProps({
  title: String,
});

const selectedQuestionnaire = ref(null);
const loaded = ref(false);
const display = ref(true);
const showThankYouCard = ref(false);
const currentPage = ref(1);
const questionsPerPage = 5;

// Dynamische Inhalte und Bilder basierend auf dem Fragebogentitel
const questionnaireDetails = computed(() => {
  if (props.title === 'Zupaz V4') {
    return {
      imageSrc:
        'https://www.flixcheck.de/wp-content/uploads/2022/03/kundenzufriedenheit-messen.jpeg',
      content:
        'Bitte teilen Sie uns Ihre Meinung zu Ihrem Aufenthalt in unserer Klinik mit. ' +
        'Dieser kurze Fragebogen, der etwa 10 Minuten in Anspruch nimmt, zielt darauf ab, Ihre Erfahrungen und Zufriedenheit zu erfassen. ' +
        'Kreuzen Sie bitte jeweils die Antwort an, die am ehesten auf Ihr Erleben beim Aufenthalt in der Psychiatrischen Klinik der SFK zutrifft. Ihre Antworten sind anonym und vertraulich. ' +
        'Vielen Dank für Ihre Unterstützung! - Suchtfachklinik Zürich',
      title: 'Zürcher Patientenzufriedenheits-Fragebogen für Psychiatrie',
      subtitle: '(Züpaz)',
    };
  } else if (props.title === 'BSCL V1') {
    return {
      imageSrc:
        'https://www.commma.de/wp-content/uploads/2021/08/Selbstreflexion-coaching-commma-fuehrung.jpg',
      content:
        'Hier finden Sie eine Liste verschiedener Probleme und Beschwerden, die gelegentlich auftreten können. Bitte lesen Sie jede Frage sorgfältig durch und bewerten Sie, wie sehr Sie in den letzten sieben Tagen bis heute durch diese Beschwerden beeinträchtigt wurden. Es ist wichtig, dass Sie nicht überlegen, welche Antworten den „besten Eindruck“ hinterlassen könnten, sondern ehrlich antworten, wie es für Sie persönlich zutrifft. Wählen Sie bitte bei jeder Frage die Antwort, die am besten auf Sie zutrifft.',
      title: 'Fragebogen zur Erfassung von Problemen und Beschwerden',
      subtitle: '(BSCL)',
    };
  }
  return { imageSrc: '', content: '', title: '', subtitle: '' };
});

async function load() {
  try {
    const questionnaires = await midata.loadQuestionnaireByTitle(props.title);
    selectedQuestionnaire.value = toRaw(questionnaires);
    loaded.value = true;
    console.log('Questionnaire loaded:', selectedQuestionnaire.value);
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
const totalQuestions = computed(() =>
  selectedQuestionnaire.value ? selectedQuestionnaire.value.item.length : 0,
);
const answeredQuestions = computed(() =>
  selectedQuestionnaire.value
    ? selectedQuestionnaire.value.item.filter((q) => q.selected).length
    : 0,
);

const progressValue = computed(
  () => answeredQuestions.value / totalQuestions.value,
);
const progressLabel = computed(
  () => (progressValue.value * 100).toFixed(2) + '%',
);
</script>

<style scoped>
/* Eigene Stile */

.q-card {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
</style>
