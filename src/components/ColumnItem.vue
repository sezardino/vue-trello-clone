<template>
  <div class="column" @dragover.prevent @drop="onDrop($event, column.id)">
    <div class="column-name">
      {{ column.name }}
    </div>
    <div>
      <ul>
        <li
          v-for="task of column.tasks"
          :key="task.id"
          draggable="true"
          @click.stop="onTaskClick(task.id)"
          @dragstart="onDragStart($event, task.id, column.id)"
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

const onDragStart = (evt: DragEvent, taskId: string, columnId: string) => {
  if (!evt.dataTransfer) {
    return;
  }

  evt.dataTransfer.setData('task-id', taskId);
  evt.dataTransfer.setData('from-column-id', columnId);
};

const onDrop = (evt: DragEvent, columnId: string) => {
  if (!evt.dataTransfer) {
    return;
  }

  const fromColumnId = evt.dataTransfer.getData('from-column-id');
  const taskId = evt.dataTransfer.getData('task-id');

  board.moveTask(fromColumnId, columnId, taskId);
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
