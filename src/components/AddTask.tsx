import { useEffect, useRef, useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import check from '../assets/icons/check.svg';
import CloseIcon from './CloseIcon';

interface AddTaskProps {
  initialContent?: string;
  onCancel: () => void;
  onAdd: () => void;
  columnId: string;
  taskId?: string;
}

export function AddTask({
  initialContent = '',
  onCancel,
  onAdd,
  columnId,
  taskId,
}: AddTaskProps) {
  const [content, setContent] = useState(initialContent);
  const { onAddTask, onUpdateTask } = useTaskContext();
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (!content.trim()) return;

    if (taskId) {
      onUpdateTask(columnId, taskId, content);
    } else {
      onAddTask(columnId, content);
    }

    setContent('');
    onAdd();
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <div className="relative bg-white">
      <textarea
        value={content}
        ref={ref}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Введите текст..."
        className="text-secondary focus:border-border-blue custom-scroll min-h-[52px] w-full rounded-lg border p-2 pr-6 outline-0 focus:border"
      />
      <div className="absolute top-0 right-0 z-50 flex flex-col p-1">
        <button onClick={onCancel} className="text-red-dark">
          <CloseIcon color="currentColor" size={20} />
        </button>
        <button onClick={handleSubmit}>
          <img
            src={check}
            alt={taskId ? 'Сохранить' : 'Добавить'}
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
}
