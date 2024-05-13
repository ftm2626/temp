import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  register: any;
  error: string | undefined;
  name: string;
}

const GenericTextarea: React.FC<InputProps> = ({
  name,
  label,
  register,
  error,
  required,
  type,
  ...rest
}) => (
  <div>
    <label className="text-md font-bold">
      {label}
      {required && <span className="text-red01">*</span>}
    </label>
    <textarea
      id={name}
      {...register}
      {...rest}
      className={`border rounded-lg p-2 outline-none placeholder:text-dark01 duration-500 w-full mt-3 text-xl ${
        error ? "border-red02" : "border-dark05 focus:border-light01"
      }`}
      cols={10}
      rows={5}
    />
    {error && <span className="text-sm my-1 text-red01">{error}</span>}
  </div>
);
export default GenericTextarea;
