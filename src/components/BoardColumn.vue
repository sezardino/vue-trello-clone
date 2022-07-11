<template>
  <div v-bind="$attrs" class="column">
    <div v-if="name" class="column-name">
      {{ name }}
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface Props {
  name?: string;
}

defineProps<Props>();
</script>

<style scoped>
.column-name {
  @apply flex items-center mb-2 font-bold;
}
</style>
