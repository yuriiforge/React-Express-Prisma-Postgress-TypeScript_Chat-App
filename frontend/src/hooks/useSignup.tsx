import { useState } from 'react';
import type { SignupData } from '../schemas/auth.schema';
import { authService } from '../services/auth.service';
import { useAuthContext } from '../context/auth.context';
import toast from 'react-hot-toast';

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
    } catch (error: unknown) {
      let message = 'Network error';

      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === 'string') {
        message = error;
      }

      toast.error(message);

      return { status: 0, error: message };
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;
