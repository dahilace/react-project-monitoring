import { useState } from 'react';
import axios from 'axios';
import { AppInput } from '@/shared/ui/AppInput';
import { AppButton } from '@/shared/ui/AppButton';
import { AppSelect } from '@/shared/ui/AppSelect';
import type { TaskPriority, TaskStatus } from '@/entities/task/types';
import { taskPriorityOptions } from '../config/task.config';
import { taskStatusOptions } from '../config/task.config';

type Props = {
  onSuccess?: () => void;
  onClose?: () => void;
};

export const CreateTaskForm = ({ onSuccess, onClose }: Props) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [priority, setPriority] = useState<TaskPriority>('standart');
  const [status, setStatus] = useState<TaskStatus>('appointed');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('dahilace-token');

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

    onSuccess?.();
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold">Create Task</h2>

      <AppInput
        placeholder="Заголовок"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      >
        Title
      </AppInput>

      <AppInput
        required
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      >
        Description
      </AppInput>

      <AppSelect
        label="Priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        options={taskPriorityOptions}
      />
      <AppSelect
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        options={taskStatusOptions}
      />

      <AppButton type="submit">Create</AppButton>
    </form>
  );
};
