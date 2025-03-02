import { useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
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

  function onDragEnd() {}

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
                  provided={provided}
                  tasks={tasks[column.id]}
                />
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </TaskProvider>
  );
}
