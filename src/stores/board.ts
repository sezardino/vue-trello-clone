import { defineStore } from 'pinia';
import { defaultBoard } from '@/db';
import type { Column, Task } from '@/types';

interface RootState {
  columns: Column[];
}

export const useBoard = defineStore('board', {
  state: (): RootState => {
    const items = JSON.parse(localStorage.getItem('vue-trello-clone') || '{}');
    if (Object.keys(items).length > 0) {
      return items;
    }

    return defaultBoard;
  },
  actions: {},
  getters: {
    getTaskById:
      (state: RootState) =>
      (id: string): Task | undefined => {
        for (const column of state.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task;
            }
          }
        }
      },
  },
});
