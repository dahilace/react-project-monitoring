import axios from 'axios';
import type {
  TaskPriority,
  TaskStatus,
} from '@/entities/task/model/task.types';
import type { IUser } from '@/entities/user/model/user.types';
import type { ITask } from '@/entities/task/model/task.types';

export const taskApi = async (
  mode: 'create' | 'edit',
  title: string,
  description: string,
  priority: TaskPriority,
  status: TaskStatus,
  responsibleId: number | null,
  dateOfEnd: string | null,
  user: IUser,
  initialData?: ITask,
) => {
  if (mode === 'create') {
    const token = localStorage.getItem('dahilace-token');

    await axios.post(
      'https://dahilass.ru/api-node/api/tasks',
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
    const token = localStorage.getItem('dahilace-token');

    await axios.patch(
      `https://dahilass.ru/api-node/api/tasks/${initialData.id}`,
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
};
