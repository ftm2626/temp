import React, { InputHTMLAttributes } from "react";
import CheckSvg from '@/public/assets/svg/check.svg'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register: any;
  error: string | undefined;
  name: string;
}

export default function GenericCheckbox({
  label,
  name,
  register,
  ...rest
}: Props) {
  return (
    <div className="inline-flex items-center gap-2">
      <label
        className="relative flex items-center rounded-full cursor-pointer"
        htmlFor={name}
      >
        <input
          type="checkbox"
          className={`peer relative h-6 w-6 cursor-pointer appearance-none rounded-md border-2 border-dark03 transition-all checked:border-dark01 checked:bg-dark01 disabled:border-dark04 disabled:checked:bg-dark04`}
          id={name}
          {...rest}
          {...register}
        />
        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
          <CheckSvg />
        </span>
      </label>
      <label
        className="font-light text-dark01 cursor-pointer select-none text-lg disabled:text-dark04"
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  );
}
