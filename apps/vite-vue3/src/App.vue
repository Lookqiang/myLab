<script setup lang="ts">
const appTitle = "vite-vue3";
</script>

<template>
  {{ appTitle }}
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
  width: clcc("6em1");
}

.logo:hover {
  filter: drop-shadow(0 0 2em #151747aa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
