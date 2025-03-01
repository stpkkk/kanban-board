import { Task } from '../types/task';
import edit from '../assets/icons/edit.svg';
import trash from '../assets/icons/trash.svg';
import { DropDownMenu } from './DropDownMenu';
import Modal from './Modal';
import ConfirmDelete from './ConfirmDelete';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { id, content } = task;

  return (
    <div className="border-gray mb-2 flex justify-between rounded-lg border bg-white text-start hover:shadow-lg">
      <p className="overflow-hidden p-2">{content}</p>
      <Modal>
        <DropDownMenu>
          <DropDownMenu.Toggle id={id} />
          <DropDownMenu.List id={id}>
            <DropDownMenu.ListItem icon={edit} onClick={() => {}}>
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
              // disabled={isDeleting}
              // onConfirm={() => deleteTask(id)}
              onCloseModal={closeModal}
            />
          )}
        </Modal.Window>
      </Modal>
    </div>
  );
}
