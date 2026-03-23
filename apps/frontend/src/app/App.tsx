import { Outlet } from 'react-router-dom';
import { AppHeader } from '@/widgets/header/AppHeader';
import { AppFooter } from '@/widgets/footer/AppFooter';
import { AppModal } from '@/shared/ui/AppModal';
import { useState } from 'react';
import { TaskForm } from '@/features/task/ui/TaskForm';
import type { ITask } from '@/entities/task/types';

export const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

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
      <AppHeader onCreateClick={handleCreate} />

      <main className="flex-1 p-4">
        <Outlet context={{ onEdit: handleEdit }} />
      </main>

      <AppFooter />

      <AppModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TaskForm
          mode={selectedTask ? 'edit' : 'create'}
          initialData={selectedTask || undefined}
          onSuccess={() => setIsModalOpen(false)}
          onClose={() => setIsModalOpen(false)}
        />
      </AppModal>
    </div>
  );
};
