import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { Column } from './Column';
import { ColumnType } from '../types/column';

const initialColumns: ColumnType[] = [
  { id: 'approval', title: 'На согласовании', color: 'pink' },
  { id: 'new', title: 'Новые', color: 'blue' },
  { id: 'inProgress', title: 'В процессе', color: 'yellow' },
  { id: 'done', title: 'Готово', color: 'green' },
  { id: 'revision', title: 'Доработать', color: 'red' },
];

export default function KanbanBoard() {
  function onDragEnd() {}

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {initialColumns.map((column) => (
          <Droppable key={column.id} droppableId={column.id}>
            {(provided) => <Column column={column} provided={provided} />}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
