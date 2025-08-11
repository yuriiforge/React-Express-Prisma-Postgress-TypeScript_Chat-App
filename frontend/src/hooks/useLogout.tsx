import { useState } from 'react';
import { useAuthContext } from '../context/auth.context';
import { authService } from '../services/auth.service';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../utils/getErrorMessage';

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
      const message = getErrorMessage(error);

      toast.error(message);

      return { status: 0, error: message };
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
