import { createContext, useContext } from 'react';

interface TaskContextType {
  onAddTask: (columnId: string, content: string) => void;
  onDeleteTask: (columnId: string, taskId: string, content: string) => void;
  onUpdateTask: (columnId: string, taskId: string, content: string) => void;
}

const TaskContext = createContext<TaskContextType | null>(null);

function TaskProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: TaskContextType;
}) {
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

function useTaskContext(): TaskContextType {
  const context = useContext(TaskContext);

  if (context === null) {
    throw new Error('useTaskContext must be used within a ThemeProvider');
  }

  return context;
}

export { TaskProvider, useTaskContext };
