<template>
  <div class="bg" @click.self="router.push({ name: 'board' })">
    <div v-if="task" class="task-view">
      <div class="task-header">
        <div>
          <input
            type="text"
            v-model="name.value.value"
            class="text-xl p-2 outline-none"
            @change="onChange('name', name.value.value)"
          />
        </div>
      </div>
      <div>
        <div class="mt-2"></div>
          <textarea
            v-model="description.value.value"
            class="w-full resize-none p-2 outline-none h-20"
            placeholder="Add description"
            @blur="onChange('description', description.value.value)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { useField, type FieldContext } from 'vee-validate';
import * as yup from 'yup';
import { useBoard } from '@/stores';
import type { Task } from '@/types';

const router = useRouter();
const route = useRoute();
const board = useBoard();

if (!route.params.id) {
  router.push({ name: 'notFound' });
}

const task = board.getTaskById(route.params.id as string);

if (!task) {
  router.push({ name: 'notFound' });
}

const name = useField<string>(
  'name',
  yup.string().required().min(3).not([task?.name]),
  { initialValue: task?.name || '' }
);
const description = useField<string>('description', undefined, {
  initialValue: task?.description || 'dawdawdaw',
});

const fields: Record<string, FieldContext<string>> = { name, description };

const onChange = async (key: string, value: string) => {
  if (fields[key].errors.value.length !== 0 || !task) {
    return;
  }
  board.updateTask(task, key as keyof Task, value);
};
</script>

<style scoped>
.bg {
  @apply absolute top-0 left-0 right-0 bottom-0;
  background: rgba(0, 0, 0, 0.5);
}

.task-view {
  @apply relative flex flex-col bg-white m-32 mx-auto p-4 text-left rounded shadow;
  max-width: 700px;
}

.task-header {
  @apply flex flex-col flex-grow items-start justify-between;
}
</style>
