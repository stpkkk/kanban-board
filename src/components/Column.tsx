import { useState } from 'react';
import clsx from 'clsx';
import { Draggable, DroppableProvided } from '@hello-pangea/dnd';
import plus from '../assets/icons/plus.svg';
import { AddTask } from './AddTask';
import TaskCard from './TaskCard';
import { ColumnType } from '../types/column';
import { Task } from '../types/task';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  provided: DroppableProvided;
}

export function Column({ column, tasks, provided }: ColumnProps) {
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

      <div
        className="custom-scroll mr-[3.6px] h-[564px] overflow-y-auto p-2"
        ref={provided.innerRef}
        {...provided.droppableProps}
      >
        {tasks.map((task, index) => (
          <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided) => (
              <TaskCard task={task} columnId={column.id} provided={provided} />
            )}
          </Draggable>
        ))}
        {provided.placeholder}
        {isAdding ? (
          <AddTask
            onCancel={() => setIsAdding(false)}
            onAdd={() => setIsAdding(false)}
            columnId={column.id}
          />
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="text-border-blue flex items-center justify-start gap-1"
          >
            <img src={plus} alt="Добавить" width={20} height={20} />
            <span>Добавить</span>
          </button>
        )}
      </div>
    </div>
  );
}
