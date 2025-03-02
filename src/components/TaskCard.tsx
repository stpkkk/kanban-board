import { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import edit from '../assets/icons/edit.svg';
import trash from '../assets/icons/trash.svg';
import { DropDownMenu } from './DropDownMenu';
import Modal from './Modal';
import ConfirmDelete from './ConfirmDelete';
import { AddTask } from './AddTask';
import { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
  columnId: string;
}

export default function TaskCard({ task, columnId }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { onDeleteTask } = useTaskContext();
  const { id: taskId, content } = task;

  if (isEditing) {
    return (
      <div>
        <AddTask
          columnId={columnId}
          initialContent={task.content}
          taskId={task.id}
          onCancel={() => setIsEditing(false)}
          onAdd={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="border-gray mb-2 flex justify-between rounded-lg border bg-white text-start hover:shadow-lg">
      <p className="overflow-hidden p-2">{content}</p>

      <Modal>
        <DropDownMenu>
          <DropDownMenu.Toggle id={taskId} />

          <DropDownMenu.List id={taskId}>
            <DropDownMenu.ListItem
              icon={edit}
              onClick={() => setIsEditing(true)}
            >
              Редактировать
            </DropDownMenu.ListItem>

            <Modal.Open opens="delete">
              {(openModal) => (
                <DropDownMenu.ListItem icon={trash} onClick={openModal}>
                  <span>Удалить</span>
                </DropDownMenu.ListItem>
              )}
            </Modal.Open>
          </DropDownMenu.List>
        </DropDownMenu>

        <Modal.Window name="delete">
          {(closeModal) => (
            <ConfirmDelete
              content={content}
              onConfirm={() => onDeleteTask(columnId, taskId, content)}
              onCloseModal={closeModal}
            />
          )}
        </Modal.Window>
      </Modal>
    </div>
  );
}
