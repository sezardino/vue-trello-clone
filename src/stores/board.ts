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
    createTask(columnId: string, name: string) {
      const newTask: Task = {
        name,
        id: uuid(),
        description: '',
        userAssigned: null,
      };

      const neededColumn = this.columns.find(
        (column) => column.id === columnId
      );

      if (!neededColumn) {
        return;
      }

      neededColumn.tasks.push(newTask);
    },
    createColumn(name: string) {
      const newColumn: Column = {
        name,
        id: uuid(),
        tasks: [],
      };

      this.columns.push(newColumn);
    },
    updateTask(task: Task, key: keyof Task, value: string) {
      task[key] = value;
    },
    moveTask(
      fromColumnId: string,
      toColumnId: string,
      taskId: string,
      toTaskId?: string
    ) {
      const fromColumn = this.getColumnById(fromColumnId);
      const toColumn = this.getColumnById(toColumnId);

      if (!fromColumn || !toColumn) {
        return;
      }

      const taskIndex = fromColumn.tasks.findIndex(
        (task) => task.id === taskId
      );
      const toTaskIndex = toColumn.tasks.findIndex(
        (task) => task.id === toTaskId
      );

      const taskToMove = fromColumn.tasks.splice(taskIndex, 1)[0];

      if (toTaskIndex !== -1) {
        toColumn.tasks.splice(toTaskIndex, 0, taskToMove);
        return;
      }

      toColumn.tasks.push(taskToMove);
    },
    moveColumn(columnId: string, toColumnId: string) {
      const toColumnIndex = this.columns.findIndex(
        (column) => column.id === toColumnId
      );
      const columnIndex = this.columns.findIndex(
        (column) => column.id === columnId
      );

      if (columnIndex === -1 || toColumnIndex === -1) {
        return;
      }

      this.columns.splice(
        toColumnIndex,
        0,
        this.columns.splice(columnIndex, 1)[0]
      );
    },
  },
});
