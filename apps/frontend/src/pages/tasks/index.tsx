import { useEffect, useState } from 'react';
import { api } from '@/shared/api/axios';
import type { ITask } from '@/entities/task/types';
import { TaskItem } from '@/entities/task/ui/TaskItem';
import { AppModal } from '@/shared/ui/AppModal';
import { AppButton } from '@/shared/ui/AppButton';
import { CreateTaskForm } from '@/features/task/ui/TaskCreateForm';

export const TasksPage = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metaTotal, setMetaTotal] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      const data = res.data;
      console.log(data); //dev
      setTasks(data.data);
      setMetaTotal(data.meta.total);
    } catch (e: any) {
      console.log(e); //dev
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-4">
      <AppButton
        className="self-start sticky bottom-0"
        onClick={() => setIsModalOpen(true)}
      >
        Create Task
      </AppButton>
      <h1 className="text-2xl font-bold">
        {'Tasks' + (metaTotal ? `: ${metaTotal}` : '')}
      </h1>
      {tasks.length === 0 ? (
        <p>No tasks</p>
      ) : (
        tasks.map((task) => <TaskItem key={task.id} task={task}></TaskItem>)
      )}

      <AppModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateTaskForm
          onSuccess={fetchTasks}
          onClose={() => setIsModalOpen(false)}
        />
      </AppModal>
    </div>
  );
};
