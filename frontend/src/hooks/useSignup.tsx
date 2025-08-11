import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import type { SignupData } from '../schemas/auth.schema';

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async (inputs: SignupData) => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);
      setAuthUser(data);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;
