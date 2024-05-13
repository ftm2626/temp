export default function GenericSelect({
  name,
  value,
  onChange,
  className,
  errorText,
  containerClassName,
  children,
  title,
  needed,
}: {
  name: string;
  value: string | number;
  onChange: (e?: any) => void;
  className?: string;
  errorText?: string;
  containerClassName?: string;
  children: any;
  title?: string;
  needed?: boolean;
}) {
  return (
    <div className={`flex flex-col relative ${containerClassName} w-full`}>
      {title && (
        <label className="font-bold">
          {title} {needed && <span className="text-red01">*</span>}{" "}
        </label>
      )}
      <select
        name={name}
        id=""
        className={`h-12 border border-dark05 rounded-md outline-none bg-white text-xl mt-3 ${className}`}
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
      {errorText && (
        <span className="text-sm my-1 text-red01">{errorText}</span>
      )}
    </div>
  );
}
