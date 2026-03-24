import { formatDate } from '@/shared/lib/FormatDate';
import { isDateMoreThenNow } from '@/shared/lib/isDateMoreThanNow';
import type { ITask } from '../model/task.types';
import { AppButton } from '@/shared/ui/AppButton';

type Props = {
  task: ITask;
  onEdit?: (task: ITask) => void;
};

const tagStyles = `px-2 py-1 rounded`;

export const TaskItem = ({ task, onEdit }: Props) => {
  return (
    <div
      className={`border p-4 rounded shadow flex flex-col gap-1 bg-gray-100`}
    >
      <div className="flex justify-between gap-2">
        <div
          className={`flex items-center gap-2 ${task.status === 'ended' ? 'text-green-500' : isDateMoreThenNow(task.dateOfEnd) ? 'text-red-500' : 'text-gray-500'}`}
        >
          <h2 className="font-semibold">{task.title}</h2>|
          <span>
            Дата окончания:{' '}
            {task.dateOfEnd ? formatDate(task.dateOfEnd, 'ui') : 'Не назначена'}
          </span>
        </div>
        <AppButton onClick={() => onEdit?.(task)}>Изменить</AppButton>
      </div>

      <p className="text-sm text-gray-600 line-clamp-1">{task.description}</p>

      <div className="flex justify-between items-center gap-2 text-sm mt-2">
        <div className="flex gap-2">
          <span
            className={
              tagStyles +
              ` ${task.status === 'started' ? 'bg-red-200' : ''} ${task.status === 'ended' ? 'bg-green-200' : ''} ${task.status === 'appointed' ? 'bg-yellow-200' : ''}  ${task.status === 'declined' ? 'bg-gray-200' : ''}`
            }
          >
            {task.status}
          </span>
          <span
            className={
              tagStyles +
              ` ${task.priority === 'high' ? 'bg-red-200' : ''} ${task.priority === 'low' ? 'bg-green-200' : ''} ${task.priority === 'standart' ? 'bg-yellow-200' : ''}`
            }
          >
            {task.priority}
          </span>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-sm ">id:{task.id}</span>
          <span>
            Создана: {formatDate(task.dateOfCreation, 'ui')} | {task.creatorId}
          </span>

          <span>Ответственный: {task.responsibleId}</span>
        </div>
      </div>
    </div>
  );
};
