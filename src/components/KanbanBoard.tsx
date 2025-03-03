import { useState } from 'react';
import { DragDropContext, Droppable, type DropResult } from '@hello-pangea/dnd';
import { ToastContainer, toast } from 'react-toastify';
import { TaskProvider } from '../context/TaskContext';
import { Column } from './Column';
import { ColumnType } from '../types/column';
import { Task } from '../types/task';
import Toast from './Toast';

const initialColumns: ColumnType[] = [
  { id: 'approval', title: 'На согласовании', color: 'pink' },
  { id: 'new', title: 'Новые', color: 'blue' },
  { id: 'inProgress', title: 'В процессе', color: 'yellow' },
  { id: 'done', title: 'Готово', color: 'green' },
  { id: 'revision', title: 'Доработать', color: 'red' },
];

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({
    approval: [],
    new: [],
    inProgress: [],
    done: [],
    revision: [],
  });

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceColumn = initialColumns.find(
      (col) => col.id === source.droppableId,
    );
    const destColumn = initialColumns.find(
      (col) => col.id === destination.droppableId,
    );

    if (!sourceColumn || !destColumn) return;

    const newTasks = { ...tasks };

    const [movedTask] = newTasks[source.droppableId].splice(source.index, 1);

    newTasks[destination.droppableId].splice(destination.index, 0, movedTask);

    setTasks(newTasks);

    if (source.droppableId !== destination.droppableId) {
      toast.success(
        <Toast
          title={`Задача перенесена в «${destColumn.title}»`}
          content={movedTask.content}
        />,
      );
    }
  };

  const handleAddTask = (columnId: string, content: string) => {
    const column = initialColumns.find((col) => col.id === columnId);
    if (!column) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      content,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => ({
      ...prev,
      [columnId]: [...prev[columnId], newTask],
    }));

    toast.success(
      <Toast
        title={`Задача создана в «${column.title}»`}
        content={newTask.content}
      />,
    );
  };

  const handleDeleteTask = (
    columnId: string,
    taskId: string,
    content: string,
  ) => {
    setTasks((prev) => ({
      ...prev,
      [columnId]: prev[columnId].filter((task) => task.id !== taskId),
    }));

    toast.success(<Toast title="Задача удалена" content={content} />);
  };

  const handleUpdateTask = (
    columnId: string,
    taskId: string,
    content: string,
  ) => {
    const originalTask = tasks[columnId].find((task) => task.id === taskId);

    if (!originalTask) return;

    const updatedTask = { ...originalTask, content };

    setTasks((prev) => ({
      ...prev,
      [columnId]: prev[columnId].map((task) =>
        task.id === taskId ? updatedTask : task,
      ),
    }));

    toast.success(
      <Toast
        title={`Задача с ${originalTask.content} изменена на`}
        content={updatedTask.content}
      />,
    );
  };
  return (
    <TaskProvider
      value={{
        onAddTask: handleAddTask,
        onDeleteTask: handleDeleteTask,
        onUpdateTask: handleUpdateTask,
      }}
    >
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
    </TaskProvider>
  );
}
