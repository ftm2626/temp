import GenericTextarea from "@/components/form/GenericTextarea";
import PopUpModal from "@/components/modals/PopUpModal";
import React, { useState } from "react";
import Marker from "@/public/assets/svg/Marker.svg";
import {
  UseFormSetValue,
} from "react-hook-form";
import {
  submitRequestFormInputT,
} from "@/interface/passangers.interface";
import UseAddresses from "@/hooks/passangers/useAddresses";
import GenericButton from "./GenericButton";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  register: any;
  error: string | undefined;
  name: "origin" | "destination";
  setValue: UseFormSetValue<submitRequestFormInputT>;
  textValue?: string;
  textError?: string;
}

const GenericAddressField = ({
  label,
  name,
  required,
  register,
  error,
  setValue,
  textValue,
  textError,
}: InputProps) => {
  const { addressListData } = UseAddresses();
  const [showModal, setShowModal] = useState(0);
  return (
    <>
      <div className="w-full flex flex-col" onClick={() => setShowModal(1)}>
        <label className="text-md font-bold">
          {label}
          {required && <span className="text-red01">*</span>}
        </label>
        <div
          className={`border rounded-lg p-2 outline-none text-black duration-500 w-full mt-3 text-xl bg-white h-12 ${
            error ? "border-red02" : "border-dark05 focus:border-light01"
          }`}
        >
          {textValue}
        </div>
        {error && <span className="text-sm my-1 text-red01">{error}</span>}
      </div>
      <PopUpModal show={showModal} setShow={setShowModal} key={12}>
        <>
          <GenericTextarea
            label={label}
            name={name}
            register={register(name, { required: textError })}
            error={error}
            required={required}
          />
          <GenericButton
            color="blue"
            title="تایید"
            onClick={(e) => {
              e.preventDefault(), setShowModal(0);
            }}
          />
          <ul>
            {addressListData?.data.map((address) => {
              if (address.status === 1) {
                return (
                  <>
                    <li
                      key={address.id}
                      onClick={() => {
                        setValue(name, address.description);
                      }}
                      className="cursor-pointer rounded-lg border my-3 p-4"
                    >
                      <div className="flex items-center gap-1">
                        <Marker />
                        <p className="font-bold text-blue01">
                          عنوان: {address.title}
                        </p>
                      </div>
                      <p className="ps-5">آدرس: {address.description}</p>
                    </li>
                  </>
                );
              }
            })}
          </ul>
        </>
      </PopUpModal>
    </>
  );
};

export default GenericAddressField;
