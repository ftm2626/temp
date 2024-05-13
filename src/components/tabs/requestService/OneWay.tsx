import GenericTimeSwiper from "@/components/form/GenericTimeSwiper";
import React from "react";
import GenericSearchSelect from "@/components/form/GenericSearchSelect";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import GenericTextarea from "@/components/form/GenericTextarea";
import GenericDatePicker from "@/components/form/GenericDatePicker";
import { createInfoApiResT } from "@/interface/passangersApi.interface";
import {
  submitRequestErrorT,
  submitRequestFormInputT,
} from "@/interface/passangers.interface";
import GenericAddressField from "@/components/form/GenericAddressField";

export default function OneWay({
  errors,
  control,
  formErr,
  cityInfo,
  register,
  setValue,
  watch
}: {
  errors: submitRequestErrorT;
  control: Control<any, any>;
  formErr: FieldErrors<submitRequestFormInputT>;
  cityInfo: createInfoApiResT["data"]["cities"] | [];
  register: UseFormRegister<submitRequestFormInputT>;
  setValue: UseFormSetValue<submitRequestFormInputT>;
  watch: UseFormWatch<submitRequestFormInputT>;
}) {
  return (
    <>
      {/* <div className="flex flex-row gap-2"> */}
      <GenericSearchSelect<createInfoApiResT["data"]["cities"][0]>
        required
        selectId="id"
        label="شهر مبدا"
        selectValue="name"
        name="origin_city"
        data={cityInfo}
        control={control}
        error={formErr.origin_city?.message}
        rules={{ required: errors.origin_city }}
      />
      <GenericSearchSelect<createInfoApiResT["data"]["cities"][0]>
        required
        selectId="id"
        label="شهر مقصد"
        selectValue="name"
        name="destination_city"
        data={cityInfo}
        control={control}
        error={formErr.destination_city?.message}
        rules={{ required: errors.destination_city }}
      />
      {/* </div> */}
      {/* <div className="flex flex-row gap-2"> */}
      <GenericDatePicker
        required
        upToDate
        label="تاریخ رفت"
        name="departure_date"
        control={control}
        error={formErr.departure_date?.message}
        rules={{ required: errors.departure_date }}
      />
      <GenericTimeSwiper
        required
        name="hour"
        label="ساعت حضور راننده"
        control={control}
        error={formErr.hour?.message}
        rules={{ required: errors.hour }}
      />
      <GenericAddressField
        label="آدرس مبدا"
        name="origin"
        required
        register={register}
        error={formErr.origin?.message}
        textError={errors.origin}
        setValue={setValue}
        textValue={watch("origin")}
      />
      <GenericAddressField
        label="آدرس مقصد"
        name="destination"
        // required
        register={register}
        error={formErr.destination?.message}
        textError={errors.destination}
        setValue={setValue}
        textValue={watch("destination")}
      />
      <GenericTextarea
        label="توضیحات"
        name="description"
        register={register("description")}
        error={formErr.description?.message}
      />
    </>
  );
}
