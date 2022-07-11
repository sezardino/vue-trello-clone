<template>
  <div class="board">
    <div class="board-list">
      <AppDrag
        v-for="column of board.columns"
        :key="column.id"
        :data-transfer="{
          type: DragType.COLUMN,
          columnId: column.id,
        }"
        #default="dragProps"
      >
        <AppDrop
          #default="dropProps"
          @app-drop="dropHandler($event, column.id)"
        >
          <BoardColumn
            :name="column.name"
            v-bind="{ ...dragProps, ...dropProps }"
          >
            <ul>
              <AppDrag
                v-for="task of column.tasks"
                :key="task.id"
                :data-transfer="{
                  type: DragType.TASK,
                  fromColumnId: column.id,
                  taskId: task.id,
                }"
                #default="dragProps"
              >
                <AppDrop
                  #default="dropProps"
                  @app-drop="dropHandler($event, column.id, task.id)"
                >
                  <li v-bind="{ ...dragProps, ...dropProps }">
                    <BoardTask :task="task" />
                  </li>
                </AppDrop>
              </AppDrag>
            </ul>
            <input
              type="text"
              placeholder="+ Add a task"
              class="bg-transparent text-red-50 placeholder:text-red-50 outline-none mt-2"
              @keyup.enter="onAddTask($event, column.id)"
            />
          </BoardColumn>
        </AppDrop>
      </AppDrag>
      <BoardColumn>
        <input
          v-model="value"
          type="text"
          placeholder="Add New Column"
          class="w-full p-2"
          @keypress.enter="onAddColumn"
        />
      </BoardColumn>
    </div>
    <RouterView />
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
import { useField } from 'vee-validate';
import * as yup from 'yup';
import { useBoard } from '@/stores';

import BoardColumn from '@/components/BoardColumn.vue';
import BoardTask from '@/components/BoardTask.vue';
import AppDrop from '@/components/AppDrop.vue';
import AppDrag from '@/components/AppDrag.vue';
import { DragType, type DropPayload } from '@/types';

const board = useBoard();

const { value, errors, setValue } = useField<string>(
  'columnName',
  yup.string().min(3).required(),
  { initialValue: '' }
);

const onAddColumn = async () => {
  if (errors.value.length !== 0 || value.value.trim().length === 0) {
    return;
  }

  board.createColumn(value.value);
  setValue('');
};

const onAddTask = async (evt: Event, columnId: string) => {
  const target = evt.target as HTMLInputElement;
  const value = target.value;

  if (value.trim().length < 3) {
    return;
  }

  board.createTask(columnId, value);
  target.value = '';
};

const dropHandler = (
  payload: DropPayload,
  toColumnId: string,
  toTaskId?: string
) => {
  const { type } = payload;

  if (type === DragType.COLUMN) {
    board.moveColumn(payload.columnId, toColumnId);

    return;
  }

  if (type === DragType.TASK) {
    board.moveTask(payload.fromColumnId, toColumnId, payload.taskId, toTaskId);
    console.log('task');

    return;
  }
};
</script>

<style lang="css">
.board {
  @apply p-4 bg-teal-900 h-full overflow-auto;
}

.board-list {
  @apply flex flex-row items-start;
}
</style>
