<template>
  <div class="column">
    <div class="column-name">
      {{ column.name }}
    </div>
    <ul>
      <li
        v-for="task of column.tasks"
        :key="task.id"
        @click="onTaskClick(task.id)"
      >
        <TaskItem :task="task" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import TaskItem from './TaskItem.vue';
import type { Column } from '@/types';
import { useRouter } from 'vue-router';

export interface Props {
  column: Column;
}

defineProps<Props>();

const router = useRouter();

const onTaskClick = (id: string) => {
  router.push({ name: 'task', params: { id } });
};
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
