import { useState } from 'react';
import { AppInput } from '@/shared/ui/AppInput';
import { AppButton } from '@/shared/ui/AppButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      const res = await axios.post('http://localhost:3001/api/auth/login', {
        login,
        password,
      });

      const token = res.data.token;

      localStorage.setItem('dahilace-token', token);

      setTimeout(() => {
        navigate('/');
      }, 0);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-80 p-6 border rounded flex flex-col gap-4"
      >
        <h1 className="text-xl font-bold text-center">Авторизация</h1>

        <AppInput
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value.trim())}
        >
          Логин
        </AppInput>

        <AppInput
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())}
          onChange={(e) => setPassword(e.target.value.trim())}
        >
          Пароль
        </AppInput>

        {error && <span className="text-red-500 text-sm">{error}</span>}

        <AppButton type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </AppButton>
      </form>

      <div className="absolute bottom-4 left-4 text-sm bg-gray-100 p-3 rounded shadow">
        <p className="font-bold mb-1">Демо аккауеты:</p>
        <p>manager1 / 123</p>
        <p>worker1 / 123</p>
        <p>worker2 / 123</p>
        <hr />
        <p>manager2 / 123</p>
        <p>worker3 / 123</p>
      </div>
    </div>
  );
};
