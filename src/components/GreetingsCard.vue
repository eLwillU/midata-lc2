q<template>
  <div class="text-h5 q-mb-lg">Hallo {{ name }}, {{ message }} steht folgendes an:</div>
</template>

<script>
export default {
  props: {
    name: String,
    message: String
  }
};
</script>

