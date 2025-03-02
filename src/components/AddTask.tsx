import { useState } from 'react';
import x from '../assets/icons/x.svg';
import check from '../assets/icons/check.svg';
import { useTaskContext } from '../context/TaskContext';

interface AddTaskProps {
  initialContent?: string;
  onCancel: () => void;
  onAdd: () => void;
  columnId: string;
}

export function AddTask({
  initialContent = '',
  onCancel,
  onAdd,
  columnId,
}: AddTaskProps) {
  const [content, setContent] = useState(initialContent);
  const { onAddTask } = useTaskContext();

  const handleSubmit = () => {
    if (!content.trim()) return;

    onAddTask(columnId, content);

    setContent('');
    onAdd();
  };

  return (
    <div className="relative bg-white">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Введите текст..."
        className="text-secondary focus:border-border-blue custom-scroll min-h-[52px] w-full rounded-lg border p-2 pr-6 outline-0 focus:border"
      />
      <div className="absolute top-0 right-0 z-50 flex flex-col p-1">
        <button onClick={onCancel} className="cursor-pointer">
          <img src={x} alt="Отменить" width={20} height={20} />
        </button>
        <button onClick={handleSubmit} className="cursor-pointer">
          <img src={check} alt="Добавить" width={20} height={20} />
        </button>
      </div>
    </div>
  );
}
