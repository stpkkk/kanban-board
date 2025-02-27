import { useState } from 'react';
import clsx from 'clsx';
import { DroppableProvided } from '@hello-pangea/dnd';
import plus from '../assets/icons/plus.svg';
import { ColumnType } from '../types/column';
import { Task } from '../types/task';
import { AddTask } from './AddTask';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  provided: DroppableProvided;
}

export function Column({ column, tasks }: ColumnProps) {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="bg-column-bg border-border-gray flex min-h-[596px] flex-col rounded-lg border text-center">
      <h2
        className={clsx('rounded-t-lg py-[7px] font-semibold', {
          'bg-pink hover:bg-pink-dark': column.color === 'pink',
          'bg-blue hover:bg-blue-dark': column.color === 'blue',
          'bg-yellow hover:bg-yellow-dark': column.color === 'yellow',
          'bg-green hover:bg-green-dark': column.color === 'green',
          'bg-red hover:bg-red-dark': column.color === 'red',
        })}
      >
        {column.title}
      </h2>

      <div className="custom-scroll mr-[3.6px] h-full overflow-y-auto p-2">
        {isAdding ? (
          <AddTask
            onCancel={() => setIsAdding(false)}
            onAdd={() => setIsAdding(false)}
            columnId={column.id}
          />
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="text-border-blue flex cursor-pointer items-center justify-start gap-1"
          >
            <img
              className="cursor-pointer"
              src={plus}
              alt="Добавить"
              width={20}
              height={20}
            />
            <span>Добавить</span>
          </button>
        )}
        <div className="mt-4 h-[564px] p-4">
          {tasks.map((task) => (
            <p key={task.id} className="mb-2">
              <span>{task.content}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
