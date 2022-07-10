<template>
  <div class="bg" @click.self="router.push({ name: 'board' })">
    <div v-if="task" class="task-view">
      <div class="task-header">
        {{ task.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useBoard } from '@/stores';
import { useRoute, useRouter } from 'vue-router';

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
</script>

<style scoped>
.bg {
  @apply absolute top-0 left-0 right-0 bottom-0;
  background: rgba(0, 0, 0, 0.5);
}

.task-view {
  @apply relative flex flex-row bg-white m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}

.task-header {
  @apply flex flex-col flex-grow items-start justify-between px-4;
}
</style>
