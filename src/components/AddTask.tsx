import { useState } from 'react';
import x from '../assets/icons/x.svg';
import check from '../assets/icons/check.svg';

interface AddTaskProps {
  initialContent?: string;
  onCancel: () => void;
  onAdd: () => void;
}

export function AddTask({
  initialContent = '',
  onCancel,
  onAdd,
}: AddTaskProps) {
  const [content, setContent] = useState(initialContent);

  const handleSubmit = () => {
    if (!content.trim()) return;

    setContent('');
    onAdd();
  };

  return (
    <div className="relative bg-white">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Введите текст..."
        className="text-secondary focus:border-border-blue min-h-[52px] w-full rounded-lg border p-2 outline-0 focus:border"
      />
      <div className="absolute top-0 right-0 flex flex-col p-1">
        <button onClick={onCancel} className="cursor-pointer">
          <img src={x} alt="Отменить" width={20} height={20} />
        </button>
        <button onClick={handleSubmit} className="cursor-pointer">
          <img src={check} alt="Сохранить" width={20} height={20} />
        </button>
      </div>
    </div>
  );
}
