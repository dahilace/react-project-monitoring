import { useNavigate } from 'react-router-dom';
import { AppButton } from '@/shared/ui/AppButton';

type Props = {
  onCreateClick?: () => void;
};

export const AppHeader = ({ onCreateClick }: Props) => {
  const navigate = useNavigate();
  function handlerLogOut() {
    localStorage.removeItem('dahilace-token');
    navigate('/login');
  }
  return (
    <header className="p-4 bg-gray-700 text-white sticky top-0 z-100">
      <div className="flex justify-between items-center max-w-300 mx-auto">
        <AppButton onClick={handlerLogOut} variant="danger">
          Logout
        </AppButton>
        <h1>I am header</h1>
        <AppButton onClick={onCreateClick}>Create Task</AppButton>
      </div>
    </header>
  );
};
