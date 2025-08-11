import { useEffect, useState, type PropsWithChildren } from 'react';
import { authService } from '../services/auth.service';
import { AuthContext, type AuthUser } from './auth.context';

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
      } catch (error) {
        console.error(error);
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
