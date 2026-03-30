import { useState } from 'react';
import { AppInput } from '@/shared/ui/AppInput';
import { AppButton } from '@/shared/ui/AppButton';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '@/shared/api/axios';
import { demoAccs } from '@/entities/login/login.config';
import { AppForm } from '@/shared/ui/AppForm';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await loginApi(login, password);
      const token = res.data.token;
      localStorage.setItem('dahilace-token', token);

      setTimeout(() => {
        navigate('/');
      }, 0);
    } catch (err: any) {
      setError(
        err.response?.data?.error || 'Неверный пользователь и/или пароль',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <AppForm
        className="max-w-90"
        title="Авторизация"
        onSubmit={handleSubmit}
      >
        <AppInput
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          error={
            error === 'Пользователь не найден' ? 'Пользователь не найден' : null
          }
        >
          Логин
        </AppInput>

        <AppInput
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error === 'Неверный пароль' ? 'Неверный пароль' : null}
        >
          Пароль
        </AppInput>

        <AppButton type="submit" disabled={loading} className="mt-4">
          {loading ? 'Загрузка...' : 'Войти'}
        </AppButton>
      </AppForm>

      <div
        className="absolute bottom-4 left-4 w-64 
                bg-white/80 backdrop-blur-md 
                border border-gray-200
                p-4 rounded-xl shadow-lg
                text-sm text-gray-700"
      >
        <p className="font-semibold text-gray-800 mb-2">Демо аккаунты:</p>
        <ul>
          {demoAccs.map((acc, i) => (
            <li
              key={i}
              className="grid grid-cols-[1fr_auto_1fr] justify-items-start gap-1"
            >
              <span className="font-medium text-gray-600 col-start-1">
                {acc.login}
              </span>
              <span className="text-gray-800 col-start-3">{acc.password}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
