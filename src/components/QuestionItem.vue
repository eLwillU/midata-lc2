<!-- QuestionItem.vue -->
<template>
  <div>
    <div class="text-h6">{{ question.text }}</div>
    <template v-for="option in question.answerOption" :key="option">
      <q-radio
        :label="
          option.valueString ||
          option.valueCoding.display ||
          option.valueCoding.code ||
          option.valueInteger
        "
        :val="
          option.valueString ||
          option.valueCoding.display ||
          option.valueCoding.code ||
          option.valueInteger
        "
        v-model="question.selected"
        class="text-subtitle2"
        checked-icon="task_alt"
        unchecked-icon="panorama_fish_eye"
      ></q-radio>
    </template>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
const props = defineProps({
  question: Object,
});

const question = ref(props.question);
</script>
