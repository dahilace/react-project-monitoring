import { useEffect, useState } from 'react';
import { api } from '@/shared/api/axios';
import type { ITask } from '@/entities/task/types';
import { TaskItem } from '@/entities/task/ui/TaskItem';

import { useOutletContext } from 'react-router-dom';

export const TasksPage = () => {
  const { onEdit, setRefreshTasks } = useOutletContext<{
    onEdit: (task: ITask) => void;
    setRefreshTasks: (fn: () => void) => void;
  }>();

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metaTotal, setMetaTotal] = useState<number>(0);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      const data = res.data;
      setTasks(data.data);
      setMetaTotal(data.meta.total);
    } catch (e: any) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    setRefreshTasks(() => fetchTasks);
  }, []);

  if (loading) return <div>Загрузка...</div>;

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-4">
      <h1 className="text-2xl font-bold">
        {'Задачи' + (metaTotal ? `: ${metaTotal}` : '')}
      </h1>
      {tasks.length === 0 ? (
        <p>Нет задач</p>
      ) : (
        tasks.map((task) => (
          <TaskItem key={task.id} task={task} onEdit={onEdit}></TaskItem>
        ))
      )}
    </div>
  );
};
