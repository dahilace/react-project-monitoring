import { useState, useEffect } from 'react';
import axios from 'axios';
import { AppInput } from '@/shared/ui/AppInput';
import { AppButton } from '@/shared/ui/AppButton';
import { AppSelect } from '@/shared/ui/AppSelect';
import type { TaskPriority, TaskStatus } from '@/entities/task/types';
import { taskPriorityOptions } from '../config/task.config';
import { taskStatusOptions } from '../config/task.config';
import type { ITask } from '@/entities/task/types';
import { formatDate } from '@/shared/lib/FormatDate';

type Props = {
  mode: 'create' | 'edit';
  initialData?: ITask;
  onSuccess?: () => void;
  onClose?: () => void;
  user: {
    name: string;
    login: string;
    role: string;
    id: number;
    workers: any[];
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
  const [responsibleId, setResponsibleId] = useState<number | null>(null);
  const [dateOfEnd, setDateOfEnd] = useState<string | null>('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setStatus(initialData.status);
      setPriority(initialData.priority);
      setResponsibleId(initialData.responsibleId);
      setDateOfEnd(
        initialData.dateOfEnd !== null ? formatDate(initialData.dateOfEnd) : '',
      );
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('dahilace-token');

    if (mode === 'create') {
      await axios.post(
        'http://localhost:3001/api/tasks',
        {
          title,
          description,
          priority,
          status,
          dateOfEnd: dateOfEnd ? new Date(dateOfEnd) : null,
          responsibleId: user?.role === 'worker' ? user.id : responsibleId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    }

    if (mode === 'edit' && initialData?.id) {
      await axios.patch(
        `http://localhost:3001/api/tasks/${initialData.id}`,
        {
          title,
          description,
          status,
          priority,
          dateOfEnd: dateOfEnd ? new Date(dateOfEnd) : null,
          responsibleId: user?.role === 'worker' ? user.id : responsibleId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    }

    onSuccess?.();
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold">
        {' '}
        {mode === 'create' ? 'Создать задачу' : 'Изменить задачу'}
      </h2>

      <AppInput
        placeholder="Заголовок..."
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      >
        Заголовок задачи
      </AppInput>

      <AppInput
        required
        placeholder="Описание..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      >
        Описание задачи
      </AppInput>

      <AppSelect
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
        placeholder="Выберите дату"
        type="date"
        value={dateOfEnd ?? ''}
        onChange={(e) => setDateOfEnd(e.target.value)}
      >
        Дата окончания
      </AppInput>

      {user?.role === 'manager' && (
        <AppSelect
          label="Ответственный"
          value={responsibleId || ''}
          onChange={(e) => setResponsibleId(Number(e.target.value))}
          options={user.workers.map((el) =>
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
