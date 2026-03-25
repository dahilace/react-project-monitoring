import { useState, useEffect } from 'react';
import { AppInput } from '@/shared/ui/AppInput';
import { AppButton } from '@/shared/ui/AppButton';
import { AppSelect } from '@/shared/ui/AppSelect';
import type {
  TaskPriority,
  TaskStatus,
} from '@/entities/task/model/task.types';
import { taskPriorityOptions } from '../config/task.config';
import { taskStatusOptions } from '../config/task.config';
import { formatDate } from '@/shared/lib/FormatDate';
import { taskApi } from '../api/task.api';

import type { IUser, UserRole } from '@/entities/user/model/user.types';
import type { ITask } from '@/entities/task/model/task.types';

type Props = {
  mode: 'create' | 'edit';
  initialData?: ITask;
  onSuccess?: () => void;
  onClose?: () => void;
  user: {
    name: string;
    login: string;
    role: UserRole;
    id: number;
    workers: IUser[];
  } | null;
};

export const TaskForm = ({
  mode,
  initialData,
  onSuccess,
  onClose,
  user,
}: Props) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [priority, setPriority] = useState<TaskPriority>('standart');
  const [status, setStatus] = useState<TaskStatus>('appointed');
  const [responsibleId, setResponsibleId] = useState<number | null>(
    user?.role ? user.id : null,
  );
  const [dateOfEnd, setDateOfEnd] = useState<string | null>('');
  const [creatorId, setCreatorId] = useState<number | null>(null);

  if (!user) return;

  useEffect(() => {
    if (!initialData) return;
    setTitle(initialData.title);
    setDescription(initialData.description);
    setStatus(initialData.status);
    setPriority(initialData.priority);
    setResponsibleId(initialData.responsibleId || user.id);
    setDateOfEnd(
      initialData.dateOfEnd !== null ? formatDate(initialData.dateOfEnd) : '',
    );
    setCreatorId(initialData.creatorId);
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await taskApi(
      mode,
      title.trim(),
      description.trim(),
      priority,
      status,
      responsibleId,
      dateOfEnd,
      user,
      initialData,
    );

    onSuccess?.();
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <p className="text-lg font-semibold">
        {mode === 'create' ? 'Создать задачу' : 'Изменить задачу'}
      </p>

      <AppInput
        disabled={
          mode === 'edit' && user.role === 'worker' && user.id !== creatorId
        }
        placeholder="Заголовок..."
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      >
        Заголовок задачи
      </AppInput>

      <AppInput
        disabled={
          mode === 'edit' && user.role === 'worker' && user.id !== creatorId
        }
        required
        placeholder="Описание..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      >
        Описание задачи
      </AppInput>

      <AppSelect
        disabled={
          mode === 'edit' && user.role === 'worker' && user.id !== creatorId
        }
        label="Приоритет задачи"
        value={priority}
        onChange={(e) => setPriority(e.target.value as TaskPriority)}
        options={taskPriorityOptions}
      />

      <AppSelect
        label="Статус задачи"
        value={status}
        onChange={(e) => setStatus(e.target.value as TaskStatus)}
        options={taskStatusOptions}
      />

      <AppInput
        disabled={
          mode === 'edit' && user.role === 'worker' && user.id !== creatorId
        }
        placeholder="Выберите дату"
        type="date"
        value={dateOfEnd ?? ''}
        onChange={(e) => setDateOfEnd(e.target.value)}
      >
        Дата окончания
      </AppInput>

      {user?.role === 'manager' && user.workers?.length && (
        <AppSelect
          label="Ответственный"
          value={responsibleId || user.id}
          onChange={(e) => setResponsibleId(Number(e.target.value))}
          options={[user]
            .concat(user.workers ?? [])
            .map((el) =>
              Object.assign({ value: el.id.toString() }, { label: el.name }),
            )}
        />
      )}

      {user?.role === 'worker' && (
        <p className="text-sm text-gray-500">Ответственный: {user.name} (Вы)</p>
      )}

      <AppButton type="submit">
        {mode === 'create' ? 'Создать' : 'Обновить'}
      </AppButton>
    </form>
  );
};
