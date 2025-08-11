import { Link } from 'react-router-dom';
import GenderCheckbox from '../components/GenderCheckbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, type SignupData } from '../schemas/auth.schema';
import useSignup from '../hooks/useSignup';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      username: '',
      password: '',
      confirmPassword: '',
      gender: 'male',
    },
  });
  const { loading, signup } = useSignup();

  const onSubmit = (data: SignupData) => {
    signup(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="label">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full input input-bordered  h-10"
              {...register('fullName')}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="johndoe"
              className="w-full input input-bordered h-10"
              {...register('username')}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <GenderCheckbox register={register} error={errors.gender?.message} />

          <Link
            to={'/login'}
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white"
          >
            Already have an account?
          </Link>

          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 border border-slate-700"
              disabled={loading}
            >
              {loading ? 'Signing...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
