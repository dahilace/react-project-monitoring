import { formatDate } from '@/shared/lib/FormatDate';
import type { ITask } from '../types';

type Props = {
  task: ITask;
};

export const TaskItem = ({ task }: Props) => {
  return (
    <div className="border p-4 rounded shadow flex flex-col gap-1">
      <div className="flex justify-between gap-2">
        <h2 className="font-semibold">{task.title}</h2>
        <span className="text-sm">id:{task.id}</span>
      </div>

      <p className="text-sm text-gray-600">{task.description}</p>

      <div className="flex justify-between items-center gap-2 text-sm mt-2">
        <div className="flex gap-2">
          <span className="px-2 py-1 bg-gray-200 rounded">{task.status}</span>
          <span className="px-2 py-1 bg-gray-100 rounded">{task.priority}</span>
        </div>

        <span>Создана: {formatDate(task.dateOfCreation)}</span>
      </div>
    </div>
  );
};
