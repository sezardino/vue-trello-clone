<template>
  <button
    type="button"
    class="button"
    :class="type === 'danger' ? 'bg-read' : 'bg-teal'"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { withDefaults } from 'vue';

export interface Props {
  type: 'default' | 'danger';
}

withDefaults(defineProps<Props>(), {
  type: 'default',
});
</script>

<style lang="css" scoped>
.button {
  @apply inline-flex px-4 py-2 text-white font-bold rounded items-center;
}
</style>
