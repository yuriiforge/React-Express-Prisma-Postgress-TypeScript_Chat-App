import { useState } from 'react';
import { useAuthContext } from '../context/auth.context';
import { authService } from '../services/auth.service';

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    try {
      setLoading(true);
      const res = await authService.logout();

      if (res.error) {
        throw new Error(res.error);
      }

      setAuthUser(null);
    } catch (error: unknown) {
      let message = 'Network error';

      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === 'string') {
        message = error;
      }

      return { status: 0, error: message };
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
