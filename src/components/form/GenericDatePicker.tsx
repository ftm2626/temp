import fa from "react-date-object/locales/persian_fa";
import cal from "react-date-object/calendars/persian";
import DatePicker from "react-multi-date-picker";
import moment from "jalali-moment";
import { Controller, Control, RegisterOptions } from "react-hook-form";

export default function GenericDatePicker({
  name,
  label,
  rules,
  error,
  control,
  disable,
  required,
  upToDate,
  defaultValue,
}: {
  name: string;
  label?: string;
  disable?: boolean;
  required?: boolean;
  upToDate?: boolean;
  defaultValue?: Date;
  error: string | undefined;
  control: Control<any, any>;
  rules?: Omit<
    RegisterOptions<any, string>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
}) {
  return (
    <div className="flex flex-col relative w-full text-lg">
      <label className="text-md font-bold">
        {label}
        {required && <span className="text-red01">*</span>}
      </label>
      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field: { onChange, name, value } }) => (
          <DatePicker
            hideOnScroll={true}
            name={name}
            locale={fa}
            value={value}
            calendar={cal}
            disabled={disable}
            onChange={(date) => {
              onChange(date?.valueOf());
            }}
            editable={false}
            minDate={
              upToDate ? moment().subtract(1, "days").toDate() : undefined
            }
            inputClass={`rmdp-input ${error ? "red" : "gray"}`}
          />
        )}
      />
      {error && <span className="text-sm my-1 text-red01">{error}</span>}
    </div>
  );
}
