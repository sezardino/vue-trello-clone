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
    getColumnById: (state: RootState) => (id: string) =>
      state.columns.find((column) => column.id === id),
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
    moveTask(fromColumnId: string, toColumnId: string, taskId: string) {
      const fromColumn = this.getColumnById(fromColumnId);
      const toColumn = this.getColumnById(toColumnId);

      if (!fromColumn || !toColumn) {
        return;
      }

      const taskIndex = fromColumn.tasks.findIndex(
        (task) => task.id === taskId
      );
      const taskToMove = fromColumn.tasks.splice(taskIndex, 1)[0];

      toColumn.tasks.push(taskToMove);
    },
  },
});
