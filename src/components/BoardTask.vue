<template>
  <div class="task">
    <p class="task-field">
      {{ task.name }}
    </p>
    <small v-if="task.description" class="task-field">
      {{ task.description }}
    </small>
  </div>
</template>

<script lang="ts" setup>
import type { Task } from '@/types';

export interface Props {
  task: Task;
}

defineProps<Props>();
</script>

<style scoped>
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-900 no-underline cursor-pointer;
}

.task-field {
  @apply w-full font-bold mt-1;
}
</style>
