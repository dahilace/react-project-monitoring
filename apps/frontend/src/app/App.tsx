import { useState } from 'react';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { AppHeader } from '@/widgets/header/AppHeader';
import { AppFooter } from '@/widgets/footer/AppFooter';
import { AppModal } from '@/shared/ui/AppModal';
import { TaskForm } from '@/features/task/ui/TaskForm';
import { getMe } from '@/shared/api/axios';

import type { ITask } from '@/entities/task/model/task.types';
import type { IUser } from '@/entities/user/model/user.types';

export const App = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [refreshTasks, setRefreshTasks] = useState<(() => void) | null>(null);

  useEffect(() => {
    getMe()
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch(() => {
        localStorage.removeItem('dahilace-token');
        setUser(null);
      });
  }, []);

  const handleCreate = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleEdit = (task: ITask) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader user={user} onCreateClick={handleCreate} />

      <main className="flex-1 p-4">
        <Outlet context={{ onEdit: handleEdit, setRefreshTasks, user }} />
      </main>

      <AppFooter />

      <AppModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TaskForm
          user={user}
          mode={selectedTask ? 'edit' : 'create'}
          initialData={selectedTask || undefined}
          onSuccess={() => {
            refreshTasks?.();
            setIsModalOpen(false);
          }}
          onClose={() => setIsModalOpen(false)}
        />
      </AppModal>
    </div>
  );
};
