<template>
  <div class="board">
    <div class="board-list">
      <ColumnItem
        v-for="column of board.columns"
        :key="column.id"
        :column="column"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useBoard } from '@/stores';

import ColumnItem from '@/components/ColumnItem.vue';

const board = useBoard();
</script>

<style lang="css">
.board {
  @apply p-4 bg-teal-900 h-full overflow-auto;
}

.board-list {
  @apply flex flex-row items-start;
}
</style>
