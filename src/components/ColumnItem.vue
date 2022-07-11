<template>
  <div
    class="column"
    @dragover.prevent
    draggable="true"
    @dragstart.self="onColumnDrag($event, column.id)"
    @drop="onDrop($event, column.id)"
  >
    <div class="column-name">
      {{ column.name }}
    </div>
    <div>
      <ul>
        <li
          v-for="task of column.tasks"
          :key="task.id"
          draggable="true"
          @dragover.prevent
          @click.stop="onTaskClick(task.id)"
          @drop.stop="onDrop($event, column.id)"
          @dragstart="onTaskDrag($event, task.id, column.id)"
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

const onTaskDrag = (evt: DragEvent, taskId: string, columnId: string) => {
  if (!evt.dataTransfer) {
    return;
  }

  evt.dataTransfer.setData('drag-event', 'task');
  evt.dataTransfer.setData('task-id', taskId);
  evt.dataTransfer.setData('from-column-id', columnId);
};

const onColumnDrag = (evt: DragEvent, columnId: string) => {
  if (!evt.dataTransfer) {
    return;
  }

  evt.dataTransfer.setData('drag-event', 'column');
  evt.dataTransfer.setData('column-id', columnId);
};

const columnDropHandler = (evt: DragEvent, toColumnId: string) => {
  if (!evt.dataTransfer) {
    return;
  }

  const columnId = evt.dataTransfer.getData('column-id');

  board.moveBoard(columnId, toColumnId);
};

const taskDropHandler = (evt: DragEvent, columnId: string) => {
  if (!evt.dataTransfer) {
    return;
  }

  const fromColumnId = evt.dataTransfer.getData('from-column-id');
  const taskId = evt.dataTransfer.getData('task-id');

  board.moveTask(fromColumnId, columnId, taskId);
};

const onDrop = (evt: DragEvent, columnId: string) => {
  if (!evt.dataTransfer) {
    return;
  }
  const eventType = evt.dataTransfer.getData('drag-event');

  if (eventType === 'column') {
    columnDropHandler(evt, columnId);

    return;
  }

  if (eventType === 'task') {
    taskDropHandler(evt, columnId);

    return;
  }
};
</script>

<style scoped>
.column-name {
  @apply flex items-center mb-2 font-bold;
}
</style>
