<template>
  <div class="column">
    <div class="column-name">
      {{ column.name }}
    </div>
    <div>
      <ul>
        <li
          v-for="task of column.tasks"
          :key="task.id"
          @click="onTaskClick(task.id)"
        >
          <TaskItem :task="task" />
        </li>
      </ul>
      <input
        ref="inputRef"
        type="text"
        v-model="value"
        placeholder="+ Add a task"
        class="bg-transparent text-red-50 placeholder:text-red-50 outline-none mt-2"
        @keyup.enter="onAddTask"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Column } from '@/types';
import { useRouter } from 'vue-router';
import { useField } from 'vee-validate';
import * as yup from 'yup';

import TaskItem from './TaskItem.vue';
import { ref } from 'vue';
import { useBoard } from '@/stores';

export interface Props {
  column: Column;
}

const props = defineProps<Props>();
const board = useBoard();
const router = useRouter();
const inputRef = ref<HTMLInputElement | null>(null);

const onTaskClick = (id: string) => {
  router.push({ name: 'task', params: { id } });
};

const { value, errors, setValue } = useField<string>(
  'name',
  yup.string().required().min(3).label('Name')
);

const onAddTask = async () => {
  if (errors.value.length === 0) {
    console.log('valid');
    board.createTask(props.column, value.value);
    setValue('');
    inputRef.value?.blur();
  }
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
