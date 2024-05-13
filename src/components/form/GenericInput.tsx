import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register: any;
  error: string | undefined;
  name: string;
}

const GenericInput: React.FC<Props> = ({
  name,
  label,
  register,
  error,
  required,
  ...rest
}) => (
  <div className="w-full flex flex-col">
    <label className="text-md font-bold">
      {label}
      {required && <span className="text-red01">*</span>}
    </label>
    <input
      id={name}
      {...register}
      {...rest}
      className={`border rounded-lg p-2 outline-none placeholder:text-dark01 duration-500 w-full mt-3 text-xl ${
        error ? "border-red02" : "border-dark05 focus:border-light01"
      }`}
    />
    {error && <span className="text-sm my-1 text-red01">{error}</span>}
  </div>
);
export default GenericInput;
