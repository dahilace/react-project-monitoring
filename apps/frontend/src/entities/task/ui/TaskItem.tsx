import { formatDate } from '@/shared/lib/FormatDate';
import { isDateMoreThenNow } from '@/shared/lib/isDateMoreThanNow';
import { taskTagTranslation, taskTagsStyling } from '../model/task.config';
import { AppTag } from '@/shared/ui/AppTag';

import type { ITask } from '../model/task.types';

type Props = {
  task: ITask;
  onEdit?: (task: ITask) => void;
  li?: boolean;
};

export const TaskItem = ({ task, onEdit, li }: Props) => {
  const Component = li ? 'li' : 'div';
  return (
    <Component
      onClick={() => {
        if (!window.getSelection()?.toString()) onEdit?.(task);
      }}
      className={`border p-4 rounded shadow flex flex-col gap-1 bg-gray-100 hover:bg-amber-100 cursor-pointer`}
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
      </div>

      <p className="text-sm text-gray-600 line-clamp-1">{task.description}</p>

      <div className="flex justify-between items-center gap-2 text-sm mt-2">
        <div className="flex mt-auto gap-2">
          <AppTag variant={taskTagsStyling[task.status]}>
            {taskTagTranslation[task.status]}
          </AppTag>
          <AppTag variant={taskTagsStyling[task.priority]}>
            {taskTagTranslation[task.priority]}
          </AppTag>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-sm ">id:{task.id}</span>
          <span>
            Создана: {formatDate(task.dateOfCreation, 'ui')} | {task.creatorId}
          </span>

          <AppTag>Ответственный: {task.responsibleId}</AppTag>
        </div>
      </div>
    </Component>
  );
};
