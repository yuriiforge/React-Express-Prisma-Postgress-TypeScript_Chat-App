import { useState } from 'react';
import { type AuthUser, useAuthContext } from '../context/auth.context';
import { authService } from '../services/auth.service';
import type { LoginData } from '../schemas/auth.schema';
import { getErrorMessage } from '../utils/getErrorMessage';
import toast from 'react-hot-toast';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (inputs: LoginData) => {
    try {
      setLoading(true);

      const res = await authService.login<AuthUser>(inputs);

      if (res.error) {
        throw new Error(res.error);
      }

      if (!res.data) {
        throw new Error('No user data returned');
      }

      setAuthUser(res.data);
    } catch (error: unknown) {
      const message = getErrorMessage(error);

      toast.error(message);

      return { status: 0, error: message };
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
