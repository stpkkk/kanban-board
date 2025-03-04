import { TaskProvider } from './context/TaskContext';
import KanbanBoard from './components/KanbanBoard';

export function App() {
  return (
    <TaskProvider>
      <KanbanBoard />
    </TaskProvider>
  );
}
