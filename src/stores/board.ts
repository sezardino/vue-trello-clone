import { defineStore } from 'pinia';
import { defaultBoard } from '@/db';
import type { Column, Task } from '@/types';
import { uuid } from '@/utils';

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
  actions: {
    updateTask(task: Task, key: keyof Task, value: string) {
      task[key] = value;
    },
    createTask(column: Column, name: string) {
      const newTask: Task = {
        name,
        id: uuid(),
        description: '',
        userAssigned: null,
      };

      column.tasks.push(newTask);
    },
  },
});
