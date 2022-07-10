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
