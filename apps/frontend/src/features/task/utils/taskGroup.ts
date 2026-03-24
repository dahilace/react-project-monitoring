import type { ITask } from '@/entities/task/model/task.types';

export const taskGroup = (
  tasks: ITask[],
  mode: 'none' | 'byDate' | 'byResponsible'
) => {
  if (mode === 'none') {
    return { all: tasks };
  }

  if (mode === 'byDate') {
    const today: ITask[] = [];
    const week: ITask[] = [];
    const future: ITask[] = [];

    const now = new Date();
    const weekLater = new Date();
    weekLater.setDate(now.getDate() + 7);

    tasks.forEach((task) => {
      if (!task.dateOfEnd) {
        future.push(task);
        return;
      }

      const end = new Date(task.dateOfEnd);

      if (end.toDateString() === now.toDateString()) {
        today.push(task);
      } else if (end <= weekLater) {
        week.push(task);
      } else {
        future.push(task);
      }
    });

    return {
      today,
      week,
      future,
    };
  }

  if (mode === 'byResponsible') {
    const grouped: Record<string, ITask[]> = {};

    tasks.forEach((task) => {
      const key = task.responsible.name;

      if (!grouped[key]) {
        grouped[key] = [];
      }

      grouped[key].push(task);
    });

    return grouped;
  }

  return { all: tasks };
};