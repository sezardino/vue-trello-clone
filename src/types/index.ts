export interface Task {
  description: string;
  name: string;
  id: string;
  userAssigned: null;
}

export interface Column {
  id: string;
  name: string;
  tasks: Task[];
}

export enum DragType {
  TASK = 'task',
  COLUMN = 'column',
}

export type ColumnDropPayload = {
  type: DragType.COLUMN;
  columnId: string;
};

export type TaskDropPayload = {
  type: DragType.TASK;
  fromColumnId: string;
  taskId: string;
};

export type DropPayload = ColumnDropPayload | TaskDropPayload;
