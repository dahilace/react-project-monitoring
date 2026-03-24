import { useEffect, useState } from 'react';
import { api } from '@/shared/api/axios';
import { useOutletContext } from 'react-router-dom';
import { LoadingScreen } from '@/shared/ui/LoadingScreen';

import { taskGroup } from '@/features/task/utils/TaskGroup';
import { TaskItem } from '@/entities/task/ui/TaskItem';
import { AppButton } from '@/shared/ui/AppButton';

import type { ITask } from '@/entities/task/model/task.types';

export const TasksPage = () => {
  const { onEdit, setRefreshTasks } = useOutletContext<{
    onEdit: (task: ITask) => void;
    setRefreshTasks: (fn: () => void) => void;
  }>();

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metaTotal, setMetaTotal] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'none' | 'byDate' | 'byResponsible'>(
    'none',
  );

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

  const groupedTasks = taskGroup(tasks, viewMode);

  useEffect(() => {
    fetchTasks();
    setRefreshTasks(() => fetchTasks);
  }, []);

  if (loading) return <LoadingScreen />;

  if (error) return <div className="text-red-500">{error}</div>;

  if (tasks.length === 0) {
    return (
      <div className="max-w-2xl mx-auto flex flex-col gap-4">
        <h1 className="text-2xl font-bold">
          {'Задачи' + (metaTotal ? `: ${metaTotal}` : '')}
        </h1>
        <p>Нет задач</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <p className="font-semibold">Сортировка:</p>
        <div className="flex gap-2">
          <AppButton onClick={() => setViewMode('none')}>Все</AppButton>
          <AppButton onClick={() => setViewMode('byDate')}>По дате</AppButton>
          <AppButton onClick={() => setViewMode('byResponsible')}>
            По ответственным
          </AppButton>
        </div>
      </div>

      <h1 className="text-2xl font-bold">
        {'Задачи' + (metaTotal ? `: ${metaTotal}` : '')}
      </h1>

      {Object.entries(groupedTasks).map(([group, groupTasks]) => {
        if (!groupTasks.length) return null;

        return (
          <div key={group}>
            <p className="font-bold text-lg mt-4 mb-2">
              {group === 'today' && 'Сегодня'}
              {group === 'week' && 'На неделю'}
              {group === 'future' && 'Будущее'}
              {group === 'all' && 'Все задачи'}
              {!['today', 'week', 'future', 'all'].includes(group) && group}
            </p>

            <ul className="flex flex-col gap-4">
              {groupTasks.map((task) => (
                <TaskItem li key={task.id} task={task} onEdit={onEdit} />
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};
