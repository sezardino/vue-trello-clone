<template>
  <div class="column">
    <div class="column-name">
      {{ column.name }}
    </div>
    <ul>
      <li v-for="task of column.tasks" :key="task.id">
        <TaskItem :task="task" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import TaskItem from './TaskItem.vue';
import type { Column } from '@/types';

export interface Props {
  column: Column;
}

defineProps<Props>();
</script>

<style scoped>
.column {
  @apply bg-gray-400 p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}

.column-name {
  @apply flex items-center mb-2 font-bold;
}
</style>
