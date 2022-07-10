import { uuid } from './utils';

export const defaultBoard = {
  columns: [
    {
      id: 'todo',
      name: 'todo',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuid(),
          userAssigned: null,
        },
        {
          description: '',
          name: 'second task',
          id: uuid(),
          userAssigned: null,
        },
        {
          description: '',
          name: 'and thrid',
          id: uuid(),
          userAssigned: null,
        },
      ],
    },
    {
      id: 'in-progress',
      name: 'in-progress',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuid(),
          userAssigned: null,
        },
      ],
    },
    {
      id: 'done',
      name: 'done',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuid(),
          userAssigned: null,
        },
      ],
    },
  ],
};
