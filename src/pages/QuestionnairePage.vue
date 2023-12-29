<template>
  <!-- q-card mit Bild und Text wird nur angezeigt, wenn display true ist -->
  <div v-if="loaded && display" class="q-mb-md">
    <q-card flat bordered>
      <img
        src="https://www.gutenachrichten.org/wp-content/uploads/schluessel-zur-zufriedenheit.jpg"
      />
      <q-card-section>
        <div class="text-h6">
          Zürcher Fragebogen zur Patientenzufriedenheit in der psychiatrischen
          Klinik
        </div>
        <div class="text-subtitle2">(Züpaz)</div>
      </q-card-section>
      <q-card-section class="q-pt-none">{{ content }}</q-card-section>
    </q-card>
  </div>

  <!-- Fragebogen-Bereich wird nur angezeigt, wenn display true ist -->
  <div v-if="loaded && display">
    <div
      v-for="item in selectedQuestionnaire.item"
      :key="item.linkId"
      class="q-mb-sm"
    >
      <q-card>
        <q-card-section>
          <QuestionItem :question="item" v-model="item.selected"></QuestionItem>
        </q-card-section>
      </q-card>
    </div>
    <q-btn color="primary" @click="evaluateSelectedValues"
      >Evaluate Selected Values</q-btn
    >
  </div>

  <!-- Neue q-card mit Dankesnachricht -->
  <div v-if="showThankYouCard" class="q-mb-md">
    <q-card class="my-card">
      <img
        src="https://blog-cdn.everhour.com/blog/wp-content/uploads/2021/01/team-dynamics.jpg"
      />
      <q-card-section>
        <div class="text-h6">Vielen Dank!</div>
        <div class="text-subtitle2">
          Ihre Antworten sind sehr wertvoll für uns.
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { onMounted, ref, toRaw } from 'vue';
import { midata } from 'src/boot/plugins';
import QuestionItem from 'src/components/QuestionItem.vue';

const selectedQuestionnaire = ref(null);
const loaded = ref(false);
const display = ref(true);
const showThankYouCard = ref(false);

const content =
  'Wir sind sehr daran interessiert, Ihre Meinung zu Ihrem kürzlich erfolgten Aufenthalt in unserer Klinik zu erfahren. ' +
  'Auf dieser und den folgenden Seiten finden Sie eine Anzahl von Fragen. Es ist ein Fragebogen, der dazu dient, Ihre Zufriedenheit mit dem Klinikaufenthalt zu erfassen. Bitte füllen Sie Ihn aus. Sie brauchen dafür ungefähr 10 Minuten. ' +
  'Kreuzen Sie bitte jeweils die Antwort an, die am ehesten auf Ihr Erleben beim Aufenthalt in der Psychiatrischen Klinik zutrifft. Die Umfrage ist anonym, Ihre Angaben lassen keinen Rückschluss auf Ihre Person zu. ' +
  'Legen Sie bitte den ausgefüllten Fragebogen in das beiliegende Couvert und geben Sie das verschlossene Couvert vor dem Austritt beim Team-Büro ab. ' +
  'Wir danken Ihnen für Ihre Mitarbeit! ' +
  'Suchtfachklinik Zürich';

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
  display.value = false;
  showThankYouCard.value = true;
}
</script>

<style scoped>
/* Eigene Stile */

.q-card {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
</style>
