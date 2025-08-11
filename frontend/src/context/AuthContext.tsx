import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from 'react';
import { authService } from '../services/auth.service';

type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  profilePic: string;
  gender: string;
};

const AuthContext = createContext<{
  authUser: AuthUser | null;
  setAuthUser: Dispatch<SetStateAction<AuthUser | null>>;
  isLoading: boolean;
}>({
  authUser: null,
  setAuthUser: () => {},
  isLoading: false,
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

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
