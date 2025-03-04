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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    if (!content.trim()) return;

    if (taskId) {
      onUpdateTask(columnId, taskId, content.trim());
    } else {
      onAddTask(columnId, content.trim());
    }

    setContent('');
    onAdd();
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      onCancel();
    }
  };

  //Handle focus
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
      // Place cursor at the end of the text
      const length = ref.current.value.length;
      ref.current.setSelectionRange(length, length);
    }
  }, []);

  //Handle height of textarea
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [content]);

  return (
    <div className="relative">
      <textarea
        value={content}
        ref={ref}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Введите текст..."
        className="text-secondary focus:border-border-blue custom-scroll min-h-[52px] w-full rounded-lg border bg-white p-2 pr-6 pb-4 break-words outline-0 focus:border"
        style={{
          lineHeight: '1.5em',
          overflow: 'hidden',
          resize: 'none',
        }}
      />

      <div className="absolute top-0 right-0 z-50 flex flex-col p-1">
        <button onClick={onCancel} className="text-red-dark">
          <CloseIcon color="currentColor" size={20} />
        </button>

        <button onClick={handleSubmit}>
          <img
            src={check}
            alt={taskId ? 'Редактировать' : 'Добавить'}
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
}
