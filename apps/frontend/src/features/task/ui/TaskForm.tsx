import { useState } from 'react';
import axios from 'axios';
import { AppInput } from '@/shared/ui/AppInput';
import { AppButton } from '@/shared/ui/AppButton';
import { AppSelect } from '@/shared/ui/AppSelect';
import type { TaskPriority, TaskStatus } from '@/entities/task/types';
import { taskPriorityOptions } from '../config/task.config';
import { taskStatusOptions } from '../config/task.config';
import type { ITask } from '@/entities/task/types';
import { useEffect } from 'react';

type Props = {
  mode: 'create' | 'edit';
  initialData?: ITask;
  onSuccess?: () => void;
  onClose?: () => void;
};

export const TaskForm = ({ mode, initialData, onSuccess, onClose }: Props) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [priority, setPriority] = useState<TaskPriority>('standart');
  const [status, setStatus] = useState<TaskStatus>('appointed');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setStatus(initialData.status);
      setPriority(initialData.priority);
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
          responsibleId: 1,
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

      <AppButton type="submit">
        {mode === 'create' ? 'Создать' : 'Обновить'}
      </AppButton>
    </form>
  );
};
