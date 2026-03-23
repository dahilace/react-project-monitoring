import { formatDate } from '@/shared/lib/FormatDate';
import type { ITask } from '../types';

type Props = {
  task: ITask;
};

const tagStyles = `px-2 py-1 rounded`;

export const TaskItem = ({ task }: Props) => {
  return (
    <div
      className={`border p-4 rounded shadow flex flex-col gap-1 bg-gray-100`}
    >
      <div className="flex justify-between gap-2">
        <h2 className="font-semibold">{task.title}</h2>
        <span className="text-sm">id:{task.id}</span>
      </div>

      <p className="text-sm text-gray-600">{task.description}</p>

      <div className="flex justify-between items-center gap-2 text-sm mt-2">
        <div className="flex gap-2">
          <span
            className={
              tagStyles +
              ` ${task.status === 'started' ? 'bg-red-200' : ''} + ${task.status === 'ended' ? 'bg-green-200' : ''} + ${task.status === 'appointed' ? 'bg-yellow-200' : ''} + ${task.status === 'declined' ? 'bg-gray-200' : ''}`
            }
          >
            {task.status}
          </span>
          <span
            className={
              tagStyles +
              ` ${task.priority === 'high' ? 'bg-red-200' : ''} + ${task.priority === 'low' ? 'bg-green-200' : ''} + ${task.priority === 'standart' ? 'bg-yellow-200' : ''}`
            }
          >
            {task.priority}
          </span>
        </div>

        <span>Создана: {formatDate(task.dateOfCreation)}</span>
      </div>
    </div>
  );
};
