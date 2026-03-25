import { AppButton } from '@/shared/ui/AppButton';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="flex w-full h-full min-h-screen text-center">
      <AppButton shape='square'>
        <Link className="flex items-center justify-center h-full w-full" to="/">
          На главную
        </Link>
      </AppButton>
      <div className="max-w-200 max-h-200 m-auto">
        <h1 className="text-3xl">404</h1>
        <p className="text-xl">Страница не найдена</p>
      </div>
    </div>
  );
};
