import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import type { SignupData } from '../schemas/auth.schema';
import { authService } from '../services/auth.service';

type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  profilePic: string;
  gender: string;
};

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async (inputs: SignupData) => {
    try {
      setLoading(true);
      const response = await authService.signup<AuthUser>(inputs);

      if (response.error) {
        throw new Error(response.error);
      }

      if (!response.data) {
        throw new Error('No user data returned');
      }

      setAuthUser(response.data);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;
