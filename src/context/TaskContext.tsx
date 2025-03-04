import { createContext, useContext, useState } from 'react';
import type { DropResult } from '@hello-pangea/dnd';
import { toast } from 'react-toastify';
import { initialColumns } from '../data/columns';
import Toast from '../components/Toast';
import type { Task } from '../types/task';

interface TaskContextType {
  onAddTask: (columnId: string, content: string) => void;
  onDeleteTask: (columnId: string, taskId: string, content: string) => void;
  onUpdateTask: (columnId: string, taskId: string, content: string) => void;
  onDragEnd: (result: DropResult) => void;
  tasks: { [key: string]: Task[] };
}

const TaskContext = createContext<TaskContextType | null>(null);

function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({
    approval: [],
    new: [],
    inProgress: [],
    done: [],
    revision: [],
  });

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

  const handleDragEnd = (result: DropResult) => {
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

  return (
    <TaskContext.Provider
      value={{
        onAddTask: handleAddTask,
        onDeleteTask: handleDeleteTask,
        onUpdateTask: handleUpdateTask,
        onDragEnd: handleDragEnd,
        tasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

function useTaskContext(): TaskContextType {
  const context = useContext(TaskContext);

  if (context === null) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }

  return context;
}

export { TaskProvider, useTaskContext };
