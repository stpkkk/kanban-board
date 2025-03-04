import { ColumnType } from '../types/column';

export const initialColumns: ColumnType[] = [
  { id: 'approval', title: 'На согласовании', color: 'pink' },
  { id: 'new', title: 'Новые', color: 'blue' },
  { id: 'inProgress', title: 'В процессе', color: 'yellow' },
  { id: 'done', title: 'Готово', color: 'green' },
  { id: 'revision', title: 'Доработать', color: 'red' },
];
