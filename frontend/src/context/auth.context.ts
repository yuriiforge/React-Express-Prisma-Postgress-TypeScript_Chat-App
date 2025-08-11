import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from 'react';

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  profilePic: string;
  gender: string;
};

export const AuthContext = createContext<{
  authUser: AuthUser | null;
  setAuthUser: Dispatch<SetStateAction<AuthUser | null>>;
  isLoading: boolean;
}>({
  authUser: null,
  setAuthUser: () => {},
  isLoading: false,
});

export const useAuthContext = () => useContext(AuthContext);
