import type { UseFormRegister, FieldValues, Path } from 'react-hook-form';

type GenderCheckboxProps<TFieldValues extends FieldValues> = {
  register: UseFormRegister<TFieldValues>;
  error?: string;
};

function GenderCheckbox<TFieldValues extends FieldValues>({
  register,
  error,
}: GenderCheckboxProps<TFieldValues>) {
  return (
    <div className="flex gap-4">
      <label className="label cursor-pointer flex items-center gap-2">
        <input
          type="radio"
          value="male"
          {...register('gender' as Path<TFieldValues>)}
          className="radio border-slate-900"
        />
        <span className="label-text">Male</span>
      </label>

      <label className="label cursor-pointer flex items-center gap-2">
        <input
          type="radio"
          value="female"
          {...register('gender' as Path<TFieldValues>)}
          className="radio border-slate-900"
        />
        <span className="label-text">Female</span>
      </label>

      <label className="label cursor-pointer flex items-center gap-2">
        <input
          type="radio"
          value="other"
          {...register('gender' as Path<TFieldValues>)}
          className="radio border-slate-900"
        />
        <span className="label-text">Other</span>
      </label>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default GenderCheckbox;
