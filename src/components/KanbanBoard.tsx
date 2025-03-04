import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { ToastContainer } from 'react-toastify';
import { useTaskContext } from '../context/TaskContext';
import { initialColumns } from '../data/columns';
import { Column } from './Column';

export default function KanbanBoard() {
  const { tasks, onDragEnd } = useTaskContext();

  return (
    <div className="mx-auto w-full max-w-[952px] px-4 py-12">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {initialColumns.map((column) => (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided) => (
                <Column
                  column={column}
                  tasks={tasks[column.id]}
                  provided={provided}
                />
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
