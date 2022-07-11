<template>
  <div class="board">
    <div class="board-list">
      <ColumnItem
        v-for="column of board.columns"
        :key="column.id"
        :column="column"
      />
      <div class="column">
        <input
          v-model="value"
          type="text"
          placeholder="Add New Column"
          class="w-full p-2"
          @keypress.enter="onAddColumn"
        />
      </div>
    </div>
    <RouterView />
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
import { useField } from 'vee-validate';
import * as yup from 'yup';
import { useBoard } from '@/stores';

import ColumnItem from '@/components/ColumnItem.vue';

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
</script>

<style lang="css">
.board {
  @apply p-4 bg-teal-900 h-full overflow-auto;
}

.board-list {
  @apply flex flex-row items-start;
}
</style>
