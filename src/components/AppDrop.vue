<template>
  <slot @dragover.prevent @drop.stop="onDrop" />
</template>

<script lang="ts" setup>
import type { DropPayload } from '@/types';

const emit = defineEmits<{
  (e: 'app-drop', payload: DropPayload): void;
}>();

const onDrop = (evt: DragEvent) => {
  const { dataTransfer } = evt;
  if (!dataTransfer) {
    return;
  }

  const payload = JSON.parse(dataTransfer.getData('payload'));

  emit('app-drop', payload);
};
</script>
