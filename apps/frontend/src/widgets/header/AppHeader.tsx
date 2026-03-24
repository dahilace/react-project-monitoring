import { useNavigate } from 'react-router-dom';
import { AppButton } from '@/shared/ui/AppButton';

type Props = {
  user: {
    name: string;
    login: string;
  } | null;
  onCreateClick?: () => void;
};

export const AppHeader = ({ onCreateClick, user }: Props) => {
  const navigate = useNavigate();
  function handlerLogOut() {
    localStorage.removeItem('dahilace-token');
    navigate('/login');
  }
  return (
    <header className="p-4 bg-gray-700 text-white sticky top-0 z-100">
      <div className="flex justify-between gap-4 items-center max-w-300 mx-auto">
        <AppButton onClick={handlerLogOut} variant="danger">
          Выйти
        </AppButton>

        {user ? (
          <div className="flex flex-wrap justify-center gap-2">
            <p>Привет </p>
            <p>
              <span>{user.name}</span> | <span className='text-xs'>{user.login}</span>
            </p>
          </div>
        ) : (
          <p>Я хедер!</p>
        )}
        <AppButton onClick={onCreateClick}>Создать задачу</AppButton>
      </div>
    </header>
  );
};
