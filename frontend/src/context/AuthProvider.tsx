import { useEffect, useState, type PropsWithChildren } from 'react';
import { authService } from '../services/auth.service';
import { AuthContext, type AuthUser } from './auth.context';
import { getErrorMessage } from '../utils/getErrorMessage';
import toast from 'react-hot-toast';

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        setIsLoading(true);
        const res = await authService.getMe<AuthUser>();
        if (res.error) {
          throw new Error(res.error);
        }

        if (!res.data) {
          throw new Error('No user data returned');
        }

        setAuthUser(res.data);
      } catch (error: unknown) {
        const message = getErrorMessage(error);

        if (message === 'Not logged in') {
          toast.error(message);
        }

        return { status: 0, error: message };
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        isLoading,
        setAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
