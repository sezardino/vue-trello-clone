<template>
  <RouterView />
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
</script>

<style>
body,
html {
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.column {
  @apply bg-gray-400 p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
