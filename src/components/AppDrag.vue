<template>
  <slot draggable="true" @dragover.prevent @dragstart.self="onDragStart" />
</template>

<script lang="ts" setup>
import type { DropPayload } from '@/types';

export interface Props {
  dataTransfer: DropPayload;
}

const props = defineProps<Props>();

const onDragStart = (evt: DragEvent) => {
  const { dataTransfer } = evt;

  if (!dataTransfer) {
    return;
  }

  const payload = JSON.stringify(props.dataTransfer);

  dataTransfer.setData('payload', payload);
};
</script>
