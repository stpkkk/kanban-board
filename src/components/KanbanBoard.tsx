import { useState } from 'react';
import { DragDropContext, Droppable, type DropResult } from '@hello-pangea/dnd';
import { TaskProvider } from '../context/TaskContext';
import { Column } from './Column';
import { ColumnType } from '../types/column';
import { Task } from '../types/task';

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

    // If there's no destination, we don't need to do anything
    if (!destination) return;

    // If the source and destination are the same, we don't need to update anything
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

    alert(`Задача ${content} удалена!`);
  };

  const handleUpdateTask = (
    columnId: string,
    taskId: string,
    content: string,
  ) => {
    setTasks((prev) => ({
      ...prev,
      [columnId]: prev[columnId].map((task) =>
        task.id === taskId ? { ...task, content } : task,
      ),
    }));
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
    </TaskProvider>
  );
}
