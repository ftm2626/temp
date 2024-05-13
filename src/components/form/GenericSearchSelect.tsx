/* eslint-disable react-hooks/exhaustive-deps */
import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import CloseIcon from "@/public/assets/svg/Close.svg";

interface Props<dataT> extends InputHTMLAttributes<HTMLInputElement> {
  data: any;
  name: string;
  label: string;
  selectId: keyof dataT;
  selectValue: keyof dataT;
  error: string | undefined;
  control: Control<any, any>;
  rules?: Omit<
    RegisterOptions<any, string>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
}

export default function GenericSearchSelect<dataT>({
  data,
  name,
  label,
  value,
  rules,
  error,
  control,
  required,
  selectId,
  selectValue,
  ...rest
}: Props<dataT>) {
  const [showDropDown, setShowDropDown] = useState(false);
  const [searched, setSearched] = useState<any[]>(data);
  const [searchedValue, setSearchedValue] = useState("");
  const refMenu = useRef<HTMLDivElement>(null);

  const closeOpenMenus = (e: any) => {
    if (refMenu?.current && !refMenu?.current.contains(e?.target)) {
      setShowDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeOpenMenus);
    return () => {
      document.removeEventListener("mousedown", closeOpenMenus);
    };
  }, []);

  useEffect(() => {
    setSearched(data);
  }, [data]);

  const changeInput = (e: string) => {
    setSearchedValue(e);
    const res = data.filter((item: any) => item[selectValue].includes(e));
    setSearched(res);
  };

  const onSelect = (item: any, onChange: any) => {
    onChange(item);
    changeInput("");
    setShowDropDown(false);
  };
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, name, value } }) => (
        <div className="flex flex-col relative w-full">
          <label className="text-md font-bold">
            {label}
            {required && <span className="text-red01">*</span>}
          </label>
          <input
            readOnly
            id={name}
            onFocus={() => setShowDropDown(true)}
            value={
              data === undefined || data?.length < 1
                ? "در حال بارگزاری..."
                : value
                ? value[selectValue]
                : ""
            }
            className={`border rounded-lg p-2 outline-none placeholder:text-dark01 duration-500 w-full mt-3 text-xl ${
              error ? "border-red02" : "border-dark05 focus:border-light01"
            }`}
            {...rest}
          />
          {showDropDown && (
            <div className="bg-dark02/50 z-20 w-screen h-screen fixed top-6 -right-1.5 flex justify-center items-center px-6">
              <div
                className="bg-white rounded-md border border-dark02 flex flex-col items-center h-[70%] overflow-x-auto w-full"
                ref={refMenu}
              >
                <button
                  className="ml-auto m-3"
                  onClick={() => setShowDropDown(false)}
                >
                  <CloseIcon className="w-5 h-5 " />{" "}
                </button>
                <input
                  className=" p-2 outline-none placeholder:text-dark01 placeholder:font-bold font-bold duration-500 w-full border border-dark03"
                  value={searchedValue}
                  onChange={(e) => changeInput(e.target.value)}
                  placeholder="جستجو..."
                />
                {searched?.map((item) => (
                  <div
                    className={`py-2 hover:bg-dark04 px-2 w-full cursor-pointer ${
                      value &&
                      value[selectId] === item[selectId] &&
                      "bg-dark04 font-bold"
                    }`}
                    key={item[selectId]}
                    onClick={() => onSelect(item, onChange)}
                  >
                    {item[selectValue]}
                  </div>
                ))}
              </div>
            </div>
          )}
          {error && <span className="text-sm my-1 text-red01">{error}</span>}
        </div>
      )}
    />
  );
}
