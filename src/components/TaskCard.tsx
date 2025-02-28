import { Task } from '../types/task';
import edit from '../assets/icons/edit.svg';
import trash from '../assets/icons/trash.svg';
import { DropDownMenu } from './DropDownMenu';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { id, content } = task;

  return (
    <div className="border-gray mb-2 flex justify-between rounded-lg border bg-white text-start hover:shadow-lg">
      <p className="overflow-hidden p-2">{content}</p>

      <DropDownMenu>
        <DropDownMenu.Toggle id={id} />

        <DropDownMenu.List id={id}>
          <DropDownMenu.ListItem icon={edit} onClick={() => {}}>
            Редактировать
          </DropDownMenu.ListItem>

          <DropDownMenu.ListItem icon={trash}>
            <span>Удалить</span>
          </DropDownMenu.ListItem>
        </DropDownMenu.List>
      </DropDownMenu>
    </div>
  );
}
